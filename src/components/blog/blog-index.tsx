import type { Post } from "@mimir/blog";

type BlogIndexProps = {
  posts: readonly Post[];
  siteName: string;
  indexTitle: string;
  indexDescription: string;
};

const dateFormat = new Intl.DateTimeFormat("th-TH", {
  dateStyle: "long",
  timeZone: "Asia/Bangkok",
});
const monthFormat = new Intl.DateTimeFormat("th-TH", {
  month: "long",
  year: "numeric",
  timeZone: "Asia/Bangkok",
});
const categoryLabels: Record<Post["kind"], string> = {
  news: "ข่าว",
  guide: "คู่มือ",
  compare: "เปรียบเทียบ",
  "use-case": "ตัวอย่างการใช้งาน",
};

export function BlogIndex({
  posts,
  siteName,
  indexTitle,
  indexDescription,
}: BlogIndexProps) {
  const orderedPosts = [...posts].sort(
    (left, right) => right.published.getTime() - left.published.getTime(),
  );
  const months = new Map<string, Post[]>();

  for (const post of orderedPosts) {
    const month = monthFormat.format(post.published);
    const entries = months.get(month) ?? [];
    entries.push(post);
    months.set(month, entries);
  }

  return (
    <section
      className="mimir-blog-index"
      aria-labelledby="mimir-blog-index-title"
    >
      <nav className="mimir-blog-breadcrumb" aria-label="เส้นทางหน้า">
        <ol>
          <li>
            <a href="/">หน้าแรก</a>
          </li>
          <li aria-current="page">ข่าวและอัปเดต</li>
        </ol>
      </nav>
      <header className="mimir-blog-index-header">
        <p className="mimir-blog-eyebrow">{siteName}</p>
        <h1 id="mimir-blog-index-title" className="mimir-blog-title">
          {indexTitle}
        </h1>
        <p className="mimir-blog-summary">{indexDescription}</p>
        <a className="mimir-blog-feed-link" href="/blog/feed.xml">
          ติดตามข่าวผ่าน RSS
        </a>
      </header>

      {orderedPosts.length === 0 ? (
        <p className="mimir-blog-empty">ยังไม่มีข่าวที่เผยแพร่</p>
      ) : (
        [...months].map(([month, entries]) => (
          <section className="mimir-blog-archive" key={month}>
            <h2 className="mimir-blog-month">{month}</h2>
            <ul className="mimir-blog-card-list">
              {entries.map((post) => (
                <li
                  className={
                    post === orderedPosts[0]
                      ? "mimir-blog-card mimir-blog-card-feature"
                      : "mimir-blog-card"
                  }
                  key={post.slug}
                >
                  {post.hero ? (
                    <img
                      className="mimir-blog-card-image"
                      src={post.hero.src}
                      alt={post.hero.alt}
                      width={1200}
                      height={675}
                      loading={post === orderedPosts[0] ? "eager" : "lazy"}
                      fetchPriority={post === orderedPosts[0] ? "high" : "auto"}
                    />
                  ) : null}
                  <div className="mimir-blog-card-content">
                    <p className="mimir-blog-eyebrow">
                      {categoryLabels[post.kind]}
                    </p>
                    <h3 className="mimir-blog-card-title">
                      <a href={post.path}>{post.title}</a>
                    </h3>
                    <p className="mimir-blog-card-summary">
                      {post.summary ?? post.description}
                    </p>
                    <dl className="mimir-blog-card-dates">
                      {post.kind === "news" && post.newsDate ? (
                        <div>
                          <dt>ข่าววันที่</dt>
                          <dd>
                            <time dateTime={post.newsDate}>
                              {dateFormat.format(
                                new Date(`${post.newsDate}T00:00:00+07:00`),
                              )}
                            </time>
                          </dd>
                        </div>
                      ) : null}
                      <div>
                        <dt>เผยแพร่บทความ</dt>
                        <dd>
                          <time dateTime={post.published.toISOString()}>
                            {dateFormat.format(post.published)}
                          </time>
                        </dd>
                      </div>
                    </dl>
                    <p className="mimir-blog-reading-time">
                      อ่านประมาณ {post.readingMinutes} นาที
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))
      )}
    </section>
  );
}
