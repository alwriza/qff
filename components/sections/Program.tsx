"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { gateLegend, gateSymbols, flatGates } from "@/config/program";
import CircuitDiagram from "./CircuitDiagram";
import ProgramList from "./ProgramList";

type View = "schema" | "list";

export default function Program() {
  const t = useTranslations("program");
  // Предвыбранный первый гейт — панель деталей не открывается пустой.
  const [selectedId, setSelectedId] = useState(flatGates[0].gate.id);
  const [view, setView] = useState<View>("schema");
  const [manual, setManual] = useState(false);

  // Ниже 800px список по умолчанию — пока пользователь не переключил сам.
  useEffect(() => {
    if (manual) return;
    const mq = window.matchMedia("(max-width: 799px)");
    const apply = () => setView(mq.matches ? "list" : "schema");
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [manual]);

  function choose(next: View) {
    setManual(true);
    setView(next);
  }

  const selected = flatGates.find((g) => g.gate.id === selectedId);

  return (
    <section id="program" className="w-full bg-bg py-16 md:py-24">
      <div className="container-max">
        <h2 className="h2">{t("title")}</h2>
        <p className="mt-6 max-w-[62ch] text-muted">{t("subtitle")}</p>

        {/* переключатель Схема/Список — равноправный */}
        <div
          className="mt-10 inline-flex border border-border"
          role="group"
          aria-label={t("viewLabel")}
        >
          {(["schema", "list"] as View[]).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => choose(v)}
              aria-pressed={view === v}
              className={`mono px-5 py-2.5 transition-colors duration-150 ${
                view === v
                  ? "bg-surface-2 text-text"
                  : "text-muted hover:text-text"
              }`}
            >
              {v === "schema" ? t("viewSchema") : t("viewList")}
            </button>
          ))}
        </div>

        {view === "schema" ? (
          <>
            {/* легенда над схемой — без неё схема ребус */}
            <ul
              className="mono mt-10 flex flex-wrap items-center gap-x-3 gap-y-2 text-muted"
              aria-label={t("legendLabel")}
            >
              {gateLegend.map((type, i) => (
                <li key={type} className="flex items-center gap-3">
                  {i > 0 && (
                    <span className="text-border" aria-hidden="true">
                      ·
                    </span>
                  )}
                  <span>
                    <span className="text-mint">{gateSymbols[type]}</span> —{" "}
                    {t(`types.${type}`)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 overflow-x-auto">
              <div className="min-w-[680px]">
                <CircuitDiagram
                  selectedId={selectedId}
                  onSelect={setSelectedId}
                />
              </div>
            </div>

            {/* панель деталей */}
            {selected && (
              <div
                className="mt-8 border border-border bg-surface p-6 md:p-8"
                aria-live="polite"
                aria-label={t("detailsLabel")}
              >
                <p className="mono text-muted">
                  {t("weekLabel", { n: selected.week.index })} ·{" "}
                  {selected.week.date ?? t("noTime")} ·{" "}
                  {t(`types.${selected.gate.type}`)} ·{" "}
                  {selected.gate.time ?? t("noTime")}
                </p>
                <p className="mt-3 text-xl text-text">
                  {t(`gates.${selected.gate.id}.title`)}
                </p>
                <p className="mt-3 max-w-[70ch] text-muted">
                  {t(`gates.${selected.gate.id}.description`)}
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="mt-10">
            <ProgramList />
          </div>
        )}
      </div>
    </section>
  );
}
