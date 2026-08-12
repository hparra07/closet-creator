export function SectionWrapper({
  num: _num,
  children,
  className = "",
}: {
  num?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`relative px-5 md:px-10 lg:px-16 py-10 md:py-14 ${className}`}>
      {children}
    </section>
  );
}
