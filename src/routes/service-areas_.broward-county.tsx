import { createFileRoute } from "@tanstack/react-router";
import { CountyTemplate } from "@/components/templates/CountyTemplate";
import type { ProductSolution } from "@/components/sections/ProductSolutionsSection";
import type { FaqItem } from "@/components/sections/FaqSection";
import customClosetsImg from "@/assets/custom-closets/closet.webp";
import { pageHead, SITE_URL } from "@/lib/pageHead";
import customClosetsImg2 from "@/assets/custom-closets/card-hero-1.webp";
import customClosetsImg3 from "@/assets/custom-closets/card-hero-2.webp";
import entertainmentImg from "@/assets/home/entertainment-center.webp";
import entertainmentImg2 from "@/assets/custom-closets/card-hero-3.webp";
import entertainmentImg3 from "@/assets/custom-closets/banner2.webp";
import homeOfficeImg from "@/assets/home/home-office-img.webp";
import homeOfficeImg2 from "@/assets/shared/design-and-drafting.webp";
import homeOfficeImg3 from "@/assets/custom-closets/card-hero-4.webp";
import pantryImg from "@/assets/misc/pantry.webp";
import pantryImg2 from "@/assets/shared/enjoy-life.webp";
import pantryImg3 from "@/assets/custom-closets/banner3.webp";
import mudroomImg from "@/assets/home/mudroom.webp";
import mudroomImg2 from "@/assets/shared/expert-installations.webp";
import mudroomImg3 from "@/assets/custom-closets/banner4.webp";
import laundryImg from "@/assets/home/laundry.webp";
import laundryImg2 from "@/assets/shared/in-home-consultation.webp";
import laundryImg3 from "@/assets/custom-closets/vert-banner-1.webp";
import garageImg from "@/assets/home/garage-img.webp";
import garageImg2 from "@/assets/shared/why-frame-2.webp";
import garageImg3 from "@/assets/shared/why-frame-3.webp";
import moreStorageImg from "@/assets/home/wine-rack.webp";
import moreStorageImg2 from "@/assets/home/murphy-bed.webp";
import moreStorageImg3 from "@/assets/custom-closets/big-banner-1.webp";
import stackImg1 from "@/assets/custom-closets/card-hero-1.webp";
import stackImg2 from "@/assets/custom-closets/card-hero-2.webp";
import stackImg3 from "@/assets/custom-closets/card-hero-3.webp";
import stackImg4 from "@/assets/custom-closets/card-hero-4.webp";
import stackImg5 from "@/assets/custom-closets/vert-banner-1.webp";

const BROWARD_PRODUCTS: ProductSolution[] = [
  {
    title: "Custom Closets",
    desc: "Walk-in, reach-in, and custom shoe storage tailored to your space.",
    images: [customClosetsImg, customClosetsImg2, customClosetsImg3],
    href: "/custom-closets",
  },
  {
    title: "Entertainment Centers",
    desc: "Custom wall units built around your media and display needs.",
    images: [entertainmentImg, entertainmentImg2, entertainmentImg3],
    href: "#",
  },
  {
    title: "Home Office",
    desc: "Organized, productive workspaces designed around how you work.",
    images: [homeOfficeImg, homeOfficeImg2, homeOfficeImg3],
    href: "#",
  },
  {
    title: "Pantries",
    desc: "Smart shelving and cabinetry to keep every kitchen essential in reach.",
    images: [pantryImg, pantryImg2, pantryImg3],
    href: "#",
  },
  {
    title: "Mudroom",
    desc: "Durable, organized entryways built for South Florida living.",
    images: [mudroomImg, mudroomImg2, mudroomImg3],
    href: "#",
  },
  {
    title: "Laundry Room",
    desc: "Functional storage that makes laundry day easier.",
    images: [laundryImg, laundryImg2, laundryImg3],
    href: "#",
  },
  {
    title: "Garage",
    desc: "Cabinets and shelving that turn your garage into usable space.",
    images: [garageImg, garageImg2, garageImg3],
    href: "#",
  },
  {
    title: "More Storage Ideas",
    desc: "Wine racks, murphy beds, and creative solutions for every room.",
    images: [moreStorageImg, moreStorageImg2, moreStorageImg3],
    href: "#",
  },
];

const BROWARD_FAQS: FaqItem[] = [
  {
    q: "How long does a typical custom storage installation take in Broward County?",
    a: "Most installations are completed within 1-3 days, depending on the project's scope and complexity.",
  },
  {
    q: "Do you offer free design consultations in all Broward County areas?",
    a: "Yes, we provide free design consultations throughout Broward County, from Fort Lauderdale to Coral Springs and beyond.",
  },
  {
    q: "What types of materials do you use for custom closets in Broward County's climate?",
    a: "We use high-quality, humidity-resistant materials including treated wood, melamine, and specialized hardware to withstand South Florida's tropical climate.",
  },
  {
    q: "Can you work with small spaces in Broward County condos and apartments?",
    a: "Absolutely! We specialize in maximizing storage in Broward County's diverse spaces, from beachfront condos in Hollywood to townhomes in Plantation.",
  },
  {
    q: "How do your storage solutions stand up to Broward County's hurricane seasons?",
    a: "Our installations are designed with South Florida's weather in mind, using sturdy materials and secure mounting techniques to withstand severe weather conditions.",
  },
  {
    q: "Do you offer any warranties on your custom storage solutions?",
    a: "Yes, we provide comprehensive warranties on both materials and workmanship. Your design consultant will provide specific details.",
  },
  {
    q: "Can you match the diverse architectural styles found in Broward County?",
    a: "Certainly! We offer a wide range of styles, from modern and coastal to traditional and transitional, to complement Broward County's diverse architectural landscape.",
  },
  {
    q: "What's the process for getting started with JL Closets in Broward County?",
    a: "Simply call us or fill out our online form to schedule a free design consultation. We'll visit your home, discuss your needs, and create a custom design plan tailored to your South Florida lifestyle.",
  },
];

export const Route = createFileRoute("/service-areas_/broward-county")({
  head: () =>
    pageHead({
      title: "Custom Storage Solutions in Broward County | JL Closets",
      description: "JL Closets designs and installs custom closets and storage solutions across Broward County — oceanfront condos, family homes, and urban neighborhoods.",
      path: "/service-areas/broward-county",
      image: `${SITE_URL}${customClosetsImg}`,
    }),
  component: BrowardCounty,
});

function BrowardCounty() {
  return (
    <CountyTemplate
      county="Broward County"
      hero={{
        title: (
          <>
            Custom Storage Solutions
            <br />
            in Broward County
          </>
        ),
        description: "Serving Broward's oceanfront condos, suburban family homes, and vibrant urban neighborhoods with tailored storage solutions.",
      }}
      solutions={{
        intro: (
          <>
            We design and install custom closets and storage systems across Broward County—<strong className="font-bold underline-animate">tailored to South Florida's climate and lifestyle</strong>.
          </>
        ),
        items: BROWARD_PRODUCTS,
      }}
      whyChoose={{
        title: (
          <>
            <strong className="font-bold">5 Reasons</strong> Why Broward County Homeowners Choose JL Closets
          </>
        ),
        intro: (
          <>
            <p>
              Broward County homes come in every shape and size — from high-rise oceanfront condos to sprawling suburban houses. Custom storage solutions make the most of whatever space you're working with.
            </p>
            <p>
              Here's why homeowners across Broward County trust JL Closets with their storage projects.
            </p>
          </>
        ),
        reasons: [
          { title: "Local Broward Expertise", desc: "Decades of experience designing for Broward's mix of condos, townhomes, and single-family homes." },
          { title: "Built for Florida's Climate", desc: "Materials and finishes chosen to hold up to South Florida's heat and humidity." },
          { title: "Fast, Reliable Installation", desc: "Most Broward County projects are designed and installed within just a few weeks." },
          { title: "Space-Smart Design", desc: "Custom layouts that make the most of every closet, pantry, and garage — big or small." },
          { title: "Trusted By Your Neighbors", desc: "One of Broward County's most referred custom storage companies." },
        ],
        images: [stackImg1, stackImg2, stackImg3, stackImg4, stackImg5],
      }}
      areas={{
        title: "JL Closets' Broward County Service Areas",
        intro: "JL Closets proudly serves homeowners and businesses throughout Broward County. Our custom storage solutions are available in:",
        mapQuery: "Broward County, FL",
        groups: [
          ["Fort Lauderdale", "Hollywood", "Pembroke Pines", "Miramar"],
          ["Coral Springs", "Pompano Beach", "Davie", "Plantation"],
          ["Sunrise", "Deerfield Beach", "Weston", "Lauderhill"],
          ["Lauderdale Lakes", "Parkland", "Cooper City", "Dania Beach", "Sea Ranch Lakes"],
          ["Tamarac", "Margate", "Coconut Creek", "North Lauderdale"],
          ["Hallandale Beach", "Wilton Manors", "Lighthouse Point", "Lauderdale-by-the-Sea"],
          ["West Park", "Southwest Ranches", "Hillsboro Beach", "Lazy Lake"],
        ],
        map: {
          countyId: "Broward",
          // Broward's shape as rendered in the source SVG (already includes
          // the file's own translate(0,473.10044) offset applied to every
          // county path — getBBox() on the raw path alone does NOT include
          // it, which is what made the map render blank before).
          bbox: { x: 779.59307, y: 530.571259, width: 78.12838, height: 38.875848 },
          // Broward County's real-world bounding box, used to place pins
          // proportionally inside the county's shape on the map.
          bounds: { north: 26.33, south: 25.95, east: -80.08, west: -80.45 },
          // A single reference pin rather than a handful of named cities —
          // with 30+ areas listed in text, plotting only some of them on
          // the map implied the rest weren't served. The map's job is just
          // visual orientation; the full list does the actual enumerating.
          pins: [{ name: "Fort Lauderdale", lat: 26.1224, lon: -80.1373 }],
        },
      }}
      faq={{
        title: "FAQ: JL Closets' Design & Installation Process in Broward County",
        subtitle: "You have questions, we have the answers.",
        items: BROWARD_FAQS,
      }}
    />
  );
}
