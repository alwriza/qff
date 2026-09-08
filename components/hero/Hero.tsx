import { useTranslations } from "next-intl";
import { event } from "@/config/event";
import Button from "@/components/ui/Button";

export default function Hero() {
  const t = useTranslations("hero");

  const facts = [
    `${event.university} · ${event.city}`,
    t("factSaturdays", { n: event.saturdays }),
    t("factAudience"),
  ];

  return (
    <section className="w-full border-b border-border/30">
      <div className="container-max pt-20 pb-16 md:pt-28 md:pb-24">
        <p className="mono flex items-center gap-3 text-muted">
          <span className="inline-block w-8 h-px bg-coral" aria-hidden="true" />
          {t("eyebrow")}
        </p>

        <h1 className="display hero-title mt-8">
          {t("titleBefore")}<span className="text-coral">{t("titleAccent")}</span>{t("titleAfter")}
        </h1>

        <p className="mt-8 max-w-[46ch] text-xl text-muted">{t("lede")}</p>

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

      </div>
    </section>
  );
}
