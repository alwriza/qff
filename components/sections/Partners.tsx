import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { partners } from "@/config/partners";
import { event } from "@/config/event";

export default function Partners() {
  const t = useTranslations("partners");

  return (
    <Section id="partners" bg="bg" index="08">
      <Reveal>
        <h2 className="h2">{t("title")}</h2>

        <ul className="mt-10 grid grid-cols-2 border-t border-border/40 lg:grid-cols-4">
          {partners.map((partner) => (
            <li
              key={partner.id}
              className="min-w-0 border-b border-border/40 px-3 py-6 text-center"
            >
              <div className="mx-auto flex h-20 w-full max-w-[220px] items-center justify-center">
                {partner.logo ? (
                  partner.url ? (
                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={partner.name}
                      className="flex h-full w-full items-center justify-center"
                    >
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        width={220}
                        height={56}
                        loading="lazy"
                        className="max-h-14 max-w-full object-contain object-center"
                      />
                    </a>
                  ) : (
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      width={220}
                      height={56}
                      loading="lazy"
                      className="max-h-14 max-w-full object-contain object-center"
                    />
                  )
                ) : (
                  // TODO: replace with the official vector logo once received (§12)
                  <span className="text-lg text-text">{partner.name}</span>
                )}
              </div>
              <p className="mt-3 text-sm leading-snug text-muted">
                {t(`items.${partner.id}`)}
              </p>
            </li>
          ))}
        </ul>

        <div className="card mt-12 p-6 md:p-8">
          <p className="mono text-violet">{t("becomeTitle")}</p>
          <p className="mt-4 max-w-[62ch] text-text">{t("becomeBody")}</p>
          <div className="mt-6">
            <Button
              href={event.contactEmail ? `mailto:${event.contactEmail}` : "#"}
              disabled={!event.contactEmail}
              variant="secondary"
            >
              {t("becomeCta")}
            </Button>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
