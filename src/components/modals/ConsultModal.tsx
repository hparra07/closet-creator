import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";

export function ConsultModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [closing, setClosing] = useState(false);
  const closeTimeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(closeTimeoutRef.current), []);

  // Plays the fade/scale entrance in reverse before actually closing,
  // instead of the panel just disappearing.
  const handleClose = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onClose();
      return;
    }
    setClosing(true);
    window.clearTimeout(closeTimeoutRef.current);
    closeTimeoutRef.current = window.setTimeout(() => {
      setClosing(false);
      onClose();
    }, 300);
  };

  if (!open && !closing) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-black/70 flex items-start justify-center pt-3 px-4 pb-4 md:p-8 overflow-y-auto ${closing ? "consult-overlay-out" : "consult-overlay-in"}`}
      onClick={handleClose}
    >
      <div
        className={`relative bg-background w-full max-w-4xl mt-3 mb-8 md:my-8 p-6 md:p-12 shadow-2xl ${closing ? "consult-panel-out" : "consult-panel-in"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end mb-2">
          <button
            aria-label="Close"
            className="w-9 h-9 flex items-center justify-center hover:bg-foreground/5 transition cursor-pointer"
            onClick={handleClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="grid md:grid-cols-12 gap-2 md:gap-12">
          <div className="md:col-span-3">
            <p className="font-sans text-lg md:text-3xl leading-snug mb-4">
              Get your custom design and quote <strong className="font-bold">in just a few steps.</strong>
            </p>
          </div>
          <ContactForm />
        </div>
      </div>

      <style>{`
        @keyframes consult-overlay-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes consult-overlay-out { from { opacity: 1; } to { opacity: 0; } }
        @keyframes consult-panel-in {
          from { opacity: 0; transform: translateY(16px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes consult-panel-out {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to { opacity: 0; transform: translateY(16px) scale(0.98); }
        }
        .consult-overlay-in { animation: consult-overlay-in 0.35s ease; }
        .consult-overlay-out { animation: consult-overlay-out 0.3s ease forwards; }
        .consult-panel-in { animation: consult-panel-in 0.4s cubic-bezier(0.22, 1, 0.36, 1); }
        .consult-panel-out { animation: consult-panel-out 0.3s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
        @media (prefers-reduced-motion: reduce) {
          .consult-overlay-in, .consult-overlay-out, .consult-panel-in, .consult-panel-out { animation: none; }
        }
      `}</style>
    </div>
  );
}
