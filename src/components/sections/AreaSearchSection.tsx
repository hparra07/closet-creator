import { useState } from "react";
import { Search } from "lucide-react";
import { SectionWrapper } from "@/components/common/SectionWrapper";

const SERVICE_AREAS = [
  "Broward County",
  "Collier County",
  "Indian River County",
  "Lee County",
  "Martin County",
  "Miami-Dade County",
  "Okeechobee County",
  "Palm Beach County",
  "St. Lucie County",
];

export function AreaSearchSection() {
  const [query, setQuery] = useState("");

  const filtered = query.trim()
    ? SERVICE_AREAS.filter((a) => a.toLowerCase().includes(query.toLowerCase()))
    : [];

  const hasQuery = query.trim().length > 0;

  return (
    <SectionWrapper className="!pt-0 !pb-10">
      <div className="max-w-xl mx-auto text-center">
        <div className="mb-6">
          <h2 className="rule eyebrow" style={{ color: "#313131" }}>Find Your Area</h2>
        </div>
        <p className="text-base leading-relaxed mb-8" style={{ color: "#313131" }}>
          Use the search form below to find the nearest location we serve.
        </p>

        <div className="flex items-center border border-foreground/20 overflow-hidden">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="flex-1 px-4 py-3 text-base bg-transparent outline-none placeholder:text-foreground/40"
          />
          <div className="px-4 py-3 bg-ink text-ink-foreground">
            <Search className="w-5 h-5" />
          </div>
        </div>

        {hasQuery && (
          <div className="mt-4 text-left border border-foreground/10 divide-y divide-foreground/10">
            {filtered.length > 0 ? (
              filtered.map((area) => (
                <div key={area} className="px-4 py-3 text-sm font-medium" style={{ color: "#313131" }}>
                  {area}
                </div>
              ))
            ) : (
              <div className="px-4 py-3 text-sm text-foreground/50">
                No matching service areas found. Call us at{" "}
                <a href="tel:+15619129881" className="text-primary hover:underline">(561) 912-9881</a> to discuss your location.
              </div>
            )}
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
