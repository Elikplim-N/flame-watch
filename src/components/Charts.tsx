// src/components/Charts.tsx
import React from "react";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Legend
} from "recharts";
import type { SensorReading } from "../types";

function formatTs(s: SensorReading) {
  const d = s.timestamp_ms ? new Date(Number(s.timestamp_ms)) : new Date(s.created_at);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export function TempHumidityChart({ data }: { data: SensorReading[] }) {
  const rows = [...data].reverse().map((d) => ({
    t: formatTs(d),
    temperature: d.temperature ?? null,
    humidity: d.humidity ?? null,
  }));
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={rows}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
          <XAxis dataKey="t" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="temperature" stroke="#f97316" yAxisId="left" dot={false} />
          <Line type="monotone" dataKey="humidity" stroke="#3b82f6" yAxisId="right" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function GasChart({ data }: { data: SensorReading[] }) {
  const rows = [...data].reverse().map((d) => ({
    t: formatTs(d),
    gas_value: d.gas_value ?? 0,
  }));
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={rows}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.3} />
          <XAxis dataKey="t" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="gas_value" fill="#f59e0b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
