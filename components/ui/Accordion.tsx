"use client";

import { useId, useState } from "react";

export type AccordionItem = {
  q: string;
  a: string;
};

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const baseId = useId();
  const [open, setOpen] = useState<number[]>([]);

  function toggle(i: number) {
    setOpen((prev) =>
      prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i]
    );
  }

  return (
    <div className="border-t border-border/40">
      {items.map((item, i) => {
        const isOpen = open.includes(i);
        const btnId = `${baseId}-btn-${i}`;
        const panelId = `${baseId}-panel-${i}`;

        return (
          <div key={item.q} className="border-b border-border/40">
            <h3>
              <button
                type="button"
                id={btnId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggle(i)}
                className="flex w-full items-start justify-between gap-6 py-5 text-left transition-colors duration-150 hover:text-mint"
              >
                <span className="text-lg">{item.q}</span>
                <span
                  className="mono mt-1 shrink-0 text-mint"
                  aria-hidden="true"
                >
                  {isOpen ? "−" : "+"}
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              hidden={!isOpen}
              className="pb-6"
            >
              <p className="max-w-[70ch] text-muted">{item.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
