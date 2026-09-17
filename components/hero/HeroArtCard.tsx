/**
 * Иллюстрация hero-блока: карточка-«открытка» Qiskit Fall Fest.
 *
 * Рисуем инлайновым SVG, а не <img>: карточка тянется по ширине колонки
 * без ступенек на ретине, а готового ассета в public/illustrations нет.
 * Скругления заданы атрибутами rx — глобальное `* { border-radius: 0 }`
 * на SVG-геометрию не влияет.
 */

const NAVY = "#16163A";
const PINK = "#FF7FB4";
const BLUE = "#2B4BD4";

/** Колибри: крыло, тело, голова с клювом и раздвоенный хвост. Локально ~98×56. */
function Hummingbird({
  transform,
  wing,
  body,
}: {
  transform: string;
  wing: string;
  body: string;
}) {
  return (
    <g transform={transform}>
      <path
        d="M40 32 C 40 12, 54 -4, 73 -7 C 69 12, 59 27, 46 37 Z"
        fill={wing}
      />
      <path
        d="M20 44 C 30 34, 50 24, 68 19 C 73 27, 62 38, 46 45 C 36 49, 25 49, 20 44 Z"
        fill={body}
      />
      <path d="M23 44 L 0 55 L 19 39 Z" fill={body} />
      <circle cx="71" cy="20" r="7.5" fill={body} />
      <path d="M77 16 L 98 6 L 78 21 Z" fill={NAVY} />
      <circle cx="72" cy="18" r="1.5" fill={NAVY} />
    </g>
  );
}

export default function HeroArtCard({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 444 268"
      role="img"
      aria-label="Qiskit Fall Fest 2026"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <clipPath id="hero-card-inner">
          <rect x="16" y="16" width="412" height="236" rx="16" />
        </clipPath>
        <path id="hero-badge-top" d="M 79 146 a 57 57 0 0 1 114 0" fill="none" />
        <path id="hero-badge-bottom" d="M 81 146 a 55 55 0 0 0 110 0" fill="none" />
      </defs>

      {/* белая рамка-паспарту */}
      <rect x="0" y="0" width="444" height="268" rx="30" fill="#ffffff" />
      {/* небо */}
      <rect x="16" y="16" width="412" height="236" rx="16" fill="#DCE6FA" />

      <g clipPath="url(#hero-card-inner)">
        {/* облака */}
        <g fill="#ffffff" opacity="0.7">
          <ellipse cx="52" cy="58" rx="44" ry="17" />
          <ellipse cx="80" cy="50" rx="26" ry="13" />
          <ellipse cx="396" cy="96" rx="40" ry="16" />
          <ellipse cx="418" cy="86" rx="24" ry="12" />
          <ellipse cx="228" cy="242" rx="96" ry="28" />
          <ellipse cx="316" cy="230" rx="58" ry="20" />
          <ellipse cx="110" cy="252" rx="52" ry="18" />
        </g>

        {/* колибри */}
        <Hummingbird
          transform="translate(230 26) rotate(-14) scale(0.62)"
          wing={PINK}
          body={BLUE}
        />
        <Hummingbird
          transform="translate(252 36) rotate(-2) scale(0.88)"
          wing={BLUE}
          body={PINK}
        />

        {/* круглый бейдж */}
        <g>
          <circle cx="136" cy="146" r="74" fill="#F08FB6" />

          <g
            className="svg-mono"
            fill={NAVY}
            fontSize="13"
            fontWeight="500"
            letterSpacing="1.6"
          >
            <text textAnchor="middle">
              <textPath href="#hero-badge-top" startOffset="50%">
                Qiskit
              </textPath>
            </text>
            <text textAnchor="middle">
              <textPath href="#hero-badge-bottom" startOffset="50%">
                Fall Fest
              </textPath>
            </text>
            <text x="78" y="150" fontSize="10" letterSpacing="0.6">
              2026
            </text>
            <text x="164" y="150" fontSize="10" letterSpacing="0.6">
              2026
            </text>
          </g>

          {/* «глобус» в центре бейджа */}
          <g stroke={NAVY} strokeWidth="1.4" fill="none" strokeLinecap="round">
            <circle cx="136" cy="146" r="25" />
            <ellipse
              cx="136"
              cy="146"
              rx="25"
              ry="9"
              transform="rotate(-18 136 146)"
            />
            <path d="M114 136 H158" />
            <path d="M112 146 H160" />
            <path d="M114 156 H158" />
            <path d="M120 128 H152" />
            <path d="M120 164 H152" />
          </g>
        </g>

        {/* плашка Quantum */}
        <g transform="translate(228 158) rotate(-5)">
          <rect x="0" y="0" width="116" height="46" rx="23" fill="#2A1A63" />
          <text
            x="58"
            y="30"
            textAnchor="middle"
            fill="#ffffff"
            fontFamily="Georgia, 'Times New Roman', serif"
            fontStyle="italic"
            fontSize="21"
          >
            Quantum
          </text>
        </g>
      </g>
    </svg>
  );
}
