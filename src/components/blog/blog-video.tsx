import type { BlogVideo as BlogVideoData } from "@mimir/blog";
import { useId, useState } from "react";

type BlogVideoProps = { video: BlogVideoData };

const dateFormat = new Intl.DateTimeFormat("th-TH", {
  dateStyle: "long",
  timeZone: "Asia/Bangkok",
});

function youtubeEmbedUrl(value: string): string | undefined {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return undefined;
    const id =
      url.hostname === "youtu.be"
        ? /^\/([^/]+)\/?$/.exec(url.pathname)?.[1]
        : (url.hostname === "youtube.com" ||
              url.hostname === "www.youtube.com") &&
            url.pathname === "/watch"
          ? url.searchParams.get("v")
          : undefined;
    return id && /^[a-zA-Z0-9_-]{11}$/.test(id)
      ? `https://www.youtube-nocookie.com/embed/${id}`
      : undefined;
  } catch {
    return undefined;
  }
}

export function BlogVideo({ video }: BlogVideoProps) {
  const [loaded, setLoaded] = useState(false);
  const playerId = useId();
  const embedUrl = youtubeEmbedUrl(video.url);

  return (
    <figure className="mimir-blog-video">
      <div className="mimir-blog-video-screen" id={playerId}>
        {loaded && embedUrl ? (
          <iframe
            src={embedUrl}
            title={video.title}
            width={1200}
            height={675}
            loading="lazy"
            allow="encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : embedUrl ? (
          <button
            className="mimir-blog-video-play"
            type="button"
            aria-label={`เล่นวิดีโอ: ${video.title}`}
            aria-controls={playerId}
            aria-expanded={loaded}
            onClick={() => setLoaded(true)}
          >
            <span className="mimir-blog-play-symbol" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="28" height="28">
                <path fill="currentColor" d="M8 5.14v13.72L19 12 8 5.14Z" />
              </svg>
            </span>
            <span className="mimir-blog-play-label">เล่นวิดีโอ</span>
          </button>
        ) : (
          <p className="mimir-blog-video-unavailable">
            เปิดวิดีโอได้จากลิงก์ต้นทางด้านล่าง
          </p>
        )}
      </div>
      <figcaption className="mimir-blog-video-caption">
        <h3>{video.title}</h3>
        <p>
          {video.publisher} · เผยแพร่{" "}
          <time dateTime={video.published}>
            {dateFormat.format(new Date(`${video.published}T00:00:00+07:00`))}
          </time>
        </p>
        {video.context ? (
          <p className="mimir-blog-video-context">วิดีโอประกอบความเข้าใจ</p>
        ) : null}
        <a href={video.url} target="_blank" rel="noopener noreferrer">
          ดูวิดีโอต้นทางบน YouTube
        </a>
      </figcaption>
    </figure>
  );
}
