import { blog } from "@/lib/blog";
export const dynamic = "force-static";
export function GET() {
  return new Response(blog.rss(), {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
