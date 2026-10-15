import type { APIRoute } from "astro";
import { blog } from "@/lib/blog";

export const GET: APIRoute = () =>
  new Response(blog.rss(), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
