import showroom from "@/assets/showroom.jpg";
import { YellowButton } from "@/components/common/YellowButton";

export function ShowroomSection() {
  return (
    <section className="relative">
      <img src={showroom} alt="JL Closets showroom in Boca Raton at dusk" className="w-full h-screen md:h-[110vh] object-cover" loading="lazy" />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-ink/35 to-transparent" />
      <div className="md:hidden absolute inset-0 bg-ink/45" />

      <div className="absolute inset-0 flex flex-col justify-between">
        <div className="px-6 md:px-16 pt-12 md:pt-20 text-ink-foreground">
          <p className="eyebrow mb-4 opacity-80 text-white reveal-up" style={{ animationDelay: "0ms", letterSpacing: 0 }}>— SHOWROOM —</p>
        </div>

        <div className="px-6 md:px-16 pb-12 md:pb-20 text-ink-foreground w-full max-w-6xl">
          <h2 className="font-sans text-xl md:text-2xl leading-snug mb-10 max-w-3xl reveal-up" style={{ animationDelay: "120ms", letterSpacing: 0 }}>
            <strong className="font-bold">Experience Quality Firsthand.</strong><br />
            Visit our Boca Raton showroom<br />
            to explore our custom systems up close.
          </h2>

          <div className="grid grid-cols-2 gap-x-10 gap-y-6 text-sm mb-8 max-w-xl">
            <div className="reveal-up" style={{ animationDelay: "240ms" }}>
              <p className="font-bold mb-2">Phone</p>
              <p className="opacity-90">(561) 912 9881</p>
            </div>
            <div className="reveal-up" style={{ animationDelay: "320ms" }}>
              <p className="font-bold mb-2">Email</p>
              <p className="opacity-90">leads@jlclosets.com</p>
            </div>
            <div className="reveal-up" style={{ animationDelay: "400ms" }}>
              <p className="font-bold mb-2">Showroom</p>
              <p className="opacity-90">160 NW 16th St,<br />Boca Raton, FL 33432</p>
              <div className="mt-3">
                <YellowButton onClick={() => window.open("https://maps.app.goo.gl/Va4K8JrFK4sX4vxu8", "_blank", "noopener,noreferrer")}>Google Maps</YellowButton>
              </div>
            </div>
            <div className="reveal-up" style={{ animationDelay: "480ms" }}>
              <p className="font-bold mb-2">Opening hours</p>
              <p className="opacity-90">Monday–Friday 9:00AM–6:00PM</p>
              <p className="opacity-90">Saturday 9:00AM–1:00PM</p>
              <p className="opacity-90">Sunday by appointment</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
