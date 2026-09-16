import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import Button from "@/components/ui/Button";
import { partners } from "@/config/partners";
import { event } from "@/config/event";

export default function Partners() {
  const t = useTranslations("partners");

  return (
    <Section id="partners" bg="surface">
      <Reveal>
        <h2 className="h2">{t("title")}</h2>

        <ul className="mt-10 border-t border-border/40">
          {partners.map((partner) => (
            <li
              key={partner.id}
              className="grid gap-3 border-b border-border/40 py-6 md:grid-cols-[minmax(0,26ch)_minmax(0,1fr)] md:items-center md:gap-8"
            >
              <div className="flex min-h-16 items-center">
                {partner.logo ? (
                  partner.url ? (
                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={partner.name}
                      className="inline-flex"
                    >
                      <img
                        src={partner.logo}
                        alt={partner.name}
                        width={220}
                        height={56}
                        loading="lazy"
                        className="h-14 max-w-[220px] w-auto object-contain object-left"
                      />
                    </a>
                  ) : (
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      width={220}
                      height={56}
                      loading="lazy"
                      className="h-14 max-w-[220px] w-auto object-contain object-left"
                    />
                  )
                ) : (
                  // TODO: replace with the official vector logo once received (§12)
                  <span className="text-lg text-text">{partner.name}</span>
                )}
              </div>
              <p className="text-muted">{t(`items.${partner.id}`)}</p>
            </li>
          ))}
        </ul>

        <div className="mt-12 border border-border p-6 md:p-8">
          <p className="mono text-mint">{t("becomeTitle")}</p>
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
