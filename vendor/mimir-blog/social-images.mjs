import {
  existsSync,
  lstatSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { parseDocument } from "yaml";

const maxBytes = 16 * 1024 * 1024;

function fail(file, message) {
  throw new Error("BLOG:social-images:" + file + ":" + message);
}

function bangkokToday(now) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

function assetUrl(value) {
  try {
    const url = new URL(value);
    if (
      url.protocol === "https:" &&
      url.hostname === "assets.mimir.business" &&
      !url.port &&
      !url.username &&
      !url.password &&
      !url.search &&
      !url.hash &&
      /^\/assets\/.+\.[a-f0-9]{8,64}\.[a-z0-9]+$/i.test(url.pathname)
    )
      return url;
  } catch {}
  return undefined;
}

export function siteReferer(vendorDir) {
  const { domain } = JSON.parse(
    readFileSync(path.join(vendorDir, "MANIFEST.json"), "utf8"),
  );
  if (typeof domain !== "string" || !/^[a-z0-9-]+(\.[a-z0-9-]+)+$/.test(domain))
    fail("MANIFEST.json", "missing site domain; sync the engine again");
  return "https://" + domain + "/";
}

export function publishedHeroes(contentDir, now = new Date()) {
  const today = bangkokToday(now);
  const heroes = new Map();
  for (const name of readdirSync(contentDir)
    .filter((name) => /\.mdx$/i.test(name))
    .sort()) {
    const file = path.join(contentDir, name);
    if (lstatSync(file).isSymbolicLink())
      fail(file, "post symlinks are forbidden");
    const frontmatter = /^﻿?---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(
      readFileSync(file, "utf8"),
    );
    if (!frontmatter) fail(file, "missing YAML frontmatter");
    const document = parseDocument(frontmatter[1], { uniqueKeys: true });
    if (document.errors.length) fail(file, document.errors[0].message);
    const data = document.toJS({ maxAliasCount: 20 });
    if (data.draft || String(data.published) > today || !data.hero) continue;
    const url = assetUrl(data.hero.src);
    if (!url) fail(file, "hero must be an immutable assets.mimir.business URL");
    if (!heroes.has(url.href)) heroes.set(url.href, file);
  }
  return heroes;
}

export async function copyHeroes({
  heroes,
  mediaDir,
  referer,
  request = fetch,
}) {
  mkdirSync(mediaDir, { recursive: true });
  let copied = 0;
  for (const [src, file] of heroes) {
    const target = path.join(mediaDir, path.basename(new URL(src).pathname));
    if (existsSync(target)) continue;
    const temporary = target + "." + process.pid + ".tmp";
    try {
      const response = await request(src, {
        headers: { Referer: referer },
        redirect: "error",
        signal: AbortSignal.timeout(30_000),
      });
      if (!response.ok) throw new Error("HTTP " + response.status);
      if (
        !response.headers
          .get("content-type")
          ?.toLowerCase()
          .startsWith("image/")
      )
        throw new Error("response is not an image");
      if (Number(response.headers.get("content-length") ?? 0) > maxBytes)
        throw new Error("image exceeds 16 MiB");
      if (!response.body) throw new Error("response has no image body");
      const chunks = [];
      let size = 0;
      for await (const chunk of response.body) {
        size += chunk.byteLength;
        if (size > maxBytes) throw new Error("image exceeds 16 MiB");
        chunks.push(chunk);
      }
      if (size === 0) throw new Error("image is empty");
      writeFileSync(temporary, Buffer.concat(chunks), { flag: "wx" });
      renameSync(temporary, target);
      copied += 1;
    } catch (error) {
      rmSync(temporary, { force: true });
      fail(
        file,
        "hero " +
          src +
          ": " +
          (error instanceof Error ? error.message : String(error)),
      );
    }
  }
  return copied;
}

if (
  process.argv[1] &&
  path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
  try {
    const heroes = publishedHeroes(path.resolve("content/blog"));
    await copyHeroes({
      heroes,
      mediaDir: path.resolve("public/blog-media"),
      referer: siteReferer(path.dirname(fileURLToPath(import.meta.url))),
    });
    console.log("Blog social images ready: " + heroes.size + " unique heroes.");
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
