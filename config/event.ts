export const event = {
  name: "Qiskit Fall Fest Central Asia 2026",
  shortName: "QFFCA 2026",
  university: "Nazarbayev University",
  city: "Astana",
  startDate: null as string | null, // "2026-10-24" — countdown и hero
  endDate: null as string | null,
  saturdays: 5,
  seats: { min: 70, max: 100 },
  price: "free",
  registrationUrl: null as string | null, // null → кнопка disabled, "opens soon"
  registrationDeadline: null as string | null,
  format: null as "in-person" | "hybrid" | null,
  venue: {
    building: null as string | null,
    room: null as string | null,
    address: null as string | null,
    mapUrl: null as string | null,
  },
  contactEmail: null as string | null, // ЛИЧНУЮ ПОЧТУ НЕ СТАВИТЬ
  communityUrl: null as string | null,
  socials: {
    instagram: null as string | null,
    linkedin: null as string | null,
    telegram: null as string | null,
  },
  postEvent: { enabled: false },
};

export type Event = typeof event;
