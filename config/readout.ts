import { event } from "./event";

/**
 * Калибровочная таблица (§5). Лейблы — в content: readout.rows.<id>.
 * value — уже готовая строка; count — число для отсчёта вверх, если применимо.
 */

export type ReadoutRow = {
  id: string;
  /** число для count-up, null → значение статично */
  count: number | null;
  suffix: string;
  /** статичное значение как ключ content, если count === null */
  valueKey: string | null;
  /** ширина полосы-индикатора, % */
  bar: number;
  accent: boolean;
};

export const readoutRows: ReadoutRow[] = [
  { id: "participants", count: 32000, suffix: "+", valueKey: null, bar: 100, accent: false },
  { id: "universities", count: 150, suffix: "", valueKey: null, bar: 78, accent: false },
  { id: "centralAsia", count: null, suffix: "", valueKey: "firstEver", bar: 100, accent: true },
  { id: "length", count: null, suffix: "", valueKey: "weeks", bar: 62, accent: false },
  { id: "audience", count: null, suffix: "", valueKey: "everyone", bar: 62, accent: true },
];

export const readoutValues = {
  weeks: event.saturdays,
};
