import type { MetadataRoute } from "next";
import { locales } from "@/i18n/routing";

const SITE_URL = "https://qffca.vercel.app"; // TODO: заменить на боевой домен

const paths = ["", "/code-of-conduct"];

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) =>
    paths.map((path) => ({
      url: `${SITE_URL}/${locale}${path}`,
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.5,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l, `${SITE_URL}/${l}${path}`])
        ),
      },
    }))
  );
}
