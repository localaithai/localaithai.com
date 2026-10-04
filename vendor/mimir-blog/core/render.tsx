import { evaluate } from "@mdx-js/mdx";
import type { ReactNode } from "react";
import * as runtime from "react/jsx-runtime";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import type { FactRegistry } from "../facts";
import { fact } from "./facts";
import { fail, guardBody } from "./guards";
import type { BlogComponents, Post } from "./index";

export type CalloutProps = { children?: ReactNode; title?: string };
export type FigureProps = {
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  sourceUrl?: string;
};

function Callout({ children, title }: CalloutProps) {
  return (
    <aside>
      {title ? (
        <p>
          <strong>{title}</strong>
        </p>
      ) : null}
      {children}
    </aside>
  );
}

function Figure({ src, alt, caption, credit, sourceUrl }: FigureProps) {
  return (
    <figure>
      <img src={src} alt={alt} />
      {caption || credit ? (
        <figcaption>
          {caption}
          {caption && credit ? " · " : ""}
          {sourceUrl ? <a href={sourceUrl}>{credit}</a> : credit}
        </figcaption>
      ) : null}
    </figure>
  );
}

export async function renderPost(
  post: Post,
  registry: FactRegistry,
  components: BlogComponents = {},
) {
  guardBody(post.file, post.body, registry);
  try {
    const module = await evaluate(
      { value: post.body, path: post.file },
      {
        ...runtime,
        development: false,
        remarkPlugins: [remarkGfm],
        rehypePlugins: [rehypeSlug],
      },
    );
    const Fact = ({ id }: { id: string }) => {
      const entry = fact(id, registry);
      return (
        <>
          {entry.value}
          {entry.unit ? " " + entry.unit : ""}
        </>
      );
    };
    return (
      <module.default components={{ Callout, Figure, ...components, Fact }} />
    );
  } catch (error) {
    fail(
      post.file,
      "MDX compilation failed: " +
        (error instanceof Error ? error.message : String(error)),
    );
  }
}
