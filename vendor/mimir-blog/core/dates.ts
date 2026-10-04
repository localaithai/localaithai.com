const datePattern = /^\d{4}-\d{2}-\d{2}$/;

export function isCalendarDate(value: string): boolean {
  if (!datePattern.test(value)) return false;
  const instant = new Date(value + "T00:00:00.000Z");
  return (
    Number.isFinite(instant.getTime()) &&
    instant.toISOString().slice(0, 10) === value
  );
}

export function bangkokToday(now: Date = new Date()): string {
  if (!Number.isFinite(now.getTime())) throw new Error("Invalid current date");
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(now);
}

export function bangkokMidnight(value: string): Date {
  if (!isCalendarDate(value))
    throw new Error("Invalid calendar date: " + value);
  return new Date(value + "T00:00:00+07:00");
}

export function dateIso(value: Date): string {
  return bangkokToday(value) + "T00:00:00+07:00";
}

export function reviewedLabel(value: Date, locale: "th" | "en"): string {
  return new Intl.DateTimeFormat(
    locale === "th" ? "th-TH-u-ca-gregory" : "en-GB",
    {
      timeZone: "Asia/Bangkok",
      day: "numeric",
      month: "long",
      year: "numeric",
    },
  ).format(value);
}
