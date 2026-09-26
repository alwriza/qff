"use client";

import { useTranslations } from "next-intl";
import { program, gateSymbols, flatGates, columnCount, type Gate, type ProgramWeek } from "@/config/program";

const LABEL_W = 88;
const COL_W = 74;
const GATE = 48;
const ROW_H = 84;
const TOP = 38;
const RIGHT_PAD = 90;
const BARRIER_COLUMN = 11;

const WIDTH = LABEL_W + columnCount * COL_W + RIGHT_PAD;
const wireY = (i: number) => TOP + i * ROW_H;
const CLASSICAL_Y = wireY(program.length - 1) + ROW_H;
const HEIGHT = CLASSICAL_Y + 52;
const colX = (c: number) => LABEL_W + c * COL_W + COL_W / 2;
const WIRE_X1 = LABEL_W;
const WIRE_X2 = WIDTH - 50;
const BARRIER_X = colX(BARRIER_COLUMN);

type Props = {
  selectedId: string;
  onSelect: (id: string) => void;
};

export default function CircuitDiagram({ selectedId, onSelect }: Props) {
  const t = useTranslations("program");

  function handleKeyDown(e: React.KeyboardEvent, index: number) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(flatGates[index].gate.id);
      return;
    }
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = index + 1;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = index - 1;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = flatGates.length - 1;
    if (next === null) return;
    e.preventDefault();
    const clamped = Math.max(0, Math.min(flatGates.length - 1, next));
    document.getElementById("gate-" + flatGates[clamped].gate.id)?.focus();
  }

  function renderGate(week: ProgramWeek, gate: Gate, index: number) {
    const x = colX(gate.column);
    const row = program.indexOf(week);
    const y = wireY(row);
    const selected = gate.id === selectedId;
    const stroke = selected ? "var(--color-violet)" : "var(--color-text)";
    const fill = selected ? "var(--color-surface-2)" : "#ffffff";
    const label = t("weekLabel", { n: week.index }) + " ? " + t("gates." + gate.id + ".title");

    return (
      <g
        key={gate.id}
        id={"gate-" + gate.id}
        className="gate"
        role="button"
        tabIndex={0}
        aria-pressed={selected}
        aria-label={label}
        onClick={() => onSelect(gate.id)}
        onKeyDown={(e) => handleKeyDown(e, index)}
      >
        {gate.controlWire !== undefined && (
          <>
            <line x1={x} y1={wireY(gate.controlWire)} x2={x} y2={y} stroke={stroke} strokeWidth={1.8} />
            <circle cx={x} cy={wireY(gate.controlWire)} r={5} fill={stroke} />
            <circle cx={x} cy={y} r={17} fill={fill} stroke={stroke} strokeWidth={1.8} />
            <line x1={x - 17} y1={y} x2={x + 17} y2={y} stroke={stroke} strokeWidth={1.8} />
            <line x1={x} y1={y - 17} x2={x} y2={y + 17} stroke={stroke} strokeWidth={1.8} />
          </>
        )}

        {gate.type === "hackathon" && (
          <>
            <rect x={x - GATE / 2} y={y - GATE / 2} width={GATE} height={GATE} fill={fill} stroke={stroke} strokeWidth={1.8} />
            <path d={"M " + (x - 14) + " " + (y + 9) + " A 14 14 0 0 1 " + (x + 14) + " " + (y + 9)} fill="none" stroke={stroke} strokeWidth={1.8} />
            <line x1={x} y1={y + 9} x2={x + 10} y2={y - 7} stroke={stroke} strokeWidth={1.8} />
          </>
        )}

        {gate.controlWire === undefined && gate.type !== "hackathon" && (
          <>
            <rect x={x - GATE / 2} y={y - GATE / 2} width={GATE} height={GATE} fill={fill} stroke={stroke} strokeWidth={1.8} />
            <text x={x} y={y} textAnchor="middle" dominantBaseline="central" fontSize={15} className="svg-mono" fill={stroke}>
              {gateSymbols[gate.type]}
            </text>
          </>
        )}

        <rect className="gate-focus" x={x - GATE / 2 - 6} y={y - GATE / 2 - 6} width={GATE + 12} height={GATE + 12} fill="none" stroke="var(--color-violet)" strokeWidth={1.5} strokeDasharray="3 3" />
      </g>
    );
  }

  return (
    <svg
      viewBox={"0 0 " + WIDTH + " " + HEIGHT}
      className="h-auto w-full"
      preserveAspectRatio="xMidYMid meet"
      role="group"
      aria-label={t("circuitLabel")}
    >
      <defs>
        <marker id="circuit-down-arrow" markerWidth="8" markerHeight="8" refX="4" refY="4" orient="auto">
          <path d="M 1 1 L 4 7 L 7 1" fill="none" stroke="var(--color-pink)" strokeWidth="1.2" />
        </marker>
      </defs>

      {program.map((week, i) => (
        <g key={week.id} aria-hidden="true">
          <text x={LABEL_W - 18} y={wireY(i) + 5} textAnchor="end" fontSize={13} className="svg-mono" fill="var(--color-text)">
            W{week.index}
          </text>
        </g>
      ))}

      {program.map((week, i) => (
        <line key={"wire-" + week.id} x1={WIRE_X1} y1={wireY(i)} x2={WIRE_X2} y2={wireY(i)} stroke="var(--color-text)" strokeOpacity={0.68} strokeWidth={1.5} />
      ))}

      <line x1={BARRIER_X} y1={wireY(0) - 34} x2={BARRIER_X} y2={wireY(3) + 34} stroke="var(--color-pink)" strokeWidth={1.5} strokeDasharray="6 7" />

      {program.map((week, i) => week.measuresToClassical && week.gates.map((gate) => {
        const x = colX(gate.column);
        return (
          <line
            key={"measurement-" + gate.id}
            x1={x}
            y1={wireY(i) + GATE / 2 + 4}
            x2={x}
            y2={CLASSICAL_Y - 4}
            stroke="var(--color-pink)"
            strokeWidth={1.5}
            markerEnd="url(#circuit-down-arrow)"
            aria-hidden="true"
          />
        );
      }))}

      <line x1={colX(10)} y1={CLASSICAL_Y - 2} x2={WIRE_X2} y2={CLASSICAL_Y - 2} stroke="var(--color-text)" strokeOpacity={0.68} strokeWidth={1.5} />
      <line x1={colX(10)} y1={CLASSICAL_Y + 2} x2={WIRE_X2} y2={CLASSICAL_Y + 2} stroke="var(--color-text)" strokeOpacity={0.68} strokeWidth={1.5} />
      <text x={WIRE_X2} y={CLASSICAL_Y + 28} textAnchor="end" fontSize={13} className="svg-mono" fill="var(--color-pink)">
        {t("finishLabel")}
      </text>

      {flatGates.map(({ week, gate }, i) => renderGate(week, gate, i))}
    </svg>
  );
}
