import type { FaqItem } from "@/components/sections/FaqSection";
import type { SolutionReason } from "@/components/sections/WhyChooseSolutionSection";

// Generic FAQ + "why choose us" reasons content, reused across county pages
// that don't have their own bespoke copy yet — parameterized by county name
// so it still reads as county-specific.
export function defaultCountyFaqs(county: string): FaqItem[] {
  return [
    {
      q: `How long does a typical custom storage installation take in ${county}?`,
      a: "Most installations are completed within 1-3 days, depending on the project's scope and complexity.",
    },
    {
      q: `Do you offer free design consultations in all ${county} areas?`,
      a: `Yes, we provide free design consultations throughout ${county} and the surrounding communities.`,
    },
    {
      q: `What types of materials do you use for custom closets in ${county}'s climate?`,
      a: "We use high-quality, humidity-resistant materials including treated wood, melamine, and specialized hardware to withstand South Florida's tropical climate.",
    },
    {
      q: `Can you work with small spaces in ${county} condos and apartments?`,
      a: `Absolutely! We specialize in maximizing storage in ${county}'s diverse spaces, from beachfront condos to townhomes.`,
    },
    {
      q: `How do your storage solutions stand up to ${county}'s hurricane seasons?`,
      a: "Our installations are designed with South Florida's weather in mind, using sturdy materials and secure mounting techniques to withstand severe weather conditions.",
    },
    {
      q: "Do you offer any warranties on your custom storage solutions?",
      a: "Yes, we provide comprehensive warranties on both materials and workmanship. Your design consultant will provide specific details.",
    },
    {
      q: `Can you match the diverse architectural styles found in ${county}?`,
      a: `Certainly! We offer a wide range of styles, from modern and coastal to traditional and transitional, to complement ${county}'s architectural landscape.`,
    },
    {
      q: `What's the process for getting started with JL Closets in ${county}?`,
      a: "Simply call us or fill out our online form to schedule a free design consultation. We'll visit your home, discuss your needs, and create a custom design plan tailored to your South Florida lifestyle.",
    },
  ];
}

export function defaultCountyReasons(county: string): SolutionReason[] {
  return [
    { title: `Local ${county} Expertise`, desc: `Decades of experience designing for ${county}'s mix of homes, condos, and neighborhoods.` },
    { title: "Built for Florida's Climate", desc: "Materials and finishes chosen to hold up to South Florida's heat and humidity." },
    { title: "Fast, Reliable Installation", desc: `Most ${county} projects are designed and installed within just a few weeks.` },
    { title: "Space-Smart Design", desc: "Custom layouts that make the most of every closet, pantry, and garage — big or small." },
    { title: "Trusted By Your Neighbors", desc: `One of ${county}'s most referred custom storage companies.` },
  ];
}
