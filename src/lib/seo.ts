import {
  absoluteUrl,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_TITLE,
} from "@/lib/site";

export const TITLE_SUFFIX = " | LocalAI Thailand";
export const TITLE_MAX = 60;
export const DESCRIPTION_MAX = 155;

type Snippet = {
  title: string;
  description: string;
  titleSuffix?: string;
};

export function assertSnippet(
  where: string,
  { title, description, titleSuffix = "" }: Snippet,
) {
  const renderedTitle = `${title}${titleSuffix}`;
  if (renderedTitle.length > TITLE_MAX) {
    throw new Error(
      `${where}: title renders as ${renderedTitle.length} characters`,
    );
  }
  if (description.length > DESCRIPTION_MAX) {
    throw new Error(
      `${where}: description is ${description.length} characters`,
    );
  }
}

export const SOCIAL_IMAGE = {
  url: "/og-image.jpg",
  width: 1200,
  height: 630,
  alt: `${SITE_NAME}: ${SITE_TAGLINE}`,
} as const;

export type OpenGraphImage = {
  readonly url: string;
  readonly width?: number;
  readonly height?: number;
  readonly alt?: string;
};

export type OpenGraph = {
  readonly type: "website" | "article";
  readonly locale: string;
  readonly url: string;
  readonly siteName: string;
  readonly title: string;
  readonly description: string;
  readonly images: readonly OpenGraphImage[];
  readonly publishedTime?: string;
  readonly modifiedTime?: string;
};

export type TwitterCard = {
  readonly card: "summary_large_image";
  readonly title: string;
  readonly description: string;
  readonly images: readonly string[];
};

/** Everything the base layout renders into <head> for one page. */
export type PageHead = {
  /** The full <title>. */
  readonly title: string;
  readonly description: string;
  /** Absolute canonical URL. */
  readonly canonical: string;
  /** hreflang alternates, rendered only where Next.js rendered them. */
  readonly languages?: Readonly<Record<string, string>>;
  readonly openGraph: OpenGraph;
  readonly twitter: TwitterCard;
  /** Adds a noindex robots tag ahead of the site-wide one. */
  readonly noindex?: boolean;
};

export function pageSocial({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}): { openGraph: OpenGraph; twitter: TwitterCard } {
  const image = absoluteUrl(SOCIAL_IMAGE.url);
  return {
    openGraph: {
      type: "website",
      locale: "th_TH",
      url: absoluteUrl(path),
      siteName: SITE_NAME,
      title,
      description,
      images: [{ ...SOCIAL_IMAGE, url: image }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

/**
 * The <title> takes the site suffix while the social title stays bare, as the
 * Next.js title template rendered them.
 */
export function pageMetadata({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}): PageHead {
  assertSnippet(path, { title, description, titleSuffix: TITLE_SUFFIX });
  return {
    title: `${title}${TITLE_SUFFIX}`,
    description,
    canonical: absoluteUrl(path),
    ...pageSocial({ path, title, description }),
  };
}

/** The home page head, which the 404 page shares. */
export function homeHead(): PageHead {
  assertSnippet("/", { title: SITE_TITLE, description: SITE_DESCRIPTION });
  return {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    canonical: absoluteUrl(),
    languages: { "th-TH": absoluteUrl() },
    ...pageSocial({
      path: "/",
      title: SITE_TITLE,
      description: SITE_DESCRIPTION,
    }),
  };
}
