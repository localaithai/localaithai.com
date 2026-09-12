import Link from "next/link";
import { PAGES, type SitelinkPage } from "@/lib/site";

export function SitelinkTrail({ page }: { page: SitelinkPage }) {
  const route = PAGES[page];
  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="mx-auto max-w-7xl px-6 pt-6 text-sm text-[#94a3b8]"
      >
        <ol className="flex items-center gap-2">
          <li>
            <Link href="/" className="hover:text-[#00e5ff]">
              Home
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-[#f0f4f8]">
            {route.label}
          </li>
        </ol>
      </nav>
      <h1 className="sr-only">{route.label}</h1>
    </>
  );
}
