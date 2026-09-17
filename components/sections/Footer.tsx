import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { event } from "@/config/event";
import { partners } from "@/config/partners";

/**
 * Футер набран цветом плашки Quantum из иллюстрации hero (#2a1a63):
 * он закрывает страницу тёмной полосой и замыкает градиент,
 * начатый шапкой и hero.
 */
export default function Footer() {
  const t = useTranslations("footer");
  const tc = useTranslations("common");

  const socials = (
    Object.entries(event.socials) as [string, string | null][]
  ).filter(([, url]) => url);

  const linkClass =
    "mt-2 inline-block text-white transition-colors duration-150 hover:text-lilac";

  return (
    <footer className="section-deep band-fade band-fade--top-only relative w-full overflow-hidden">
      {/* Градиентная полоска-стык убрана: она подчёркивала жёсткую границу,
          а теперь верхняя кромка футера растворяется в странице. Отбивка
          сверху увеличена, чтобы текст не попадал в растушёвку. */}
      <div className="container-max relative z-10 pb-16 pt-48 md:pt-[300px]">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="mono text-lilac">{t("contactLabel")}</p>
            {/* ЛИЧНУЮ ПОЧТУ НЕ СТАВИТЬ — только адрес команды из event.ts */}
            {event.contactEmail ? (
              <a href={`mailto:${event.contactEmail}`} className={linkClass}>
                {event.contactEmail}
              </a>
            ) : (
              <p className="mono mt-2 text-white">{t("communitySoon")}</p>
            )}
          </div>

          <div>
            <p className="mono text-lilac">{t("communityLabel")}</p>
            {event.communityUrl ? (
              <a
                href={event.communityUrl}
                target="_blank"
                rel="noreferrer noopener"
                className={linkClass}
              >
                {t("communityCta")} ↗
              </a>
            ) : (
              <p className="mono mt-2 text-white">{tc("tbd")}</p>
            )}
          </div>

          <div>
            <p className="mono text-lilac">{t("socialsLabel")}</p>
            {socials.length > 0 ? (
              <ul className="mt-2 flex flex-wrap gap-4">
                {socials.map(([name, url]) => (
                  <li key={name}>
                    <a
                      href={url!}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mono text-white transition-colors duration-150 hover:text-lilac"
                    >
                      {name === "website" ? "hilbertspace.ca" : name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mono mt-2 text-white">{tc("tbd")}</p>
            )}
          </div>
        </div>

        {/* логотипы партнёров — векторы ещё не получены (§12) */}
        <ul className="mono mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-white/15 pt-8 text-white/70">
          {partners.map((partner) => (
            <li key={partner.id}>{partner.name}</li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/15 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="mono text-white/70">{t("rights")}</p>
          <Link
            href="/code-of-conduct"
            className="mono underline-sweep text-white transition-colors duration-150 hover:text-lilac"
          >
            {t("coc")}
          </Link>
        </div>

        <p className="mono mt-6 max-w-[70ch] text-white/60">{t("disclaimer")}</p>
      </div>
    </footer>
  );
}
