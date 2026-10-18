/**
 * Источник данных для CircuitDiagram и ProgramList.
 * Оба компонента рендерятся из этого единого массива недель.
 *
 * Здесь живёт только структура. Все тексты — в content/*.json
 * по ключам program.weeks.<weekId> и program.gates.<gateId>.
 */

export type GateType =
  | "registration"
  | "ceremony"
  | "break"
  | "lecture" // H
  | "practice" // RY
  | "speaker" // T
  | "cnot"
  | "activity" // X
  | "lab" // ⊕
  | "hackathon"; // ⟨M⟩

export const gateSymbols: Record<GateType, string> = {
  registration: "R",
  ceremony: "O",
  break: "B",
  lecture: "H",
  practice: "RY",
  speaker: "T",
  cnot: "\u2295",
  activity: "X",
  lab: "\u2295",
  hackathon: "M",
};

export const gateLegend: GateType[] = [
  "registration",
  "ceremony",
  "lecture",
  "activity",
  "break",
  "lab",
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
      { id: "w1-registration", type: "registration", column: 0, time: "09:00–09:50" },
      { id: "w1-opening", type: "ceremony", column: 1, time: "10:00–10:30" },
      { id: "w1-lecture", type: "lecture", column: 2, time: "10:40–11:20" },
      { id: "w1-coffee", type: "break", column: 3, time: "11:20–12:00" },
      { id: "w1-cnot", type: "cnot", displayType: "lab", column: 4, time: "12:00–13:30", controlWire: 1 },
    ],
  },
  {
    id: "week-2",
    index: 2,
    date: "31 October",
    measuresToClassical: false,
    gates: [
      { id: "w2-registration", type: "registration", column: 5, time: "10:00–10:50" },
      { id: "w2-lecture", type: "lecture", column: 6, time: "11:00–12:00" },
    ],
  },
  {
    id: "week-3",
    index: 3,
    date: "8 November",
    measuresToClassical: false,
    gates: [
      { id: "w3-registration", type: "registration", column: 7, time: "10:00–10:50" },
      { id: "w3-lecture", type: "lecture", column: 8, time: "11:00–12:00" },
      { id: "w3-cnot", type: "cnot", displayType: "lab", column: 9, time: "12:10–14:10", controlWire: 3 },
    ],
  },
  {
    id: "week-4",
    index: 4,
    date: "14 November",
    measuresToClassical: false,
    gates: [
      { id: "w4-registration-hackathon", type: "registration", column: 10, time: "09:00–09:50" },
      { id: "w4-lecture", type: "lecture", column: 11, time: "10:00–11:00" },
      { id: "w4-hackathon-start", type: "hackathon", column: 13, time: "11:30–12:00" },
      { id: "w4-coffee", type: "break", column: 14, time: "14:00–15:30" },
    ],
  },
  {
    id: "week-5",
    index: 5,
    date: "21 November",
    measuresToClassical: true,
    gates: [
      { id: "w5-registration", type: "registration", column: 12, time: "09:00–09:50" },
      { id: "w5-hackathon-end", type: "hackathon", column: 13, time: "10:00–10:30" },
      { id: "w5-pizza", type: "break", column: 14, time: "10:30–11:30" },
    ],
  },
];

/** Плоский список гейтов в порядке чтения — для клавиатурной навигации. */
export const flatGates = program.flatMap((week) =>
  week.gates.map((gate) => ({ week, gate }))
);

export const columnCount =
  Math.max(...program.flatMap((w) => w.gates.map((g) => g.column))) + 1;
