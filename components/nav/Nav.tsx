import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { event } from "@/config/event";
import LangSwitcher from "./LangSwitcher";
import MobileMenu from "./MobileMenu";
import NavShell from "./NavShell";
import Button from "@/components/ui/Button";

const links = [
  { href: "#about", key: "about" },
  { href: "#program", key: "program" },
  { href: "#hackathon", key: "hackathon" },
  { href: "#faq", key: "faq" },
] as const;

export default function Nav() {
  const t = useTranslations("nav");
  const locale = useLocale();
  const registrationHref = event.registrationUrl ?? `/${locale}/register`;

  const resolved = links.map((link) => ({
    href: `/${locale}/${link.href}`,
    label: t(link.key),
  }));

  return (
    <NavShell>
      <Link
        href="/"
        className="flex h-11 items-center gap-3"
        aria-label="Central Asian Hilbert Space"
      >
        <span className="mono hidden text-text sm:inline">
          {event.shortName}
        </span>
        <img src="/logo-white.svg" alt="" className="h-9 w-auto logo-on-light" />
      </Link>

      {/* Переключение на lg, а не md: на 768–1000px русские и казахские
          подписи в строку не помещаются и выталкивают шапку за экран. */}
      <nav className="hidden items-center gap-7 lg:flex" aria-label={t("primary")}>
        {resolved.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="mono underline-sweep text-text transition-colors duration-150 hover:text-violet"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-4 lg:gap-6">
        <LangSwitcher />

        <div className="hidden lg:block">
          {/* В макете кнопка шапки — белая с тёмной обводкой; розовая
              заливка приберегается для главных CTA в hero и регистрации. */}
          <Button href={registrationHref} variant="secondary">
            {t("register")}
          </Button>
        </div>

        <MobileMenu
          links={resolved}
          menuLabel={t("menu")}
          registerLabel={t("register")}
          registerHref={registrationHref}
          registerDisabled={false}
        />
      </div>
    </NavShell>
  );
}
