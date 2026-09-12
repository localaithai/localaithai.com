import type { MetadataRoute } from "next";
import { absoluteUrl, REVIEWED_DATE, STATIC_ROUTES } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(`${REVIEWED_DATE}T00:00:00+07:00`);
  return STATIC_ROUTES.map(({ path, priority }) => ({
    url: absoluteUrl(path),
    lastModified,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority,
  }));
}
