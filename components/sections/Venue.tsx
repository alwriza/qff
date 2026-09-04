import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { event } from "@/config/event";

export default function Venue() {
  const t = useTranslations("venue");
  const tc = useTranslations("common");

  const rows = [
    { key: "university", value: event.university },
    { key: "city", value: event.city },
    { key: "building", value: event.venue.building ?? tc("tbd") },
    { key: "room", value: event.venue.room ?? tc("tbd") },
    { key: "address", value: event.venue.address ?? tc("tbd") },
  ];

  return (
    <Section id="venue" bg="bg">
      <Reveal>
        <h2 className="h2">{t("title")}</h2>

        <dl className="mt-10 border-t border-border/40">
          {rows.map((row) => (
            <div
              key={row.key}
              className="grid gap-2 border-b border-border/40 py-4 md:grid-cols-[minmax(0,18ch)_minmax(0,1fr)] md:gap-8"
            >
              <dt className="mono text-muted">{t(`labels.${row.key}`)}</dt>
              <dd className="text-text">{row.value}</dd>
            </div>
          ))}
        </dl>

        <p className="mt-6 max-w-[58ch] text-muted">{t("gettingThere")}</p>

        {/* Карту не вставляем, пока нет точного адреса (§7). */}
        {event.venue.address && event.venue.mapUrl && (
          <a
            href={event.venue.mapUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="mono mt-6 inline-block text-mint transition-colors duration-150 hover:text-text"
          >
            {t("labels.gettingThere")} ↗
          </a>
        )}
      </Reveal>
    </Section>
  );
}
