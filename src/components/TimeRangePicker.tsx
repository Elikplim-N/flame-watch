// src/components/TimeRangePicker.tsx
import React from "react";
import type { RangeKey } from "../utils/time";

const OPTIONS: { key: RangeKey; label: string }[] = [
  { key: "1h", label: "Last 1h" },
  { key: "6h", label: "Last 6h" },
  { key: "24h", label: "Last 24h" },
  { key: "7d", label: "Last 7d" },
  { key: "all", label: "All" },
];

export function TimeRangePicker({
  value,
  onChange,
}: {
  value: RangeKey;
  onChange: (v: RangeKey) => void;
}) {
  return (
    <div className="flex gap-2 flex-wrap">
      {OPTIONS.map((opt) => (
        <button
          key={opt.key}
          onClick={() => onChange(opt.key)}
          className={`px-3 py-1 rounded-full border text-sm transition-colors
            ${value === opt.key ? "bg-safe text-white border-safe" : "hover:bg-gray-100"}`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
