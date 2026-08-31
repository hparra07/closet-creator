import { useRef } from "react";
import { useRollingText } from "@/lib/useRollingText";

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
  size?: "sm" | "default" | "lg";
}) {
  const btnRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  useRollingText(textRef, btnRef);

  const sizeClass =
    size === "lg" ? "px-9 py-3.5 text-base" : size === "sm" ? "px-5 py-2 text-xs" : "px-7 py-2.5 text-sm";
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
