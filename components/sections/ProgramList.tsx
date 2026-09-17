"use client";

import { useTranslations } from "next-intl";
import { program, gateSymbols } from "@/config/program";

export default function ProgramList() {
  const t = useTranslations("program");

  return (
    <ol className="border-t border-border/40">
      {program.map((week) => (
        <li key={week.id} className="border-b border-border/40 py-8">
          <div className="grid gap-6 md:grid-cols-[minmax(0,22ch)_minmax(0,1fr)]">
            <div>
              <p className="mono text-text">
                {t("weekLabel", { n: week.index })}
              </p>
              <p className="mono mt-1 text-muted">
                {week.date ?? t("noTime")}
              </p>
              <p className="mt-3 text-muted">{t(`weeks.${week.id}`)}</p>
            </div>

            <ul className="space-y-5">
              {week.gates.map((gate) => (
                <li
                  key={gate.id}
                  className="grid grid-cols-[3rem_minmax(0,1fr)] gap-4"
                >
                  <span
                    className="mono card-sm flex h-10 w-10 items-center justify-center text-violet"
                    aria-hidden="true"
                  >
                    {gateSymbols[gate.type]}
                  </span>
                  <div>
                    <p className="mono text-muted">
                      {t(`types.${gate.type}`)} · {gate.time ?? t("noTime")}
                    </p>
                    <p className="mt-1 text-text">
                      {t(`gates.${gate.id}.title`)}
                    </p>
                    <p className="mt-1 text-muted">
                      {t(`gates.${gate.id}.description`)}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </li>
      ))}
    </ol>
  );
}
