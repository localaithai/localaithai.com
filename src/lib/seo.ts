import type { Metadata } from "next";
import { absoluteUrl, SITE_NAME, SITE_TAGLINE } from "@/lib/site";

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

export function pageSocial({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: {
      type: "website",
      locale: "th_TH",
      url: absoluteUrl(path),
      siteName: SITE_NAME,
      title,
      description,
      images: [SOCIAL_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SOCIAL_IMAGE.url],
    },
  };
}

export function pageMetadata({
  path,
  title,
  description,
}: {
  path: string;
  title: string;
  description: string;
}): Metadata {
  assertSnippet(path, { title, description, titleSuffix: TITLE_SUFFIX });
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    ...pageSocial({ path, title, description }),
  };
}
