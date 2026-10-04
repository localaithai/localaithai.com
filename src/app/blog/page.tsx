import { serializeJsonLd } from "@mimir/blog";
import type { Metadata } from "next";
import { BlogIndex } from "@/components/blog/blog-index";
import { blog, blogSite, orderedBlogPosts } from "@/lib/blog";
import { assertSnippet, SOCIAL_IMAGE } from "@/lib/seo";
import { blogIndex } from "@/lib/site";

const title = blogIndex.title + blogSite.titleSuffix;
const url = blogSite.url + "/blog/";
const image = new URL(SOCIAL_IMAGE.url, blogSite.url).href;
assertSnippet("/blog/", { title, description: blogIndex.description });
export const metadata: Metadata = {
  title: { absolute: title },
  description: blogIndex.description,
  alternates: { canonical: url },
  openGraph: {
    type: "website",
    url,
    title,
    description: blogIndex.description,
    siteName: blogSite.name,
    locale: "th_TH",
    images: [{ url: image, width: 1200, height: 630, alt: blogIndex.title }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description: blogIndex.description,
    images: [image],
  },
};
export default function BlogPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(blog.indexJsonLd()),
        }}
      />
      <BlogIndex
        posts={orderedBlogPosts}
        siteName={blogSite.name}
        indexTitle={blogIndex.title}
        indexDescription={blogIndex.description}
      />
    </>
  );
}
