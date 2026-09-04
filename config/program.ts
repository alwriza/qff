/**
 * Источник данных для CircuitDiagram и ProgramList.
 * Оба компонента рендерятся из этого единого массива недель.
 *
 * Здесь живёт только структура. Все тексты — в content/*.json
 * по ключам program.weeks.<weekId> и program.gates.<gateId>.
 */

export type GateType =
  | "lecture" // H
  | "practice" // RY
  | "speaker" // T
  | "activity" // X
  | "lab" // ⊕
  | "hackathon"; // ⟨M⟩

export const gateSymbols: Record<GateType, string> = {
  lecture: "H",
  practice: "RY",
  speaker: "T",
  activity: "X",
  lab: "⊕",
  hackathon: "⟨M⟩",
};

export const gateLegend: GateType[] = [
  "lecture",
  "practice",
  "speaker",
  "activity",
  "lab",
  "hackathon",
];

export type Gate = {
  id: string;
  type: GateType;
  /** колонка на схеме, 0-индексированная — время идёт слева направо */
  column: number;
  /** "10:00–12:00" — null → [ TBD ] */
  time: string | null;
  /**
   * Для двухкубитных гейтов: индекс недели (0-индексированный),
   * на проводе которой стоит закрашенная точка контроля.
   */
  controlWire?: number;
};

export type ProgramWeek = {
  id: string;
  /** 1..5 */
  index: number;
  /** "2026-10-24" — null → [ TBD ] */
  date: string | null;
  gates: Gate[];
  /** измерение уходит двойной линией в классический регистр */
  measuresToClassical: boolean;
};

export const program: ProgramWeek[] = [
  {
    id: "week-1",
    index: 1,
    date: null,
    measuresToClassical: false,
    gates: [
      { id: "w1-lecture", type: "lecture", column: 0, time: null },
      { id: "w1-practice", type: "practice", column: 1, time: null },
    ],
  },
  {
    id: "week-2",
    index: 2,
    date: null,
    measuresToClassical: false,
    gates: [
      { id: "w2-lecture", type: "lecture", column: 0, time: null },
      { id: "w2-practice", type: "practice", column: 1, time: null },
    ],
  },
  {
    id: "week-3",
    index: 3,
    date: null,
    measuresToClassical: false,
    gates: [
      { id: "w3-lecture", type: "lecture", column: 0, time: null },
      { id: "w3-practice", type: "practice", column: 1, time: null },
      { id: "w3-speaker", type: "speaker", column: 3, time: null },
    ],
  },
  {
    id: "week-4",
    index: 4,
    date: null,
    measuresToClassical: false,
    gates: [
      { id: "w4-lecture", type: "lecture", column: 0, time: null },
      { id: "w4-practice", type: "practice", column: 1, time: null },
      // лаборатория — CNOT: контроль на проводе недели 3, мишень здесь
      { id: "w4-lab", type: "lab", column: 2, time: null, controlWire: 2 },
      { id: "w4-activity", type: "activity", column: 3, time: null },
    ],
  },
  {
    id: "week-5",
    index: 5,
    date: null,
    measuresToClassical: true,
    gates: [{ id: "w5-hackathon", type: "hackathon", column: 4, time: null }],
  },
];

/** Плоский список гейтов в порядке чтения — для клавиатурной навигации. */
export const flatGates = program.flatMap((week) =>
  week.gates.map((gate) => ({ week, gate }))
);

export const columnCount =
  Math.max(...program.flatMap((w) => w.gates.map((g) => g.column))) + 1;
