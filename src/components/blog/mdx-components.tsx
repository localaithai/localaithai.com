// biome-ignore-all lint/a11y/noNoninteractiveTabindex: Keyboard users need focus to scroll wide tables.
import type { BlogComponents, CalloutProps, FigureProps } from "@mimir/blog";
import type { ComponentPropsWithoutRef } from "react";

function Callout({ children, title }: CalloutProps) {
  return (
    <aside className="mimir-blog-callout">
      {title ? <p className="mimir-blog-callout-title">{title}</p> : null}
      {children}
    </aside>
  );
}

function Figure({ src, alt, caption, credit, sourceUrl }: FigureProps) {
  return (
    <figure className="mimir-blog-figure">
      <img src={src} alt={alt} width={1200} height={675} loading="lazy" />
      {caption || credit || sourceUrl ? (
        <figcaption className="mimir-blog-caption">
          {caption ? <span>{caption}</span> : null}
          {credit ? <span>ภาพ: {credit}</span> : null}
          {sourceUrl ? <a href={sourceUrl}>แหล่งที่มาของภาพ</a> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}

function Table(props: ComponentPropsWithoutRef<"table">) {
  return (
    <section
      className="mimir-blog-table-scroll"
      aria-label="ตารางข้อมูล เลื่อนได้ในแนวนอน"
      tabIndex={0}
    >
      <table {...props} />
    </section>
  );
}

export const mdxComponents = {
  Callout,
  Figure,
  table: Table,
} satisfies BlogComponents;
