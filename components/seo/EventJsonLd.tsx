import { getTranslations } from "next-intl/server";
import { event } from "@/config/event";

/**
 * JSON-LD Event. Поля с null просто не попадают в разметку —
 * лучше неполный объект, чем объект с заглушками.
 */
export default async function EventJsonLd({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "meta" });

  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.name,
    description: t("description"),
    inLanguage: locale,
    eventAttendanceMode:
      event.format === "hybrid"
        ? "https://schema.org/MixedEventAttendanceMode"
        : "https://schema.org/OfflineEventAttendanceMode",
    organizer: {
      "@type": "Organization",
      name: `${event.shortName} team`,
    },
    location: {
      "@type": "Place",
      name: event.university,
      address: {
        "@type": "PostalAddress",
        addressLocality: event.city,
        addressCountry: "KZ",
        ...(event.venue.address ? { streetAddress: event.venue.address } : {}),
      },
    },
    offers: {
      "@type": "Offer",
      price: 0,
      priceCurrency: "KZT",
      availability: "https://schema.org/InStock",
      ...(event.registrationUrl ? { url: event.registrationUrl } : {}),
    },
  };

  if (event.startDate) data.startDate = event.startDate;
  if (event.endDate) data.endDate = event.endDate;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
