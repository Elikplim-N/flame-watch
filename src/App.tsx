// src/App.tsx
import React, { useEffect, useState, useMemo } from "react";
import { supabase } from "./lib/supabase";
import type { SensorReading } from "./types";
import { rangeToStartISO, RangeKey } from "./utils/time";
import { Card } from "./components/Card";
import { TimeRangePicker } from "./components/TimeRangePicker";
import { FlameIndicator } from "./components/FlameIndicator";
import { TempHumidityChart, GasChart } from "./components/Charts";

const POLL_MS = 10000;

export default function App() {
  const [range, setRange] = useState<RangeKey>("6h");
  const [readings, setReadings] = useState<SensorReading[]>([]);
  const [loading, setLoading] = useState(true);

  const fromISO = useMemo(() => rangeToStartISO(range), [range]);

  async function fetchReadings() {
    setLoading(true);
    let q = supabase
      .from("sensor_readings")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(500);
    if (fromISO) q = q.gte("created_at", fromISO);
    const { data, error } = await q;
    if (!error && data) {
      // force sort by created_at to be safe
      const sorted = (data as SensorReading[]).sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );
      setReadings(sorted);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchReadings();
  }, [fromISO]);

  useEffect(() => {
    const id = setInterval(fetchReadings, POLL_MS);
    return () => clearInterval(id);
  }, [fromISO]);

  const latest = readings[0];
  // treat true, 1 or "1" as flame detected
  const flame =
    latest?.flame_detected === true ||
    latest?.flame_detected === 1 ||
    latest?.flame_detected === "1";

  return (
    <div>
      <header className="sticky top-0 z-10 bg-white border-b">
        <div className="container mx-auto py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <h1 className="text-2xl font-bold text-gray-800">
            ESP32 Smoke & Gas Dashboard
          </h1>
          <div className="flex items-center gap-3">
            <TimeRangePicker value={range} onChange={setRange} />
            <button
              onClick={fetchReadings}
              className="px-3 py-1 rounded-md bg-safe text-white hover:bg-green-600 transition-colors"
            >
              Refresh
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto py-6 space-y-8">
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            {/* pass latestFlameDetected to match component signature */}
            <FlameIndicator latestFlameDetected={flame} />
          </Card>
          <Card>
            <div className="text-sm opacity-70">Latest Temperature</div>
            <div className="text-3xl font-bold">
              {latest?.temperature ?? "—"}°C
            </div>
          </Card>
          <Card>
            <div className="text-sm opacity-70">Latest Humidity</div>
            <div className="text-3xl font-bold">
              {latest?.humidity ?? "—"}%
            </div>
          </Card>
        </div>

        <Card title="Temperature & Humidity">
          {loading && <div className="text-sm opacity-60">Loading…</div>}
          <TempHumidityChart data={readings} />
        </Card>

        <Card title="Gas Value">
          <GasChart data={readings} />
        </Card>

        <Card title="Recent Readings">
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left opacity-70">
                <tr>
                  <th className="py-2 pr-4">Created</th>
                  <th className="py-2 pr-4">Temp (°C)</th>
                  <th className="py-2 pr-4">Humidity (%)</th>
                  <th className="py-2 pr-4">Gas</th>
                  <th className="py-2 pr-4">Flame</th>
                </tr>
              </thead>
              <tbody>
                {readings.map((r) => {
                  const d = r.timestamp_ms
                    ? new Date(Number(r.timestamp_ms))
                    : new Date(r.created_at);
                  return (
                    <tr key={r.id} className="border-t">
                      <td className="py-2 pr-4">{d.toLocaleString()}</td>
                      <td className="py-2 pr-4">{r.temperature ?? "—"}</td>
                      <td className="py-2 pr-4">{r.humidity ?? "—"}</td>
                      <td className="py-2 pr-4">{r.gas_value ?? "—"}</td>
                      <td className="py-2 pr-4">
                        {r.flame_detected ? "🔥" : "—"}
                      </td>
                    </tr>
                  );
                })}
                {readings.length === 0 && !loading && (
                  <tr>
                    <td className="py-4 opacity-60" colSpan={5}>
                      No data.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </main>

      <footer className="container mx-auto py-8 text-xs opacity-60">
        Built for academic demonstration — ESP32 Smoke & Gas Detection Dashboard
      </footer>
    </div>
  );
}
