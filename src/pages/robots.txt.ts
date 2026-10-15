import type { APIRoute } from "astro";
import { isProductionDeployment, SITE_URL } from "@/lib/site";

const AI_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "CCBot",
  "meta-externalagent",
];

const PRIVATE_PATHS: string[] = [];

type Rule = { userAgent: string[]; allow?: string; disallow: string[] };

function group({ userAgent, allow, disallow }: Rule): string {
  return [
    ...userAgent.map((agent) => `User-Agent: ${agent}`),
    ...(allow ? [`Allow: ${allow}`] : []),
    ...disallow.map((path) => `Disallow: ${path}`),
  ]
    .map((line) => `${line}\n`)
    .join("");
}

function body(): string {
  // Preview deployments must never be indexed.
  if (!isProductionDeployment()) {
    return group({ userAgent: ["*"], disallow: ["/"] });
  }
  const rules: Rule[] = [
    { userAgent: ["*"], allow: "/", disallow: PRIVATE_PATHS },
    { userAgent: AI_CRAWLERS, allow: "/", disallow: PRIVATE_PATHS },
  ];
  return `${rules.map(group).join("\n")}\nSitemap: ${SITE_URL}/sitemap.xml\n`;
}

export const GET: APIRoute = () =>
  new Response(body(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
