import type { CSSProperties, ReactNode } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import "./blog.css";

const tokens = {
  "--blog-bg": "#060a14",
  "--blog-surface": "#0c1220",
  "--blog-ink": "#f0f4f8",
  "--blog-muted": "#94a3b8",
  "--blog-border": "#263244",
  "--blog-accent": "#00e5ff",
  "--blog-accent-ink": "#060a14",
  "--blog-tint": "#0c2330",
  "--blog-radius": "16px",
} as CSSProperties;

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <link
        rel="alternate"
        type="application/rss+xml"
        href="/blog/feed.xml"
        title="RSS"
      />
      <Navbar />
      <main id="content" tabIndex={-1} style={{ paddingTop: "5rem" }}>
        <div className="mimir-blog" style={tokens}>
          {children}
        </div>
      </main>
      <Footer />
    </>
  );
}
