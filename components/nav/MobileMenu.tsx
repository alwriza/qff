"use client";

import { useEffect, useId, useState } from "react";

type Props = {
  links: { href: string; label: string }[];
  menuLabel: string;
  registerLabel: string;
  registerHref: string;
  registerDisabled: boolean;
};

export default function MobileMenu({
  links,
  menuLabel,
  registerLabel,
  registerHref,
  registerDisabled,
}: Props) {
  const panelId = useId();
  const [open, setOpen] = useState(false);

  // Esc закрывает панель
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="mono border border-text px-3 py-2 text-text transition-colors duration-150 hover:bg-text hover:text-bg"
      >
        {open ? "✕" : menuLabel}
      </button>

      {/* top-full, а не фиксированные пиксели: оболочка шапки меняет высоту
          при прокрутке, и панель должна следовать за её нижним краем */}
      <div
        id={panelId}
        hidden={!open}
        className="absolute left-0 right-0 top-full mt-2 rounded-[var(--radius-card)] bg-bg shadow-[0_24px_48px_-28px_rgba(42,26,99,0.45)]"
      >
        <nav className="container-max flex flex-col py-2">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="mono border-b py-4 text-text transition-colors duration-150 hover:text-violet"
              style={{ borderColor: "var(--rule)" }}
            >
              {link.label}
            </a>
          ))}
          <a
            href={registerHref}
            aria-disabled={registerDisabled || undefined}
            onClick={() => setOpen(false)}
            className="btn btn--primary mt-5 mb-4"
          >
            {registerLabel}
          </a>
        </nav>
      </div>
    </div>
  );
}
