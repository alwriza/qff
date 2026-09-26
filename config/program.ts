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
  | "cnot"
  | "activity" // X
  | "lab" // ⊕
  | "hackathon"; // ⟨M⟩

export const gateSymbols: Record<GateType, string> = {
  lecture: "H",
  practice: "RY",
  speaker: "T",
  cnot: "\u2295",
  activity: "X",
  lab: "\u2295",
  hackathon: "M",
};

export const gateLegend: GateType[] = [
  "lecture",
  "practice",
  "speaker",
  "cnot",
  "hackathon",
];

export type Gate = {
  id: string;
  type: GateType;
  symbol?: string;
  displayType?: string;
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
    date: "24 October",
    measuresToClassical: false,
    gates: [
      { id: "w1-lecture", type: "lecture", column: 0, time: null },
      { id: "w1-cnot", type: "cnot", displayType: "lab", column: 1, time: null, controlWire: 1 },
    ],
  },
  {
    id: "week-2",
    index: 2,
    date: "31 October",
    measuresToClassical: false,
    gates: [
      { id: "w2-lecture", type: "lecture", column: 2, time: null },
      { id: "w2-speaker", type: "speaker", displayType: "speedDating", column: 3, time: null },
      { id: "w2-practice", type: "practice", column: 4, time: null },
    ],
  },
  {
    id: "week-3",
    index: 3,
    date: "7 November",
    measuresToClassical: false,
    gates: [
      { id: "w3-lecture", type: "lecture", column: 6, time: null },
      { id: "w3-speaker", type: "speaker", displayType: "speedDating", column: 7, time: null },
      { id: "w3-practice", type: "practice", column: 8, time: null },
      { id: "w3-cnot", type: "cnot", displayType: "lab", column: 9, time: null, controlWire: 3 },
    ],
  },
  {
    id: "week-4",
    index: 4,
    date: "14 November",
    measuresToClassical: false,
    gates: [
      { id: "w4-lecture", type: "lecture", column: 10, time: null },
      { id: "w4-hackathon-start", type: "hackathon", symbol: "M", column: 12, time: null },
    ],
  },
  {
    id: "week-5",
    index: 5,
    date: "21 November",
    measuresToClassical: true,
    gates: [{ id: "w5-hackathon-end", type: "hackathon", column: 13, time: null }],
  },
];

/** Плоский список гейтов в порядке чтения — для клавиатурной навигации. */
export const flatGates = program.flatMap((week) =>
  week.gates.map((gate) => ({ week, gate }))
);

export const columnCount =
  Math.max(...program.flatMap((w) => w.gates.map((g) => g.column))) + 1;
