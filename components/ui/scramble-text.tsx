"use client";

import {
  Children,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  type ReactElement,
  type ReactNode,
} from "react";

/**
 * Шумовой набор: латиница + кириллица + казахские глифы + квантовая
 * нотация. Шум сам по себе несёт «три языка + квант», а разрешается
 * в один конкретный язык — расшифровка как измерение.
 */
const NOISE = [
  ..."ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  ..."АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ",
  ..."ӘҒҚҢӨҰҮҺІ",
  ..."⊗⊕ψφθħπ√∑⟨⟩01|",
];

/** Общая длительность волны — не более 1400 мс независимо от длины строки. */
const DEFAULT_DURATION = 1400;
const SWAP_MIN = 40;
const SWAP_MAX = 60;
/** Доля длительности на движение фронта; остаток — хвост на джиттер. */
const FRONT = 0.8;

function pick() {
  return NOISE[Math.floor(Math.random() * NOISE.length)];
}

function extractText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (isValidElement(node)) {
    return extractText((node.props as { children?: ReactNode }).children);
  }
  return "";
}

type ScrambleTextProps = {
  /** единственный дочерний элемент — его текстовое содержимое и скремблится */
  children: ReactNode;
  className?: string;
  /** задержка перед проигрыванием, мс */
  delay?: number;
  /** длительность волны, мс — по умолчанию 1400 */
  duration?: number;
  /** позиция первого символа в общей волне — для сквозной расшифровки через несколько ScrambleText подряд */
  waveOffset?: number;
  waveTotal?: number;
  /** смена значения (например по ховеру) перезапускает анимацию */
  playToken?: number | string;
};

export function ScrambleText({
  children,
  className,
  delay = 0,
  duration = DEFAULT_DURATION,
  waveOffset = 0,
  waveTotal,
  playToken = 0,
}: ScrambleTextProps) {
  const child = Children.only(children) as ReactElement<{
    children?: ReactNode;
    className?: string;
  }>;
  const text = extractText(child.props.children);
  const noiseRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = noiseRef.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.textContent = text;
      return;
    }

    const chars = [...text];
    const total = waveTotal ?? chars.length;
    const denom = Math.max(1, total - 1);

    // Пробелы и переносы разрешены сразу — форма заголовка держится с первого кадра.
    const resolveAt = chars.map((ch, i) => {
      if (ch === " " || ch === "\n") return 0;
      const pos = waveOffset + i;
      const base = (pos / denom) * duration * FRONT;
      // джиттер ±2 позиции, чтобы фронт не был идеально ровным
      const jitter = ((Math.random() * 4 - 2) / denom) * duration * FRONT;
      return Math.max(0, Math.min(duration, base + jitter));
    });

    let noise = chars.map(pick);
    let start: number | null = null;
    let lastSwap = 0;
    let nextSwap = SWAP_MIN;
    let raf = 0;

    const tick = (ts: number) => {
      if (start === null) start = ts;
      const elapsed = ts - start;

      if (elapsed - lastSwap >= nextSwap) {
        lastSwap = elapsed;
        nextSwap = SWAP_MIN + Math.random() * (SWAP_MAX - SWAP_MIN);
        noise = noise.map(pick);
      }

      node.textContent = chars
        .map((ch, i) => (elapsed >= resolveAt[i] ? ch : noise[i]))
        .join("");

      if (elapsed < duration) {
        raf = requestAnimationFrame(tick);
      } else {
        node.textContent = text;
      }
    };

    const timer = window.setTimeout(() => {
      raf = requestAnimationFrame(tick);
    }, delay);

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
    };
    // playToken специально в зависимостях: его смена перезапускает волну (например, по ховеру)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, delay, duration, waveOffset, waveTotal, playToken]);

  return cloneElement(child, {
    className: [child.props.className, className].filter(Boolean).join(" "),
    children: (
      <>
        {/* Настоящий финальный текст — в доступном дереве и для поисковика */}
        <span className="sr-only">{text}</span>
        {/* Шум рисуется здесь; до гидратации и без JS тут лежит тот же реальный текст */}
        <span ref={noiseRef} aria-hidden="true">
          {text}
        </span>
      </>
    ),
  });
}
