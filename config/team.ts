/**
 * Имена не переводятся (§9). Роль — ключ в content: team.roles.<role>.
 * photo: null → квадратная заглушка на --surface-2.
 */

export type TeamRole = "adviser" | "organizer";

export type TeamMember = {
  id: string;
  name: string;
  role: TeamRole;
  photo: string | null;
  linkedin: string | null;
};

export const team: TeamMember[] = [
  { id: "salizhan-k", name: "Salizhan K.", role: "adviser", photo: null, linkedin: null },
  { id: "aldiyar-b", name: "Aldiyar B.", role: "adviser", photo: null, linkedin: null },
  { id: "ilshatrozy-a", name: "Ilshatrozy A.", role: "organizer", photo: null, linkedin: null },
  { id: "arsen-a", name: "Arsen A.", role: "organizer", photo: null, linkedin: null },
  { id: "symbat-b", name: "Symbat B.", role: "organizer", photo: null, linkedin: null },
  { id: "aituar-a", name: "Aituar A.", role: "organizer", photo: null, linkedin: null },
  { id: "dair-t", name: "Dair T.", role: "organizer", photo: null, linkedin: null },
  { id: "alisha-a", name: "Alisha A.", role: "organizer", photo: null, linkedin: null },
  { id: "miras-b", name: "Miras B.", role: "organizer", photo: null, linkedin: null },
  { id: "nurkyz-y", name: "Nurkyz Y.", role: "organizer", photo: null, linkedin: null },
];
