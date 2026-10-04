import GithubSlugger from "github-slugger";
import type { Heading } from "./index";

export type MarkdownNode = {
  type: string;
  value?: string;
  url?: string;
  depth?: number;
  name?: string | null;
  identifier?: string;
  children?: MarkdownNode[];
  attributes?: { type: string; name?: string; value?: unknown }[];
};

export function walk(
  node: MarkdownNode,
  visit: (node: MarkdownNode) => void,
): void {
  visit(node);
  for (const child of node.children ?? []) walk(child, visit);
}

export function nodeText(node: MarkdownNode): string {
  return node.value ?? (node.children ?? []).map(nodeText).join("");
}

export function headingsFromTree(tree: MarkdownNode): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  walk(tree, (node) => {
    if (node.type !== "heading") return;
    const text = nodeText(node);
    const id = slugger.slug(text);
    if (node.depth === 2 || node.depth === 3)
      headings.push({ depth: node.depth, text, id });
  });
  return headings;
}

export function plainText(body: string): string {
  return body
    .replace(/~~~[\s\S]*?~~~/g, " ")
    .replace(/\x60{3}[\s\S]*?\x60{3}/g, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/!\[([^\]]*)\]\[[^\]]*\]/g, "$1")
    .replace(/\[[^\]]+\]:\s*\S+/g, " ")
    .replace(/[#*_\x60>|{}]/g, " ");
}

export function words(body: string, locale: "th" | "en" = "th"): string[] {
  return [
    ...new Intl.Segmenter(locale, { granularity: "word" }).segment(
      plainText(body),
    ),
  ]
    .filter((segment) => segment.isWordLike)
    .map((segment) => segment.segment.toLocaleLowerCase(locale));
}

export function readingMinutes(body: string, locale: "th" | "en"): number {
  return Math.max(1, Math.ceil(words(body, locale).length / 200));
}

export function shingles(body: string): Set<string> {
  const tokens = words(body);
  const result = new Set<string>();
  for (let index = 0; index <= tokens.length - 5; index += 1) {
    result.add(tokens.slice(index, index + 5).join("\u0000"));
  }
  return result;
}

export function jaccard(left: Set<string>, right: Set<string>): number {
  if (left.size === 0 && right.size === 0) return 0;
  let intersection = 0;
  for (const item of left) if (right.has(item)) intersection += 1;
  return intersection / (left.size + right.size - intersection);
}
