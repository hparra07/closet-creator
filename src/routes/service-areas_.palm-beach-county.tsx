import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/pageHead";
import { CountyTemplate } from "@/components/templates/CountyTemplate";
import { COUNTY_PRODUCTS, stackImg1, stackImg2, stackImg3, stackImg4, stackImg5 } from "@/lib/countyProducts";
import { defaultCountyFaqs, defaultCountyReasons } from "@/lib/countyPageDefaults";

export const Route = createFileRoute("/service-areas_/palm-beach-county")({
  head: () =>
    pageHead({
      title: "Custom Storage Solutions in Palm Beach County | JL Closets",
      description: "JL Closets designs and installs custom closets and storage solutions across Palm Beach County — from Jupiter to Boca Raton and everywhere between.",
      path: "/service-areas/palm-beach-county",
    }),
  component: PalmBeachCounty,
});

function PalmBeachCounty() {
  return (
    <CountyTemplate
      county="Palm Beach County"
      hero={{
        title: (
          <>
            Custom Storage Solutions
            <br />
            in Palm Beach County
          </>
        ),
        description: "Serving Palm Beach County's oceanfront estates, suburban family homes, and equestrian communities with tailored storage solutions.",
      }}
      solutions={{
        intro: (
          <>
            We design and install custom closets and storage systems across Palm Beach County—<strong className="font-bold underline-animate">tailored to South Florida's climate and lifestyle</strong>.
          </>
        ),
        items: COUNTY_PRODUCTS,
      }}
      whyChoose={{
        title: (
          <>
            <strong className="font-bold">5 Reasons</strong> Why Palm Beach County Homeowners Choose JL Closets
          </>
        ),
        intro: (
          <>
            <p>
              Palm Beach County homes come in every shape and size — from Jupiter's coastal estates to Wellington's equestrian properties and Belle Glade's farming communities. Custom storage solutions make the most of whatever space you're working with.
            </p>
            <p>
              Here's why homeowners across Palm Beach County trust JL Closets with their storage projects.
            </p>
          </>
        ),
        reasons: defaultCountyReasons("Palm Beach County"),
        images: [stackImg1, stackImg2, stackImg3, stackImg4, stackImg5],
      }}
      areas={{
        title: "JL Closets' Palm Beach County Service Areas",
        intro: "JL Closets proudly serves homeowners and businesses throughout Palm Beach County. Our custom storage solutions are available in:",
        mapQuery: "Palm Beach County, FL",
        groups: [
          ["West Palm Beach", "Boca Raton", "Delray Beach", "Boynton Beach"],
          ["Jupiter", "Wellington", "Palm Beach Gardens", "Lake Worth Beach"],
          ["Belle Glade", "Royal Palm Beach", "Tequesta", "Lantana"],
        ],
        map: {
          countyId: "Palm_Beach_County",
          bbox: { x: 779.34815, y: 464.48232, width: 82.29197, height: 67.68971 },
          bounds: { north: 26.97, south: 26.32, east: -80.03, west: -80.87 },
          // A single reference pin — the full list of areas below does the
          // actual enumerating, so the map isn't left implying partial
          // coverage.
          pins: [{ name: "West Palm Beach", lat: 26.7153, lon: -80.0534 }],
        },
      }}
      faq={{
        title: "FAQ: JL Closets' Design & Installation Process in Palm Beach County",
        subtitle: "You have questions, we have the answers.",
        items: defaultCountyFaqs("Palm Beach County"),
      }}
    />
  );
}
