import {
  existsSync,
  lstatSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  renameSync,
  unlinkSync,
  writeFileSync,
} from "node:fs";
import path from "node:path";
import { parseDocument } from "yaml";

const content = path.resolve("content/blog");
const directory = path.resolve("public/blog-media");
const limit = 16 * 1024 * 1024;
const dateParts = Object.fromEntries(
  new Intl.DateTimeFormat("en", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .formatToParts(new Date())
    .map((part) => [part.type, part.value]),
);
const today = [dateParts.year, dateParts.month, dateParts.day].join("-");
const images = new Map();
for (const name of readdirSync(content).filter((name) =>
  /\.mdx$/i.test(name),
)) {
  const file = path.join(content, name);
  try {
    if (lstatSync(file).isSymbolicLink())
      throw new Error("post symlinks are forbidden");
    const source = readFileSync(file, "utf8");
    const frontmatter = /^\uFEFF?---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(
      source,
    );
    if (!frontmatter) throw new Error("missing YAML frontmatter");
    const document = parseDocument(frontmatter[1], { uniqueKeys: true });
    if (document.errors.length) throw document.errors[0];
    const data = document.toJS({ maxAliasCount: 20 });
    if (data.draft === true || data.published > today) continue;
    if (!data.hero) {
      if (data.kind === "news")
        throw new Error("news requires a credited hero image");
      continue;
    }
    const hero = data.hero;
    const url = new URL(hero.src);
    const filename = path.basename(url.pathname);
    if (
      url.protocol !== "https:" ||
      url.hostname !== "assets.mimir.business" ||
      url.port ||
      url.username ||
      url.password ||
      url.search ||
      url.hash ||
      !url.pathname.startsWith("/assets/") ||
      !/\.[a-f0-9]{8,64}\.[a-z0-9]+$/i.test(filename)
    )
      throw new Error("hero requires an immutable owned asset URL");
    if (
      ![hero.alt, hero.caption, hero.credit].every(
        (value) => typeof value === "string" && value.trim(),
      )
    )
      throw new Error("hero requires alt, caption and credit");
    const owner = /^\/assets\/sites\/([^/]+)\//.exec(url.pathname)?.[1];
    const attribution = new URL(hero.sourceUrl);
    if (
      !owner ||
      attribution.protocol !== "https:" ||
      ![owner, "www." + owner].includes(attribution.hostname) ||
      attribution.username ||
      attribution.password ||
      attribution.port
    )
      throw new Error("hero sourceUrl must be its approved owning Mimir page");
    images.set(hero.src, {
      file,
      url,
      filename,
      referer: attribution.origin + "/",
    });
  } catch (error) {
    throw new Error(
      "BLOG:" +
        file +
        ":" +
        (error instanceof Error ? error.message : String(error)),
    );
  }
}
mkdirSync(directory, { recursive: true });
for (const [src, image] of images) {
  const target = path.join(directory, image.filename);
  if (existsSync(target)) continue;
  const temporary = target + "." + process.pid + ".tmp";
  try {
    const response = await fetch(image.url, {
      headers: { Referer: image.referer },
      signal: AbortSignal.timeout(30000),
    });
    if (!response.ok) throw new Error("HTTP " + response.status);
    if (
      !response.headers.get("content-type")?.toLowerCase().startsWith("image/")
    )
      throw new Error("response is not an image");
    if (Number(response.headers.get("content-length") ?? 0) > limit)
      throw new Error("image exceeds 16MiB");
    if (!response.body) throw new Error("response has no image body");
    const chunks = [];
    let size = 0;
    for await (const chunk of response.body) {
      size += chunk.byteLength;
      if (size > limit) throw new Error("image exceeds 16MiB");
      chunks.push(chunk);
    }
    if (size === 0) throw new Error("image is empty");
    writeFileSync(temporary, Buffer.concat(chunks), { flag: "wx" });
    renameSync(temporary, target);
  } catch (error) {
    if (existsSync(temporary)) unlinkSync(temporary);
    throw new Error(
      "BLOG:" +
        image.file +
        ":social image " +
        src +
        ":" +
        (error instanceof Error ? error.message : String(error)),
    );
  }
}
