import type { BlogVideo as BlogVideoData } from "@mimir/blog";
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
  const embedUrl = youtubeEmbedUrl(video.url);

  return (
    <figure className="m-0 min-w-0 overflow-hidden rounded-[1rem] border border-line bg-surface">
      <div
        className="grid aspect-video place-items-center bg-[color-mix(in_oklch,var(--color-ink)_6%,var(--color-page))] bg-[image:radial-gradient(90%_120%_at_50%_110%,color-mix(in_oklch,var(--color-brand)_28%,transparent),transparent_70%)]"
      >
        {embedUrl ? (
          <iframe
            src={embedUrl}
            title={video.title}
            width={1200}
            height={675}
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
            className="block size-full border-0"
            allow="encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
          />
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
