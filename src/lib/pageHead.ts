import heroKitchen from "@/assets/home/hero-kitchen.webp";

export const SITE_URL = "https://jlclosets.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}${heroKitchen}`;

// Builds a route's canonical link + full Open Graph/Twitter meta set from
// the same title/description every route already defines, so each page gets
// its own og:title/og:description/canonical instead of silently inheriting
// the homepage's. `path` is the route's public URL path (e.g. "/about").
export function pageHead({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
}) {
  const url = `${SITE_URL}${path}`;
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: image },
    ],
    links: [{ rel: "canonical", href: url }],
  };
}
