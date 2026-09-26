import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { partners } from "@/config/partners";

export default function Partners() {
  const t = useTranslations("partners");

  return (
    <Section id="partners" bg="bg" index="08">
      <Reveal>
        <h2 className="h2">{t("title")}</h2>

        <ul className="mx-auto mt-10 grid max-w-6xl grid-cols-3 items-center gap-4 border-y border-border/40 py-8 md:gap-12 md:py-12">
          {partners.map((partner) => {
            const logo = partner.logo ? (
              <svg
                viewBox={partner.logoViewBox}
                className="h-full w-full overflow-hidden"
                preserveAspectRatio="xMidYMid meet"
                role="img"
                aria-label={partner.name}
              >
                <image href={partner.logo} width={partner.logoWidth} height={partner.logoHeight} />
              </svg>
            ) : (
              <span className="text-lg text-text">{partner.name}</span>
            );

            return (
              <li key={partner.id} className="flex min-w-0 items-center justify-center">
                <div className="flex h-32 w-full max-w-[320px] items-center justify-center sm:h-44">
                  {partner.url ? (
                    <a
                      href={partner.url}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={partner.name}
                      className="flex h-full w-full items-center justify-center"
                    >
                      {logo}
                    </a>
                  ) : logo}
                </div>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </Section>
  );
}
