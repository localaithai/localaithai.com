import { createProcessor } from "@mdx-js/mdx";
import remarkGfm from "remark-gfm";
import type { FactRegistry } from "../facts";
import { bangkokToday } from "./dates";
import type { BlogConfig, Post } from "./index";
import type { Frontmatter } from "./schema";
import { httpsUrl, isAssetUrl } from "./schema";
import { type MarkdownNode, walk } from "./text";

export function fail(file: string, reason: string): never {
  throw new Error("BLOG:" + file + ":" + reason);
}

export function canonicalPath(path: string): string {
  return path === "/" || /\.[a-z0-9]+$/i.test(path)
    ? path
    : path.replace(/\/+$/, "") + "/";
}

export function guardSnippet(
  file: string,
  title: string,
  description: string,
  suffix: string,
): void {
  if ((title + suffix).length > 60)
    fail(file, "title with suffix exceeds 60 code units");
  if (description.length > 155)
    fail(file, "description exceeds 155 code units");
}

export function guardDates(file: string, data: Frontmatter, now: Date): void {
  const reviewed = data.reviewed ?? data.published;
  if (reviewed < data.published) fail(file, "reviewed precedes published");
  if (reviewed > bangkokToday(now)) fail(file, "reviewed is in the future");
  if (data.newsDate && data.newsDate > data.published)
    fail(file, "newsDate follows article publication");
  for (const item of [...data.citations, ...data.videos]) {
    if (item.published && item.published > reviewed)
      fail(file, "source publication follows article review");
  }
  for (const citation of data.citations) {
    if (citation.accessed > reviewed)
      fail(file, "source access follows article review");
    if (citation.published && citation.published > citation.accessed)
      fail(file, "source publication follows source access");
  }
}

const props = {
  Fact: new Set(["id"]),
  Callout: new Set(["title"]),
  Figure: new Set(["src", "alt", "caption", "credit", "sourceUrl"]),
};

export function guardBody(
  file: string,
  body: string,
  registry: FactRegistry,
): { tree: MarkdownNode; factIds: string[] } {
  let tree: MarkdownNode;
  try {
    tree = createProcessor({ remarkPlugins: [remarkGfm] }).parse(
      body,
    ) as MarkdownNode;
  } catch (error) {
    fail(
      file,
      "invalid MDX: " +
        (error instanceof Error ? error.message : String(error)),
    );
  }
  const factIds: string[] = [];
  walk(tree, (node) => {
    if (node.type === "mdxjsEsm") fail(file, "MDX import/export is forbidden");
    if (node.type === "mdxFlowExpression" || node.type === "mdxTextExpression")
      fail(file, "MDX expressions are forbidden");
    if (node.type === "html") fail(file, "raw HTML is forbidden");
    if (node.type === "heading" && node.depth === 1)
      fail(file, "body H1 is forbidden; the article page owns the H1");
    if (
      node.type === "heading" &&
      (node.depth === 2 || node.depth === 3) &&
      node.children?.some((child) => child.type !== "text")
    )
      fail(file, "H2/H3 headings must be plain text");
    if (node.type === "image" && !isAssetUrl(node.url ?? ""))
      fail(file, "body images require an immutable asset-host URL");
    if (node.type !== "mdxJsxFlowElement" && node.type !== "mdxJsxTextElement")
      return;
    const name = node.name;
    if (name !== "Fact" && name !== "Callout" && name !== "Figure")
      fail(file, "only Fact, Callout, and Figure JSX components are allowed");
    const values: Record<string, string> = {};
    for (const attribute of node.attributes ?? []) {
      if (
        attribute.type !== "mdxJsxAttribute" ||
        !attribute.name ||
        typeof attribute.value !== "string"
      ) {
        fail(file, "JSX attributes must be named string literals");
      }
      if (/^on/i.test(attribute.name) || !props[name].has(attribute.name))
        fail(file, "unsupported JSX attribute: " + attribute.name);
      if (Object.hasOwn(values, attribute.name))
        fail(file, "duplicate JSX attribute: " + attribute.name);
      values[attribute.name] = attribute.value;
    }
    if (name === "Fact") {
      if (!values.id || !registry[values.id])
        fail(file, "unknown fact id: " + (values.id ?? "(missing)"));
      if (node.children?.length)
        fail(file, "Fact cannot have authored children");
      factIds.push(values.id);
    }
    if (name === "Figure") {
      if (!values.alt?.trim() || !isAssetUrl(values.src ?? ""))
        fail(file, "Figure requires alt and an immutable asset-host src");
      if (values.sourceUrl && !httpsUrl.safeParse(values.sourceUrl).success)
        fail(file, "Figure sourceUrl must be HTTPS");
      if (node.children?.length)
        fail(file, "Figure cannot have authored children");
    }
  });
  return { tree, factIds };
}

export function bodyLinks(tree: MarkdownNode): string[] {
  const definitions = new Map<string, string>();
  walk(tree, (node) => {
    if (node.type === "definition" && node.identifier && node.url)
      definitions.set(node.identifier.toLowerCase(), node.url);
  });
  const links: string[] = [];
  walk(tree, (node) => {
    if (node.type === "link" && node.url) links.push(node.url);
    if (node.type === "linkReference" && node.identifier) {
      const target = definitions.get(node.identifier.toLowerCase());
      if (target) links.push(target);
    }
  });
  return links;
}

export function guardLinks(
  post: Post,
  tree: MarkdownNode,
  config: BlogConfig,
  postPaths: readonly string[],
): void {
  const known = new Set(
    [...config.knownPaths, "/blog/", "/blog/feed.xml", ...postPaths].map(
      canonicalPath,
    ),
  );
  const money = new Set(config.moneyPaths.map(canonicalPath));
  const cluster = canonicalPath(post.cluster);
  if (!money.has(cluster))
    fail(post.file, "cluster is not in moneyPaths: " + post.cluster);
  let linkedCluster = false;
  for (const link of bodyLinks(tree)) {
    let url: URL;
    try {
      url = new URL(link, config.site.url + post.path);
    } catch {
      fail(post.file, "invalid body link: " + link);
    }
    if (!["https:", "http:", "mailto:", "tel:"].includes(url.protocol))
      fail(post.file, "unsafe body link: " + link);
    if (url.origin !== config.site.url) continue;
    const path = url.pathname;
    if (canonicalPath(path) !== path)
      fail(post.file, "internal link requires trailing slash: " + link);
    if (!known.has(path)) fail(post.file, "unknown internal path: " + path);
    if (path === cluster) linkedCluster = true;
  }
  if (!linkedCluster)
    fail(
      post.file,
      "body must include a Markdown link to cluster: " + post.cluster,
    );
}

export function guardDuplicates(posts: readonly Post[]): void {
  for (const key of ["slug", "title", "description", "query"] as const) {
    const seen = new Map<string, string>();
    for (const post of posts) {
      const value = post[key].trim().normalize("NFC");
      if (seen.has(value))
        fail(post.file, "duplicate " + key + " also in " + seen.get(value));
      seen.set(value, post.file);
    }
  }
}
