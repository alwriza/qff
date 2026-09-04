import type { MetadataRoute } from "next";

const SITE_URL = "https://qffca.vercel.app"; // TODO: заменить на боевой домен

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
