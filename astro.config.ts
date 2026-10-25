import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from "astro/config";
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
  build: { format: "preserve", inlineStylesheets: "always" },
  devToolbar: { enabled: false },
  integrations: [react()],
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Space Grotesk",
      cssVariable: "--font-space",
      weights: ["300 700"],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["Arial"],
    },
    {
      provider: fontProviders.google(),
      name: "IBM Plex Sans Thai",
      cssVariable: "--font-plex",
      weights: [300, 400, 500, 600, 700],
      styles: ["normal"],
      subsets: ["thai", "latin"],
    },
    {
      provider: fontProviders.google(),
      name: "JetBrains Mono",
      cssVariable: "--font-jetbrains",
      weights: ["400 600"],
      styles: ["normal"],
      subsets: ["latin"],
    },
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
