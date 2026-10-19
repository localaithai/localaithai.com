import type { BlogVideo as BlogVideoData } from "@mimir/blog";
import { useId, useState } from "react";
import { focusRing } from "./blog-classes";

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
    <figure className="m-0 min-w-0 overflow-hidden rounded-[1rem] border border-line bg-surface">
      <div
        className="grid aspect-video place-items-center bg-[color-mix(in_oklch,var(--color-ink)_6%,var(--color-page))] bg-[image:radial-gradient(90%_120%_at_50%_110%,color-mix(in_oklch,var(--color-brand)_28%,transparent),transparent_70%)]"
        id={playerId}
      >
        {loaded && embedUrl ? (
          <iframe
            src={embedUrl}
            title={video.title}
            width={1200}
            height={675}
            loading="lazy"
            className="block size-full border-0"
            allow="encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
        ) : embedUrl ? (
          <button
            className={`group grid min-h-11 min-w-11 cursor-pointer justify-items-center gap-3.5 border-0 bg-transparent p-4 font-semibold text-ink ${focusRing}`}
            type="button"
            aria-label={`เล่นวิดีโอ: ${video.title}`}
            aria-controls={playerId}
            aria-expanded={loaded}
            onClick={() => setLoaded(true)}
          >
            <span
              className="grid size-18 place-items-center rounded-full bg-brand text-page shadow-[0_0_0_0.5rem_color-mix(in_oklch,var(--color-brand)_18%,transparent)] transition-[transform,box-shadow] duration-300 ease-blog group-hover:scale-106 group-hover:shadow-[0_0_0_0.75rem_color-mix(in_oklch,var(--color-brand)_14%,transparent)] motion-reduce:transition-none"
              aria-hidden="true"
            >
              <svg
                viewBox="0 0 24 24"
                width="28"
                height="28"
                className="ms-[3px]"
              >
                <path fill="currentColor" d="M8 5.14v13.72L19 12 8 5.14Z" />
              </svg>
            </span>
            <span>เล่นวิดีโอ</span>
          </button>
        ) : (
          <p className="m-0 p-5 text-ink-2">เปิดวิดีโอได้จากลิงก์ต้นทางด้านล่าง</p>
        )}
      </div>
      <figcaption className="grid gap-1 px-6 py-5">
        <h3 className="m-0 text-lg leading-[1.6] font-[650]">{video.title}</h3>
        <p className="m-0 text-sm text-ink-2">
          {video.publisher} · เผยแพร่{" "}
          <time dateTime={video.published}>
            {dateFormat.format(new Date(`${video.published}T00:00:00+07:00`))}
          </time>
        </p>
        {video.context ? (
          <p className="m-0 text-sm font-semibold text-ink-2">
            วิดีโอประกอบความเข้าใจ
          </p>
        ) : null}
        <a
          href={video.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex min-h-11 items-center justify-self-start text-[0.9375rem] font-semibold text-brand ${focusRing}`}
        >
          ดูวิดีโอต้นทางบน YouTube
        </a>
      </figcaption>
    </figure>
  );
}
