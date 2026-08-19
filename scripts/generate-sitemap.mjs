import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

// Mirrors the routes in src/routes/ — update this list when a route is
// added or removed. There's no automated route-tree walk here since
// TanStack Start's generated route tree doesn't carry priority/changefreq
// intent, and the route count is small enough that a maintained list is
// more reliable than inferring it.
const SITE_URL = "https://jlclosets.com";

const ROUTES = [
  { path: "/", priority: "1.0", changefreq: "weekly" },
  { path: "/about", priority: "0.7", changefreq: "monthly" },
  { path: "/contact", priority: "0.7", changefreq: "monthly" },
  { path: "/custom-closets", priority: "0.9", changefreq: "monthly" },
  { path: "/custom-closets/walk-in-closets", priority: "0.8", changefreq: "monthly" },
  { path: "/accessories/closet-lighting", priority: "0.7", changefreq: "monthly" },
  { path: "/portfolio", priority: "0.7", changefreq: "monthly" },
  { path: "/showroom", priority: "0.6", changefreq: "monthly" },
  { path: "/faq", priority: "0.6", changefreq: "monthly" },
  { path: "/service-areas", priority: "0.8", changefreq: "monthly" },
  { path: "/service-areas/broward-county", priority: "0.6", changefreq: "monthly" },
  { path: "/service-areas/collier-county", priority: "0.6", changefreq: "monthly" },
  { path: "/service-areas/indian-river-county", priority: "0.6", changefreq: "monthly" },
  { path: "/service-areas/lee-county", priority: "0.6", changefreq: "monthly" },
  { path: "/service-areas/martin-county", priority: "0.6", changefreq: "monthly" },
  { path: "/service-areas/miami-dade-county", priority: "0.6", changefreq: "monthly" },
  { path: "/service-areas/okeechobee-county", priority: "0.6", changefreq: "monthly" },
  { path: "/service-areas/palm-beach-county", priority: "0.6", changefreq: "monthly" },
  { path: "/service-areas/st-lucie-county", priority: "0.6", changefreq: "monthly" },
];

const today = new Date().toISOString().slice(0, 10);

const body = ROUTES.map(
  ({ path, priority, changefreq }) => `  <url>
    <loc>${SITE_URL}${path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
).join("\n");

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${body}
</urlset>
`;

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = resolve(__dirname, "../public/sitemap.xml");
writeFileSync(outPath, xml);
console.log(`sitemap.xml written with ${ROUTES.length} routes -> ${outPath}`);
