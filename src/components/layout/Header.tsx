import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Phone, ChevronDown } from "lucide-react";
import jlLogo from "@/assets/jl-logo.png";
import { NAV } from "@/lib/nav";
import { YellowButton } from "@/components/common/YellowButton";
import { SOCIAL_LINKS } from "@/lib/social";

export function Header({ onConsultOpen, variant = "dark" }: { onConsultOpen?: () => void; variant?: "dark" | "light" }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const scrolledRef = useRef(false);
  const variantRef = useRef(variant);
  variantRef.current = variant;
  const usesDarkText = variant === "light" || scrolled;
  const mobileMenuTl = useRef<ReturnType<typeof import("gsap")["default"]["timeline"]> | null>(null);
  const mobileMenuOpen = useRef(false);
  const toggleMobileMenu = useRef(() => {});

  useEffect(() => {
    (async () => {
      const mod = await import("gsap");
      const gsap = mod.default;
      mobileMenuTl.current = gsap.timeline({ paused: true });

      toggleMobileMenu.current = () => {
        mobileMenuOpen.current = !mobileMenuOpen.current;
        const open = mobileMenuOpen.current;
        setMobileOpen(open);
        const tl = mobileMenuTl.current!;
        tl.clear();

        if (open) {
          tl.set("#mobile-nav", { visibility: "visible", pointerEvents: "auto" })
            .fromTo(".mnav-bg", { opacity: 0 }, { opacity: 1, duration: 0.4, ease: "power2.out" }, 0)
            .fromTo(".mnav-panel", { x: "101%", y: 0, rotation: 0 }, { x: "0%", duration: 0.6, ease: "back.out", stagger: 0.15 }, 0)
            .fromTo(".mnav-item", { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 1.2, ease: "expo.out", stagger: 0.03 }, 0.1)
            .fromTo(".mbar-top", { stroke: "currentColor", attr: { x1: 3, y1: 7, x2: 17, y2: 7 } }, { stroke: "#000", attr: { x1: 5, y1: 5, x2: 15, y2: 15 }, duration: 0.35, ease: "back.out(1.4)" }, 0.06)
            .fromTo(".mbar-bot", { stroke: "currentColor", attr: { x1: 3, y1: 13, x2: 17, y2: 13 } }, { stroke: "#000", attr: { x1: 15, y1: 5, x2: 5, y2: 15 }, duration: 0.35, ease: "back.out(1.4)" }, 0.06)
            .fromTo(".mbar-mid", { opacity: 1 }, { opacity: 0, duration: 0.15 }, 0)
            .fromTo(".mnav-bottom-content", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" }, 0.4);
          tl.restart();
        } else {
          tl.to([".mbar-top", ".mbar-mid", ".mbar-bot"], { stroke: (scrolledRef.current || variantRef.current === "light") ? "#000" : "#fff", duration: 0.2 }, 0)
            .to(".mbar-top", { attr: { x1: 3, y1: 7, x2: 17, y2: 7 }, duration: 0.2, ease: "power3.in" }, 0)
            .to(".mbar-bot", { attr: { x1: 3, y1: 13, x2: 17, y2: 13 }, duration: 0.2, ease: "power3.in" }, 0)
            .to(".mbar-mid", { opacity: 1, duration: 0.15 }, 0.1)
            .to(".mnav-panel", { y: "160vh", rotation: "random(-15, 15)", duration: 1, ease: "power3.in", stagger: { from: "end", each: 0.02 } }, 0)
            .to(".mnav-bg", { opacity: 0, duration: 0.3, ease: "power2.in" }, 0.1)
            .set("#mobile-nav", { visibility: "hidden", pointerEvents: "none" })
            .add(() => {
              document.querySelectorAll(".mbar-top, .mbar-mid, .mbar-bot").forEach((el) => {
                (el as HTMLElement).style.removeProperty("stroke");
                (el as HTMLElement).style.removeProperty("opacity");
              });
            });
          tl.restart();
        }
      };
    })();

    return () => { mobileMenuTl.current?.kill(); };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const s = window.scrollY > 50;
      setScrolled(s);
      scrolledRef.current = s;
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openConsult = () => onConsultOpen?.();

  return (
    <header>
      <nav
        className={`fixed top-3 left-4 right-4 flex items-center justify-between md:px-6 lg:px-[clamp(24px,calc(7.362vw_-_51.39px),48px)] py-2 font-medium transition-all duration-300 border rounded-2xl ${
          mobileOpen ? "z-[200] bg-transparent border-transparent px-3" : "z-50 px-6"
        } ${
          !mobileOpen && scrolled
            ? "bg-white border-black/10 shadow-lg text-black"
            : !mobileOpen ? `bg-transparent border-transparent ${variant === "light" ? "text-black" : "text-ink-foreground"}` : ""
        }`}
      >
        <Link to="/">
          <img
            src={jlLogo}
            alt="JL Closets"
            className={`h-12 md:h-14 w-auto transition-all duration-300 ${usesDarkText ? "" : "brightness-0 invert"}`}
          />
        </Link>
        <ul className="hidden lg:flex flex-1 items-center justify-center gap-[clamp(12px,calc(6.135vw_-_50.822px),32px)] text-[clamp(12px,calc(1.227vw_-_0.564px),16px)] font-medium">
          {NAV.map((n) => (
            <li key={n.label} className="relative cursor-pointer group py-6">
              {n.href && !n.submenu ? (
                <Link to={n.href} className="relative inline-flex items-center gap-1 whitespace-nowrap after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-[1.5px] after:bg-current after:transition-all after:duration-300 after:-translate-x-1/2 group-hover:after:w-full">
                  {n.label}
                </Link>
              ) : (
                <span className="relative inline-flex items-center gap-1 whitespace-nowrap after:absolute after:bottom-0 after:left-1/2 after:w-0 after:h-[1.5px] after:bg-current after:transition-all after:duration-300 after:-translate-x-1/2 group-hover:after:w-full">
                  {n.label}
                  {n.submenu && (
                    <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
                  )}
                </span>
              )}
              {n.submenu && (
                <div className={`invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-opacity absolute left-0 top-full bg-white text-foreground shadow-xl border border-foreground/10 p-6 z-50 ${n.submenu.length > 4 ? "grid grid-cols-3 gap-x-10 gap-y-5 w-[760px]" : n.submenu.length > 1 ? "grid grid-cols-2 gap-x-10 gap-y-4 w-[560px]" : "w-[280px]"}`}>
                  {n.submenu.map((col, idx) => (
                    <div key={col.heading ?? `col-${idx}`}>
                      {col.heading && (
                        <p className="text-[12px] font-medium text-foreground/50 mb-2">
                          •{" "}
                          {col.headingHref ? <Link to={col.headingHref} className="hover:text-primary">{col.heading}</Link> : col.heading}
                        </p>
                      )}
                      <ul className="space-y-0.5">
                        {col.items.map((it) => (
                          <li key={it.label} className="text-[15px] font-semibold leading-tight hover:text-primary py-0.5">
                            {it.href ? <Link to={it.href}>{it.label}</Link> : it.label}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </li>
          ))}
        </ul>
        <div className="hidden lg:flex items-center gap-[clamp(0px,calc(3.681vw_-_37.69px),12px)] font-medium ml-2">
          <YellowButton onClick={openConsult} className="![font-size:clamp(12px,calc(0.614vw_+_5.718px),14px)] !px-[clamp(12px,calc(4.908vw_-_38.256px),28px)] !py-[clamp(8px,calc(0.614vw_+_1.718px),10px)] !rounded-none min-[1350px]:!rounded-md !rounded-l-md whitespace-nowrap">FREE Consultation</YellowButton>
          <button
            aria-label="Call Us"
            className="bg-ink text-ink-foreground px-[clamp(12px,calc(4.908vw_-_38.256px),28px)] py-[clamp(8px,calc(0.614vw_+_1.718px),10px)] inline-flex items-center justify-center gap-1.5 [font-size:clamp(12px,calc(0.614vw_+_5.718px),14px)] font-semibold font-sans cursor-pointer whitespace-nowrap rounded-none min-[1350px]:!rounded-md rounded-r-md"
          >
            <Phone className="w-4 h-4" />
            <span className="hidden min-[1350px]:inline">CALL US!</span>
          </button>
        </div>
        <button
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          className={`lg:hidden p-2.5 cursor-pointer z-[310] rounded-full ${mobileOpen ? "bg-white shadow-md" : ""}`}
          onClick={() => toggleMobileMenu.current()}
        >
          <svg width="26" height="26" viewBox="0 0 20 20" fill="none">
            <line className="mbar-top" x1="3" y1="7" x2="17" y2="7" stroke={mobileOpen || usesDarkText ? "#000" : "#fff"} strokeWidth="1.5" strokeLinecap="round" />
            <line className="mbar-mid" x1="3" y1="10" x2="17" y2="10" stroke={mobileOpen || usesDarkText ? "#000" : "#fff"} strokeWidth="1.5" strokeLinecap="round" />
            <line className="mbar-bot" x1="3" y1="13" x2="17" y2="13" stroke={mobileOpen || usesDarkText ? "#000" : "#fff"} strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </nav>

      {/* MOBILE MENU — GSAP animated panels */}
      <div id="mobile-nav" className="lg:hidden fixed inset-0 z-[100] flex flex-col gap-2 p-3 pt-20" style={{ visibility: "hidden", pointerEvents: "none" }}>
        <div className="mnav-bg absolute inset-0 bg-black/50" style={{ opacity: 0 }} onClick={() => toggleMobileMenu.current()} />

        {/* Top panel — nav links */}
        <div className="mnav-panel relative flex-1 bg-background text-foreground rounded-xl border border-foreground/10 flex flex-col px-7 pt-6 pb-6 overflow-y-auto" style={{ transform: "translateX(101%)" }}>
          <ul className="flex flex-col flex-1 justify-center">
            {NAV.map((n) => {
              const isSectionOpen = openSection === n.label;
              return (
                <li key={n.label} className="mnav-item overflow-hidden">
                  {n.href && !n.submenu ? (
                    <Link
                      to={n.href}
                      className="block py-3 text-left text-[22px] font-semibold tracking-tight"
                      onClick={() => toggleMobileMenu.current()}
                    >
                      {n.label}
                    </Link>
                  ) : (
                    <button
                      className="w-full flex items-center justify-between py-3 text-left text-[22px] font-semibold tracking-tight cursor-pointer"
                      onClick={() => n.submenu ? setOpenSection(isSectionOpen ? null : n.label) : toggleMobileMenu.current()}
                    >
                      <span>{n.label}</span>
                      {n.submenu && (
                        <ChevronDown className={`w-4 h-4 transition-transform ${isSectionOpen ? "rotate-180" : ""}`} />
                      )}
                    </button>
                  )}
                  {n.submenu && isSectionOpen && (
                    <div className="pb-4 space-y-4">
                      {n.submenu.map((col, idx) => (
                        <div key={col.heading ?? `col-${idx}`}>
                          {col.heading && (
                            <p className="text-[12px] font-medium text-foreground/50 mb-2">
                              •{" "}
                              {col.headingHref ? (
                                <Link to={col.headingHref} onClick={() => toggleMobileMenu.current()}>{col.heading}</Link>
                              ) : (
                                col.heading
                              )}
                            </p>
                          )}
                          <ul className="space-y-1">
                            {col.items.map((it) => (
                              <li key={it.label} className="text-[15px] font-semibold py-1">
                                {it.href ? <Link to={it.href} onClick={() => toggleMobileMenu.current()}>{it.label}</Link> : it.label}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Middle panel — CTA */}
        <div className="mnav-panel relative bg-primary text-primary-foreground rounded-xl border border-primary px-7 py-6" style={{ transform: "translateX(101%)" }}>
          <div className="mnav-bottom-content flex flex-col gap-3">
            <YellowButton className="!w-full" onClick={() => { toggleMobileMenu.current(); openConsult(); }}>FREE Consultation</YellowButton>
            <button
              className="bg-ink text-ink-foreground px-7 py-2.5 inline-flex justify-center items-center gap-2 text-sm font-semibold font-sans w-full cursor-pointer rounded-lg"
              onClick={() => toggleMobileMenu.current()}
            >
              <Phone className="w-4 h-4" /> CALL US!
            </button>
          </div>
        </div>

        {/* Bottom panel — social / info */}
        <div className="mnav-panel relative bg-ink text-ink-foreground rounded-xl border border-ink-foreground/20 px-7 py-5" style={{ transform: "translateX(101%)" }}>
          <div className="mnav-bottom-content flex items-center justify-between">
            <p className="text-xs text-ink-foreground/60">(561) 912 9881</p>
            <div className="flex gap-3">
              {SOCIAL_LINKS.filter((s) => ["Facebook", "Instagram", "YouTube", "LinkedIn"].includes(s.label)).map(({ Icon, label, url }) => (
                <a key={label} href={url} target="_blank" rel="noopener noreferrer" aria-label={label} className="w-8 h-8 rounded-full border border-ink-foreground/30 flex items-center justify-center">
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
