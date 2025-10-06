// src/components/FlameIndicator.tsx
import React, { useEffect, useMemo, useRef } from "react";

export function FlameIndicator({
  latestFlameDetected,
  enableSound = true,
}: {
  latestFlameDetected: boolean;
  enableSound?: boolean;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Simple beep (440Hz 0.15s) as base64 wav
  const beepSrc = useMemo(
    () =>
      "data:audio/wav;base64,UklGRiQAAABXQVZFZm10IBAAAAABAAEAESsAACJWAAACABYAAAChAAAAAAAAPwAAAP8AAP8A//8AAP8A//8AAP8A//8AAP8AAP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A/wD/AP8A",
    []
  );

  useEffect(() => {
    if (!enableSound || !latestFlameDetected) return;
    if (!audioRef.current) {
      const a = new Audio(beepSrc);
      audioRef.current = a;
    }
    audioRef.current!.currentTime = 0;
    audioRef.current!.play().catch(() => {/* ignore autoplay blockers */});
  }, [latestFlameDetected, enableSound, beepSrc]);

  return (
    <div
      className={
        "rounded-xl p-4 border flex items-center justify-between " +
        (latestFlameDetected
          ? "border-red-500 bg-red-50 dark:bg-red-950/30"
          : "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/30")
      }
    >
      <div>
        <div className="text-sm opacity-70">Flame Status</div>
        <div className="text-xl font-semibold">
          {latestFlameDetected ? "🔥 Detected" : "✅ Normal"}
        </div>
      </div>
      <div
        className={
          "w-3 h-3 rounded-full animate-pulse " +
          (latestFlameDetected ? "bg-red-500" : "bg-emerald-500")
        }
        aria-label={latestFlameDetected ? "Flame detected" : "No flame"}
      />
    </div>
  );
}
