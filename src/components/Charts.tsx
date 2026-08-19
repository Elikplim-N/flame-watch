// src/components/Charts.tsx
import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  AreaChart,
  Area,
} from "recharts";
import type { TelemetryData } from "../types";

const GH_TZ = "Africa/Accra";

function formatTimeAccra(createdAt: string) {
  const d = new Date(createdAt);
  return d.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: GH_TZ,
  });
}

export function MoistureTankChart({ data }: { data: TelemetryData[] }) {
  const rows = [...data].reverse().map((d) => ({
    t: formatTimeAccra(d.created_at),
    "Soil Moisture": d.soil_moisture ?? null,
    "Water Level (cm)": d.tank_distance_cm ?? null,
  }));

  return (
    <div className="h-72 w-100">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={rows}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.15} />
          <XAxis dataKey="t" tickLine={false} axisLine={false} className="text-xs text-gray-500" />
          <YAxis yAxisId="moisture" domain={[0, 1023]} tickLine={false} axisLine={false} className="text-xs text-gray-500" />
          <YAxis yAxisId="tank" orientation="right" tickLine={false} axisLine={false} className="text-xs text-gray-500" />
          <Tooltip />
          <Legend iconType="circle" />
          <Area
            type="monotone"
            dataKey="Soil Moisture"
            stroke="#0ea5e9"
            fill="url(#colorMoisture)"
            yAxisId="moisture"
            fillOpacity={0.1}
          />
          <Area
            type="monotone"
            dataKey="Water Level (cm)"
            stroke="#6366f1"
            fill="url(#colorTank)"
            yAxisId="tank"
            fillOpacity={0.05}
          />
          <defs>
            <linearGradient id="colorMoisture" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorTank" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.2}/>
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
            </linearGradient>
          </defs>
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function EnvironmentChart({ data }: { data: TelemetryData[] }) {
  const rows = [...data].reverse().map((d) => ({
    t: formatTimeAccra(d.created_at),
    "Soil Temp (°C)": d.soil_temp ?? null,
    "Air Temp (°C)": d.air_temp ?? null,
    "Humidity (%)": d.air_humidity ?? null,
  }));

  return (
    <div className="h-72 w-100">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={rows}>
          <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.15} />
          <XAxis dataKey="t" tickLine={false} axisLine={false} className="text-xs text-gray-500" />
          <YAxis yAxisId="temp" tickLine={false} axisLine={false} className="text-xs text-gray-500" />
          <YAxis yAxisId="humidity" orientation="right" domain={[0, 100]} tickLine={false} axisLine={false} className="text-xs text-gray-500" />
          <Tooltip />
          <Legend iconType="circle" />
          <Line
            type="monotone"
            dataKey="Soil Temp (°C)"
            stroke="#f97316"
            yAxisId="temp"
            dot={false}
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="Air Temp (°C)"
            stroke="#ef4444"
            yAxisId="temp"
            dot={false}
            strokeWidth={1.5}
            strokeDasharray="4 4"
          />
          <Line
            type="monotone"
            dataKey="Humidity (%)"
            stroke="#10b981"
            yAxisId="humidity"
            dot={false}
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
