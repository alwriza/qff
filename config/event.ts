export const event = {
  name: "Hilbert Space Quantum Fest 2026",
  shortName: "HSQF’26",
  university: "Nazarbayev University",
  city: "Astana",
  startDate: "2026-10-31T09:30:00+05:00" as string | null,
  endDate: "2026-11-28" as string | null,
  saturdays: 5,
  registrationUrl: null as string | null, // null → встроенная форма /[locale]/register
  registrationDeadline: "22 October 2026" as string | null,
  format: "hybrid" as "in-person" | "hybrid" | null,
  venue: {
    building: null as string | null,
    room: null as string | null,
    address: null as string | null,
    mapUrl: null as string | null,
  },
  contactEmail: "centralasianhilbertspace@gmail.com" as string | null,
  communityUrl: null as string | null,
  socials: {
    instagram: "https://www.instagram.com/hilbertspace.ca/" as string | null,
    linkedin: null as string | null,
    telegram: null as string | null,
  },
  postEvent: { enabled: false },
};

export type Event = typeof event;
