import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowLeft, MapPin, Clock, BadgeDollarSign, CheckCircle2 } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageBreadcrumbs } from "@/components/common/PageBreadcrumbs";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import { YellowButton } from "@/components/common/YellowButton";
import { JobApplicationForm } from "@/components/forms/JobApplicationForm";
import { POSITIONS } from "@/components/sections/OpenPositionsSection";
import { ConsultModal } from "@/components/modals/ConsultModal";
import { pageHead, SITE_URL } from "@/lib/pageHead";

import heroImg from "@/assets/shared/design-and-drafting.webp";

const POSITION_TITLE = "Closet Designer (Design Consultant)";

const STATS = [
  { value: "$65K–$130K+", label: "Annual Earning Potential" },
  { value: "100%", label: "Commission-Based Pay" },
  { value: "0", label: "Cold Calls Required" },
  { value: "Full", label: "Health Benefits Package" },
];

const OFFER: { lead: string; rest?: string }[] = [
  { lead: "Growth and stability in one place.", rest: "JL Closets is growing fast and evolving even faster — we're building the strongest design team in Florida, and you'll have a front-row seat to that growth." },
  { lead: "Independence with support.", rest: "You run your own projects and manage your client relationships like your own business — but you're never on your own. We provide continuous leads, design support, and an environment that lets you focus on what you do best." },
  { lead: "Comprehensive onboarding and training", rest: "on JL Closets' design systems and workflow (required for all designers, including experienced professionals)." },
  { lead: "A health benefits package." },
  { lead: "Monthly bonuses", rest: "and a flexible weekday schedule." },
  { lead: "Pre-qualified company leads", rest: "— no cold calling required." },
  { lead: "Employee discounts", rest: "and design perks." },
  { lead: "100% commission-based compensation", rest: "with strong earning potential: $65,000–$130,000+ per year." },
];

const WHO_YOU_ARE: { lead: string; rest?: string }[] = [
  { lead: "An experienced in-home designer", rest: "or consultant with a successful track record in closing sales." },
  { lead: "Experience with luxury clientele is highly preferred.", rest: "Designers with backgrounds in high-end home improvement, luxury interiors, or hospitality excel in this role because they understand the expectations, communication style, and service standards of discerning clients." },
  { lead: "A go-getter", rest: "with natural initiative, accountability, and a strong selling mentality." },
  { lead: "Based in Palm Beach, Broward, Miami-Dade, or Collier County, FL,", rest: "with reliable transportation for client consultations." },
  { lead: "Personable, confident, and client-focused", rest: "— you connect quickly, make clients feel at ease, and know how to guide conversations with clarity and empathy." },
  { lead: "Calm and professional under pressure,", rest: "able to handle demanding clients without losing composure." },
  { lead: "Experienced in working with cold leads", rest: "— you know how to engage interest, build trust, and turn curiosity into commitment." },
  { lead: "A true closer", rest: "— you don't just design; you confidently lead clients through decisions and secure sales." },
];

const SKILLS: { lead: string; rest?: string; badge: "Required" | "Preferred" }[] = [
  { lead: "Strong computer skills", rest: "— quick to learn new systems, detail-oriented, and comfortable with digital design platforms.", badge: "Required" },
  { lead: "Prior in-home sales experience", rest: "— ideally in design, cabinetry, home organization, or other high-end in-home services.", badge: "Required" },
  { lead: "Willingness to commute or relocate to Palm Beach County", rest: "before starting work.", badge: "Required" },
  { lead: "Full-time commitment only", rest: "— part-time is not available.", badge: "Required" },
  { lead: "Windows laptop.", badge: "Required" },
  { lead: "CAD or 3D design experience", rest: "— proficiency in tools such as AutoCAD, SketchUp, or other visualization software.", badge: "Preferred" },
  { lead: "Closet or cabinetry design experience", rest: "— prior work with custom closet or millwork companies is a strong plus.", badge: "Preferred" },
  { lead: "Interior design or space-planning experience", rest: "— ability to design visually appealing and highly functional layouts.", badge: "Preferred" },
];

export const Route = createFileRoute("/careers_/closet-designer")({
  head: () =>
    pageHead({
      title: "Closet Designer (Design Consultant) | JL Closets Careers",
      description: "Join JL Closets' award-winning design team as a Closet Designer in South Florida. 100% commission with $65,000–$130,000+ earning potential, pre-qualified leads, and full training.",
      path: "/careers/closet-designer",
      image: `${SITE_URL}${heroImg}`,
    }),
  component: ClosetDesignerJob,
});

function ChecklistItem({ lead, rest }: { lead: string; rest?: string }) {
  return (
    <li className="flex items-start gap-3">
      <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "#F1C33A" }} />
      <p className="text-base leading-relaxed" style={{ color: "#313131", opacity: 0.85 }}>
        <strong className="font-semibold" style={{ opacity: 1 }}>{lead}</strong>{rest ? ` ${rest}` : ""}
      </p>
    </li>
  );
}

function ClosetDesignerJob() {
  const [consultOpen, setConsultOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal-up").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-background text-foreground overflow-x-clip">
      <Header onConsultOpen={() => setConsultOpen(true)} />

      <main>
        {/* Hero */}
        <section className="relative min-h-[520px] flex items-end overflow-hidden">
          <img src={heroImg} alt="JL Closets designer at work" className="absolute inset-0 w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />

          <div className="relative z-10 w-full px-5 md:px-16 pt-32 pb-10 md:pb-14">
            <Link to="/careers" className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 hover:text-white transition mb-8">
              <ArrowLeft className="w-4 h-4" /> Back to Careers
            </Link>

            <h1 className="font-display text-3xl md:text-5xl font-bold text-white leading-tight mb-3 reveal-up">
              {POSITION_TITLE}
            </h1>
            <p className="text-white/80 text-base md:text-lg mb-6 reveal-up">
              JL Closets — Florida's Highest-Rated Custom Closet Company
            </p>

            <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8 text-sm text-white/85">
              <span className="inline-flex items-center gap-1.5"><MapPin className="w-4 h-4" /> South Florida (Palm Beach, Broward, Miami-Dade, or Collier County)</span>
              <span className="inline-flex items-center gap-1.5"><Clock className="w-4 h-4" /> Full-time</span>
              <span className="inline-flex items-center gap-1.5"><BadgeDollarSign className="w-4 h-4" /> $65,000–$130,000+ per year</span>
            </div>

            <YellowButton
              size="lg"
              onClick={() => document.getElementById("apply")?.scrollIntoView({ behavior: "smooth", block: "start" })}
            >
              Apply for this Position
            </YellowButton>
          </div>
        </section>

        {/* Stat highlight strip */}
        <div className="grid grid-cols-2 md:grid-cols-4" style={{ background: "#1a1a1a" }}>
          {STATS.map((s) => (
            <div key={s.label} className="px-4 py-8 md:py-10 text-center border-r border-white/10 last:border-r-0">
              <p className="font-display text-2xl md:text-3xl font-bold mb-1" style={{ color: "#F1C33A" }}>{s.value}</p>
              <p className="text-xs md:text-sm text-white/70 leading-snug">{s.label}</p>
            </div>
          ))}
        </div>

        <PageBreadcrumbs />

        <SectionWrapper className="!pb-0">
          <p className="max-w-3xl mx-auto text-base md:text-lg leading-relaxed reveal-up" style={{ color: "#313131" }}>
            JL Closets is expanding our award-winning design team. We're looking for experienced, relationship-driven Closet Designers who understand both the art of design and the discipline of sales. Our designers don't just create beautiful spaces — they build trust, lead meaningful conversations, and close with confidence.
          </p>
        </SectionWrapper>

        <SectionWrapper>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8 reveal-up">
              <h2 className="rule eyebrow" style={{ color: "#313131" }}>What We Offer</h2>
            </div>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-5 reveal-up">
              {OFFER.map((item) => <ChecklistItem key={item.lead} {...item} />)}
            </ul>
          </div>
        </SectionWrapper>

        <SectionWrapper className="!pt-0">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8 reveal-up">
              <h2 className="rule eyebrow" style={{ color: "#313131" }}>Who You Are</h2>
            </div>
            <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-5 reveal-up">
              {WHO_YOU_ARE.map((item) => <ChecklistItem key={item.lead} {...item} />)}
            </ul>
          </div>
        </SectionWrapper>

        <SectionWrapper className="!pt-0">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8 reveal-up">
              <h2 className="rule eyebrow" style={{ color: "#313131" }}>Skills &amp; Experience</h2>
            </div>
            <ul className="space-y-4 reveal-up">
              {SKILLS.map((item) => (
                <li key={item.lead} className="flex items-start justify-between gap-4 pb-4 border-b border-foreground/10 last:border-b-0">
                  <p className="text-base leading-relaxed" style={{ color: "#313131", opacity: 0.85 }}>
                    <strong className="font-semibold" style={{ opacity: 1 }}>{item.lead}</strong>{item.rest ? ` ${item.rest}` : ""}
                  </p>
                  <span
                    className="shrink-0 text-xs font-bold px-3 py-1 mt-0.5"
                    style={
                      item.badge === "Required"
                        ? { background: "#1a1a1a", color: "#fff" }
                        : { background: "transparent", color: "#8a6d1a", border: "1px solid #F1C33A66" }
                    }
                  >
                    {item.badge}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </SectionWrapper>

        <div id="apply">
          <SectionWrapper className="!pt-0">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-4 reveal-up">
                <h2 className="rule eyebrow" style={{ color: "#313131" }}>How To Apply</h2>
              </div>
              <p className="text-base leading-relaxed mb-8 reveal-up" style={{ color: "#313131", opacity: 0.8 }}>
                Please fill out this application form and submit your resume (required). A portfolio isn't required at this stage — if you move forward in the process, you'll be asked to provide one before the final interview.
              </p>
              <div className="reveal-up p-6 md:p-10 border border-foreground/10 bg-card">
                <JobApplicationForm positions={POSITIONS.map((p) => p.title)} defaultPosition={POSITION_TITLE} />
              </div>
            </div>
          </SectionWrapper>
        </div>
      </main>

      <Footer />

      <ConsultModal open={consultOpen} onClose={() => setConsultOpen(false)} />
    </div>
  );
}
