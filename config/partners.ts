/**
 * Названия организаций не переводятся (§9).
 * Описание — ключ в content: partners.items.<id>.
 * logo: null → текстовая заглушка. Векторы ещё не получены (§12).
 */

export type Partner = {
  id: string;
  name: string;
  logo: string | null;
  url: string | null;
};

export const partners: Partner[] = [
  // TODO: replace with official vector logo
  { id: "nazarbayev-university", name: "Nazarbayev University", logo: "/NU.png", url: "https://nu.edu.kz" },
  // TODO: replace with official IBM Quantum lockup (не 8-полосный логотип IBM)
  { id: "ibm-quantum", name: "IBM Quantum", logo: "/IBM_Quantum_logotype_pos_RGB.png", url: "https://www.ibm.com/quantum" },
  { id: "google-developer-group", name: "Google Developer Group", logo: "/googledevelopers.png", url: "https://developers.google.com" },
  { id: "central-asian-hilbert-space", name: "Central Asian Hilbert Space", logo: null, url: null },
];
