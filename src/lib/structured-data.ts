import {
  absoluteUrl,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/site";

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

export function organizationGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": ORG_ID,
        name: SITE_NAME,
        url: SITE_URL,
        logo: absoluteUrl("/logo.png"),
        slogan: SITE_TAGLINE,
        description: SITE_DESCRIPTION,
        email: "sales@localaithai.com",
        areaServed: { "@type": "Country", name: "Thailand" },
        address: {
          "@type": "PostalAddress",
          addressLocality: "Bangkok",
          addressCountry: "TH",
        },
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: SITE_URL,
        name: SITE_NAME,
        inLanguage: "th",
        publisher: { "@id": ORG_ID },
      },
      {
        "@type": "Service",
        "@id": `${SITE_URL}/#local-ai-installation`,
        name: "บริการติดตั้ง Local AI",
        description: SITE_DESCRIPTION,
        url: SITE_URL,
        provider: { "@id": ORG_ID },
        areaServed: { "@type": "Country", name: "Thailand" },
      },
    ],
  };
}

export function pageGraph({
  path,
  label,
  description,
  serviceName,
}: {
  path: string;
  label: string;
  description: string;
  serviceName?: string;
}) {
  const url = absoluteUrl(path);
  const graph: object[] = [
    {
      "@type": "WebPage",
      "@id": `${url}#webpage`,
      url,
      name: label,
      description,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": `${SITE_URL}/#local-ai-installation` },
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "หน้าแรก",
          item: SITE_URL,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: label,
        },
      ],
    },
  ];

  if (serviceName) {
    graph.push({
      "@type": "Service",
      "@id": `${url}#service`,
      name: serviceName,
      description,
      url,
      provider: { "@id": ORG_ID },
      areaServed: { "@type": "Country", name: "Thailand" },
    });
  }

  return { "@context": "https://schema.org", "@graph": graph };
}
