export type NavItem = { label: string; href?: string };
export type NavColumn = { heading?: string; headingHref?: string; items: NavItem[] };
export type NavEntry = { label: string; href?: string; submenu?: NavColumn[] };

export const NAV: NavEntry[] = [
  {
    label: "Closets & Storage",
    submenu: [
      { heading: "Custom Closets", headingHref: "/custom-closets", items: [{ label: "Walk In Closet", href: "/custom-closets/walk-in-closets" }, { label: "Reach In Closet" }, { label: "Custom Shoe Storage" }] },
      { items: [{ label: "Entertainment Centers" }] },
      { items: [{ label: "Home Office" }] },
      { heading: "Pantries", items: [{ label: "Pantry Cabinets" }, { label: "Pantry Shelving" }] },
      { items: [{ label: "Mudroom" }] },
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
          { label: "Our Showroom" },
          { label: "FAQ" },
          { label: "Design Process" },
          { label: "Customer Service" },
          { label: "Careers" },
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
        items: [{ label: "Home Organization Idea Gallery" }, { label: "Portfolio" }],
      },
    ],
  },
  {
    label: "Service Areas",
    submenu: [
      {
        heading: "Areas We Serve",
        items: [
          { label: "Broward County" },
          { label: "Collier County" },
          { label: "Indian River County" },
          { label: "Lee County" },
          { label: "Martin County" },
          { label: "Miami Dade County" },
          { label: "Okeechobee County" },
          { label: "Palm Beach County" },
          { label: "St Lucie County" },
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
          { label: "Closet Lighting" },
          { label: "Cabinet Finishes" },
          { label: "Custom Closet Doors And Drawers" },
          { label: "Closet Accessories" },
          { label: "Pantry Accessories" },
          { label: "Garage Accessories" },
        ],
      },
    ],
  },
  { label: "Contact Us", href: "/contact" },
];
