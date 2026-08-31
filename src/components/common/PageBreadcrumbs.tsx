import { Link, useRouterState } from "@tanstack/react-router";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SITE_URL } from "@/lib/pageHead";

// Slugs that don't title-case cleanly on their own (kept between hyphens,
// abbreviations, etc.) — anything not listed here falls back to a generic
// "replace hyphens, capitalize each word" formatting.
const LABEL_OVERRIDES: Record<string, string> = {
  "walk-in-closets": "Walk-In Closets",
  "closet-lighting": "Closet Lighting",
  "service-areas": "Service Areas",
  "custom-closets": "Custom Closets",
  "miami-dade-county": "Miami-Dade County",
  "st-lucie-county": "St. Lucie County",
  "indian-river-county": "Indian River County",
  "palm-beach-county": "Palm Beach County",
  "broward-county": "Broward County",
  "collier-county": "Collier County",
  "lee-county": "Lee County",
  "martin-county": "Martin County",
  "okeechobee-county": "Okeechobee County",
  "faq": "FAQ",
  "design-process": "Design Process",
  "customer-service": "Customer Service",
  "careers": "Careers",
};

function labelFor(slug: string) {
  return LABEL_OVERRIDES[slug] ?? slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// Renders visible breadcrumbs (Home > ... > Current Page) plus matching
// BreadcrumbList JSON-LD, purely from the current URL — no per-page props
// needed, so dropping <PageBreadcrumbs /> into any route/template just works.
export function PageBreadcrumbs() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return null;

  const crumbs = segments.map((segment, i) => ({
    label: labelFor(segment),
    href: "/" + segments.slice(0, i + 1).join("/"),
    isLast: i === segments.length - 1,
  }));

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      ...crumbs.map((c, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: c.label,
        item: `${SITE_URL}${c.href}`,
      })),
    ],
  };

  return (
    <div className="px-5 md:px-16 py-3 border-b border-foreground/10">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Breadcrumb>
        <BreadcrumbList className="text-xs md:text-sm">
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/" className="relative inline-flex text-[#5a5a5a] hover:text-primary after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-[1px] after:bg-current after:transition-all after:duration-300 after:-translate-x-1/2 hover:after:w-full">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {crumbs.map((c) => (
            <span key={c.href} className="inline-flex items-center gap-1.5 sm:gap-2.5">
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {c.isLast ? (
                  <BreadcrumbPage style={{ color: "#313131" }}>{c.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={c.href} className="relative inline-flex text-[#5a5a5a] hover:text-primary after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-[1px] after:bg-current after:transition-all after:duration-300 after:-translate-x-1/2 hover:after:w-full">{c.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </span>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
