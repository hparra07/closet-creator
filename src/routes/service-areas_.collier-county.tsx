import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/pageHead";
import { CountyTemplate } from "@/components/templates/CountyTemplate";
import { COUNTY_PRODUCTS, stackImg1, stackImg2, stackImg3, stackImg4, stackImg5 } from "@/lib/countyProducts";
import { defaultCountyFaqs, defaultCountyReasons } from "@/lib/countyPageDefaults";

export const Route = createFileRoute("/service-areas_/collier-county")({
  head: () =>
    pageHead({
      title: "Custom Storage Solutions in Collier County | JL Closets",
      description: "JL Closets designs and installs custom closets and storage solutions across Collier County — Naples' upscale coastal living and beyond.",
      path: "/service-areas/collier-county",
    }),
  component: CollierCounty,
});

function CollierCounty() {
  return (
    <CountyTemplate
      county="Collier County"
      hero={{
        title: (
          <>
            Custom Storage Solutions
            <br />
            in Collier County
          </>
        ),
        description: "Serving Naples' upscale coastal living, Marco Island's beachfront homes, and Collier County's Everglades-edge communities with tailored storage solutions.",
      }}
      solutions={{
        intro: (
          <>
            We design and install custom closets and storage systems across Collier County—<strong className="font-bold underline-animate">tailored to South Florida's climate and lifestyle</strong>.
          </>
        ),
        items: COUNTY_PRODUCTS,
      }}
      whyChoose={{
        title: (
          <>
            <strong className="font-bold">5 Reasons</strong> Why Collier County Homeowners Choose JL Closets
          </>
        ),
        intro: (
          <>
            <p>
              Collier County homes range from Naples' upscale beachfront estates to Marco Island's waterfront condos. Custom storage solutions make the most of whatever space you're working with.
            </p>
            <p>
              Here's why homeowners across Collier County trust JL Closets with their storage projects.
            </p>
          </>
        ),
        reasons: defaultCountyReasons("Collier County"),
        images: [stackImg1, stackImg2, stackImg3, stackImg4, stackImg5],
      }}
      areas={{
        title: "JL Closets' Collier County Service Areas",
        intro: "JL Closets proudly serves homeowners and businesses throughout Collier County. Our custom storage solutions are available in:",
        mapQuery: "Collier County, FL",
        groups: [
          ["Naples", "Marco Island", "Immokalee", "Everglades City"],
          ["Golden Gate", "Ave Maria", "Pelican Bay", "Lely"],
        ],
        map: {
          countyId: "Collier",
          bbox: { x: 686.52478, y: 511.81938, width: 94.04796, height: 73.63543 },
          bounds: { north: 26.50, south: 25.75, east: -81.20, west: -81.90 },
          // A single reference pin — the full list of areas below does the
          // actual enumerating, so the map isn't left implying partial
          // coverage.
          pins: [{ name: "Naples", lat: 26.1420, lon: -81.7948 }],
        },
      }}
      faq={{
        title: "FAQ: JL Closets' Design & Installation Process in Collier County",
        subtitle: "You have questions, we have the answers.",
        items: defaultCountyFaqs("Collier County"),
      }}
    />
  );
}
