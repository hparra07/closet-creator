import type { PortfolioProject } from "@/components/sections/PortfolioGallery";

// Every photo in src/assets/portfolio/ is named "<project-slug>-NN.webp" —
// pulled in with import.meta.glob instead of one import statement per file
// (75 photos across 12 projects) and grouped back into projects by slug.
const modules = import.meta.glob("../assets/portfolio/*.webp", { eager: true, import: "default" }) as Record<string, string>;

type ProjectMeta = { slug: string; name: string; alt: string };

const PROJECT_META: ProjectMeta[] = [
  { slug: "wellington-residence", name: "Wellington Residence", alt: "Custom walk-in closet with dark cabinetry and bubble-glass chandelier, Wellington Residence" },
  { slug: "le-lac-residence", name: "Le Lac Residence", alt: "Custom walk-in closet with light wood cabinetry, marble-top island, and gold hardware, Le Lac Residence" },
  { slug: "bridges-residence", name: "The Bridges Residence", alt: "Custom closet with mirrored glass display cabinetry and crystal chandelier, The Bridges Residence" },
  { slug: "royal-palm-residence", name: "Royal Palm Residence", alt: "Custom closet with light cabinetry and drawer detail, Royal Palm Residence" },
  { slug: "royal-palm-country-club", name: "Royal Palm Country Club Residence", alt: "Custom closet with open shelving and folded storage, Royal Palm Country Club Residence" },
  { slug: "mens-walk-in-closet", name: "Men's Walk-In Closet", alt: "Men's custom walk-in closet with dark cabinetry and rolling library ladder" },
  { slug: "delray-residence", name: "Delray Residence", alt: "Custom mudroom and laundry room combination with wood cabinetry and sink, Delray Residence" },
  { slug: "las-olas-residence", name: "Las Olas Residence", alt: "Custom walk-in closet with LED-lit shelving and glass display cabinets, Las Olas Residence" },
  { slug: "lighthouse-point-residence", name: "Lighthouse Point Residence", alt: "Custom walk-in closet with glossy white cabinetry and glass doors, Lighthouse Point Residence" },
  { slug: "palm-beach-residence", name: "Palm Beach Residence", alt: "Custom closet display shelving with heart-motif artwork, Palm Beach Residence" },
  { slug: "four-seasons-parkland", name: "Four Seasons Parkland", alt: "Custom high-gloss blue locker storage, Four Seasons Parkland" },
  { slug: "azalea-boca-raton", name: "Azalea, Boca Raton", alt: "Custom walk-in closet with marble-top island and crystal chandelier, Azalea, Boca Raton" },
];

function imagesForSlug(slug: string, alt: string) {
  return Object.entries(modules)
    .filter(([path]) => path.includes(`/${slug}-`))
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([, src], i) => ({ src, alt: `${alt} — view ${i + 1}` }));
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = PROJECT_META.map(({ slug, name, alt }) => ({
  name,
  images: imagesForSlug(slug, alt),
}));
