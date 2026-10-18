import { Noto_Sans, Noto_Sans_Mono } from "next/font/google";

// Both families cover the English, Russian and Kazakh versions of the site.
const sans = Noto_Sans({
  variable: "--font-fest-sans",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
});

const mono = Noto_Sans_Mono({
  variable: "--font-fest-mono",
  subsets: ["latin", "cyrillic", "cyrillic-ext"],
  weight: ["400", "500"],
});

export const fontVariables = `${sans.variable} ${mono.variable}`;
