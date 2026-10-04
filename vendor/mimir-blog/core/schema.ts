import { z } from "zod";
import { isCalendarDate } from "./dates";

export const calendarDate = z
  .string()
  .refine(isCalendarDate, "Expected a valid YYYY-MM-DD date");
const nonempty = z.string().trim().min(1);
export const httpsUrl = z.string().refine((value) => {
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password;
  } catch {
    return false;
  }
}, "Expected an HTTPS URL");

export function isAssetUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return (
      url.protocol === "https:" &&
      url.hostname === "assets.mimir.business" &&
      !url.port &&
      !url.username &&
      !url.password &&
      !url.search &&
      !url.hash &&
      /^\/assets\/.+\.[a-f0-9]{8,64}\.[a-z0-9]+$/i.test(url.pathname)
    );
  } catch {
    return false;
  }
}

export const assetUrl = z
  .string()
  .refine(isAssetUrl, "Expected an immutable assets.mimir.business URL");

export function videoId(value: string): string | undefined {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password || url.port)
      return;
    const id =
      url.hostname === "youtu.be"
        ? url.pathname.slice(1)
        : ["youtube.com", "www.youtube.com"].includes(url.hostname) &&
            url.pathname === "/watch" &&
            url.searchParams.getAll("v").length === 1
          ? (url.searchParams.get("v") ?? "")
          : "";
    return /^[A-Za-z0-9_-]{11}$/.test(id) ? id : undefined;
  } catch {
    return;
  }
}

const citationSchema = z
  .object({
    title: nonempty,
    url: httpsUrl,
    publisher: nonempty,
    published: calendarDate.optional(),
    accessed: calendarDate,
  })
  .strict();

const heroSchema = z
  .object({
    src: assetUrl,
    alt: nonempty,
    caption: nonempty,
    credit: nonempty,
    sourceUrl: httpsUrl,
  })
  .strict();

const videoSchema = z
  .object({
    url: z
      .string()
      .refine(
        (url) => Boolean(videoId(url)),
        "Expected a YouTube watch URL with an 11-character video ID",
      ),
    title: nonempty,
    publisher: nonempty,
    published: calendarDate,
    context: z.boolean(),
  })
  .strict();

const summarySchema = nonempty.refine(
  (value) => !/[\r\n<>{}]|!\[|\[[^\]]*\]\(|[*_#]/.test(value),
  "Summary must be one line of plain text",
);

export const postSchema = z
  .object({
    title: nonempty,
    description: nonempty,
    kind: z.enum(["guide", "compare", "use-case", "news"]).default("guide"),
    query: nonempty,
    cluster: z.string().regex(/^\/[^?#]*$/, "Cluster must be an internal path"),
    source: z
      .string()
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
      .optional(),
    published: calendarDate,
    reviewed: calendarDate.optional(),
    newsDate: calendarDate.optional(),
    summary: summarySchema.optional(),
    faq: z
      .array(z.object({ question: nonempty, answer: nonempty }).strict())
      .default([]),
    citations: z.array(citationSchema).default([]),
    hero: heroSchema.optional(),
    videos: z.array(videoSchema).default([]),
    draft: z.boolean().default(false),
  })
  .strict()
  .superRefine((post, context) => {
    const issue = (path: string, message: string) =>
      context.addIssue({ code: "custom", path: [path], message });
    if (post.kind === "compare" && post.citations.length === 0)
      issue("citations", "Compare posts require citations");
    if (post.kind !== "news") return;
    if (!post.newsDate)
      issue("newsDate", "News requires the underlying event date");
    if (!post.summary || !/\p{Script=Thai}/u.test(post.summary))
      issue("summary", "News requires a plain-text Thai direct-answer summary");
    if (new Set(post.citations.map((citation) => citation.url)).size < 2)
      issue("citations", "News requires at least two distinct citations");
    if (post.citations.some((citation) => !citation.published))
      issue("citations", "News citations require source publication dates");
    if (!post.hero) issue("hero", "News requires a credited hero image");
    if (post.videos.length === 0)
      issue("videos", "News requires an official related video");
  });

export type Frontmatter = z.infer<typeof postSchema>;
