import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { event } from "@/config/event";
import { partners } from "@/config/partners";

export default function Footer() {
  const t = useTranslations("footer");
  const tc = useTranslations("common");

  const socials = (
    Object.entries(event.socials) as [string, string | null][]
  ).filter(([, url]) => url);

  return (
    <footer className="w-full border-t border-border/30 bg-bg">
      <div className="container-max py-16">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="mono text-muted">{t("contactLabel")}</p>
            {/* ЛИЧНУЮ ПОЧТУ НЕ СТАВИТЬ — только адрес команды из event.ts */}
            {event.contactEmail ? (
              <a
                href={`mailto:${event.contactEmail}`}
                className="mt-2 inline-block text-text transition-colors duration-150 hover:text-mint"
              >
                {event.contactEmail}
              </a>
            ) : (
              <p className="mono mt-2 text-text">{tc("tbd")}</p>
            )}
          </div>

          <div>
            <p className="mono text-muted">{t("communityLabel")}</p>
            {event.communityUrl ? (
              <a
                href={event.communityUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-2 inline-block text-text transition-colors duration-150 hover:text-mint"
              >
                {t("communityCta")} ↗
              </a>
            ) : (
              <p className="mono mt-2 text-text">{tc("tbd")}</p>
            )}
          </div>

          <div>
            <p className="mono text-muted">{t("socialsLabel")}</p>
            {socials.length > 0 ? (
              <ul className="mt-2 flex flex-wrap gap-4">
                {socials.map(([name, url]) => (
                  <li key={name}>
                    <a
                      href={url!}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="mono text-text transition-colors duration-150 hover:text-mint"
                    >
                      {name}
                    </a>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mono mt-2 text-text">{tc("tbd")}</p>
            )}
          </div>
        </div>

        {/* логотипы партнёров — векторы ещё не получены (§12) */}
        <ul className="mono mt-12 flex flex-wrap items-center gap-x-8 gap-y-3 border-t border-border/30 pt-8 text-muted">
          {partners.map((partner) => (
            <li key={partner.id}>{partner.name}</li>
          ))}
        </ul>

        <div className="mt-10 flex flex-col gap-4 border-t border-border/30 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="mono text-muted">{t("rights")}</p>
          <Link
            href="/code-of-conduct"
            className="mono text-mint transition-colors duration-150 hover:text-text"
          >
            {t("coc")}
          </Link>
        </div>

        <p className="mono mt-6 max-w-[70ch] text-muted">{t("disclaimer")}</p>
      </div>
    </footer>
  );
}
