// biome-ignore-all lint/a11y/noNoninteractiveTabindex: Keyboard users need focus to scroll wide tables.
// biome-ignore-all lint/a11y/useHeadingContent: MDX passes the heading text as children.
// biome-ignore-all lint/a11y/useAnchorContent: MDX passes the link text as children.
import type { BlogComponents, CalloutProps, FigureProps } from "@mimir/blog";
import type { ComponentPropsWithoutRef } from "react";
import { focusRing, marker } from "./blog-classes";

const anchorOffset = "scroll-mt-26";

function Callout({ children, title }: CalloutProps) {
  return (
    <aside className="my-8 rounded-[1rem] border border-brand/30 bg-brand-tint px-6 py-5 *:last:mb-0">
      {title ? (
        <p className={`${marker} m-0 mb-1.5 font-bold before:bg-brand`}>{title}</p>
      ) : null}
      {children}
    </aside>
  );
}

function Figure({ src, alt, caption, credit, sourceUrl }: FigureProps) {
  return (
    <figure className="m-0 mt-[clamp(2rem,4vw,3rem)] mb-8 min-w-0">
      <img
        src={src}
        alt={alt}
        width={1200}
        height={675}
        loading="lazy"
        className="block w-full rounded-[1rem] bg-surface"
      />
      {caption || credit || sourceUrl ? (
        <figcaption className="mt-3 flex flex-wrap items-center gap-x-4 text-sm leading-[1.7] text-ink-2">
          {caption ? <span>{caption}</span> : null}
          {credit ? <span>ภาพ: {credit}</span> : null}
          {sourceUrl ? (
            <a
              href={sourceUrl}
              className={`inline-flex min-h-11 items-center text-brand ${focusRing}`}
            >
              แหล่งที่มาของภาพ
            </a>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
}

function Table(props: ComponentPropsWithoutRef<"table">) {
  return (
    <section
      className={`my-8 max-w-full overflow-x-auto rounded-[1rem] border border-line bg-surface ${focusRing}`}
      aria-label="ตารางข้อมูล เลื่อนได้ในแนวนอน"
      tabIndex={0}
    >
      <table
        {...props}
        className="w-full min-w-xl border-collapse text-[0.9375rem] leading-[1.7] [&:not(:has(tr>:nth-child(3)))]:min-w-0"
      />
    </section>
  );
}

export const mdxComponents = {
  Callout,
  Figure,
  table: Table,
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      {...props}
      className={`mt-12 mb-4 font-display text-[clamp(1.375rem,1.2rem+0.8vw,1.875rem)] leading-[1.5] font-[650] tracking-[-0.005em] text-balance ${anchorOffset}`}
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      {...props}
      className={`mt-9 mb-3 font-display text-[clamp(1.1875rem,1.1rem+0.35vw,1.375rem)] leading-[1.55] font-semibold text-balance ${anchorOffset}`}
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p {...props} className="mt-0 mb-5.5 text-pretty" />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul
      {...props}
      className="mt-0 mb-5.5 list-disc ps-5.5 text-pretty marker:text-brand"
    />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      {...props}
      className="mt-0 mb-5.5 list-decimal ps-5.5 text-pretty marker:font-semibold marker:text-ink-2 marker:tabular-nums"
    />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li {...props} className="not-first:mt-2" />
  ),
  a: (props: ComponentPropsWithoutRef<"a">) => (
    <a
      {...props}
      className={`text-brand underline decoration-brand/45 decoration-1 underline-offset-[0.25em] transition-[text-decoration-color] hover:decoration-current ${focusRing}`}
    />
  ),
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong {...props} className="font-[650]" />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      {...props}
      className="mx-0 my-8 rounded-[1rem] border border-line bg-ink/4 px-6 py-5 text-[1.125em] *:last:mb-0"
    />
  ),
  hr: (props: ComponentPropsWithoutRef<"hr">) => (
    <hr {...props} className="my-12 border-0 border-t border-line" />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      {...props}
      className="rounded-md bg-ink/4 px-1.5 py-0.5 text-[0.875em]"
    />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      {...props}
      className="max-w-full overflow-x-auto rounded-[1rem] border border-line bg-surface px-5 py-4 text-sm [&_code]:bg-transparent [&_code]:p-0"
    />
  ),
  th: (props: ComponentPropsWithoutRef<"th">) => (
    <th
      {...props}
      className="border-b border-line bg-ink/4 px-4.5 py-3.5 text-start align-top text-sm font-bold text-ink"
    />
  ),
  td: (props: ComponentPropsWithoutRef<"td">) => (
    <td
      {...props}
      className="border-t border-line px-4.5 py-3.5 text-start align-top"
    />
  ),
} satisfies BlogComponents;
