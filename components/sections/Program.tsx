"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { gateLegend, gateSymbols, flatGates, program } from "@/config/program";
import Section from "@/components/ui/Section";
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
  const detailPosition = selected
    ? ((selected.week.index - 1) / Math.max(program.length - 1, 1)) * 100
    : 0;

  const detailCard = selected ? (
    <div
      className="card p-6"
      aria-live="polite"
      aria-label={t("detailsLabel")}
    >
      <div key={selected.gate.id} className="program-detail-reveal">
        <p className="mono text-violet">
          {t("weekLabel", { n: selected.week.index })} ·{" "}
          {selected.week.date ?? t("noTime")}
        </p>
        <p className="mono mt-3 border-t border-border/40 pt-3 text-muted">
          {t(`types.${selected.gate.type}`)} ·{" "}
          {selected.gate.time ?? t("noTime")}
        </p>
        <p className="mt-5 text-lg leading-snug text-text">
          {t(`gates.${selected.gate.id}.title`)}
        </p>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          {t(`gates.${selected.gate.id}.description`)}
        </p>
      </div>
    </div>
  ) : null;

  return (
    <Section id="program" bg="tint" index="03">
      <div>
        <h2 className="h2">{t("title")}</h2>
        <p className="mt-6 max-w-[62ch] text-text">{t("subtitle")}</p>

        {/* переключатель Схема/Список — равноправный */}
        <div
          className="mt-10 inline-flex border border-text"
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
                  ? "bg-text text-bg"
                  : "bg-bg text-muted hover:text-text"
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
                    <span className="text-violet">{gateSymbols[type]}</span> —{" "}
                    {t(`types.${type}`)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-8 grid items-start gap-4 lg:grid-cols-[minmax(0,1fr)_260px]">
              <div className="min-w-0 overflow-x-auto">
                <div className="min-w-[680px]">
                  <CircuitDiagram
                    selectedId={selectedId}
                    onSelect={setSelectedId}
                  />
                </div>
              </div>

              {/* На широком экране панель скользит к выбранной строке схемы. */}
              {selected && (
                <div
                  className="relative hidden self-stretch lg:block"
                >
                  <div
                    className="absolute left-0 right-0 transition-[top,transform] duration-500 ease-out"
                    style={{
                      top: `${detailPosition}%`,
                      transform: `translateY(-${detailPosition}%)`,
                    }}
                  >
                    {detailCard}
                  </div>
                </div>
              )}

              <div className="lg:hidden">{detailCard}</div>
            </div>
          </>
        ) : (
          <div className="mt-10">
            <ProgramList />
          </div>
        )}
      </div>
    </Section>
  );
}
