# localaithai.com

Static Next.js 16 site for localaithai.com, the Local AI line's Thai selling door and the namesake of the `localaithai` GitHub org. It sells the Local edition: Mimir Suites on an AI machine at the customer's site. `CLAUDE.md` is a symlink to this file.

## Quick reference

- Package manager: `pnpm@10.17.1` (`pnpm-lock.yaml` is the committed lockfile)
- Develop: `pnpm dev` at `http://localhost:3009`
- Verification: `pnpm lint && pnpm build` (static export writes `out/`)
- No typecheck script and no test suite. `next build` is the type gate.
- Source lives under `src/` (`src/app`, `src/components`); `@/*` maps to `./src/*`.
- Hero frame sequences in `public/frames`, `public/frames-mobile` and `public/frames-jarvis` are rendered from the Remotion compositions in `remotion/`. Rerender with `remotion/render-frames.mts` (optional argument `main` or `jarvis`); never hand-edit frames.
- Before changing routes, navigation, headings, metadata, copy, internal links, structured data, robots, sitemap, or `llms.txt`, read [SEO, AEO, and sitelink maintenance](docs/reference/seo-aeo-maintenance.md).

## Business context

Before writing copy, CTAs, footer disclosures, or cross-links, read:

- Brand rules every site obeys: `../../business/brand-architecture.md`
- This domain's brief (positioning, CTA, open items): `../../business/domains/localaithai.com.md`
- The Local AI line decision: `../../business/docs/decisions/brand-architecture/log-2026-09-04.md`
- Lead capture fields and routing: `../../business/leads.md`

## Project rules

- Same offer as `thailocalai.com` and `localaithailand.com` is fine. Copy and design are written for this domain, never pasted from a sibling; separately written is what keeps them apart in search.
- Privacy wording (data never leaves the office, PDPA) belongs to this line. The `/cloud` page and `CloudSection` link to `cloudaithai.com` for the customer who does not need data on-site; that is the one cross-link with genuine user benefit. No "our other companies" blocks.
- The site still lists named packages with prices, which the product decision "no named packages, sizing per deal" contradicts. Resolve before promotion and do not add more named tiers.
- There is no `lib/site.ts` yet; brand values live inline in `src/app/layout.tsx`, `src/app/sitemap.ts` and components. Do not add another copy. When you touch them, centralise into `src/lib/site.ts` as the sibling sites do.
- Fully static export (`output: "export"` in `next.config.ts`) deployed to Vercel; the folder, the GitHub repo under the `localaithai` org, and the Vercel project all use the full domain name. The Vercel project lives in the **LocalAIThai** team (slug `local-ait-hai`), is named `localaithai.com`, and is git-connected so every push to `main` deploys to production (`vercel --prod` from a clone still works with `--scope local-ait-hai`). No API routes, middleware or request-time rendering.
- Contact channels (email, LINE, phone) and the lead form come from omni's `cta.js` through `data-cta` attributes; never hardcode them in components.
- Primary CTA is "Request a Demo" into the contact section. "Visit Mimir Suites" is never the primary CTA; "Powered by Mimir Suites" is fine.
- The footer carries no operator line until the operating entity is named. Render nothing, never a placeholder.
- Tool and vendor names on the tech-stack page identify genuine components inside our offer, never our identity.
- Copy is Thai-first with English technical nouns inline (GPU, RAG, PDPA, LLM). Keep Thai line heights.
- TypeScript is strict; do not weaken types or add broad suppressions.
- Preserve WCAG 2.2 AA behavior: semantic structure, keyboard access, visible focus, contrast, touch targets and reduced motion.

## Shared image assets

- Browser-loaded content images use immutable URLs from `https://assets.mimir.business/assets/` through `lib/assets.ts` (or `src/lib/assets.ts`) in both development and production. Do not add local URL fallbacks.
- Keep favicons, manifest icons, social cards, and structured-data identity images on this site origin because crawlers may omit the `Referer` header required by the asset-host WAF rule.
- Add or replace shared images through the `assets.mimir.business` catalogue workflow, then update the generated hash URL in the asset module.
- The asset host catalogue, deployment rules, and decisions live in the `assets.mimir.business` repository.

## Source of truth

- No `docs/` yet. Multi-session work starts a plan in `docs/central-plan/`; settled decisions go to `docs/decisions/`.
- Business strategy, brand architecture and domain briefs: `../../business/`
