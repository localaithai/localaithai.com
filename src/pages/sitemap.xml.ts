import type { APIRoute } from "astro";
import { blog } from "@/lib/blog";
import { absoluteUrl, REVIEWED_DATE, STATIC_ROUTES } from "@/lib/site";

export const GET: APIRoute = () => {
  const lastModified = new Date(`${REVIEWED_DATE}T00:00:00+07:00`);
  const entries = [
    ...STATIC_ROUTES.map(({ path, priority }) => ({
      url: absoluteUrl(path),
      lastModified,
      changeFrequency: path === "/" ? "weekly" : "monthly",
      priority,
    })),
    ...blog.sitemapEntries(),
  ];
  const urls = entries.map(
    (entry) =>
      `<url>\n<loc>${entry.url}</loc>\n<lastmod>${entry.lastModified.toISOString()}</lastmod>\n<changefreq>${entry.changeFrequency}</changefreq>\n<priority>${entry.priority}</priority>\n</url>\n`,
  );
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("")}</urlset>\n`;
  return new Response(body, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
};
