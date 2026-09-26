import { useLocale, useTranslations } from "next-intl";
import { event } from "@/config/event";
import Countdown from "@/components/hero/Countdown";
import HeroArtCard from "@/components/hero/HeroArtCard";

export default function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();
  const registrationHref = event.registrationUrl ?? `/${locale}/register`;

  const facts = [
    `${event.university} · ${t("factCity")}`,
    t("factSaturdays", { n: event.saturdays }),
    t("factDates"),
    t("factFree"),
  ];

  return (
    <section className="hero relative w-full overflow-hidden">
      <div className="container-max relative z-10 pt-20 pb-12 md:pt-[136px] md:pb-16">
        <p className="hero-eyebrow mono">{t("eyebrow")}</p>

        <h1 className="display hero-title mt-2 md:mt-3">
          {t("titleBefore")}
          <span className="grad-text">{t("titleAccent")}</span>
          {t("titleAfter")}
        </h1>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,499px)] lg:items-start lg:gap-10">
          <div>
            <p className="hero-lede mt-3 md:mt-2">{t("lede")}</p>

            <ul className="hero-facts mono mt-10">
              {facts.map((fact, i) => (
                <li key={fact}>
                  {/* разделитель живёт внутри <li>: при переносе строки
                      он уезжает вместе со своим пунктом, а не повисает в начале */}
                  {i > 0 && (
                    <span className="hero-facts-sep" aria-hidden="true">
                      |
                    </span>
                  )}
                  {fact}
                </li>
              ))}
            </ul>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href={registrationHref} className="btn btn--primary">
                {t("ctaRegister")}
              </a>
              <a href="#program" className="btn btn--secondary">
                {t("ctaProgram")} ↓
              </a>
            </div>
          </div>

          {/* Карточка поднимается в строку со второй строкой заголовка —
              как в макете. Отрицательный отступ задан в vw, чтобы совпадать
              с кеглем h1, который тоже растёт от ширины окна.

              Подъём включается только с xl: на 1024–1279px вторая строка
              заголовка в ru и kk ещё длиннее свободного места слева
              от карточки и заезжала бы под неё. */}
          <div className="xl:-mt-[clamp(48px,6.1vw,88px)] flex justify-start lg:justify-end lg:pr-[46px]">
            <HeroArtCard className="w-full max-w-[441px]" />
          </div>
        </div>
      </div>

      <div className="hero-rule" aria-hidden="true" />

      <div className="container-max relative z-10 py-12 md:pt-[100px] md:pb-16">
        <Countdown />
      </div>
    </section>
  );
}
