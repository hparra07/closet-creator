import { X } from "lucide-react";
import { ContactForm } from "@/components/forms/ContactForm";

export function ConsultModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[100] bg-black/70 flex items-start justify-center p-4 md:p-8 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative bg-background w-full max-w-4xl my-8 p-6 md:p-12 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-end mb-2">
          <button
            aria-label="Close"
            className="w-9 h-9 flex items-center justify-center hover:bg-foreground/5 transition cursor-pointer"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="grid md:grid-cols-12 gap-8 md:gap-12">
          <div className="md:col-span-3">
            <p className="font-sans text-2xl md:text-3xl leading-snug mb-4">
              Get your custom design and quote <strong className="font-bold">in just a few steps.</strong>
            </p>
          </div>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
