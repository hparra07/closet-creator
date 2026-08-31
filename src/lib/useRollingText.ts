import { useEffect } from "react";
import gsap from "gsap";

// Splits a button's text into per-character spans and rolls them
// vertically in/out on hover. Shared by YellowButton and other CTA
// buttons that want the same hover treatment.
export function useRollingText(textRef: React.RefObject<HTMLSpanElement | null>, btnRef: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const btn = btnRef.current;
    const textEl = textRef.current;
    if (!btn || !textEl) return;

    const raw = textEl.textContent ?? "";
    const chars = raw.split("");
    textEl.innerHTML = chars
      .map((c) => `<span class="inline-block overflow-hidden align-top"><span class="inline-block">${c === " " ? "&nbsp;" : c}</span></span>`)
      .join("");
    const inner = textEl.querySelectorAll<HTMLElement>(":scope > span > span");

    const enter = () => {
      gsap.fromTo(
        inner,
        { yPercent: -120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.3, stagger: 0.016, ease: "power2.out" }
      );
    };
    const leave = () => {
      gsap.fromTo(
        inner,
        { yPercent: 120, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.26, stagger: 0.016, ease: "power2.out" }
      );
    };

    btn.addEventListener("mouseenter", enter);
    btn.addEventListener("mouseleave", leave);
    return () => {
      btn.removeEventListener("mouseenter", enter);
      btn.removeEventListener("mouseleave", leave);
    };
  }, [textRef, btnRef]);
}
