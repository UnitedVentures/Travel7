// Single place for contact details and links used across the site.

export const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "/api";

export const SITE = {
  name: "Travel 7 (Pvt) Ltd",
  address:
    "209, 1st Floor, Srimath Anagarika Dharmapala Mawatha, Colombo 07",
};

export const LINKS = {
  goHolidays: "https://goholidays.lk",
  unitedVentures: "https://unitedventuressl.com",
  googleReview: "https://g.page/r/CZm8Y-Dw-2zKEBE/review",
  facebook: "https://www.facebook.com/travel7lk",
  instagram: "https://www.instagram.com/travel7.srilanka/",
};

export type TopicValue = "visa" | "air-tickets" | "insurance" | "general";

export const TOPICS: { value: TopicValue; label: string }[] = [
  { value: "visa", label: "Visa" },
  { value: "air-tickets", label: "Air Tickets" },
  { value: "insurance", label: "Travel Insurance" },
  { value: "general", label: "General inquiry" },
];

// WhatsApp numbers (digits only, with country code). Insurance and general
// inquiries use the air-ticket line for now.
export const WHATSAPP: Record<TopicValue, { number: string; text: string }> = {
  visa: {
    number: "94763131213",
    text: "Hi Travel7, I'd like to inquire about a visa.",
  },
  "air-tickets": {
    number: "94775111995",
    text: "Hi Travel7, I'd like to inquire about air tickets.",
  },
  insurance: {
    number: "94775111995",
    text: "Hi Travel7, I'd like to inquire about travel insurance.",
  },
  general: {
    number: "94775111995",
    text: "Hi Travel7, I have an inquiry.",
  },
};

export const GENERAL_PHONE = "+94115464646";

export const MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=Travel7+209+Srimath+Anagarika+Dharmapala+Mawatha+Colombo+07+Sri+Lanka";

/** "+94775111995" → "+94 77 511 1995" */
export function formatPhone(n: string) {
  const d = n.replace(/\D/g, "");
  if (d.startsWith("94") && d.length === 11) return `+94 ${d.slice(2, 4)} ${d.slice(4, 7)} ${d.slice(7)}`;
  return n;
}

// Contact cards (contact section + footer), as on the previous website.
export const CONTACT_GROUPS = [
  {
    label: "Airfare, Ticketing & Travel Insurance",
    topic: "air-tickets" as TopicValue,
    people: [
      { name: "Lushanthi", email: "Lushi@travel7lanka.com", mobile: "+94775111995", direct: "+94115220005" },
      { name: "Thashmila", email: "thashmila@travel7lanka.com", mobile: "+94778927076", direct: "" },
    ],
  },
  {
    label: "Visa services",
    topic: "visa" as TopicValue,
    people: [
      { name: "Thimira", email: "Visas@travel7lanka.com", mobile: "+94763131213", direct: "+94115220025" },
    ],
  },
];

export const NAV = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "reviews", label: "Reviews" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact us" },
];

// Shown if the reviews API can't be reached (e.g. local dev without PHP).
export const SEED_REVIEWS = [
  {
    id: -1,
    name: "Romesh Goonewardana",
    text: "I had an excellent experience with Travel 7 during my UK visa application and travel arrangements. The entire visa process was handled professionally and efficiently from start to finish.\n\nI would like to express my sincere thanks to Thimira and Vindhaya for their exceptional guidance, professionalism, and continuous support throughout the visa application process. They were always responsive, knowledgeable, and ensured that every step was completed smoothly.\n\nMy appreciation also goes to Lushanthi for handling my flight ticketing. The arrangements were made efficiently, and the entire booking process was seamless.\n\nI am truly impressed by the level of customer service provided by the Travel 7 team. They are reliable, trustworthy, and committed to delivering excellent service. I highly recommend Travel 7 to anyone seeking professional visa assistance and travel services.\n\nThank you to the entire team for making my UK travel experience smooth and stress-free. I look forward to using your services again in the future.",
  },
  {
    id: -2,
    name: "Roshan Wijeyarathne",
    text: "I recently got my Australian visit visa processed through Travel7, and the service was absolutely efficient from start to finish. They handled everything professionally from document submission and biometric appointments to visa follow-ups and forwarding the visa to me promptly.\n\nI've also experienced the same excellent service when booking overseas travel recently with a group of my friends through them. It's truly refreshing to deal with an organization that believes in genuine personalized customer service. Highly recommended for all your travel and visa needs!",
  },
];
