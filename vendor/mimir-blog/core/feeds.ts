import { bangkokToday } from "./dates";
import type { BlogConfig, Post, SitemapEntry } from "./index";

export function sitemapEntries(
  config: BlogConfig,
  posts: readonly Post[],
): SitemapEntry[] {
  if (posts.length === 0) return [];
  const reviewed = new Date(
    Math.max(...posts.map((post) => post.reviewed.getTime())),
  );
  return [
    {
      url: config.site.url + "/blog/",
      lastModified: reviewed,
      changeFrequency: "weekly",
      priority: 0.6,
    },
    ...posts.map(
      (post): SitemapEntry => ({
        url: config.site.url + post.path,
        lastModified: new Date(post.reviewed),
        changeFrequency: "monthly",
        priority: 0.5,
      }),
    ),
  ];
}

export function xmlEscape(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&apos;",
      })[character] ?? character,
  );
}

export function rss(config: BlogConfig, posts: readonly Post[]): string {
  const url = config.site.url + "/blog/";
  const element = (name: string, value: string) =>
    "<" + name + ">" + xmlEscape(value) + "</" + name + ">";
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel>',
    element("title", config.index.title),
    element("link", url),
    element("description", config.index.description),
    element("language", config.site.locale),
    '<atom:link href="' +
      xmlEscape(url + "feed.xml") +
      '" rel="self" type="application/rss+xml"/>',
    ...posts.slice(0, 50).map((post) => {
      const canonical = config.site.url + post.path;
      return (
        "<item>" +
        element("title", post.title) +
        element("link", canonical) +
        '<guid isPermaLink="true">' +
        xmlEscape(canonical) +
        "</guid>" +
        element("description", post.summary ?? post.description) +
        element("pubDate", post.published.toUTCString()) +
        "</item>"
      );
    }),
    "</channel></rss>",
  ].join("\n");
}

export function llmsSection(
  config: BlogConfig,
  posts: readonly Post[],
): string {
  return [
    "## Articles",
    "",
    ...posts.map(
      (post) =>
        "- [" +
        post.title +
        "](" +
        config.site.url +
        post.path +
        "): " +
        (post.summary ?? post.description) +
        " Reviewed: " +
        bangkokToday(post.reviewed) +
        "." +
        (post.citations.length
          ? " Sources: " +
            post.citations.map((citation) => citation.url).join(", ") +
            "."
          : ""),
    ),
  ].join("\n");
}
