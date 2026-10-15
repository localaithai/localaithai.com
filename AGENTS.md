# localaithai.com

Static Astro 7 site for localaithai.com, the Local AI line's Thai selling door and the namesake of the `localaithai` GitHub org. It sells the Local edition: Mimir Suites on an AI machine at the customer's site. React ships only as client islands. `CLAUDE.md` is a symlink to this file.

## Quick reference

- Package manager: `pnpm@10.17.1` (`pnpm-lock.yaml` is the committed lockfile)
- Develop: `pnpm dev` at `http://localhost:19009`; `pnpm preview` serves the built `dist/` on the same port
- Verification: `pnpm lint && pnpm typecheck && pnpm build` (static build writes `dist/`)
- No test suite. `astro check` is the type gate.
- Source lives under `src/`: pages and endpoints in `src/pages/`, layouts in `src/layouts/`, components in `src/components/`, CSS in `src/styles/`; `@/*` maps to `./src/*`. `remotion/` is separate video tooling, excluded from the Astro build and typecheck.
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
- `src/lib/site.ts` holds the origin, name, title, description and page data. Some brand values still live inline in `src/layouts/Base.astro` (keywords, theme colour), `src/lib/structured-data.ts` (email) and components. Do not add another copy. When you touch them, centralise into `src/lib/site.ts` as the sibling sites do.
- Fully static build (`output: "static"`, `trailingSlash: "never"`, `build.format: "preserve"` in `astro.config.ts`) deployed to Vercel with `vercel.json` (`framework: "astro"`, `cleanUrls: true`, so `/hardware` serves `hardware.html`). Pages keep slashless URLs; the blog keeps its folder URLs (`/blog/`, `/blog/<slug>/`); the folder, the GitHub repo under the `localaithai` org, and the Vercel project all use the full domain name. The Vercel project lives in the **LocalAIThai** team (slug `local-ait-hai`), is named `localaithai.com`, and is git-connected so every push to `main` deploys to production (`vercel --prod` from a clone still works with `--scope local-ait-hai`). No adapter, API routes, middleware or request-time rendering: `robots.txt`, `sitemap.xml`, `llms.txt`, `manifest.webmanifest` and `blog/feed.xml` are prerendered endpoints under `src/pages/`.
- Contact channels (email, LINE, phone) and the lead form come from omni's `cta.js` through `data-cta` attributes; never hardcode them in components. Keep every `data-cta` element in `.astro` markup, never inside a hydrated React island: `cta.js` rewrites that DOM after load and a later hydration would render over it.
- Pages, layouts and static sections are `.astro`. A component stays a React island only when it needs client state or a React-only library (framer-motion, sonner, the canvas animations). Every framer-motion island exports through `withMotionConfig` (`src/components/motion-config.tsx`) so `reducedMotion="user"` applies per island. Pass `className`, not `class`, to React components.
- Primary CTA is "Request a Demo" into the contact section. "Visit Mimir Suites" is never the primary CTA; "Powered by Mimir Suites" is fine.
- The footer carries no operator line until the operating entity is named. Render nothing, never a placeholder.
- Tool and vendor names on the tech-stack page identify genuine components inside our offer, never our identity.
- Copy is Thai-first with English technical nouns inline (GPU, RAG, PDPA, LLM). Keep Thai line heights.
- TypeScript is strict; do not weaken types or add broad suppressions.
- Preserve WCAG 2.2 AA behavior: semantic structure, keyboard access, visible focus, contrast, touch targets and reduced motion.

## Shared image assets

- Browser-loaded content images use immutable URLs from `https://assets.mimir.business/assets/` through `src/lib/assets.ts` in both development and production. Do not add local URL fallbacks.
- Keep favicons, manifest icons, social cards, and structured-data identity images on this site origin because crawlers may omit the `Referer` header required by the asset-host WAF rule.
- Add or replace shared images through the `assets.mimir.business` catalogue workflow, then update the generated hash URL in the asset module.
- The asset host catalogue, deployment rules, and decisions live in the `assets.mimir.business` repository.

## Source of truth

- No `docs/` yet. Multi-session work starts a plan in `docs/central-plan/`; settled decisions go to `docs/decisions/`.
- Business strategy, brand architecture and domain briefs: `../../business/`

## Documentation lifecycle

- Production code, executable configuration, and meaningful tests define implemented behavior. Agreed product and business requirements define the behavior changes must satisfy; investigate any mismatch.
- Multi-session work belongs in `docs/central-plan/CENTRAL_PLAN_<feature>.html`. Preserve the settled design, ordered file and symbol changes, edge cases, tests, commands, progress, and exact resume point, then archive the plan after delivery.
- `docs/decisions/<domain>/log-YYYY-MM-DD.md` preserves selective durable rationale. Routine changes need no decision record.
- Former domain summary pages under `docs/decisions/` are historical snapshots and navigation aids. Assess their content when that domain is next changed; keep dated logs and links intact.
- Update maintained documentation only when a change affects one of its claims. Do not create empty documentation folders.
