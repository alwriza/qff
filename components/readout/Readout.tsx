"use client";

import { useEffect, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { readoutRows, readoutValues } from "@/config/readout";

const BAR_MS = 400;
const COUNT_MS = 700;
const STAGGER_MS = 60;

function easeOut(t: number) {
  return 1 - Math.pow(1 - t, 3);
}

export default function Readout() {
  const t = useTranslations("readout");
  const locale = useLocale();
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // При reduced-motion — сразу финальное состояние.
    if (reduced) {
      setActive(true);
      setCounts(
        Object.fromEntries(
          readoutRows.filter((r) => r.count !== null).map((r) => [r.id, r.count!])
        )
      );
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target); // один раз, без повтора при обратном скролле
          setActive(true);

          readoutRows.forEach((row, i) => {
            if (row.count === null) return;
            const delay = i * STAGGER_MS;
            let raf = 0;
            let start: number | null = null;
            const step = (ts: number) => {
              if (start === null) start = ts;
              const p = Math.min(1, (ts - start) / COUNT_MS);
              setCounts((prev) => ({
                ...prev,
                [row.id]: Math.round(easeOut(p) * row.count!),
              }));
              if (p < 1) raf = requestAnimationFrame(step);
            };
            window.setTimeout(() => {
              raf = requestAnimationFrame(step);
            }, delay);
            void raf;
          });
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  function valueFor(row: (typeof readoutRows)[number]) {
    if (row.count !== null) {
      return (counts[row.id] ?? 0).toLocaleString(locale) + row.suffix;
    }
    if (row.valueKey === "weeks") {
      return t("values.weeks", { n: readoutValues.weeks });
    }
    return t(`values.${row.valueKey}`);
  }

  return (
    <section
      className="relative w-full overflow-hidden bg-bg"
      aria-label={t("heading")}
    >
      <div className="container-max relative z-10 py-16 md:py-20" ref={ref}>
        <ul className="border-t border-border/40">
          {readoutRows.map((row, i) => (
            <li
              key={row.id}
              className="grid grid-cols-1 items-center gap-3 border-b border-border/40 py-5 md:grid-cols-[minmax(0,20ch)_minmax(0,1fr)_minmax(0,32ch)] md:gap-8"
            >
              <span className="mono text-muted">{t(`rows.${row.id}`)}</span>

              {/* полоса-индикатор */}
              <span
                className="hidden h-[3px] w-full bg-border/40 md:block"
                aria-hidden="true"
              >
                <span
                  className="block h-[3px] origin-left transition-transform ease-out"
                  style={{
                    background: row.accent
                      ? "var(--grad-cta)"
                      : "var(--grad-accent)",
                    width: `${row.bar}%`,
                    transform: `scaleX(${active ? 1 : 0})`,
                    transitionDuration: `${BAR_MS}ms`,
                    transitionDelay: `${i * STAGGER_MS}ms`,
                  }}
                />
              </span>

              {/* Розовый только на строке «впервые» и только крупным кеглем:
                  на светлом фоне он даёт 3.5:1, для body-текста запрещён (§3). */}
              <span
                className={`font-mono tabular-nums md:text-right ${
                  row.id === "audience"
                    ? "text-xl leading-tight whitespace-normal sm:text-2xl"
                    : "text-2xl leading-none whitespace-nowrap sm:text-3xl"
                } ${
                  row.accent ? "text-pink uppercase" : "text-text"
                }`}
              >
                {valueFor(row)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
