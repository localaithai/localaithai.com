#!/usr/bin/env node
/**
 * seo-audit.mjs: fetch a LIVE origin and check what crawlers actually see.
 *
 *   node seo-audit.mjs https://example.com
 *   node seo-audit.mjs https://example.com --paths=/,/pricing,/blog
 *   node seo-audit.mjs https://example.com --ua=googlebot
 *   node seo-audit.mjs https://example.com --ai-bots --max=40 --json
 *   node seo-audit.mjs https://example.com --trail-roots=/,/home
 *
 * --trail-roots lists the pages that sit at the top of the site's breadcrumb
 * hierarchy (default: "/"). Those pages are exempt from the BreadcrumbList
 * check: a one-item trail says nothing, and putting a trail on the page every
 * other trail starts from claims two competing hierarchies. In a multi-zone
 * setup where marketing lives under /home, pass --trail-roots=/,/home.
 *
 * Zero dependencies, Node 18+. With no --paths it audits every URL in the
 * sitemap(s) named by robots.txt (or /sitemap.xml), capped by --max (default 25).
 *
 * Point it at PRODUCTION. Against a dev or preview server, robots correctly
 * says `Disallow: /` and canonicals correctly name production, so that half is
 * red by design; the per-page half (title, description, og:image, JSON-LD)
 * still reads true.
 *
 * A 403 under --ua=googlebot is usually a bot-managing CDN refusing an
 * unverified IP, but the same rule mis-scoped would block the real crawler.
 *
 * Exit code 1 if anything failed.
 */

const AI_CRAWLERS = [
  "GPTBot", "OAI-SearchBot", "ChatGPT-User",
  "ClaudeBot", "Claude-SearchBot", "Claude-User",
  "PerplexityBot", "Perplexity-User",
  "Google-Extended", "CCBot", "meta-externalagent",
];
const BROWSER_UA =
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";
const GOOGLEBOT_UA =
  "Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)";
const TITLE_MAX = 60;
const DESCRIPTION_MAX = 160;

const args = process.argv.slice(2);
const flag = (name) => args.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
const has = (name) => args.includes(`--${name}`);
const originArg = args.find((a) => !a.startsWith("--"));
if (!originArg) {
  console.error("usage: node seo-audit.mjs <origin> [--paths=/a,/b] [--trail-roots=/,/home] [--ua=googlebot] [--ai-bots] [--max=N] [--json]");
  process.exit(2);
}
const origin = originArg.replace(/\/+$/, "");
const userAgent = flag("ua") === "googlebot" ? GOOGLEBOT_UA : BROWSER_UA;
const explicitPaths = flag("paths")?.split(",").map((p) => p.trim()).filter(Boolean);
const maxPages = Number(flag("max") ?? 25);
const wantAiBots = has("ai-bots");
const asJson = has("json");
const trailRoots = new Set((flag("trail-roots") ?? "/").split(",").map((p) => p.trim()).filter(Boolean));

const results = [];
let failures = 0;
function check(ok, label, detail = "") {
  if (!ok) failures++;
  results.push({ ok, label, detail });
  if (!asJson) {
    const mark = ok ? "\x1b[32mPASS\x1b[0m" : "\x1b[31mFAIL\x1b[0m";
    console.log(`${mark}  ${label}${detail ? `\n        ${detail}` : ""}`);
  }
}
function section(title) {
  if (!asJson) console.log(`\n── ${title}`);
}

async function get(pathOrUrl) {
  const url = pathOrUrl.startsWith("http") ? pathOrUrl : `${origin}${pathOrUrl}`;
  try {
    const res = await fetch(url, { headers: { "user-agent": userAgent }, redirect: "manual" });
    const body = res.status >= 300 && res.status < 400 ? "" : await res.text();
    return { url, res, body, error: null };
  } catch (error) {
    return { url, res: null, body: "", error };
  }
}

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
function decode(text) {
  return text
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m);
}
function metas(html, key) {
  const re = new RegExp(`<meta[^>]+(?:property|name)=["']${key}["'][^>]*>`, "gi");
  return (html.match(re) ?? []).flatMap((tag) => {
    const m = tag.match(/content=["']([^"']*)["']/i);
    return m ? [decode(m[1])] : [];
  });
}
const titleOf = (html) => decode(html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] ?? "").trim();
const canonicalOf = (html) =>
  html.match(/<link[^>]+rel=["']canonical["'][^>]*>/i)?.[0]?.match(/href=["']([^"']*)["']/i)?.[1];
const robotsMetaOf = (html) => metas(html, "robots").join(",").toLowerCase();
const jsonLdBlocks = (html) =>
  [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]);
const normalise = (u) => (u ? u.replace(/\/$/, "") : u);

async function auditPage(path) {
  section(path);
  const { url, res, body, error } = await get(path);
  if (error || !res) return check(false, `${path} is reachable`, String(error));
  check(res.status === 200, `${path} responds 200`, res.status === 200 ? "" : `got ${res.status} ${res.headers.get("location") ?? ""}`);
  if (res.status !== 200) return;

  const xRobots = (res.headers.get("x-robots-tag") ?? "").toLowerCase();
  const noindex = xRobots.includes("noindex") || robotsMetaOf(body).includes("noindex");
  if (noindex) {
    check(true, `${path} is noindex (skipping indexability checks)`, xRobots || robotsMetaOf(body));
    return;
  }

  const title = titleOf(body);
  check(title.length > 0, `${path} has a <title>`, title);
  check(title.length <= TITLE_MAX, `${path} title within ${TITLE_MAX} chars`, `${title.length} chars`);
  check(!/\b[A-Z]{4,}\b/.test(title.replace(/\b[A-Z]{2,}[a-z]/g, "")), `${path} title has no ALL-CAPS word (Google rewrites them)`, title);

  const [description] = metas(body, "description");
  check(!!description, `${path} has a meta description`, description ? "" : "none");
  if (description) {
    check(description.length <= DESCRIPTION_MAX, `${path} description within ${DESCRIPTION_MAX} chars`, `${description.length} chars`);
  }

  const canonical = canonicalOf(body);
  const expected = `${origin}${path}`;
  check(!!canonical, `${path} declares a canonical`, canonical ?? "none");
  if (canonical) {
    const self = normalise(canonical) === normalise(expected);
    check(self, `${path} canonicalises to itself on this origin`, self ? "" : `expected ${expected}, got ${canonical}`);
  }

  const [ogImage] = metas(body, "og:image");
  check(!!ogImage, `${path} declares an og:image`, ogImage ?? "none (a page-level openGraph object may have replaced the inherited one)");
  if (ogImage) {
    const abs = ogImage.startsWith("http") ? ogImage : `${origin}${ogImage.startsWith("/") ? "" : "/"}${ogImage}`;
    try {
      const img = await fetch(abs, { headers: { "user-agent": userAgent } });
      const type = img.headers.get("content-type") ?? "";
      check(img.ok && type.startsWith("image/"), `${path} og:image actually renders`, img.ok ? type : `${img.status} at ${abs}`);
    } catch (e) {
      check(false, `${path} og:image actually renders`, String(e));
    }
  }
  check(metas(body, "twitter:image").length > 0, `${path} declares a twitter:image`);
  const [ogTitle] = metas(body, "og:title");
  const [twTitle] = metas(body, "twitter:title");
  if (ogTitle && twTitle) {
    check(ogTitle === twTitle, `${path} og:title and twitter:title agree`, `${ogTitle} | ${twTitle}`);
  }

  const blocks = jsonLdBlocks(body);
  const parsed = [];
  let bad = 0;
  for (const b of blocks) {
    try {
      const node = JSON.parse(b);
      if (!node["@context"]) bad++;
      parsed.push(node);
    } catch {
      bad++;
    }
  }
  check(blocks.length > 0 && bad === 0, `${path} JSON-LD parses (${blocks.length} block${blocks.length === 1 ? "" : "s"})`, bad ? `${bad} invalid or missing @context` : blocks.length ? "" : "no ld+json in server HTML");
  const flat = JSON.stringify(parsed);
  check(!/"aggregateRating"|"@type":"Review"/.test(flat), `${path} has no aggregateRating or Review markup`, "rating markup must reflect real on-page reviews");
  if (!trailRoots.has(path)) {
    check(flat.includes('"BreadcrumbList"'), `${path} carries BreadcrumbList`, "every indexable page below a trail root gets a breadcrumb; pass --trail-roots to exempt a hub");
  }
  if (flat.includes('"FAQPage"')) {
    const faq = parsed.flatMap((n) => (Array.isArray(n["@graph"]) ? n["@graph"] : [n])).find((n) => n["@type"] === "FAQPage");
    const questions = (faq?.mainEntity ?? []).map((q) => q.name).filter(Boolean);
    const text = body.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
    const missing = questions.filter((q) => !text.includes(String(q).replace(/\s+/g, " ").trim()));
    check(missing.length === 0, `${path} every FAQPage question is visible on the page`, missing.join(" | "));
  }
}

async function main() {
  if (!asJson) console.log(`\nSEO / AEO audit: ${origin}\nUser-Agent: ${userAgent}\n`);

  section("robots.txt");
  const robots = await get("/robots.txt");
  check(robots.res?.ok === true, "/robots.txt responds 200", robots.res ? String(robots.res.status) : String(robots.error));
  const rb = robots.body;
  const blanket = /^\s*User-agent:\s*\*\s*[\r\n]+(?:[^\n]*\n)*?\s*Disallow:\s*\/\s*$/mi.test(rb) && !/Allow:\s*\/\s*$/mi.test(rb);
  check(!blanket, "/robots.txt does not disallow the whole site", "a blanket Disallow: / means this is not production, or a mistake");
  const sitemapUrls = [...rb.matchAll(/^\s*Sitemap:\s*(\S+)/gim)].map((m) => m[1]);
  check(sitemapUrls.length > 0, "/robots.txt names at least one sitemap", sitemapUrls.join(", "));
  for (const s of sitemapUrls) check(s.startsWith("http"), `sitemap entry is absolute: ${s}`);
  if (wantAiBots) {
    for (const bot of AI_CRAWLERS) check(rb.includes(bot), `/robots.txt names ${bot}`);
  } else {
    const named = AI_CRAWLERS.filter((b) => rb.includes(b));
    check(named.length > 0, "/robots.txt names AI crawlers explicitly", named.length ? `${named.length}/${AI_CRAWLERS.length} named (use --ai-bots for each)` : "none named; a bare wildcard is not a recorded decision");
  }

  section("sitemap");
  const sitemaps = sitemapUrls.length ? sitemapUrls : [`${origin}/sitemap.xml`];
  const locs = [];
  const priorityOne = [];
  for (const sm of sitemaps) {
    const { res, body, error } = await get(sm);
    check(res?.ok === true, `${sm} responds 200`, res ? String(res.status) : String(error));
    if (!res?.ok) continue;
    const children = [...body.matchAll(/<sitemap>[\s\S]*?<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
    const bodies = children.length ? await Promise.all(children.map(async (c) => (await get(c)).body)) : [body];
    for (const b of bodies) {
      for (const m of b.matchAll(/<url>([\s\S]*?)<\/url>/g)) {
        const loc = m[1].match(/<loc>([^<]+)<\/loc>/)?.[1];
        if (!loc) continue;
        locs.push(loc.trim());
        if (/<priority>\s*1(?:\.0+)?\s*<\/priority>/.test(m[1])) priorityOne.push(loc.trim());
        const lastmod = m[1].match(/<lastmod>([^<]+)<\/lastmod>/)?.[1];
        if (lastmod && Date.now() - Date.parse(lastmod) < 6 * 3600 * 1000) {
          check(false, `lastmod for ${loc} is within the last 6 hours`, "a lastmod that is always 'now' teaches Google to ignore the whole file");
        }
      }
    }
  }
  check(locs.length > 0, `sitemaps list ${locs.length} URLs`);
  const offOrigin = locs.filter((l) => !l.startsWith(`${origin}/`) && l !== origin);
  check(offOrigin.length === 0, "every sitemap URL is on this origin", offOrigin.slice(0, 3).join(", "));
  check(new Set(locs).size === locs.length, "no duplicate URLs across sitemaps");
  check(
    priorityOne.length <= 1,
    `at most one priority-1 URL (${priorityOne.length} found)`,
    priorityOne.length > 1 ? priorityOne.join(", ") : priorityOne[0] ?? "none declared, which is fine",
  );

  section("llms.txt");
  const llms = await get("/llms.txt");
  check(llms.res?.ok === true, "/llms.txt responds 200", llms.res ? String(llms.res.status) : String(llms.error));
  if (llms.res?.ok) {
    check(llms.body.length > 500, "/llms.txt is substantive", `${llms.body.length} bytes`);
    check(/^>\s*\S/m.test(llms.body), "/llms.txt opens with a blockquote definition", "models place you in a category from that line");
  }

  section("aliases");
  try {
    const host = new URL(origin).host;
    const alt = host.startsWith("www.") ? origin.replace("://www.", "://") : origin.replace("://", "://www.");
    const r = await fetch(alt, { headers: { "user-agent": userAgent }, redirect: "manual" });
    const loc = r.headers.get("location") ?? "";
    const permanent = r.status === 301 || r.status === 308;
    check(permanent && loc.startsWith(origin), `${alt} redirects permanently to the apex`, `${r.status} ${loc}`);
  } catch (e) {
    check(true, "www alias not resolvable (skipped)", String(e.cause?.code ?? e));
  }

  const pages = explicitPaths ?? [...new Set(locs.map((l) => (l === origin ? "/" : l.slice(origin.length))))].slice(0, maxPages);
  if (!explicitPaths && locs.length > maxPages && !asJson) console.log(`\n(auditing first ${maxPages} of ${locs.length} sitemap URLs; raise with --max=N)`);
  for (const p of pages) await auditPage(p);

  if (asJson) {
    console.log(JSON.stringify({ origin, userAgent, failures, results }, null, 2));
  } else {
    console.log(failures === 0 ? "\n\x1b[32mAll checks passed.\x1b[0m\n" : `\n\x1b[31m${failures} check(s) failed.\x1b[0m\n`);
  }
  process.exit(failures === 0 ? 0 : 1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
