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
        className="mono border border-border px-3 py-2 text-text transition-colors duration-150 hover:border-mint hover:text-mint"
      >
        {open ? "✕" : menuLabel}
      </button>

      <div
        id={panelId}
        hidden={!open}
        className="absolute left-0 right-0 top-16 border-b border-border/30 bg-bg"
      >
        <nav className="container-max flex flex-col py-2">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="mono border-b border-border/20 py-4 text-muted transition-colors duration-150 hover:text-text"
            >
              {link.label}
            </a>
          ))}
          <a
            href={registerHref}
            aria-disabled={registerDisabled}
            onClick={() => setOpen(false)}
            className={`mono mt-4 mb-4 bg-coral px-6 py-3 text-center text-bg ${
              registerDisabled ? "pointer-events-none opacity-40" : ""
            }`}
          >
            {registerLabel}
          </a>
        </nav>
      </div>
    </div>
  );
}
