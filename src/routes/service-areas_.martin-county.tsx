import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/pageHead";
import { CountyTemplate } from "@/components/templates/CountyTemplate";
import { COUNTY_PRODUCTS, stackImg1, stackImg2, stackImg3, stackImg4, stackImg5 } from "@/lib/countyProducts";
import { defaultCountyFaqs, defaultCountyReasons } from "@/lib/countyPageDefaults";

export const Route = createFileRoute("/service-areas_/martin-county")({
  head: () =>
    pageHead({
      title: "Custom Storage Solutions in Martin County | JL Closets",
      description: "JL Closets designs and installs custom closets and storage solutions across Martin County — Stuart's waterfront charm and beyond.",
      path: "/service-areas/martin-county",
    }),
  component: MartinCounty,
});

function MartinCounty() {
  return (
    <CountyTemplate
      county="Martin County"
      hero={{
        title: (
          <>
            Custom Storage Solutions
            <br />
            in Martin County
          </>
        ),
        description: "Serving Stuart's waterfront charm, Jensen Beach's coastal communities, and Martin County's family neighborhoods with tailored storage solutions.",
      }}
      solutions={{
        intro: (
          <>
            We design and install custom closets and storage systems across Martin County—<strong className="font-bold underline-animate">tailored to South Florida's climate and lifestyle</strong>.
          </>
        ),
        items: COUNTY_PRODUCTS,
      }}
      whyChoose={{
        title: (
          <>
            <strong className="font-bold">5 Reasons</strong> Why Martin County Homeowners Choose JL Closets
          </>
        ),
        intro: (
          <>
            <p>
              Martin County homes range from Stuart's riverfront properties to Hobe Sound's quiet coastal neighborhoods. Custom storage solutions make the most of whatever space you're working with.
            </p>
            <p>
              Here's why homeowners across Martin County trust JL Closets with their storage projects.
            </p>
          </>
        ),
        reasons: defaultCountyReasons("Martin County"),
        images: [stackImg1, stackImg2, stackImg3, stackImg4, stackImg5],
      }}
      areas={{
        title: "JL Closets' Martin County Service Areas",
        intro: "JL Closets proudly serves homeowners and businesses throughout Martin County. Our custom storage solutions are available in:",
        mapQuery: "Martin County, FL",
        groups: [
          ["Stuart", "Jensen Beach", "Palm City", "Hobe Sound"],
          ["Indiantown", "Sewall's Point", "Jupiter Island", "Ocean Breeze"],
        ],
        map: {
          countyId: "Martin",
          bbox: { x: 779.34815, y: 434.75373, width: 77.88347, height: 31.78672 },
          bounds: { north: 27.30, south: 26.90, east: -80.10, west: -80.60 },
          // A single reference pin — the full list of areas below does the
          // actual enumerating, so the map isn't left implying partial
          // coverage.
          pins: [{ name: "Stuart", lat: 27.1973, lon: -80.2528 }],
        },
      }}
      faq={{
        title: "FAQ: JL Closets' Design & Installation Process in Martin County",
        subtitle: "You have questions, we have the answers.",
        items: defaultCountyFaqs("Martin County"),
      }}
    />
  );
}
