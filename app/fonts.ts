import { IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";

/**
 * Две гарнитуры на весь сайт.
 *
 * IBM Plex Sans Bold Italic — заголовки. Проверено измерением по макету:
 * при высоте прописной 70px строка «The first Qiskit Fall Fest» занимает
 * 1309px в макете, 1335px в Plex Sans, 1201px в Plex Sans Condensed
 * и 1560px в Plex Mono. То есть в макете именно Plex Sans, а не Condensed,
 * которым заголовки набирались раньше.
 *
 * Побочный выигрыш: Condensed на Google Fonts не отдаёт сабсет `cyrillic`
 * (только `cyrillic-ext`), из-за чего русские и казахские заголовки
 * подменялись метрическим фолбэком и требовали отдельной компенсации кегля.
 * У Plex Sans кириллица покрыта целиком — правила для ru и kk больше не нужны.
 */
export const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
});

export const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500"],
});

export const fontVariables = `${ibmPlexSans.variable} ${ibmPlexMono.variable}`;
