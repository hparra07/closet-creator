import walkIn01 from "@/assets/gallery/walk-in-01.webp";
import walkIn02 from "@/assets/gallery/walk-in-02.webp";
import walkIn03 from "@/assets/gallery/walk-in-03.webp";
import walkIn04 from "@/assets/gallery/walk-in-04.webp";
import reachIn01 from "@/assets/gallery/reach-in-01.webp";
import reachIn03 from "@/assets/gallery/reach-in-03.webp";
import shoeStorage01 from "@/assets/gallery/shoe-storage-01.webp";
import shoeStorage03 from "@/assets/gallery/shoe-storage-03.webp";
import pantry01 from "@/assets/gallery/pantry-01.webp";
import pantry03 from "@/assets/gallery/pantry-03.webp";
import entertainment01 from "@/assets/gallery/entertainment-01.webp";
import entertainment03 from "@/assets/gallery/entertainment-03.webp";
import mudroom01 from "@/assets/gallery/mudroom-01.webp";
import mudroom03 from "@/assets/gallery/mudroom-03.webp";
import laundry01 from "@/assets/gallery/laundry-01.webp";
import laundry03 from "@/assets/gallery/laundry-03.webp";
import garage01 from "@/assets/gallery/garage-01.webp";
import homeOffice01 from "@/assets/gallery/home-office-01.webp";
import homeOffice03 from "@/assets/gallery/home-office-03.webp";
import murphyBed01 from "@/assets/gallery/murphy-bed-01.webp";
import wine01 from "@/assets/gallery/wine-01.webp";
import smallSpace01 from "@/assets/gallery/small-space-01.webp";

export type Reason = {
  n: number;
  title: string;
  /** Short hook shown under the title — one line, sets up the paragraph. */
  hook: string;
  body: string;
  image: string;
  /** Optional link out to the page that backs this claim up. */
  href?: string;
  linkLabel?: string;
};

// The 22 reasons, carried over from the current jlclosets.com page. Copy is
// trimmed to a single tight paragraph each — the originals ran long and
// repeated the customer reviews that already live in SuccessStoriesSection.
export const REASONS: Reason[] = [
  {
    n: 1,
    title: "Same-Day or Next-Day Free Consultation",
    hook: "No waiting weeks for a designer",
    body: "Why wait weeks when you can start designing today? We offer same-day or next-day consultations, bringing our expertise straight to your home.",
    image: walkIn01,
  },
  {
    n: 2,
    title: "Over 30 Years of Local Expertise",
    hook: "The oldest custom closet company in South Florida",
    body: "We have served thousands of South Florida homeowners with expert-designed storage that maximizes space, style, and efficiency — for over three decades.",
    image: walkIn02,
  },
  {
    n: 3,
    title: "Highest-Rated in South Florida",
    hook: "Our ratings speak for themselves",
    body: "Our reputation is built on quality craftsmanship, innovative storage solutions, and an unwavering commitment to customer satisfaction.",
    image: walkIn03,
    href: "/portfolio",
    linkLabel: "See our work",
  },
  {
    n: 4,
    title: "Built for the Florida Climate",
    hook: "Humidity-resistant by design",
    body: "Our systems are tailored to South Florida's climate and lifestyle. From humidity-resistant materials to space-maximizing layouts, every detail is made with Florida homes in mind.",
    image: reachIn01,
  },
  {
    n: 5,
    title: "Community-Driven Success",
    hook: "98% satisfaction, 80% return rate",
    body: "Most of our projects come from direct referrals — a testament to the trust and quality behind every JL Closets system.",
    image: pantry01,
  },
  {
    n: 6,
    title: "Industry Recognition",
    hook: "Houzz, ASID, and Best Pick Reports",
    body: "We have won multiple awards for custom closet design, craftsmanship, and customer service from the industry's leading organizations.",
    image: entertainment01,
  },
  {
    n: 7,
    title: "Transparent Pricing, No Hidden Fees",
    hook: "The number we quote is the number you pay",
    body: "We believe in honest, upfront pricing with no surprises. Our systems are competitively priced without compromising on quality, durability, or luxury finishes.",
    image: mudroom01,
  },
  {
    n: 8,
    title: "Affordable Luxury for Every Budget",
    hook: "Quality doesn't have to break the bank",
    body: "We offer premium storage solutions that fit every budget, making sure every client gets the best possible value for their investment.",
    image: laundry01,
  },
  {
    n: 9,
    title: "We Work on Your Schedule",
    hook: "A stress-free process, start to finish",
    body: "Our team values your time, space, and vision. Polite, professional, and dedicated to making your experience seamless from design through installation.",
    image: homeOffice01,
  },
  {
    n: 10,
    title: "We Go the Extra Mile",
    hook: "We always do more than we promise",
    body: "It's our way of exceeding your expectations and making sure you are completely satisfied with your new custom addition.",
    image: shoeStorage01,
  },
  {
    n: 11,
    title: "We Deliver On Time, Every Time",
    hook: "No missed deadlines, no excuses",
    body: "Our systems are completed on schedule with precision and care — just flawless execution from start to finish.",
    image: garage01,
  },
  {
    n: 12,
    title: "Designed for Every Space",
    hook: "Walk-ins, reach-ins, and everything between",
    body: "From grand walk-in wardrobes to cleverly engineered reach-in spaces, our designers create storage that blends seamlessly with your daily routine.",
    image: reachIn03,
    href: "/home-organization-idea-gallery",
    linkLabel: "Browse the idea gallery",
  },
  {
    n: 13,
    title: "Educating Our Customers",
    hook: "We don't just install and leave",
    body: "Our experts share their knowledge throughout the project, making sure you understand every decision and know exactly how to get the most from your space.",
    image: pantry03,
  },
  {
    n: 14,
    title: "Your Partner for Life",
    hook: "Once you've experienced the difference",
    body: "Our commitment to excellence has built a loyal customer base that returns to us again and again. We're not just a service provider — we're your long-term partner.",
    image: walkIn04,
  },
  {
    n: 15,
    title: "We Live to Improve",
    hook: "We never stop learning",
    body: "By investing in our staff, our processes, and our materials, we make sure we're always at the forefront of custom closet design and installation.",
    image: entertainment03,
  },
  {
    n: 16,
    title: "A+ Rating with the BBB",
    hook: "The highest grade the BBB awards",
    body: "Our A+ rating reflects a commitment to quality, integrity, and customer satisfaction — resolving concerns promptly and staying transparent in every dealing.",
    image: mudroom03,
  },
  {
    n: 17,
    title: "Standing Behind Our Work",
    hook: "A lifetime warranty on every install",
    body: "We stand firmly behind every storage solution we create. Our commitment to quality extends long after the installation is complete.",
    image: laundry03,
    href: "/customer-service",
    linkLabel: "See our warranty",
  },
  {
    n: 18,
    title: "Free Expert Advice",
    hook: "No strings attached",
    body: "Even before you commit, we offer free expert advice on the best storage solutions for your space. Our specialists are here to help.",
    image: homeOffice03,
  },
  {
    n: 19,
    title: "Award-Winning Designs",
    hook: "Functional works of art",
    body: "Our designers don't just create storage spaces — they create award-winning, functional pieces that enhance your home and the way you live in it.",
    image: shoeStorage03,
  },
  {
    n: 20,
    title: "A Smooth and Simple Process",
    hook: "From first call to final install",
    body: "We prioritize clear communication, customer convenience, and meticulous attention to detail, so the whole experience stays stress-free and enjoyable.",
    image: murphyBed01,
    href: "/design-process",
    linkLabel: "See how we work",
  },
  {
    n: 21,
    title: "Fast Turnaround Time",
    hook: "Among the fastest in the industry",
    body: "From your first consultation to the final installation, we keep the process swift and efficient. You won't wait long to enjoy your new space.",
    image: smallSpace01,
  },
  {
    n: 22,
    title: "Florida's Most Awarded Closet Company",
    hook: "8 consecutive years as a Best Pick",
    body: "Our walls are covered in awards, but it was never about the accolades. Each one reflects the same commitment to excellence you'll see in your own home.",
    image: wine01,
  },
];
