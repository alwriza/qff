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
      // на 360px четыре колонки сетки вместо флекса с разделителями —
      // иначе английские подписи выталкивают строку за экран
      className="grid grid-cols-4 gap-3 sm:flex sm:items-start sm:gap-10"
      role="timer"
      aria-label={t("countdownLabel")}
    >
      {units.map((unit, i) => (
        <div key={unit.key} className="flex items-start sm:gap-10">
          {i > 0 && (
            <span
              className="mono hidden pt-1 text-2xl leading-none text-border sm:inline"
              aria-hidden="true"
            >
              :
            </span>
          )}
          <div>
            <div className="font-mono text-2xl leading-none tabular-nums text-mint sm:text-4xl">
              {unit.value}
            </div>
            <div className="mono mt-2 text-[11px] text-muted">
              {t(unit.key)}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
