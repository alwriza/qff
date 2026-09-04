"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { event } from "@/config/event";
import Button from "@/components/ui/Button";
import { ScrambleText } from "@/components/ui/scramble-text";
import Countdown from "./Countdown";

export default function Hero() {
  const t = useTranslations("hero");

  const before = t("titleBefore");
  const accent = t("titleAccent");
  const after = t("titleAfter");
  // одна непрерывная волна расшифровки через все три цветных сегмента
  const titleTotal = before.length + accent.length + after.length;

  // смена значения перезапускает волну — заголовок и подзаголовок
  // можно «пересобрать», наведя курсор снова
  const [titleToken, setTitleToken] = useState(0);
  const [ledeToken, setLedeToken] = useState(0);

  const facts = [
    `${event.university} · ${event.city}`,
    t("factSaturdays", { n: event.saturdays }),
    t("factFree"),
    t("factSeats", { min: event.seats.min, max: event.seats.max }),
  ];

  return (
    <section className="w-full border-b border-border/30">
      <div className="container-max pt-20 pb-16 md:pt-28 md:pb-24">
        <p className="mono flex items-center gap-3 text-muted">
          <span className="inline-block w-8 h-px bg-coral" aria-hidden="true" />
          {t("eyebrow")}
        </p>

        <h1
          className="display hero-title mt-8"
          onMouseEnter={() => setTitleToken((v) => v + 1)}
        >
          {before && (
            <ScrambleText
              delay={250}
              waveOffset={0}
              waveTotal={titleTotal}
              playToken={titleToken}
            >
              <span>{before}</span>
            </ScrambleText>
          )}
          <ScrambleText
            delay={250}
            waveOffset={before.length}
            waveTotal={titleTotal}
            playToken={titleToken}
          >
            <span className="text-coral">{accent}</span>
          </ScrambleText>
          {after && (
            <ScrambleText
              delay={250}
              waveOffset={before.length + accent.length}
              waveTotal={titleTotal}
              playToken={titleToken}
            >
              <span>{after}</span>
            </ScrambleText>
          )}
        </h1>

        <p
          className="mt-8 max-w-[46ch] text-xl text-muted"
          onMouseEnter={() => setLedeToken((v) => v + 1)}
        >
          <ScrambleText delay={450} playToken={ledeToken}>
            <span>{t("lede")}</span>
          </ScrambleText>
        </p>

        <ul className="mono mt-10 flex flex-wrap items-center gap-x-5 gap-y-2 text-muted sm:gap-x-4">
          {facts.map((fact, i) => (
            <li key={fact} className="flex items-center gap-4">
              {/* при переносе строк разделитель повисал бы в начале строки */}
              {i > 0 && (
                <span className="hidden text-border sm:inline" aria-hidden="true">
                  │
                </span>
              )}
              {fact}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button
            href={event.registrationUrl ?? "#register"}
            disabled={!event.registrationUrl}
            variant="primary"
          >
            {t("ctaRegister")}
          </Button>
          <Button href="#program" variant="secondary">
            {t("ctaProgram")} ↓
          </Button>
        </div>

        <div className="mt-16 pt-10 border-t border-border/30">
          <Countdown />
        </div>
      </div>
    </section>
  );
}
