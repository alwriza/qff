import type { ReactNode } from "react";

/**
 * Полоса-секция. Четыре фона задают ритм страницы:
 * plain — белый, tint — сиреневая заливка, accent — розово-фиолетовый
 * градиент из макета hero, deep — тёмная плашка цвета Quantum.
 *
 * `surface` оставлен синонимом `tint`: так называли фон до перехода
 * на палитру макета, и переименовывать вызовы ради синонима незачем.
 *
 * Контурное поле здесь не рисуется: оно одно на всю страницу и лежит
 * слоем в <main> — см. ContourField. Полоса обязана оставаться прозрачной
 * для него, поэтому собственного фонового рисунка у неё нет.
 */
type Bg = "bg" | "surface" | "tint" | "accent" | "deep";

type SectionProps = {
  id?: string;
  bg?: Bg;
  /** порядковый номер полосы: печатается над заголовком */
  index?: string;
  className?: string;
  children: ReactNode;
};

const backgrounds: Record<Bg, string> = {
  bg: "bg-bg",
  surface: "section-tint",
  tint: "section-tint",
  accent: "section-accent",
  deep: "section-deep",
};

export default function Section({
  id,
  bg = "bg",
  index,
  className = "",
  children,
}: SectionProps) {
  // Полосы с заливкой во всю ширину растворяют кромки, иначе на стыке
  // с соседней полосой получается жёсткая линия. Отбивку им задаёт CSS —
  // она больше обычной, чтобы контент не попадал в растушёвку.
  const filled = bg === "accent" || bg === "deep";

  return (
    <section
      id={id}
      className={`relative w-full overflow-hidden ${
        filled ? "band-fade" : "py-16 md:py-24"
      } ${backgrounds[bg]} ${index ? "has-index" : ""} ${className}`}
    >
      <div className="container-max relative z-10">
        {index && (
          <p className="section-index mono">
            <span>{index}</span>
            <span className="section-index-rule" aria-hidden="true" />
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
