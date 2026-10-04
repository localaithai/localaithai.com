import type { Blog, Post } from "@mimir/blog";
import { BlogVideo } from "./blog-video";
import { mdxComponents } from "./mdx-components";

type BlogArticleProps = {
  blog: Blog;
  post: Post;
  siteName: string;
  ctaLabel: string;
  ctaHref: string;
  relatedPosts: readonly Post[];
};

const dateFormat = new Intl.DateTimeFormat("th-TH", {
  dateStyle: "long",
  timeZone: "Asia/Bangkok",
});
const sourceDate = (value: string) =>
  dateFormat.format(new Date(`${value}T00:00:00+07:00`));

export async function BlogArticle({
  blog,
  post,
  siteName,
  ctaLabel,
  ctaHref,
  relatedPosts,
}: BlogArticleProps) {
  const body = await blog.render(post, mdxComponents);
  const showContents =
    post.headings.filter((heading) => heading.depth === 2).length >= 3;
  const related = relatedPosts
    .filter(
      (candidate, index, entries) =>
        candidate.path !== post.path &&
        entries.findIndex((entry) => entry.path === candidate.path) === index,
    )
    .slice(0, 2);

  return (
    <article className="mimir-blog-article" aria-labelledby="mimir-blog-title">
      <div
        className={
          showContents
            ? "mimir-blog-article-layout mimir-blog-with-toc"
            : "mimir-blog-article-layout"
        }
      >
        <div className="mimir-blog-reader mimir-blog-opening">
          <nav className="mimir-blog-breadcrumb" aria-label="เส้นทางหน้า">
            <ol>
              <li>
                <a href="/">หน้าแรก</a>
              </li>
              <li>
                <a href="/blog/">ข่าวและอัปเดต</a>
              </li>
              <li aria-current="page">{post.title}</li>
            </ol>
          </nav>

          <header className="mimir-blog-article-header">
            <p className="mimir-blog-eyebrow">เผยแพร่โดย {siteName}</p>
            <h1 id="mimir-blog-title" className="mimir-blog-title">
              {post.title}
            </h1>
            <div className="mimir-blog-summary-panel">
              <p className="mimir-blog-summary-label">ประเด็นสำคัญ</p>
              <p className="mimir-blog-summary">
                {post.summary ?? post.description}
              </p>
            </div>
            <dl className="mimir-blog-metadata">
              <div>
                <dt>เผยแพร่บทความ</dt>
                <dd>
                  <time dateTime={post.published.toISOString()}>
                    {dateFormat.format(post.published)}
                  </time>
                </dd>
              </div>
              <div>
                <dt>ตรวจทานล่าสุด</dt>
                <dd>
                  <time dateTime={post.reviewed.toISOString()}>
                    {dateFormat.format(post.reviewed)}
                  </time>
                </dd>
              </div>
              {post.newsDate ? (
                <div>
                  <dt>วันที่ข่าวต้นทาง</dt>
                  <dd>
                    <time dateTime={post.newsDate}>
                      {sourceDate(post.newsDate)}
                    </time>
                  </dd>
                </div>
              ) : null}
            </dl>
            <p className="mimir-blog-reading-time">
              อ่านประมาณ {post.readingMinutes} นาที
            </p>
          </header>

          {post.hero ? (
            <figure className="mimir-blog-hero">
              <img
                src={post.hero.src}
                alt={post.hero.alt}
                width={1200}
                height={675}
                loading="eager"
                fetchPriority="high"
              />
              <figcaption className="mimir-blog-caption">
                <span>{post.hero.caption}</span>
                <span>ภาพ: {post.hero.credit}</span>
                <a href={post.hero.sourceUrl}>แหล่งที่มาของภาพ</a>
              </figcaption>
            </figure>
          ) : null}
        </div>

        {showContents ? (
          <nav
            className="mimir-blog-toc"
            aria-labelledby="mimir-blog-toc-title"
          >
            <h2 id="mimir-blog-toc-title">ในบทความนี้</h2>
            <ol>
              {post.headings.map((heading) => (
                <li data-depth={heading.depth} key={heading.id}>
                  <a href={`#${heading.id}`}>{heading.text}</a>
                </li>
              ))}
            </ol>
          </nav>
        ) : null}

        <div className="mimir-blog-reader mimir-blog-content">
          <div className="mimir-blog-prose">{body}</div>

          {post.faq.length > 0 ? (
            <section
              className="mimir-blog-section mimir-blog-faq"
              aria-labelledby="mimir-blog-faq-title"
            >
              <h2 id="mimir-blog-faq-title">คำถามที่พบบ่อย</h2>
              <dl>
                {post.faq.map((item) => (
                  <div key={item.question}>
                    <dt>{item.question}</dt>
                    <dd>{item.answer}</dd>
                  </div>
                ))}
              </dl>
            </section>
          ) : null}

          {post.videos.length > 0 ? (
            <section
              className="mimir-blog-section"
              aria-labelledby="mimir-blog-videos-title"
            >
              <h2 id="mimir-blog-videos-title">วิดีโอที่เกี่ยวข้อง</h2>
              <ul className="mimir-blog-video-list">
                {post.videos.map((video) => (
                  <li key={video.url}>
                    <BlogVideo video={video} />
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {post.citations.length > 0 ? (
            <section
              className="mimir-blog-section"
              aria-labelledby="mimir-blog-sources-title"
            >
              <h2 id="mimir-blog-sources-title">แหล่งข้อมูล</h2>
              <ol className="mimir-blog-sources">
                {post.citations.map((citation) => (
                  <li key={citation.url}>
                    <a href={citation.url}>{citation.title}</a>
                    <p>{citation.publisher}</p>
                    <dl className="mimir-blog-source-dates">
                      {citation.published ? (
                        <div>
                          <dt>เผยแพร่ต้นทาง</dt>
                          <dd>
                            <time dateTime={citation.published}>
                              {sourceDate(citation.published)}
                            </time>
                          </dd>
                        </div>
                      ) : null}
                      <div>
                        <dt>เข้าถึงข้อมูล</dt>
                        <dd>
                          <time dateTime={citation.accessed}>
                            {sourceDate(citation.accessed)}
                          </time>
                        </dd>
                      </div>
                    </dl>
                  </li>
                ))}
              </ol>
            </section>
          ) : null}

          {related.length > 0 ? (
            <nav
              className="mimir-blog-section"
              aria-labelledby="mimir-blog-related-title"
            >
              <h2 id="mimir-blog-related-title">อ่านต่อ</h2>
              <ul className="mimir-blog-related">
                {related.map((candidate) => (
                  <li key={candidate.path}>
                    <a href={candidate.path}>{candidate.title}</a>
                  </li>
                ))}
              </ul>
            </nav>
          ) : null}

          <aside className="mimir-blog-offer">
            <a className="mimir-blog-cta" href={ctaHref}>
              {ctaLabel}
            </a>
          </aside>
        </div>
      </div>
    </article>
  );
}
