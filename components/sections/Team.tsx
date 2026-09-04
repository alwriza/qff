import { useTranslations } from "next-intl";
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { team } from "@/config/team";

export default function Team() {
  const t = useTranslations("team");
  const trust = t.raw("trustBody") as string[];

  return (
    <Section id="team" bg="bg">
      <Reveal>
        <h2 className="h2">{t("title")}</h2>

        <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5">
          {team.map((member) => (
            <li key={member.id}>
              {/* фото команды — квадратные; заглушка на --surface-2 */}
              <div className="aspect-square w-full bg-surface-2">
                {member.photo && (
                  <img
                    src={member.photo}
                    alt={member.name}
                    width={400}
                    height={400}
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <p className="mt-3 text-text">{member.name}</p>
              <p className="mono mt-1 text-muted">
                {t(`roles.${member.role}`)}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-16 border-t border-border/40 pt-8">
          <p className="mono text-mint">{t("trustTitle")}</p>
          <div className="mt-4 grid gap-5 md:grid-cols-2">
            {trust.map((p) => (
              <p key={p} className="max-w-[58ch] text-muted">
                {p}
              </p>
            ))}
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
