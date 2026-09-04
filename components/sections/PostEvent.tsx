import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { event } from "@/config/event";

/**
 * Пустой каркас под фото, победителей и слайды.
 * Скрыт флагом event.postEvent.enabled — включать после фестиваля.
 */
export default function PostEvent() {
  const t = useTranslations("postEvent");
  const tc = useTranslations("common");

  if (!event.postEvent.enabled) return null;

  const blocks = ["photos", "winners", "slides"] as const;

  return (
    <Section id="post-event" bg="bg">
      <Reveal>
        <h2 className="h2">{t("title")}</h2>
        <div className="mt-10 grid gap-px border border-border/40 bg-border/40 md:grid-cols-3">
          {blocks.map((block) => (
            <div key={block} className="bg-bg p-6 md:p-8">
              <p className="mono text-mint">{t(block)}</p>
              <p className="mono mt-4 text-muted">{tc("tbd")}</p>
            </div>
          ))}
        </div>
      </Reveal>
    </Section>
  );
}
