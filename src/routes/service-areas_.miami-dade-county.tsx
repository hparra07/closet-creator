import { createFileRoute } from "@tanstack/react-router";
import { CountyTemplate } from "@/components/templates/CountyTemplate";
import { COUNTY_PRODUCTS, stackImg1, stackImg2, stackImg3, stackImg4, stackImg5 } from "@/lib/countyProducts";
import { defaultCountyFaqs, defaultCountyReasons } from "@/lib/countyPageDefaults";

export const Route = createFileRoute("/service-areas_/miami-dade-county")({
  head: () => ({
    meta: [
      { title: "Custom Storage Solutions in Miami-Dade County | JL Closets" },
      {
        name: "description",
        content:
          "JL Closets designs and installs custom closets and storage solutions across Miami-Dade County — from Miami's high-rises to Homestead's family neighborhoods.",
      },
    ],
  }),
  component: MiamiDadeCounty,
});

function MiamiDadeCounty() {
  return (
    <CountyTemplate
      county="Miami-Dade County"
      hero={{
        title: (
          <>
            Custom Storage Solutions
            <br />
            in Miami-Dade County
          </>
        ),
        description: "Serving Miami's vibrant urban high-rises, Coral Gables' historic neighborhoods, and Homestead's family communities with tailored storage solutions.",
      }}
      solutions={{
        intro: (
          <>
            We design and install custom closets and storage systems across Miami-Dade County—<strong className="font-bold underline-animate">tailored to South Florida's climate and lifestyle</strong>.
          </>
        ),
        items: COUNTY_PRODUCTS,
      }}
      whyChoose={{
        title: (
          <>
            <strong className="font-bold">5 Reasons</strong> Why Miami-Dade County Homeowners Choose JL Closets
          </>
        ),
        intro: (
          <>
            <p>
              Miami-Dade County homes come in every shape and size — from downtown Miami's high-rise condos to Homestead's spacious family homes. Custom storage solutions make the most of whatever space you're working with.
            </p>
            <p>
              Here's why homeowners across Miami-Dade County trust JL Closets with their storage projects.
            </p>
          </>
        ),
        reasons: defaultCountyReasons("Miami-Dade County"),
        images: [stackImg1, stackImg2, stackImg3, stackImg4, stackImg5],
      }}
      areas={{
        title: "JL Closets' Miami-Dade County Service Areas",
        intro: "JL Closets proudly serves homeowners and businesses throughout Miami-Dade County. Our custom storage solutions are available in:",
        mapQuery: "Miami-Dade County, FL",
        groups: [
          ["Miami", "Hialeah", "Homestead", "Coral Gables"],
          ["Miami Beach", "Doral", "Cutler Bay", "Aventura"],
        ],
        map: {
          countyId: "Miami-Dade",
          bbox: { x: 780.57274, y: 567.16029, width: 72.74022, height: 86.67028 },
          bounds: { north: 25.98, south: 25.14, east: -80.12, west: -80.55 },
          // A single reference pin — the full list of areas below does the
          // actual enumerating, so the map isn't left implying partial
          // coverage.
          pins: [{ name: "Miami", lat: 25.7617, lon: -80.1918 }],
        },
      }}
      faq={{
        title: "FAQ: JL Closets' Design & Installation Process in Miami-Dade County",
        subtitle: "You have questions, we have the answers.",
        items: defaultCountyFaqs("Miami-Dade County"),
      }}
    />
  );
}
