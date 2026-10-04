import { serializeJsonLd } from "@mimir/blog";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/blog/blog-article";
import { blog, blogPostImage, blogSite, orderedBlogPosts } from "@/lib/blog";
import { assertSnippet } from "@/lib/seo";

export const dynamicParams = false;
export function generateStaticParams() {
  return blog.staticParams();
}
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blog.post(slug);
  if (!post) notFound();
  const title = post.title + blogSite.titleSuffix;
  const url = blogSite.url + post.path;
  const image = blogPostImage(post);
  assertSnippet(post.path, { title, description: post.description });
  return {
    title: { absolute: title },
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title,
      description: post.description,
      siteName: blogSite.name,
      locale: "th_TH",
      publishedTime: post.published.toISOString(),
      modifiedTime: post.reviewed.toISOString(),
      images: [{ url: image, alt: post.hero?.alt ?? post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.description,
      images: [image],
    },
  };
}
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = blog.post(slug);
  if (!post) notFound();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: serializeJsonLd(
            blog.jsonLd(post, { imageUrl: blogPostImage(post) }),
          ),
        }}
      />
      <BlogArticle
        blog={blog}
        post={post}
        siteName={blogSite.name}
        ctaLabel={"ขอสาธิต AI ส่วนตัว"}
        ctaHref={"/contact/"}
        relatedPosts={orderedBlogPosts
          .filter(
            (candidate) =>
              candidate.slug !== post.slug &&
              candidate.cluster === post.cluster,
          )
          .slice(0, 2)}
      />
    </>
  );
}
