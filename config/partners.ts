/** Organization names are not translated. Viewports omit empty logo margins. */
export type Partner = {
  id: string;
  name: string;
  logo: string | null;
  url: string | null;
  logoWidth: number;
  logoHeight: number;
  logoViewBox: string;
};

export const partners: Partner[] = [
  {
    id: "nazarbayev-university",
    name: "Nazarbayev University",
    logo: "/NU.png",
    url: "https://nu.edu.kz",
    logoWidth: 1680,
    logoHeight: 462,
    logoViewBox: "54 50 1585 363",
  },
  {
    id: "ibm-quantum",
    name: "IBM Quantum",
    logo: "/IBM_Quantum_logotype_pos_RGB.png",
    url: "https://www.ibm.com/quantum",
    logoWidth: 3904,
    logoHeight: 1500,
    logoViewBox: "600 594 2702 386",
  },
  {
    id: "google-developer-group",
    name: "Google Developer Group",
    logo: "/googledevelopers.png",
    url: "https://developers.google.com",
    logoWidth: 1669,
    logoHeight: 1773,
    logoViewBox: "235 178 1271 1530",
  },
];
