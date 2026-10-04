export type Fact = {
  value: number | string;
  unit?: string;
  label: { th: string; en: string };
  source: string;
  verified: string;
};

export type FactRegistry = Readonly<Record<string, Fact>>;

export function defineFacts<T extends Record<string, Fact>>(
  table: T,
): Readonly<T> {
  return Object.freeze(
    Object.fromEntries(
      Object.entries(table).map(([id, entry]) => [
        id,
        Object.freeze({ ...entry, label: Object.freeze({ ...entry.label }) }),
      ]),
    ),
  ) as Readonly<T>;
}

export const facts: FactRegistry = defineFacts({});
