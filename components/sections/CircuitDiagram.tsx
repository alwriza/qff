"use client";

import { useTranslations } from "next-intl";
import {
  program,
  gateSymbols,
  flatGates,
  columnCount,
  type Gate,
  type ProgramWeek,
} from "@/config/program";

/* Геометрия. Время идёт слева направо. */
const LABEL_W = 210;
const COL_W = 96;
const GATE = 48;
const ROW_H = 74;
const TOP = 44;
const RIGHT_PAD = 90;

const WIDTH = LABEL_W + columnCount * COL_W + RIGHT_PAD;
const wireY = (i: number) => TOP + i * ROW_H;
const CLASSICAL_Y = wireY(program.length - 1) + ROW_H;
const HEIGHT = CLASSICAL_Y + 56;
const colX = (c: number) => LABEL_W + c * COL_W + COL_W / 2;
const WIRE_X1 = LABEL_W;
const WIRE_X2 = WIDTH - 50;
/** барьер — вертикальный пунктир между колонками, перед измерением */
const BARRIER_X = LABEL_W + (columnCount - 1) * COL_W;

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
    document.getElementById(`gate-${flatGates[clamped].gate.id}`)?.focus();
  }

  function renderGate(week: ProgramWeek, gate: Gate, index: number) {
    const x = colX(gate.column);
    const y = wireY(program.indexOf(week));
    const selected = gate.id === selectedId;
    const stroke = selected ? "var(--color-mint)" : "var(--color-border)";
    const fill = selected ? "var(--color-surface-2)" : "var(--color-surface)";

    const label = `${t("weekLabel", { n: week.index })} — ${t(
      `gates.${gate.id}.title`
    )}`;

    return (
      <g
        key={gate.id}
        id={`gate-${gate.id}`}
        className="gate"
        role="button"
        tabIndex={0}
        aria-pressed={selected}
        aria-label={label}
        onClick={() => onSelect(gate.id)}
        onKeyDown={(e) => handleKeyDown(e, index)}
      >
        {/* CNOT: закрашенная точка на контроле, вертикаль, ⊕ на мишени */}
        {gate.controlWire !== undefined && (
          <>
            <line
              x1={x}
              y1={wireY(gate.controlWire)}
              x2={x}
              y2={y}
              stroke={stroke}
              strokeWidth={1.5}
            />
            <circle
              cx={x}
              cy={wireY(gate.controlWire)}
              r={5}
              fill={stroke}
            />
            <circle
              cx={x}
              cy={y}
              r={17}
              fill={fill}
              stroke={stroke}
              strokeWidth={1.5}
            />
            <line x1={x - 17} y1={y} x2={x + 17} y2={y} stroke={stroke} strokeWidth={1.5} />
            <line x1={x} y1={y - 17} x2={x} y2={y + 17} stroke={stroke} strokeWidth={1.5} />
          </>
        )}

        {/* измерение — бокс с дугой и стрелкой прибора */}
        {gate.type === "hackathon" && (
          <>
            <rect
              x={x - GATE / 2}
              y={y - GATE / 2}
              width={GATE}
              height={GATE}
              fill={fill}
              stroke={stroke}
              strokeWidth={1.5}
            />
            <path
              d={`M ${x - 14} ${y + 9} A 14 14 0 0 1 ${x + 14} ${y + 9}`}
              fill="none"
              stroke={selected ? "var(--color-mint)" : "var(--color-text)"}
              strokeWidth={1.5}
            />
            <line
              x1={x}
              y1={y + 9}
              x2={x + 10}
              y2={y - 7}
              stroke={selected ? "var(--color-mint)" : "var(--color-text)"}
              strokeWidth={1.5}
            />
          </>
        )}

        {/* однокубитный гейт — квадрат с буквой внутри */}
        {gate.controlWire === undefined && gate.type !== "hackathon" && (
          <>
            <rect
              x={x - GATE / 2}
              y={y - GATE / 2}
              width={GATE}
              height={GATE}
              fill={fill}
              stroke={stroke}
              strokeWidth={1.5}
            />
            <text
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize={15}
              className="svg-mono"
              fill={selected ? "var(--color-mint)" : "var(--color-text)"}
            >
              {gateSymbols[gate.type]}
            </text>
          </>
        )}

        {/* видимый фокус */}
        <rect
          className="gate-focus"
          x={x - GATE / 2 - 6}
          y={y - GATE / 2 - 6}
          width={GATE + 12}
          height={GATE + 12}
          fill="none"
          stroke="var(--color-mint)"
          strokeWidth={1.5}
          strokeDasharray="3 3"
        />
      </g>
    );
  }

  return (
    <svg
      viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      className="w-full h-auto"
      preserveAspectRatio="xMidYMid meet"
      role="group"
      aria-label={t("circuitLabel")}
    >
      {/* подписи недель с датами слева от каждого провода */}
      {program.map((week, i) => (
        <g key={week.id} aria-hidden="true">
          <text
            x={LABEL_W - 18}
            y={wireY(i) - 5}
            textAnchor="end"
            fontSize={11}
            className="svg-mono"
            fill="var(--color-text)"
          >
            {t("weekLabel", { n: week.index })}
          </text>
          <text
            x={LABEL_W - 18}
            y={wireY(i) + 12}
            textAnchor="end"
            fontSize={11}
            className="svg-mono"
            fill="var(--color-muted)"
          >
            {week.date ?? t("noTime")}
          </text>
        </g>
      ))}

      {/* провода-кубиты */}
      {program.map((week, i) => (
        <line
          key={`wire-${week.id}`}
          x1={WIRE_X1}
          y1={wireY(i)}
          x2={WIRE_X2}
          y2={wireY(i)}
          stroke="var(--color-border)"
          strokeWidth={1}
        />
      ))}

      {/* барьер */}
      <line
        x1={BARRIER_X}
        y1={12}
        x2={BARRIER_X}
        y2={wireY(program.length - 1) + 30}
        stroke="var(--color-border)"
        strokeWidth={1}
        strokeDasharray="4 5"
        opacity={0.8}
      />

      {/* классический регистр — двойная линия */}
      <line x1={WIRE_X1} y1={CLASSICAL_Y - 2} x2={WIRE_X2} y2={CLASSICAL_Y - 2} stroke="var(--color-border)" strokeWidth={1} />
      <line x1={WIRE_X1} y1={CLASSICAL_Y + 2} x2={WIRE_X2} y2={CLASSICAL_Y + 2} stroke="var(--color-border)" strokeWidth={1} />
      <text
        x={LABEL_W - 18}
        y={CLASSICAL_Y + 4}
        textAnchor="end"
        fontSize={11}
        className="svg-mono"
        fill="var(--color-muted)"
      >
        c₅
      </text>

      {/* двойная линия от измерения в классический регистр */}
      {program.map((week, i) =>
        week.measuresToClassical
          ? week.gates.map((gate) => {
              const x = colX(gate.column);
              const from = wireY(i) + GATE / 2;
              return (
                <g key={`meas-${gate.id}`} aria-hidden="true">
                  <line x1={x - 2} y1={from} x2={x - 2} y2={CLASSICAL_Y - 4} stroke="var(--color-border)" strokeWidth={1} />
                  <line x1={x + 2} y1={from} x2={x + 2} y2={CLASSICAL_Y - 4} stroke="var(--color-border)" strokeWidth={1} />
                  <path
                    d={`M ${x - 5} ${CLASSICAL_Y - 11} L ${x} ${CLASSICAL_Y - 4} L ${x + 5} ${CLASSICAL_Y - 11}`}
                    fill="none"
                    stroke="var(--color-border)"
                    strokeWidth={1}
                  />
                </g>
              );
            })
          : null
      )}

      <text
        x={WIRE_X2}
        y={CLASSICAL_Y + 22}
        textAnchor="end"
        fontSize={11}
        className="svg-mono"
        fill="var(--color-mint)"
      >
        {t("classicalRegister")}
      </text>

      {/* гейты поверх проводов */}
      {flatGates.map(({ week, gate }, i) => renderGate(week, gate, i))}
    </svg>
  );
}
