import path from "node:path";
import { type BlogSite, createBlog, type Post } from "@mimir/blog";
import { ORG_ID, WEBSITE_ID } from "@/components/seo";
import { SOCIAL_IMAGE, TITLE_SUFFIX } from "@/lib/seo";
import { blogIndex, SITE_NAME, SITE_URL, STATIC_ROUTES } from "@/lib/site";

const normalizePath = (route: string) =>
  route === "" || route === "/" ? "/" : `${route.replace(/\/+$/, "")}/`;
export const blogSite: BlogSite = {
  url: SITE_URL,
  name: SITE_NAME,
  locale: "th",
  titleSuffix: TITLE_SUFFIX,
  orgId: ORG_ID,
  siteId: WEBSITE_ID,
};
export const blog = createBlog({
  site: blogSite,
  contentDir: path.resolve(process.cwd(), "content/blog"),
  knownPaths: STATIC_ROUTES.map(({ path }) => normalizePath(path)),
  moneyPaths: [
    "/hardware/",
    "/services/",
    "/how-it-works/",
    "/tech-stack/",
    "/support/",
  ],
  index: blogIndex,
});
export const orderedBlogPosts = [...blog.posts()].sort(
  (left, right) =>
    right.published.getTime() - left.published.getTime() ||
    (right.newsDate ?? "").localeCompare(left.newsDate ?? "") ||
    left.slug.localeCompare(right.slug),
);
export function blogPostImage(post: Post): string {
  return post.hero
    ? `${blogSite.url}/blog-media/${path.basename(new URL(post.hero.src).pathname)}`
    : new URL(SOCIAL_IMAGE.url, blogSite.url).href;
}
