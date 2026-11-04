// ===== VISA DATA — edit here. =====
// Per country: flag, and for tourist (t) & business (b): processing time, visa fee,
// extra costs, and the checklist. Add `pdf` once a checklist PDF is available.
// Indicative figures only — always confirm with the embassy / VFS.

export type Extra = [label: string, amount: string];

export type VisaType = {
  time: string;
  fee: string;
  extras: Extra[];
  docs: string[];
  pdf?: string;
};

export type Country = { flag: string; tourist: VisaType; business: VisaType };

const COMMON = [
  "Passport valid 6+ months, with 2 blank pages",
  "Completed application form",
  "Recent passport-size photographs",
  "Bank statements – last 6 months",
  "Employment letter + approved leave letter (or business registration)",
  "Travel itinerary and accommodation bookings",
  "Copy of NIC and civil documents (as required)",
];

const BIZ = [
  "Invitation letter from host company",
  "Company registration, tax and business profile",
  "Letter from employer stating purpose and duration of trip",
];

export const VISA_DATA: Record<string, Country> = {
  "United Kingdom": {
    flag: "🇬🇧",
    tourist: {
      time: "About 3 weeks (15 working days)",
      fee: "£127 (Standard Visitor, up to 6 months)",
      extras: [
        ["VFS service charge", "LKR 8,000 (approx.)"],
        ["Courier return", "LKR 1,500"],
      ],
      docs: [...COMMON, "Previous UK / travel history, if any"],
      pdf: "https://unitedventuressl-my.sharepoint.com/:b:/g/personal/visas_travel7lanka_com/IQAsx2bhdJfWR7z3cijW88CwAdbDPS8dS7TGP6dZYfNC7vk?e=khOp1S",
    },
    business: {
      time: "About 3 weeks (15 working days)",
      fee: "£127 (Standard Visitor, business activities)",
      extras: [
        ["VFS service charge", "LKR 8,000 (approx.)"],
        ["Courier return", "LKR 1,500"],
      ],
      docs: [...COMMON, ...BIZ],
      pdf: "https://unitedventuressl-my.sharepoint.com/:b:/g/personal/visas_travel7lanka_com/IQA8kc1o9i0cSrv6m6K2S2bUAfUNfO9Uoq20m4lvpEpeBtY?e=CRcBaW",
    },
  },
  "Schengen (Europe)": {
    flag: "🇪🇺",
    tourist: {
      time: "15 days (can extend up to 45)",
      fee: "€90 (adults)",
      extras: [
        ["Service charge (VFS / TLS)", "≈ €30"],
        ["Travel insurance (min. €30,000)", "LKR 6,000–10,000"],
        ["Hotel booking arrangement", "LKR 4,000–10,000"],
      ],
      docs: [
        ...COMMON,
        "Travel insurance covering all Schengen states",
        "Return flight reservation",
      ],
    },
    business: {
      time: "15 days (can extend up to 45)",
      fee: "€90 (adults)",
      extras: [
        ["Service charge (VFS / TLS)", "≈ €30"],
        ["Travel insurance (min. €30,000)", "LKR 6,000–10,000"],
      ],
      docs: [
        ...COMMON,
        "Travel insurance covering all Schengen states",
        "Return flight reservation",
        ...BIZ,
      ],
    },
  },
  Canada: {
    flag: "🇨🇦",
    tourist: {
      time: "Varies – typically 4 to 10 weeks",
      fee: "CAD 100 (Visitor Visa)",
      extras: [
        ["Biometrics fee", "CAD 85"],
        ["VAC service charge", "LKR 5,000 (approx.)"],
      ],
      docs: [
        ...COMMON,
        "Proof of ties to Sri Lanka (property / family / job)",
        "Purpose-of-visit letter",
      ],
      pdf: "https://unitedventuressl-my.sharepoint.com/:b:/g/personal/visas_travel7lanka_com/IQBYz9P-lY1pR7JiG0lJ2PCCAUhkVQ642QJ82PsldV_-Arc?e=ESoiaE",
    },
    business: {
      time: "Varies – typically 4 to 10 weeks",
      fee: "CAD 100 (Visitor Visa)",
      extras: [
        ["Biometrics fee", "CAD 85"],
        ["VAC service charge", "LKR 5,000 (approx.)"],
      ],
      docs: [...COMMON, ...BIZ],
      pdf: "https://unitedventuressl-my.sharepoint.com/:b:/g/personal/visas_travel7lanka_com/IQA9WgIZOaV3S6B_a4VuWfXmAZfaFJ8Ahshj9PkT1uBj5V8?e=DY88js",
    },
  },
  USA: {
    flag: "🇺🇸",
    tourist: {
      time: "Depends on interview appointment wait time",
      fee: "USD 185 (B-2 Tourist)",
      extras: [
        ["DS-160 form preparation", "LKR 5,000"],
        ["Other US-government fees, if applicable", "Check current rules"],
      ],
      docs: [
        ...COMMON,
        "DS-160 confirmation page",
        "Interview appointment confirmation",
      ],
    },
    business: {
      time: "Depends on interview appointment wait time",
      fee: "USD 185 (B-1 Business)",
      extras: [
        ["DS-160 form preparation", "LKR 5,000"],
        ["Other US-government fees, if applicable", "Check current rules"],
      ],
      docs: [
        ...COMMON,
        "DS-160 confirmation page",
        "Interview appointment confirmation",
        ...BIZ,
      ],
    },
  },
  Australia: {
    flag: "🇦🇺",
    tourist: {
      time: "About 3 to 6 weeks",
      fee: "AUD 200 (Visitor 600)",
      extras: [
        ["Biometrics (if requested)", "AUD 0 – check"],
        ["Medical (if requested)", "Panel doctor fee"],
      ],
      docs: [...COMMON, "Proof of funds and ties to Sri Lanka"],
      pdf: "https://unitedventuressl-my.sharepoint.com/:b:/g/personal/visas_travel7lanka_com/IQDBbzTLPYf3TpLQAG1Ct_acAYjrwXHeOlZ6Tyh6HlcTlLY?e=xissn2",
    },
    business: {
      time: "About 3 to 6 weeks",
      fee: "AUD 200 (Visitor 600 – Business)",
      extras: [["Medical (if requested)", "Panel doctor fee"]],
      docs: [...COMMON, ...BIZ],
      pdf: "https://unitedventuressl-my.sharepoint.com/:b:/g/personal/visas_travel7lanka_com/IQBZhrpWj8iVS4DTFtymHyIxARG8-6JPOUZRlqpfUn9rE7Y?e=iOfpI6",
    },
  },
};
