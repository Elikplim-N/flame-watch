// src/utils/time.ts
export type RangeKey = "1h" | "6h" | "24h" | "7d" | "all";
export function rangeToStartISO(range: RangeKey): string | null {
  const now = Date.now();
  const h = 3600000;
  switch (range) {
    case "1h": return new Date(now - 1 * h).toISOString();
    case "6h": return new Date(now - 6 * h).toISOString();
    case "24h": return new Date(now - 24 * h).toISOString();
    case "7d": return new Date(now - 7 * 24 * h).toISOString();
    default: return null;
  }
}
