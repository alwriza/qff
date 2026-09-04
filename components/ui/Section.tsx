import type { ReactNode } from "react";

type SectionProps = {
  id?: string;
  bg?: "bg" | "surface";
  className?: string;
  children: ReactNode;
};

export default function Section({
  id,
  bg = "bg",
  className = "",
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className={`w-full py-16 md:py-24 ${
        bg === "surface" ? "bg-surface" : "bg-bg"
      } ${className}`}
    >
      <div className="container-max">{children}</div>
    </section>
  );
}
