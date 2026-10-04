import { defineFacts, type FactRegistry, facts as sharedFacts } from "../facts";
import { bangkokMidnight, isCalendarDate } from "./dates";
import type { Citation } from "./index";
import { httpsUrl } from "./schema";

export function snapshotFacts(
  registry: FactRegistry = sharedFacts,
): FactRegistry {
  for (const [id, entry] of Object.entries(registry)) {
    if (
      !httpsUrl.safeParse(entry.source).success ||
      !isCalendarDate(entry.verified)
    ) {
      throw new Error("BLOG:facts:" + id + ":invalid source or verified date");
    }
  }
  return defineFacts({ ...registry });
}

export function fact(id: string, registry: FactRegistry = sharedFacts) {
  const result = registry[id];
  if (!result) throw new Error("Unknown fact id: " + id);
  return result;
}

export function factCitations(
  ids: readonly string[],
  registry: FactRegistry,
  locale: "th" | "en",
  now: Date,
): Citation[] {
  return [...new Set(ids)].map((id) => {
    const entry = fact(id, registry);
    if (
      now.getTime() - bangkokMidnight(entry.verified).getTime() >
      180 * 86_400_000
    ) {
      console.warn(
        "BLOG:fact:" + id + ":source verification is older than 180 days",
      );
    }
    return {
      title: entry.label[locale],
      url: entry.source,
      publisher: new URL(entry.source).hostname,
      accessed: entry.verified,
    };
  });
}
