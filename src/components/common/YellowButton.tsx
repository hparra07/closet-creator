export function YellowButton({
  children,
  className = "",
  onClick,
  size = "default",
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  size?: "default" | "lg";
}) {
  const sizeClass = size === "lg" ? "px-9 py-3.5 text-base" : "px-7 py-2.5 text-sm";
  return (
    <button
      onClick={onClick}
      className={`bg-primary text-primary-foreground font-semibold hover:opacity-90 transition font-sans cursor-pointer ${sizeClass} ${className}`}
    >
      {children}
    </button>
  );
}
