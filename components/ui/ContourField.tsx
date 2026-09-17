/**
 * Контурное поле — векторный фон всего сайта.
 *
 * Раньше поле рисовалось отдельно в каждой полосе, и на каждой границе
 * секций линии ломались: кадр у всех был свой, а высоты полос разные.
 * Здесь поле одно на страницу — слой растянут на весь <main>, — поэтому
 * линия пересекает границу секции той же самой линией.
 *
 * Рисунок задан SVG-плиткой в userSpaceOnUse: один узор повторяется
 * и по вертикали, и по горизонтали. Чтобы плитка сходилась сама с собой,
 * снос линии по ширине (DRIFT) кратен шагу между линиями (GAP), а изгиб
 * набран синусами с целым числом периодов на ширину плитки — тогда
 * y(x + ширина) = y(x) + DRIFT, и семейство линий переходит само в себя.
 *
 * Сила линий разная по высоте, но поле при этом остаётся одним: сверху,
 * где лежит hero и текста мало, они видны в полную силу; ниже, под
 * абзацами, гасятся маской до трети — иначе проступают сквозь строки
 * и мешают читать. Маска задана в пиксельных координатах (userSpaceOnUse),
 * а не в процентах: проценты растянулись бы на все восемь тысяч пикселей
 * страницы, и переход попал бы в середину, а не на границу hero.
 *
 * Слой лежит поверх заливок секций (z-5), но под контентом (z-10),
 * и смешивается через multiply. Поэтому одни и те же линии читаются
 * и на белом, и на сиреневом, и на розовом градиенте регистрации,
 * а текст и карточки остаются чистыми.
 */

const TILE_W = 1440;
const GAP = 22;
/** кратно GAP — иначе плитка не сойдётся по горизонтали */
const DRIFT = GAP * 15;
const A1 = 54;
const A2 = 18;

const LINE_ID = "contour-line";
const PATTERN_ID = "contour-pattern";
const MASK_ID = "contour-mask";
const FADE_ID = "contour-fade";

/** высота hero, ниже которой линии гасятся */
const FADE_FROM = 900;
const FADE_TO = 1600;
/** во сколько раз тише линии под текстом */
const FADE_TO_OPACITY = 0.45;

type Point = [number, number];

function smoothPath(points: Point[]): string {
  const d: string[] = [`M${points[0][0]} ${points[0][1]}`];

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? i : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2 < points.length ? i + 2 : i + 1];

    const c1x = round(p1[0] + (p2[0] - p0[0]) / 6);
    const c1y = round(p1[1] + (p2[1] - p0[1]) / 6);
    const c2x = round(p2[0] - (p3[0] - p1[0]) / 6);
    const c2y = round(p2[1] - (p3[1] - p1[1]) / 6);

    d.push(`C${c1x} ${c1y} ${c2x} ${c2y} ${round(p2[0])} ${round(p2[1])}`);
  }

  return d.join("");
}

function round(n: number) {
  return Math.round(n * 10) / 10;
}

const LINE_D = (() => {
  const steps = 24;
  const points: Point[] = [];

  for (let i = 0; i <= steps; i++) {
    const u = i / steps;
    points.push([
      u * TILE_W,
      DRIFT * u +
        A1 * Math.sin(2 * Math.PI * u) +
        A2 * Math.sin(4 * Math.PI * u + 0.9),
    ]);
  }

  return smoothPath(points);
})();

/**
 * Копии линии внутри плитки. Одна линия по ширине плитки опускается
 * на DRIFT и вдобавок гуляет на ±(A1+A2), поэтому в полосу высотой GAP
 * попадают сразу два десятка соседних линий — их и перечисляем.
 */
const OFFSETS = (() => {
  const spread = DRIFT + 2 * (A1 + A2);
  const from = -Math.ceil(spread / GAP) - 1;
  const list: number[] = [];
  for (let n = from; n <= 2; n++) list.push(n * GAP);
  return list;
})();

type Props = {
  stroke?: string;
  opacity?: number;
  className?: string;
};

export default function ContourField({
  stroke = "var(--color-violet)",
  opacity = 0.19,
  className = "",
}: Props) {
  return (
    <svg
      className={`contour-layer ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <path id={LINE_ID} d={LINE_D} />
        <pattern
          id={PATTERN_ID}
          width={TILE_W}
          height={GAP}
          patternUnits="userSpaceOnUse"
        >
          <g fill="none" stroke={stroke} strokeWidth={1} opacity={opacity}>
            {OFFSETS.map((y) => (
              <use key={y} href={`#${LINE_ID}`} y={y} />
            ))}
          </g>
        </pattern>
        <linearGradient
          id={FADE_ID}
          gradientUnits="userSpaceOnUse"
          x1="0"
          y1="0"
          x2="0"
          y2={FADE_TO}
        >
          <stop offset="0" stopColor="#fff" stopOpacity="1" />
          <stop offset={FADE_FROM / FADE_TO} stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity={FADE_TO_OPACITY} />
        </linearGradient>

        {/* spreadMethod по умолчанию pad — ниже FADE_TO держится последний стоп */}
        <mask id={MASK_ID}>
          <rect width="100%" height="100%" fill={`url(#${FADE_ID})`} />
        </mask>
      </defs>

      <rect
        width="100%"
        height="100%"
        fill={`url(#${PATTERN_ID})`}
        mask={`url(#${MASK_ID})`}
      />
    </svg>
  );
}
