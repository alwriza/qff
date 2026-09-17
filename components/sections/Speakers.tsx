import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { speakers } from "@/config/speakers";

export default function Speakers() {
  const t = useTranslations("speakers");
  const tc = useTranslations("common");

  // Спикеров нет — секция скрыта целиком. Пустые карточки не показываем (§7).
  if (speakers.length === 0) return null;

  return (
    <Section id="speakers" bg="bg">
      <Reveal>
        <h2 className="h2">{t("title")}</h2>
        <ul className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {speakers.map((speaker) => (
            <li key={speaker.id} className="card overflow-hidden pb-6">
              {/* фото спикеров — квадратные */}
              <div className="aspect-square w-full bg-surface-2">
                {speaker.photo && (
                  <img
                    src={speaker.photo}
                    alt={speaker.name}
                    width={480}
                    height={480}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <p className="mt-5 px-6 text-lg text-text">{speaker.name}</p>
              <p className="mono mt-1 px-6 text-muted">{speaker.affiliation}</p>
              <p className="mono mt-3 px-6 text-text">
                {t("topicLabel")}:{" "}
                {speaker.topicKey
                  ? t(`topics.${speaker.topicKey}`)
                  : tc("tbd")}
              </p>
              {speaker.linkedin && (
                <a
                  href={speaker.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="mono mt-3 ml-6 inline-block text-violet underline-sweep transition-colors duration-150 hover:text-text"
                >
                  LinkedIn ↗
                </a>
              )}
            </li>
          ))}
        </ul>
      </Reveal>
    </Section>
  );
}
