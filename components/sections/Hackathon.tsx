import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import IllustrationSlot from "@/components/ui/IllustrationSlot";

export default function Hackathon() {
  const t = useTranslations("hackathon");
  const tc = useTranslations("common");

  const rows = [
    { key: "format", value: t("format") },
    { key: "teams", value: t("teams") },
    { key: "timing", value: t("timing") },
    { key: "criteria", value: tc("tbd") },
    { key: "jury", value: tc("tbd") },
    { key: "prizes", value: t("prizes") },
  ];

  return (
    <Section id="hackathon" bg="surface">
      <Reveal>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
          <div>
            {/* Коралловый на surface даёт 3.22 — допустим только крупным кеглем (§3). */}
            <h2 className="h2 text-coral">{t("title")}</h2>
            <p className="mt-6 max-w-[58ch] text-text">{t("lede")}</p>

            <dl className="mt-10 border-t border-border/40">
              {rows.map((row) => (
                <div
                  key={row.key}
                  className="grid gap-2 border-b border-border/40 py-5 md:grid-cols-[minmax(0,18ch)_minmax(0,1fr)] md:gap-8"
                >
                  <dt className="mono text-muted">{t(`labels.${row.key}`)}</dt>
                  <dd className="text-text">{row.value}</dd>
                </div>
              ))}
            </dl>
          </div>

          <IllustrationSlot name="smileys" ratio="square" className="self-start" />
        </div>
      </Reveal>
    </Section>
  );
}
