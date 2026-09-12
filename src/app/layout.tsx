import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import OmniToaster from "@/components/OmniToaster";
import PageTransition from "@/components/PageTransition";
import { OrganizationJsonLd } from "@/components/seo";
import { assertSnippet, pageSocial } from "@/lib/seo";
import {
  absoluteUrl,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
} from "@/lib/site";

assertSnippet("/", { title: SITE_TITLE, description: SITE_DESCRIPTION });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: "%s | LocalAI Thailand" },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "Local AI Thailand",
    "AI ส่วนตัว",
    "PDPA",
    "Mimir Suites",
    "AI ในองค์กร",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "technology",
  icons: {
    icon: [
      { url: "/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: absoluteUrl(),
    languages: { "th-TH": absoluteUrl() },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ?? "",
    },
  },
  ...pageSocial({
    path: "/",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  }),
};

export const viewport = { themeColor: "#060a14" };

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th" className="scroll-smooth">
      <head>
        <link rel="alternate" type="text/plain" href="/llms.txt" />
      </head>
      <body className="antialiased">
        <OrganizationJsonLd />
        <PageTransition>{children}</PageTransition>
        <OmniToaster />
        <Script
          src="https://localai-omni.vercel.app/cta.js"
          strategy="afterInteractive"
        />
        <Script
          src="https://localai-omni.vercel.app/analytics.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
