import { createFileRoute } from "@tanstack/react-router";
import { CountyTemplate } from "@/components/templates/CountyTemplate";
import { COUNTY_PRODUCTS, stackImg1, stackImg2, stackImg3, stackImg4, stackImg5 } from "@/lib/countyProducts";
import { defaultCountyFaqs, defaultCountyReasons } from "@/lib/countyPageDefaults";

export const Route = createFileRoute("/service-areas_/indian-river-county")({
  head: () => ({
    meta: [
      { title: "Custom Storage Solutions in Indian River County | JL Closets" },
      {
        name: "description",
        content:
          "JL Closets designs and installs custom closets and storage solutions across Indian River County — Vero Beach's coastal neighborhoods and beyond.",
      },
    ],
  }),
  component: IndianRiverCounty,
});

function IndianRiverCounty() {
  return (
    <CountyTemplate
      county="Indian River County"
      hero={{
        title: (
          <>
            Custom Storage Solutions
            <br />
            in Indian River County
          </>
        ),
        description: "Serving Vero Beach's laid-back coastal neighborhoods, oceanfront condos, and citrus-country homes with tailored storage solutions.",
      }}
      solutions={{
        intro: (
          <>
            We design and install custom closets and storage systems across Indian River County—<strong className="font-bold underline-animate">tailored to South Florida's climate and lifestyle</strong>.
          </>
        ),
        items: COUNTY_PRODUCTS,
      }}
      whyChoose={{
        title: (
          <>
            <strong className="font-bold">5 Reasons</strong> Why Indian River County Homeowners Choose JL Closets
          </>
        ),
        intro: (
          <>
            <p>
              Indian River County homes range from oceanfront condos in Vero Beach to sprawling homes tucked among citrus groves. Custom storage solutions make the most of whatever space you're working with.
            </p>
            <p>
              Here's why homeowners across Indian River County trust JL Closets with their storage projects.
            </p>
          </>
        ),
        reasons: defaultCountyReasons("Indian River County"),
        images: [stackImg1, stackImg2, stackImg3, stackImg4, stackImg5],
      }}
      areas={{
        title: "JL Closets' Indian River County Service Areas",
        intro: "JL Closets proudly serves homeowners and businesses throughout Indian River County. Our custom storage solutions are available in:",
        mapQuery: "Indian River County, FL",
        groups: [
          ["Vero Beach", "Sebastian", "Fellsmere", "Indian River Shores"],
          ["Wabasso", "Gifford", "Winter Beach", "Roseland"],
        ],
        map: {
          countyId: "Indian_River",
          bbox: { x: 779.59307, y: 373.23841, width: 54.12656, height: 31.32936 },
          bounds: { north: 27.87, south: 27.53, east: -80.35, west: -80.65 },
          // A single reference pin — the full list of areas below does the
          // actual enumerating, so the map isn't left implying partial
          // coverage.
          pins: [{ name: "Vero Beach", lat: 27.6386, lon: -80.3973 }],
        },
      }}
      faq={{
        title: "FAQ: JL Closets' Design & Installation Process in Indian River County",
        subtitle: "You have questions, we have the answers.",
        items: defaultCountyFaqs("Indian River County"),
      }}
    />
  );
}
