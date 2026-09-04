import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { event } from "@/config/event";
import LangSwitcher from "./LangSwitcher";
import MobileMenu from "./MobileMenu";
import Button from "@/components/ui/Button";

const links = [
  { href: "#about", key: "about" },
  { href: "#program", key: "program" },
  { href: "#hackathon", key: "hackathon" },
  { href: "#faq", key: "faq" },
  { href: "#team", key: "team" },
] as const;

export default function Nav() {
  const t = useTranslations("nav");

  const resolved = links.map((link) => ({
    href: link.href,
    label: t(link.key),
  }));

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/30 bg-bg/80 backdrop-blur">
      <div className="container-max flex h-16 items-center justify-between gap-4">
        {/* TODO: replace with official IBM Quantum lockup once the vectors land (§12) */}
        <Link href="/" className="mono whitespace-nowrap text-text">
          {event.shortName}
        </Link>

        {/* Переключение на lg, а не md: на 768–1000px русские и казахские
            подписи в строку не помещаются и выталкивают шапку за экран. */}
        <nav
          className="hidden items-center gap-6 lg:flex"
          aria-label={t("primary")}
        >
          {resolved.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="mono underline-sweep text-muted transition-colors duration-150 hover:text-text"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4 lg:gap-6">
          <LangSwitcher />

          <div className="hidden lg:block">
            <Button
              href={event.registrationUrl ?? "#register"}
              disabled={!event.registrationUrl}
              variant="primary"
            >
              {t("register")}
            </Button>
          </div>

          <MobileMenu
            links={resolved}
            menuLabel={t("menu")}
            registerLabel={t("register")}
            registerHref={event.registrationUrl ?? "#register"}
            registerDisabled={!event.registrationUrl}
          />
        </div>
      </div>
    </header>
  );
}
