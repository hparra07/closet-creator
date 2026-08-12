import jlLogo from "@/assets/global/jl-logo.webp";
import { SOCIAL_LINKS } from "@/lib/social";

const SITE_URL = "https://jlclosets.com";

export const LOCAL_BUSINESS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  "@id": `${SITE_URL}/#organization`,
  name: "JL Closets",
  url: SITE_URL,
  logo: `${SITE_URL}${jlLogo}`,
  image: `${SITE_URL}${jlLogo}`,
  telephone: "+1-561-912-9881",
  email: "leads@jlclosets.com",
  priceRange: "$$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "160 NW 16th St",
    addressLocality: "Boca Raton",
    addressRegion: "FL",
    postalCode: "33432",
    addressCountry: "US",
  },
  openingHoursSpecification: [
    { "@type": "OpeningHoursSpecification", dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"], opens: "08:00", closes: "17:00" },
  ],
  areaServed: [
    "Palm Beach County, FL",
    "Broward County, FL",
    "Miami-Dade County, FL",
    "Lee County, FL",
    "Collier County, FL",
    "Martin County, FL",
    "St. Lucie County, FL",
    "Indian River County, FL",
    "Okeechobee County, FL",
  ].map((name) => ({ "@type": "AdministrativeArea", name })),
  sameAs: SOCIAL_LINKS.map((s) => s.url),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "168",
  },
};
