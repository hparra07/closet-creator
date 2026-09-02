import { Link } from "@tanstack/react-router";
import jlLogo from "@/assets/global/jl-logo.webp";
import library from "@/assets/global/library.webp";
import { YellowButton } from "@/components/common/YellowButton";
import { SOCIAL_LINKS } from "@/lib/social";

const FOOTER_LINKS: Record<string, string> = {
  "About Us": "/about",
  "Contact Us": "/contact",
  "Our Showroom": "/showroom",
  "Portfolio": "/portfolio",
  "Home Organization Idea Gallery": "/home-organization-idea-gallery",
  "FAQs": "/faq",
  "Design Process": "/design-process",
  "Customer Services": "/customer-service",
  "Careers": "/careers",
  "Custom Closets": "/custom-closets",
  "Broward County": "/service-areas/broward-county",
  "Collier County": "/service-areas/collier-county",
  "Indian River County": "/service-areas/indian-river-county",
  "Lee County": "/service-areas/lee-county",
  "Martin County": "/service-areas/martin-county",
  "Miami Dade County": "/service-areas/miami-dade-county",
  "Okeechobee County": "/service-areas/okeechobee-county",
  "Palm Beach County": "/service-areas/palm-beach-county",
  "St Lucie County": "/service-areas/st-lucie-county",
};

export function Footer() {
  return (
    <footer className="relative bg-ink text-ink-foreground overflow-hidden">
      <img
        src={library}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-10"
      />
      <div className="relative px-6 lg:px-16 py-14">
        {/* Top: Logo left, Newsletter right */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-10 mb-20">
          <Link to="/"><img src={jlLogo} alt="JL Closets" className="h-14 lg:h-24 w-auto brightness-0 invert block self-start" /></Link>
          <div className="lg:max-w-xl w-full">
            <h3 className="font-display text-2xl lg:text-3xl leading-tight mb-5">
              Design Inspiration, Expert Tips<br />& Exclusive Updates
            </h3>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <input
                placeholder="Sign Up for our latest news and exclusive deals."
                className="flex-1 bg-transparent border-b border-ink-foreground/30 py-2 text-sm placeholder:text-white text-white focus:outline-none focus:border-primary font-thin"
              />
              <YellowButton>Subscribe</YellowButton>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 text-sm">
          {/* Contact column — separated */}
          <div className="lg:col-span-4 lg:pr-10 text-ink-foreground/75">
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-5">
              <div>
                <p className="eyebrow mb-1 font-bold text-ink-foreground">Telephone</p>
                <p><a href="tel:+15619129881" className="hover:text-primary transition-colors">(561) 912-9881</a></p>
              </div>
              <div>
                <p className="eyebrow mb-1 font-bold text-ink-foreground">Email</p>
                <p><a href="mailto:leads@jlclosets.com" className="hover:text-primary transition-colors">leads@jlclosets.com</a></p>
              </div>
              <div>
                <p className="eyebrow mb-1 font-bold text-ink-foreground">Opening Hours</p>
                <p>Monday–Friday 8:00AM–5:00PM</p>
                <p>Saturday–Sunday Closed</p>
              </div>
              <div>
                <p className="eyebrow mb-1 font-bold text-ink-foreground">Showroom</p>
                <p>160 NW 16th St, Boca Raton, FL 33432</p>
              </div>
            </div>
            <div className="mt-5">
              <YellowButton>Google Maps</YellowButton>
            </div>
          </div>

          <div className="lg:col-span-8 grid grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              {
                heading: "About JL Closets",
                items: [
                  "About Us",
                  "Contact Us",
                  "Our Showroom",
                  "Awards",
                  "JL Closets Reviews",
                  "Portfolio",
                  "Home Organization Idea Gallery",
                  "22 Reasons to Choose Us",
                  "FAQs",
                  "Design Process",
                  "Customer Services",
                  "Careers",
                ],
              },
              {
                heading: "Legal",
                items: ["Privacy Policy", "Terms & Conditions", "Warranty", "Image Licensing"],
              },
              {
                heading: "Services",
                items: [
                  "Custom Closets",
                  "Entertainment Centers",
                  "Garage Storage",
                  "Home Office",
                  "Laundry Rooms",
                  "Mudroom Storage",
                  "Pantry Organization",
                  "More Storage Ideas",
                ],
              },
              {
                heading: "Areas Served",
                headingHref: "/service-areas",
                items: [
                  "Broward County",
                  "Collier County",
                  "Indian River County",
                  "Lee County",
                  "Martin County",
                  "Miami Dade County",
                  "Okeechobee County",
                  "Palm Beach County",
                  "St Lucie County",
                ],
              },
            ].map((col) => (
              <div key={col.heading}>
                <p className="eyebrow mb-4 font-bold text-ink-foreground">
                  {col.headingHref ? <Link to={col.headingHref} className="hover:text-primary transition">{col.heading}</Link> : col.heading}
                </p>
                <ul className="space-y-2 text-ink-foreground/75">
                  {col.items.map((item) => (
                    <li key={item} className="hover:text-primary cursor-pointer transition">
                      {FOOTER_LINKS[item] ? <Link to={FOOTER_LINKS[item]}>{item}</Link> : item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <p className="eyebrow mb-4 !font-bold text-ink-foreground">Connect With Us</p>
          <div className="flex flex-wrap gap-3">
            {SOCIAL_LINKS.map(({ Icon, label, url }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="w-9 h-9 rounded-full border border-ink-foreground/40 flex items-center justify-center hover:bg-primary hover:border-primary hover:text-primary-foreground transition"
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-20 pt-6 border-t border-ink-foreground/15 flex flex-col lg:flex-row justify-between items-center gap-4 text-xs font-bold text-ink-foreground">
          <p>© {new Date().getFullYear()} JL Closets. All rights reserved.</p>
          <div className="flex gap-6">
            <span>Terms & Conditions</span>
            <span>Privacy Policy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
