import type { APIRoute } from "astro";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const GET: APIRoute = () =>
  new Response(
    JSON.stringify({
      name: `${SITE_NAME}: ${SITE_TAGLINE}`,
      short_name: SITE_NAME,
      description: SITE_TAGLINE,
      start_url: "/",
      display: "standalone",
      background_color: "#060a14",
      theme_color: "#060a14",
      icons: [
        { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
        { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      ],
    }),
    { headers: { "Content-Type": "application/manifest+json" } },
  );
