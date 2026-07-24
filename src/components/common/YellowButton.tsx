import { useEffect, useRef } from "react";
import gsap from "gsap";

function useRollingText(textRef: React.RefObject<HTMLSpanElement | null>, btnRef: React.RefObject<HTMLElement | null>) {
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

export function YellowButton({
  children,
  className = "",
  onClick,
  href,
  size = "default",
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  size?: "default" | "lg";
}) {
  const btnRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  useRollingText(textRef, btnRef);

  const sizeClass = size === "lg" ? "px-9 py-3.5 text-base" : "px-7 py-2.5 text-sm";
  const classes = `bg-primary font-semibold transition-colors duration-500 ease-out hover:bg-white font-sans cursor-pointer inline-flex items-center justify-center ${sizeClass} ${className}`;

  if (href) {
    return (
      <a
        ref={btnRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        onClick={onClick}
        className={classes}
        style={{ color: "#313131" }}
      >
        <span ref={textRef}>{children}</span>
      </a>
    );
  }

  return (
    <button
      ref={btnRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      className={classes}
      style={{ color: "#313131" }}
    >
      <span ref={textRef}>{children}</span>
    </button>
  );
}
