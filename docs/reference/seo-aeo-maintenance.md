# SEO, AEO, and sitelink maintenance

Read this before changing routes, navigation, headings, metadata, copy, internal links, structured data, robots, the sitemap, or `llms.txt`.

## Sources of truth

`src/lib/site.ts` holds settled site facts. Route components and `src/lib/seo.ts` create route metadata. `src/app/robots.ts`, `src/app/sitemap.ts`, and `src/app/llms.txt` publish crawler surfaces. Keep the origin and content facts centralized when touching these files.

Keep one canonical origin and one canonical URL for every indexable page. Do not create a second source for these facts.

## Page and crawler rules

- Keep important copy server-rendered in HTML. Give each indexable page one H1, a direct-answer opening, a unique title with the page name first, and a distinct useful description.
- Keep canonical, Open Graph, and Twitter metadata complete. Match visible breadcrumbs to the emitted `BreadcrumbList`.
- Use real internal `<a href>` links. Keep `robots.txt`, the sitemap, and `llms.txt` complete and consistent with the public route inventory.
- Make visible facts match JSON-LD. Never emit schema for content users cannot see.

## AEO rules

Lead with quotable answer text. State facts, product tier, scope, and limitations explicitly. When a settled fact changes, update the Facts section of `llms.txt`. Do not rely on client-only copy or hidden schema to explain the offer.

## Google sitelinks

Google chooses sitelinks automatically. Preserve eligibility by keeping at least six substantive indexed pages with distinct user jobs.

Every candidate page must be one click from the root through real header or footer anchors present on every page. Use the same short page name in navigation, the leading title segment, H1, visible breadcrumb, and `BreadcrumbList`. Give every candidate a distinct description of roughly 60 to 90 characters.

Do not create thin pages to reach the count. Do not add `SiteNavigationElement` or a `WebSite` `SearchAction`.

## Change checklist

1. Update centralized route data and the shared header and footer.
2. Update metadata, canonical URL, social metadata, H1, direct answer, breadcrumb, and matching schema.
3. Update sitemap, robots, and `llms.txt`. Change the reviewed date only when content changed.
4. Run this project's verification. Preserve `scripts/seo-audit.mjs` byte-identically where the repository already marks it vendored.
5. After deployment, run `pnpm seo:audit` and fetch the live canonical origin. A merge or build is not production verification.
6. The post-deploy owner submits the sitemap and requests indexing in Search Console, then reviews brand queries and sitelinks monthly.


