import { SectionWrapper } from "@/components/common/SectionWrapper";
import { SOCIAL_LINKS } from "@/lib/social";

export function SocialMediaSection() {
  return (
    <SectionWrapper className="!pt-0 !pb-6 md:!pb-6">
      <div className="max-w-2xl mx-auto text-center">
        <div className="mb-10">
          <span className="rule eyebrow" style={{ color: "#313131" }}>Connect With Us On Social Media</span>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4 gsap-stagger">
          {SOCIAL_LINKS.map(({ Icon, label, url }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-12 h-12 rounded-full bg-ink text-ink-foreground flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
