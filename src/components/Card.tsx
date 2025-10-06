// src/components/Card.tsx
import React from "react";

export function Card({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="bg-card rounded-xl shadow-card border border-gray-200 p-5 space-y-3">
      {title && <h2 className="text-lg font-semibold">{title}</h2>}
      {children}
    </div>
  );
}
