import { createFileRoute } from "@tanstack/react-router";
import { CountyTemplate } from "@/components/templates/CountyTemplate";
import { COUNTY_PRODUCTS, stackImg1, stackImg2, stackImg3, stackImg4, stackImg5 } from "@/lib/countyProducts";
import { defaultCountyFaqs, defaultCountyReasons } from "@/lib/countyPageDefaults";

export const Route = createFileRoute("/service-areas_/st-lucie-county")({
  head: () => ({
    meta: [
      { title: "Custom Storage Solutions in St. Lucie County | JL Closets" },
      {
        name: "description",
        content:
          "JL Closets designs and installs custom closets and storage solutions across St. Lucie County — Port St. Lucie and Fort Pierce's waterfront communities.",
      },
    ],
  }),
  component: StLucieCounty,
});

function StLucieCounty() {
  return (
    <CountyTemplate
      county="St. Lucie County"
      hero={{
        title: (
          <>
            Custom Storage Solutions
            <br />
            in St. Lucie County
          </>
        ),
        description: "Serving Port St. Lucie's growing family neighborhoods and Fort Pierce's historic waterfront with tailored storage solutions.",
      }}
      solutions={{
        intro: (
          <>
            We design and install custom closets and storage systems across St. Lucie County—<strong className="font-bold underline-animate">tailored to South Florida's climate and lifestyle</strong>.
          </>
        ),
        items: COUNTY_PRODUCTS,
      }}
      whyChoose={{
        title: (
          <>
            <strong className="font-bold">5 Reasons</strong> Why St. Lucie County Homeowners Choose JL Closets
          </>
        ),
        intro: (
          <>
            <p>
              St. Lucie County homes range from Port St. Lucie's newer family neighborhoods to Fort Pierce's historic waterfront homes. Custom storage solutions make the most of whatever space you're working with.
            </p>
            <p>
              Here's why homeowners across St. Lucie County trust JL Closets with their storage projects.
            </p>
          </>
        ),
        reasons: defaultCountyReasons("St. Lucie County"),
        images: [stackImg1, stackImg2, stackImg3, stackImg4, stackImg5],
      }}
      areas={{
        title: "JL Closets' St. Lucie County Service Areas",
        intro: "JL Closets proudly serves homeowners and businesses throughout St. Lucie County. Our custom storage solutions are available in:",
        mapQuery: "St. Lucie County, FL",
        groups: [
          ["Port St. Lucie", "Fort Pierce", "St. Lucie Village", "White City"],
          ["Lakewood Park", "Indian River Estates", "Fort Pierce North", "Tradition"],
        ],
        map: {
          countyId: "St._Lucie",
          bbox: { x: 799.18640, y: 404.33909, width: 46.53414, height: 36.58903 },
          bounds: { north: 27.55, south: 27.15, east: -80.20, west: -80.50 },
          // A single reference pin — the full list of areas below does the
          // actual enumerating, so the map isn't left implying partial
          // coverage.
          pins: [{ name: "Port St. Lucie", lat: 27.2939, lon: -80.3501 }],
        },
      }}
      faq={{
        title: "FAQ: JL Closets' Design & Installation Process in St. Lucie County",
        subtitle: "You have questions, we have the answers.",
        items: defaultCountyFaqs("St. Lucie County"),
      }}
    />
  );
}
