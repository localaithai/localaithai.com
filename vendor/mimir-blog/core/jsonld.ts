import { dateIso } from "./dates";
import { fail } from "./guards";
import type { BlogConfig, JsonLdGraph, JsonLdOptions, Post } from "./index";

function breadcrumbs(config: BlogConfig, post?: Post): Record<string, unknown> {
  const base = config.site.url;
  return {
    "@type": "BreadcrumbList",
    "@id": base + (post?.path ?? "/blog/") + "#breadcrumb",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: config.site.locale === "th" ? "หน้าแรก" : "Home",
        item: base + "/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: config.index.navLabel,
        ...(post ? { item: base + "/blog/" } : {}),
      },
      ...(post ? [{ "@type": "ListItem", position: 3, name: post.title }] : []),
    ],
  };
}

export function postJsonLd(
  config: BlogConfig,
  post: Post,
  options?: JsonLdOptions,
): JsonLdGraph {
  const image = options?.imageUrl ?? post.hero?.src;
  if (options?.imageUrl !== undefined) {
    let imageUrl: URL;
    try {
      imageUrl = new URL(options.imageUrl);
    } catch {
      fail(
        post.file,
        "JSON-LD image URL must be absolute HTTPS on the site origin",
      );
    }
    if (imageUrl.protocol !== "https:" || imageUrl.origin !== config.site.url)
      fail(
        post.file,
        "JSON-LD image URL must be absolute HTTPS on the site origin",
      );
  }
  const url = config.site.url + post.path;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "BlogPosting",
      "@id": url + "#article",
      headline: post.title,
      description: post.summary ?? post.description,
      url,
      mainEntityOfPage: { "@id": url },
      inLanguage: config.site.locale,
      datePublished: dateIso(post.published),
      dateModified: dateIso(post.reviewed),
      author: { "@id": config.site.orgId },
      publisher: { "@id": config.site.orgId },
      isPartOf: { "@id": config.site.siteId },
      citation: post.citations.map((citation) => citation.url),
      ...(image ? { image } : {}),
    },
    breadcrumbs(config, post),
  ];
  if (post.faq.length)
    graph.push({
      "@type": "FAQPage",
      "@id": url + "#faq",
      mainEntity: post.faq.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    });
  return { "@context": "https://schema.org", "@graph": graph };
}

export function blogJsonLd(
  config: BlogConfig,
  posts: readonly Post[],
): JsonLdGraph {
  const url = config.site.url + "/blog/";
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Blog",
        "@id": url + "#blog",
        url,
        name: config.index.title,
        description: config.index.description,
        inLanguage: config.site.locale,
        publisher: { "@id": config.site.orgId },
        isPartOf: { "@id": config.site.siteId },
        blogPost: posts.map((post) => ({
          "@id": config.site.url + post.path + "#article",
        })),
      },
      breadcrumbs(config),
    ],
  };
}

export function serializeJsonLd(graph: JsonLdGraph): string {
  return JSON.stringify(graph).replace(/</g, "\\u003c");
}
