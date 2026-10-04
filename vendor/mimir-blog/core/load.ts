import { lstatSync, readdirSync, readFileSync, realpathSync } from "node:fs";
import path from "node:path";
import { parseDocument } from "yaml";
import type { FactRegistry } from "../facts";
import { bangkokMidnight, bangkokToday, reviewedLabel } from "./dates";
import { factCitations, snapshotFacts } from "./facts";
import {
  fail,
  guardBody,
  guardDates,
  guardDuplicates,
  guardLinks,
  guardSnippet,
} from "./guards";
import type { BlogConfig, Post } from "./index";
import { postSchema, videoId } from "./schema";
import { headingsFromTree, readingMinutes } from "./text";

export type ParsePostOptions = {
  now?: Date;
  locale?: "th" | "en";
  facts?: FactRegistry;
};

export function parsePostFile(
  file: string,
  options: ParsePostOptions = {},
): Post | undefined {
  const now = options.now ?? new Date();
  const locale = options.locale ?? "th";
  const registry = snapshotFacts(options.facts);
  const slug = path.basename(file).replace(/\.mdx$/i, "");
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug))
    fail(file, "invalid slug filename");
  let source: string;
  try {
    if (lstatSync(file).isSymbolicLink())
      fail(file, "post symlinks are forbidden");
    source = readFileSync(file, "utf8");
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("BLOG:"))
      throw error;
    fail(file, "cannot read post: " + String(error));
  }
  const frontmatter = /^\uFEFF?---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(
    source,
  );
  if (!frontmatter) fail(file, "missing YAML frontmatter");
  const document = parseDocument(frontmatter[1], { uniqueKeys: true });
  if (document.errors.length)
    fail(file, "invalid YAML: " + document.errors[0].message);
  let metadata: unknown;
  try {
    metadata = document.toJS({ maxAliasCount: 20 });
  } catch (error) {
    fail(file, "invalid YAML: " + String(error));
  }
  const parsed = postSchema.safeParse(metadata);
  if (!parsed.success) {
    fail(
      file,
      parsed.error.issues
        .map((issue) => issue.path.join(".") + ": " + issue.message)
        .join("; "),
    );
  }
  const data = parsed.data;
  if (data.draft || data.published > bangkokToday(now)) return undefined;
  guardDates(file, data, now);
  const body = source.slice(frontmatter[0].length).trim();
  const { tree, factIds } = guardBody(file, body, registry);
  const citations = [...data.citations];
  for (const citation of factCitations(factIds, registry, locale, now)) {
    if (!citations.some((existing) => existing.url === citation.url))
      citations.push(citation);
  }
  const published = bangkokMidnight(data.published).getTime();
  const reviewed = bangkokMidnight(data.reviewed ?? data.published).getTime();
  return Object.freeze({
    slug,
    path: "/blog/" + slug + "/",
    file,
    title: data.title,
    description: data.description,
    kind: data.kind,
    query: data.query,
    cluster: data.cluster,
    source: data.source,
    get published() {
      return new Date(published);
    },
    get reviewed() {
      return new Date(reviewed);
    },
    reviewedLabel: reviewedLabel(new Date(reviewed), locale),
    newsDate: data.newsDate,
    summary: data.summary,
    faq: Object.freeze(data.faq.map((item) => Object.freeze(item))),
    citations: Object.freeze(citations.map((item) => Object.freeze(item))),
    hero: data.hero ? Object.freeze(data.hero) : undefined,
    videos: Object.freeze(
      data.videos.map((video) =>
        Object.freeze({
          ...video,
          embedUrl:
            "https://www.youtube-nocookie.com/embed/" + videoId(video.url),
        }),
      ),
    ),
    headings: Object.freeze(
      headingsFromTree(tree).map((heading) => Object.freeze(heading)),
    ),
    readingMinutes: readingMinutes(body, locale),
    body,
  });
}

export function loadPosts(config: BlogConfig): readonly Post[] {
  const root = path.resolve(config.contentDir);
  if (!path.isAbsolute(config.contentDir))
    fail(config.contentDir, "contentDir must be absolute");
  let names: string[];
  try {
    if (realpathSync(root) !== root)
      fail(root, "contentDir cannot resolve outside its explicit root");
    names = readdirSync(root)
      .filter((name) => /\.mdx$/i.test(name))
      .sort();
  } catch (error) {
    if (error instanceof Error && error.message.startsWith("BLOG:"))
      throw error;
    fail(root, "cannot read content directory: " + String(error));
  }
  if (names.length === 0) fail(root, "content directory has no MDX posts");
  const posts = names
    .map((name) =>
      parsePostFile(path.join(root, name), {
        now: config.now,
        locale: config.site.locale,
        facts: config.facts,
      }),
    )
    .filter((post): post is Post => Boolean(post));
  guardDuplicates(posts);
  const paths = posts.map((post) => post.path);
  for (const post of posts) {
    guardSnippet(
      post.file,
      post.title,
      post.description,
      config.site.titleSuffix,
    );
    const { tree } = guardBody(
      post.file,
      post.body,
      config.facts ?? snapshotFacts(),
    );
    guardLinks(post, tree, config, paths);
  }
  return Object.freeze(
    posts.sort(
      (left, right) =>
        right.published.getTime() - left.published.getTime() ||
        left.slug.localeCompare(right.slug),
    ),
  );
}
