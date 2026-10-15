import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { SITE_URL } from "./src/lib/site";

// Static output deployed to Vercel (vercel.json: cleanUrls serves /route from
// route.html). No API routes, no middleware, no request-time rendering: every
// endpoint under src/pages/ is prerendered at build time.
export default defineConfig({
  site: SITE_URL,
  output: "static",
  // Pages keep the slashless URLs of the Next.js export (/hardware), while the
  // blog keeps its directory URLs (/blog/, /blog/<slug>/). "preserve" writes
  // hardware.astro to hardware.html and blog/index.astro to blog/index.html.
  trailingSlash: "ignore",
  build: { format: "preserve" },
  devToolbar: { enabled: false },
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
