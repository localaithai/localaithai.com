import type { APIRoute } from "astro";
import { blog } from "@/lib/blog";
import {
  PAGES,
  REVIEWED_DATE,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TAGLINE,
  SITE_URL,
} from "@/lib/site";
import { mimirScopeNotice } from "@/lib/suite-scope";

function buildBody(): string {
  const pages = Object.values(PAGES)
    .map(
      ({ path, label, description }) =>
        `- [${label}](${SITE_URL}${path}): ${description}`,
    )
    .join("\n");
  const body = `> ${SITE_NAME} installs private AI systems for businesses in Thailand, keeping the AI machine and company data on the customer’s site.

# ${SITE_NAME}

${SITE_DESCRIPTION}

## Facts

- Tagline: ${SITE_TAGLINE}
- Offer: Mimir Suites on an AI machine installed at the customer’s site.
- ${mimirScopeNotice}
- Data boundary: customer data is processed on the installed system, not sent to an AI cloud service for the Local AI offer.
- Market: Thai businesses that need private AI in their office.
- Primary action: Request a Demo through the contact form.
- Last reviewed: ${REVIEWED_DATE}.

## Pages

${pages}

## Contact

Use the contact page to request a demo or discuss the workload, data sensitivity, and hardware needs for a Local AI system.
`;

  return `${body}\n${blog.llmsSection()}`;
}

export const GET: APIRoute = () =>
  new Response(buildBody(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
