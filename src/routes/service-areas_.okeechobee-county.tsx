import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/pageHead";
import { CountyTemplate } from "@/components/templates/CountyTemplate";
import { COUNTY_PRODUCTS, stackImg1, stackImg2, stackImg3, stackImg4, stackImg5 } from "@/lib/countyProducts";
import { defaultCountyFaqs, defaultCountyReasons } from "@/lib/countyPageDefaults";

export const Route = createFileRoute("/service-areas_/okeechobee-county")({
  head: () =>
    pageHead({
      title: "Custom Storage Solutions in Okeechobee County | JL Closets",
      description: "JL Closets designs and installs custom closets and storage solutions across Okeechobee County's ranch and lakeside communities.",
      path: "/service-areas/okeechobee-county",
    }),
  component: OkeechobeeCounty,
});

function OkeechobeeCounty() {
  return (
    <CountyTemplate
      county="Okeechobee County"
      hero={{
        title: (
          <>
            Custom Storage Solutions
            <br />
            in Okeechobee County
          </>
        ),
        description: "Serving Okeechobee's ranch-country homes and Lake Okeechobee's lakeside communities with tailored storage solutions.",
      }}
      solutions={{
        intro: (
          <>
            We design and install custom closets and storage systems across Okeechobee County—<strong className="font-bold underline-animate">tailored to South Florida's climate and lifestyle</strong>.
          </>
        ),
        items: COUNTY_PRODUCTS,
      }}
      whyChoose={{
        title: (
          <>
            <strong className="font-bold">5 Reasons</strong> Why Okeechobee County Homeowners Choose JL Closets
          </>
        ),
        intro: (
          <>
            <p>
              Okeechobee County homes range from lakeside cottages to sprawling ranch properties. Custom storage solutions make the most of whatever space you're working with.
            </p>
            <p>
              Here's why homeowners across Okeechobee County trust JL Closets with their storage projects.
            </p>
          </>
        ),
        reasons: defaultCountyReasons("Okeechobee County"),
        images: [stackImg1, stackImg2, stackImg3, stackImg4, stackImg5],
      }}
      areas={{
        title: "JL Closets' Okeechobee County Service Areas",
        intro: "JL Closets proudly serves homeowners and businesses throughout Okeechobee County. Our custom storage solutions are available in:",
        mapQuery: "Okeechobee County, FL",
        groups: [
          ["Okeechobee", "Buckhead Ridge", "Taylor Creek", "Basswood"],
        ],
        map: {
          countyId: "Okeechobee",
          bbox: { x: 747.75392, y: 395.64920, width: 51.67739, height: 70.66257 },
          bounds: { north: 27.55, south: 27.00, east: -80.65, west: -81.05 },
          // A single reference pin — the full list of areas below does the
          // actual enumerating, so the map isn't left implying partial
          // coverage.
          pins: [{ name: "Okeechobee", lat: 27.2414, lon: -80.8296 }],
        },
      }}
      faq={{
        title: "FAQ: JL Closets' Design & Installation Process in Okeechobee County",
        subtitle: "You have questions, we have the answers.",
        items: defaultCountyFaqs("Okeechobee County"),
      }}
    />
  );
}
