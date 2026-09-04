import {
  IBM_Plex_Sans,
  IBM_Plex_Sans_Condensed,
  IBM_Plex_Mono,
} from "next/font/google";

export const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["300", "400", "700"],
  style: ["normal", "italic"],
});

/**
 * ⚠️ Condensed не отдаёт сабсет `cyrillic` — только `cyrillic-ext`.
 * Проверено рендером: диапазон cyrillic-ext (U+0460–052F и далее) покрывает
 * ә ғ қ ң ө ұ ү һ, но НЕ покрывает ни базовую кириллицу U+0410–U+044F,
 * ни казахскую І (U+0406). То есть в Condensed набирается только латиница,
 * а весь русский и почти весь казахский текст подменяется фолбэком.
 * Поэтому заголовки ru и kk набираются IBM Plex Sans Bold Italic —
 * правило и компенсация кегля в globals.css.
 */
export const ibmPlexSansCondensed = IBM_Plex_Sans_Condensed({
  variable: "--font-ibm-plex-sans-condensed",
  subsets: ["latin", "cyrillic-ext"],
  weight: ["700"],
  style: ["italic"],
});

export const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500"],
});

export const fontVariables = `${ibmPlexSans.variable} ${ibmPlexSansCondensed.variable} ${ibmPlexMono.variable}`;
