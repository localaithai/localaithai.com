import type { MDXComponents } from "mdx/types";
import type { ReactElement } from "react";
import type { FactRegistry } from "../facts";
import { snapshotFacts } from "./facts";
import * as feeds from "./feeds";
import { canonicalPath, fail, guardSnippet } from "./guards";
import { blogJsonLd, postJsonLd } from "./jsonld";
import { loadPosts } from "./load";
import { renderPost } from "./render";

export type { Fact, FactRegistry } from "../facts";
export { defineFacts } from "../facts";
export { serializeJsonLd } from "./jsonld";
export { parsePostFile } from "./load";
export type { CalloutProps, FigureProps } from "./render";

export type BlogComponents = MDXComponents;
export type FAQ = { question: string; answer: string };
export type Heading = { depth: 2 | 3; text: string; id: string };
export type Citation = {
  title: string;
  url: string;
  publisher: string;
  published?: string;
  accessed: string;
};
export type BlogHero = {
  src: string;
  alt: string;
  caption: string;
  credit: string;
  sourceUrl: string;
};
export type BlogVideo = {
  url: string;
  title: string;
  publisher: string;
  published: string;
  context: boolean;
  embedUrl: string;
};
export type JsonLdGraph = {
  "@context": "https://schema.org";
  "@graph": Record<string, unknown>[];
};
export type JsonLdOptions = { imageUrl?: string };
export type SitemapEntry = {
  url: string;
  lastModified: Date;
  changeFrequency: "weekly" | "monthly";
  priority: number;
};
export type BlogSite = {
  url: string;
  name: string;
  locale: "th" | "en";
  titleSuffix: string;
  orgId: string;
  siteId: string;
};
export type BlogConfig = {
  site: BlogSite;
  contentDir: string;
  knownPaths: readonly string[];
  moneyPaths: readonly string[];
  index: { title: string; description: string; navLabel: string };
  now?: Date;
  facts?: FactRegistry;
};
export type Post = {
  slug: string;
  path: string;
  file: string;
  title: string;
  description: string;
  kind: "guide" | "compare" | "use-case" | "news";
  query: string;
  cluster: string;
  source?: string;
  published: Date;
  reviewed: Date;
  reviewedLabel: string;
  newsDate?: string;
  summary?: string;
  faq: readonly FAQ[];
  citations: readonly Citation[];
  hero?: BlogHero;
  videos: readonly BlogVideo[];
  headings: readonly Heading[];
  readingMinutes: number;
  body: string;
};
export type Blog = {
  posts(): readonly Post[];
  post(slug: string): Post | undefined;
  staticParams(): { slug: string }[];
  indexRoute(): { path: "/blog/"; title: string; description: string };
  postRoute(post: Post): { path: string; title: string; description: string };
  jsonLd(post: Post, options?: JsonLdOptions): JsonLdGraph;
  indexJsonLd(): JsonLdGraph;
  sitemapEntries(): SitemapEntry[];
  llmsSection(): string;
  rss(): string;
  render(post: Post, components?: BlogComponents): Promise<ReactElement>;
};

export function createBlog(input: BlogConfig): Blog {
  const config: BlogConfig = Object.freeze({
    ...input,
    site: Object.freeze({ ...input.site }),
    index: Object.freeze({ ...input.index }),
    knownPaths: Object.freeze([...input.knownPaths]),
    moneyPaths: Object.freeze([...input.moneyPaths]),
    facts: snapshotFacts(input.facts),
    now: new Date(input.now ?? Date.now()),
  });
  let origin: URL;
  try {
    origin = new URL(config.site.url);
  } catch {
    fail(
      config.contentDir,
      "site URL must be an HTTPS origin without trailing slash",
    );
  }
  if (origin.origin !== config.site.url || origin.protocol !== "https:")
    fail(
      config.contentDir,
      "site URL must be an HTTPS origin without trailing slash",
    );
  if (
    origin.hostname === "mimir.business" ||
    origin.hostname === "www.mimir.business"
  )
    fail(config.contentDir, "mimir.business is not a blog consumer");
  const known = new Set(config.knownPaths.map(canonicalPath));
  if (config.moneyPaths.some((path) => !known.has(canonicalPath(path))))
    fail(config.contentDir, "moneyPaths must be a subset of knownPaths");
  guardSnippet(
    config.contentDir,
    config.index.title,
    config.index.description,
    config.site.titleSuffix,
  );
  const posts = loadPosts(config);
  const bySlug = new Map(posts.map((post) => [post.slug, post]));
  const requirePost = (post: Post) => {
    if (bySlug.get(post.slug) !== post)
      fail(post.file, "post does not belong to this blog snapshot");
  };
  return Object.freeze({
    posts: () => posts,
    post: (slug: string) => bySlug.get(slug),
    staticParams: () => posts.map((post) => ({ slug: post.slug })),
    indexRoute: () => ({
      path: "/blog/" as const,
      title: config.index.title,
      description: config.index.description,
    }),
    postRoute: (post: Post) => {
      requirePost(post);
      return {
        path: post.path,
        title: post.title,
        description: post.description,
      };
    },
    jsonLd: (post: Post, options?: JsonLdOptions) => {
      requirePost(post);
      return postJsonLd(config, post, options);
    },
    indexJsonLd: () => blogJsonLd(config, posts),
    sitemapEntries: () => feeds.sitemapEntries(config, posts),
    llmsSection: () => feeds.llmsSection(config, posts),
    rss: () => feeds.rss(config, posts),
    render: async (post: Post, components?: BlogComponents) => {
      requirePost(post);
      return renderPost(post, config.facts ?? {}, components);
    },
  });
}
