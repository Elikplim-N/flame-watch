// src/types.ts
export type SensorReading = {
  id: string;
  gas_value: number | null;
  flame_detected: boolean | null;
  temperature: number | null;
  humidity: number | null;
  timestamp_ms: number | null;
  created_at: string;
};
