"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * Оболочка шапки с двумя состояниями.
 *
 * Наверху — полноширинная белая полоса с градиентной волосяной линией,
 * ровно как в макете: там шапка нарисована встык к hero.
 *
 * При прокрутке та же полоса собирается в плавающую капсулу с отступами
 * от краёв. Так она перестаёт спорить с розовой правой частью hero и с
 * полосами ниже: капсула читается как отдельный элемент поверх страницы,
 * а не как обрезанный край секции.
 *
 * Внешняя высота шапки постоянна (76px) в обоих состояниях — меняется
 * только вложенная оболочка. Иначе sticky-элемент менял бы высоту потока
 * при скролле и страница дёргалась бы.
 */
export default function NavShell({ children }: { children: ReactNode }) {
  const [floating, setFloating] = useState(false);

  useEffect(() => {
    const onScroll = () => setFloating(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`nav ${floating ? "nav--floating" : ""}`}>
      <div className="nav-shell">
        <div className="nav-inner">{children}</div>
      </div>
    </header>
  );
}
