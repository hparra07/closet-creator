import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/pageHead";
import { CountyTemplate } from "@/components/templates/CountyTemplate";
import { COUNTY_PRODUCTS, stackImg1, stackImg2, stackImg3, stackImg4, stackImg5 } from "@/lib/countyProducts";
import { defaultCountyFaqs, defaultCountyReasons } from "@/lib/countyPageDefaults";

export const Route = createFileRoute("/service-areas_/lee-county")({
  head: () =>
    pageHead({
      title: "Custom Storage Solutions in Lee County | JL Closets",
      description: "JL Closets designs and installs custom closets and storage solutions across Lee County — Fort Myers, Cape Coral, and the barrier islands.",
      path: "/service-areas/lee-county",
    }),
  component: LeeCounty,
});

function LeeCounty() {
  return (
    <CountyTemplate
      county="Lee County"
      hero={{
        title: (
          <>
            Custom Storage Solutions
            <br />
            in Lee County
          </>
        ),
        description: "Serving Fort Myers' historic riverfront, Cape Coral's waterway neighborhoods, and Lee County's barrier islands with tailored storage solutions.",
      }}
      solutions={{
        intro: (
          <>
            We design and install custom closets and storage systems across Lee County—<strong className="font-bold underline-animate">tailored to South Florida's climate and lifestyle</strong>.
          </>
        ),
        items: COUNTY_PRODUCTS,
      }}
      whyChoose={{
        title: (
          <>
            <strong className="font-bold">5 Reasons</strong> Why Lee County Homeowners Choose JL Closets
          </>
        ),
        intro: (
          <>
            <p>
              Lee County homes range from Cape Coral's waterfront canal homes to Sanibel's island cottages. Custom storage solutions make the most of whatever space you're working with.
            </p>
            <p>
              Here's why homeowners across Lee County trust JL Closets with their storage projects.
            </p>
          </>
        ),
        reasons: defaultCountyReasons("Lee County"),
        images: [stackImg1, stackImg2, stackImg3, stackImg4, stackImg5],
      }}
      areas={{
        title: "JL Closets' Lee County Service Areas",
        intro: "JL Closets proudly serves homeowners and businesses throughout Lee County. Our custom storage solutions are available in:",
        mapQuery: "Lee County, FL",
        groups: [
          ["Fort Myers", "Cape Coral", "Sanibel", "Bonita Springs"],
          ["Estero", "Lehigh Acres", "North Fort Myers", "Fort Myers Beach"],
        ],
        map: {
          countyId: "Lee",
          bbox: { x: 645.86863, y: 483.69156, width: 68.33172, height: 48.70915 },
          bounds: { north: 26.75, south: 26.32, east: -81.55, west: -82.15 },
          // A single reference pin — the full list of areas below does the
          // actual enumerating, so the map isn't left implying partial
          // coverage.
          pins: [{ name: "Fort Myers", lat: 26.6406, lon: -81.8723 }],
        },
      }}
      faq={{
        title: "FAQ: JL Closets' Design & Installation Process in Lee County",
        subtitle: "You have questions, we have the answers.",
        items: defaultCountyFaqs("Lee County"),
      }}
    />
  );
}
