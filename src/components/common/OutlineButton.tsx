import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { useRollingText } from "@/lib/useRollingText";

export function OutlineButton({
  children,
  className = "",
  onClick,
  href,
  size = "default",
  showArrow = false,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  size?: "sm" | "default" | "lg";
  showArrow?: boolean;
}) {
  const btnRef = useRef<HTMLElement | null>(null);
  const textRef = useRef<HTMLSpanElement | null>(null);
  useRollingText(textRef, btnRef);

  const sizeClass =
    size === "lg" ? "px-9 py-3.5 text-base" : size === "sm" ? "px-5 py-2 text-xs" : "px-7 py-2.5 text-sm";
  const classes = `group inline-flex items-center gap-2 border font-semibold transition-colors duration-300 hover:bg-foreground/5 font-sans cursor-pointer ${sizeClass} ${className}`;
  const style = { color: "#313131", borderColor: "#31313130" };

  const content = (
    <>
      <span ref={textRef}>{children}</span>
      {showArrow && <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />}
    </>
  );

  if (href) {
    return (
      <a ref={btnRef as React.RefObject<HTMLAnchorElement>} href={href} onClick={onClick} className={classes} style={style}>
        {content}
      </a>
    );
  }

  return (
    <button ref={btnRef as React.RefObject<HTMLButtonElement>} type="button" onClick={onClick} className={classes} style={style}>
      {content}
    </button>
  );
}
