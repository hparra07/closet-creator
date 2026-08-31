export type NavItem = { label: string; href?: string };
export type NavColumn = { heading?: string; headingHref?: string; items: NavItem[] };
export type NavEntry = { label: string; href?: string; submenu?: NavColumn[] };

export const NAV: NavEntry[] = [
  {
    label: "Closets & Storage",
    submenu: [
      { heading: "Custom Closets", headingHref: "/custom-closets", items: [{ label: "Walk In Closet", href: "/custom-closets/walk-in-closets" }, { label: "Reach In Closet" }, { label: "Custom Shoe Storage" }] },
      { heading: "Pantries", items: [{ label: "Pantry Cabinets" }, { label: "Pantry Shelving" }] },
      // Solo top-level categories (no children of their own) grouped into one
      // column instead of each getting its own near-empty grid cell.
      { items: [{ label: "Entertainment Centers" }, { label: "Home Office" }, { label: "Mudroom" }] },
      { heading: "Laundry Room", items: [{ label: "Laundry Room Cabinets" }, { label: "Laundry Room Shelving" }] },
      { heading: "Garage", items: [{ label: "Garage Cabinets and Shelving" }] },
      { heading: "More Storage Ideas", items: [{ label: "Small Space Storage" }, { label: "Murphy Bed" }, { label: "Wine Racks" }] },
      { heading: "Luxury", items: [{ label: "High End Wardrobe With Integrated Shoe Organizer" }] },
    ],
  },
  {
    label: "About",
    href: "/about",
    submenu: [
      {
        heading: "Who We Are & How We Work",
        items: [
          { label: "Custom Storage Solutions" },
          { label: "About", href: "/about" },
          { label: "Contact Us", href: "/contact" },
          { label: "Our Showroom", href: "/showroom" },
          { label: "FAQ", href: "/faq" },
          { label: "Design Process", href: "/design-process" },
          { label: "Customer Service", href: "/customer-service" },
          { label: "Careers", href: "/careers" },
        ],
      },
      {
        heading: "Why We Are The Best",
        items: [{ label: "Best Custom Closet Systems" }, { label: "Awards" }, { label: "JL Closets Reviews" }],
      },
    ],
  },
  {
    label: "JL Closets Gallery",
    submenu: [
      {
        heading: "See Our Work",
        items: [{ label: "Home Organization Idea Gallery" }, { label: "Portfolio", href: "/portfolio" }],
      },
    ],
  },
  {
    label: "Service Areas",
    href: "/service-areas",
    submenu: [
      {
        heading: "Areas We Serve",
        items: [
          { label: "Broward County", href: "/service-areas/broward-county" },
          { label: "Collier County", href: "/service-areas/collier-county" },
          { label: "Indian River County", href: "/service-areas/indian-river-county" },
          { label: "Lee County", href: "/service-areas/lee-county" },
          { label: "Martin County", href: "/service-areas/martin-county" },
          { label: "Miami Dade County", href: "/service-areas/miami-dade-county" },
          { label: "Okeechobee County", href: "/service-areas/okeechobee-county" },
          { label: "Palm Beach County", href: "/service-areas/palm-beach-county" },
          { label: "St Lucie County", href: "/service-areas/st-lucie-county" },
        ],
      },
    ],
  },
  {
    label: "Accessories",
    submenu: [
      {
        heading: "Upgrade Your Space",
        items: [
          { label: "Closet Lighting", href: "/accessories/closet-lighting" },
          { label: "Cabinet Finishes" },
          { label: "Doors And Drawers" },
          { label: "Closet Accessories" },
          { label: "Pantry Accessories" },
          { label: "Garage Accessories" },
        ],
      },
    ],
  },
  { label: "Contact Us", href: "/contact" },
];
