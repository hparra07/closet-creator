export function ProductHeroSection({
  title,
  description,
  image,
  imageAlt,
}: {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <section className="relative h-[85vh] min-h-[600px] w-full overflow-hidden">
      <img
        src={image}
        alt={imageAlt}
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* progressive blur: 0px at top of band, 6px at bottom */}
      <div
        className="absolute inset-x-0 bottom-0 h-[35%] pointer-events-none"
        style={{
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)",
          maskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, black 100%)",
        }}
      />

      {/* progressive dark overlay: transparent at top of band, black at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-[35%] bg-gradient-to-b from-black/0 to-black/70 pointer-events-none" />

      <div className="absolute bottom-0 left-0 right-0">
        <div className="px-5 md:px-16 py-8 md:py-10">
          <div className="w-full h-px bg-white/40 mb-6" />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h1 className="font-sans font-medium text-3xl md:text-5xl leading-[1.1] text-white">
              {title}
            </h1>
            <p className="text-white text-sm md:text-base leading-relaxed max-w-sm">
              {description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
