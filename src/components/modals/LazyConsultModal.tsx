import { lazy, Suspense, useEffect, useState } from "react";

const RealConsultModal = lazy(() =>
  import("./ConsultModal").then((m) => ({ default: m.ConsultModal }))
);

// Drop-in replacement for ConsultModal that defers fetching its JS chunk
// until the user actually opens it, instead of shipping it with every page.
export function ConsultModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    if (open) setShouldLoad(true);
  }, [open]);

  if (!shouldLoad) return null;

  return (
    <Suspense fallback={null}>
      <RealConsultModal open={open} onClose={onClose} />
    </Suspense>
  );
}
