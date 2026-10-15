# Publishing news

Articles live in content/blog/*.mdx. The presentation belongs to this site; vendor/mimir-blog is generated and must stay unedited.

1. Choose a current event and a distinct reader question for this brand. Verify at least two HTTPS primary sources and an official video, recording publication and access dates. Select a credited illustrative image on the immutable owned asset host; caption its actual role. Mark older background videos context: true.
2. Write original Thai analysis with a direct-answer summary, practical table, plain H2/H3 headings and a link to the relevant local service page. Frontmatter requires title, description, kind: news, query, cluster, source, published, reviewed, newsDate, citations, hero, videos and at least two faq entries. Render FAQs from frontmatter only. Title plus brand suffix must fit 60 UTF-16 units, description 155. Keep draft: true until ready; draft and future-published posts are excluded. Use real Bangkok publication/review dates and the original event date as newsDate.
3. Preview with this site’s existing pnpm dev script. Run pnpm lint, its typecheck script where available, then pnpm build. Inspect dist/blog/index.html, each article, RSS, sitemap and llms. From the central blog repository, check this content root with the command below. For the initial 110-post batch, supply all 11 mappings with --require-all; use the July 5–October 5 window only for that batch.

```sh
pnpm portfolio -- --site-path localaithai.com=/absolute/site/worktree --from 2026-07-05 --to 2026-10-05
```

Builds verify the pinned vendor snapshot and copy original hero bytes to the site origin for social previews. Visible article images use the shared host. Astro's `preserve` build format writes blog HTML straight into canonical folders. Following deployment, use the existing seo:audit script to verify the public URLs; a local build does not verify production.

Keep claims tied to sources and tested scope. Slides, Image Studio and Video Studio are paused and excluded from both Suite editions. Cloud AI sends document text to cloud models with PII redacted by default. Google retired FAQ rich results in May 2026; visible FAQs remain useful to readers. llms.txt is supplementary context, without an indexing or ranking guarantee.
