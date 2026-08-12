import { Star } from "lucide-react";
import { SectionWrapper } from "@/components/common/SectionWrapper";
import showroom from "@/assets/contact/showroom.webp";

export function GoogleProfileSection() {
  return (
    <SectionWrapper className="bg-[#f8f7f4]">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10 md:mb-14">
          <h2 className="rule eyebrow" style={{ color: "#313131" }}>Visit Our Google Business Profile</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-0 overflow-hidden rounded-lg shadow-xl">
          <div className="relative">
            <img
              src={showroom}
              alt="JL Closets showroom"
              className="w-full h-full object-cover min-h-[280px]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg shrink-0">
                  <svg className="w-7 h-7" viewBox="0 0 48 48">
                    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/>
                    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 18.9 13 24 13c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
                    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
                    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.6l6.2 5.2C41.7 36 44 30.5 44 24c0-1.3-.1-2.4-.4-3.5z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white font-bold text-lg leading-tight">JL Closets</p>
                  <p className="text-white/70 text-sm">Boca Raton, FL</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 md:p-10 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="font-sans text-5xl font-bold" style={{ color: "#313131" }}>4.8</span>
                <div>
                  <div className="flex gap-0.5 mb-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground/50">168 reviews</p>
                </div>
              </div>

              <p className="text-sm leading-relaxed mt-4 mb-6" style={{ color: "#313131", opacity: 0.7 }}>
                "JL Closets exceeded all expectations. Professional team, stunning craftsmanship, and they finished ahead of schedule. Highly recommended!"
              </p>
            </div>

            <div className="space-y-3 text-sm mb-6" style={{ color: "#313131" }}>
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-0.5 shrink-0 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                <span>160 NW 16th St, Boca Raton, FL 33432</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-0.5 shrink-0 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                <span>Mon–Fri 8AM–5PM &middot; Sat-Sun Closed</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 mt-0.5 shrink-0 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
                <a href="tel:+15619129881" className="hover:text-primary transition-colors">(561) 912-9881</a>
              </div>
            </div>

            <a
              href="https://maps.app.goo.gl/Va4K8JrFK4sX4vxu8"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-ink text-ink-foreground px-6 py-3 text-sm font-semibold font-sans hover:opacity-90 transition w-full"
            >
              <svg className="w-4 h-4" viewBox="0 0 48 48">
                <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/>
                <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 18.9 13 24 13c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
                <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
                <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.6l6.2 5.2C41.7 36 44 30.5 44 24c0-1.3-.1-2.4-.4-3.5z"/>
              </svg>
              View on Google
            </a>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
