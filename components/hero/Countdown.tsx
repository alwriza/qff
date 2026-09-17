"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { event } from "@/config/event";

const PLACEHOLDER = "--";

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function Countdown() {
  const t = useTranslations("hero");
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    if (!event.startDate) return;
    setNow(Date.now());
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);

  // Цель берётся из event.ts; при отсутствии даты показываем `--`, а не считаем от заглушки.
  const target = event.startDate ? Date.parse(event.startDate) : null;
  const remaining =
    target !== null && now !== null ? Math.max(0, target - now) : null;

  const units =
    remaining === null
      ? [
          { key: "days", value: PLACEHOLDER },
          { key: "hours", value: PLACEHOLDER },
          { key: "minutes", value: PLACEHOLDER },
          { key: "seconds", value: PLACEHOLDER },
        ]
      : [
          {
            key: "days",
            value: pad(Math.floor(remaining / 86_400_000)),
          },
          {
            key: "hours",
            value: pad(Math.floor(remaining / 3_600_000) % 24),
          },
          {
            key: "minutes",
            value: pad(Math.floor(remaining / 60_000) % 60),
          },
          {
            key: "seconds",
            value: pad(Math.floor(remaining / 1000) % 60),
          },
        ];

  return (
    <div
      // на 360px четыре колонки сетки вместо флекса с большим гэпом —
      // иначе английские подписи выталкивают строку за экран
      className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 lg:flex lg:gap-[clamp(48px,7vw,104px)]"
      role="timer"
      aria-label={t("countdownLabel")}
    >
      {units.map((unit) => (
        <div key={unit.key}>
          <div className="hero-countdown-label mono">{t(unit.key)}</div>
          <div className="hero-countdown-value">{unit.value}</div>
        </div>
      ))}
    </div>
  );
}
