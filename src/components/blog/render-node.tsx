import type { ReactNode } from "react";

/**
 * Lets an .astro page print a React tree it already built, such as the MDX
 * body from the vendored blog engine. Used without a client directive, so it
 * renders to static HTML and ships no JS.
 */
export function RenderNode({ node }: { node: ReactNode }) {
  return node;
}
