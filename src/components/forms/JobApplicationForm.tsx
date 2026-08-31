import { useEffect, useRef, useState } from "react";
import { Send, CheckCircle2 } from "lucide-react";

// A dedicated, single-step form for job applications — distinct from the
// multi-step ContactForm used for consultation requests. The hidden
// "form_source" field identifies this submission as a job application
// (vs. a general inquiry) once a real backend is wired up.
const FORM_SOURCE = "careers-job-application";

export function JobApplicationForm({ positions = [], defaultPosition = "" }: { positions?: string[]; defaultPosition?: string }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [position, setPosition] = useState(defaultPosition);
  const [portfolioUrl, setPortfolioUrl] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [message, setMessage] = useState("");
  const [resume, setResume] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const iconRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const bodyRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    if (!submitted) return;
    let cancelled = false;
    (async () => {
      const gsapModule = await import("gsap");
      if (cancelled) return;
      const gsap = gsapModule.default;
      const tl = gsap.timeline();
      tl.fromTo(iconRef.current, { scale: 0, opacity: 0, rotate: -45 }, { scale: 1, opacity: 1, rotate: 0, duration: 0.6, ease: "back.out(2.5)" })
        .fromTo(headingRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.25")
        .fromTo(bodyRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }, "-=0.3");
    })();
    return () => { cancelled = true; };
  }, [submitted]);

  const inputCls =
    "w-full bg-transparent text-foreground placeholder:text-foreground/40 px-4 py-2.5 md:py-3 text-base border border-foreground/30 hover:border-foreground/60 focus:border-foreground focus:outline-none focus:ring-0 transition font-sans";

  const formatPhone = (raw: string) => {
    const d = raw.replace(/\D/g, "").slice(0, 10);
    if (d.length === 0) return "";
    if (d.length <= 3) return `(${d}`;
    if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
    return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  };
  const onPhoneChange = (raw: string) => setPhone(formatPhone(raw));

  const canSubmit = fullName.trim() && email.trim() && phone.replace(/\D/g, "").length === 10 && resume;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="text-center py-10">
        <div ref={iconRef} className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center" style={{ background: "#e8f7ee", opacity: 0 }}>
          <CheckCircle2 className="w-9 h-9" style={{ color: "#1f9d55" }} strokeWidth={2} />
        </div>
        <h3 ref={headingRef} className="font-display text-2xl md:text-3xl mb-4 font-bold" style={{ color: "#313131", opacity: 0 }}>We've received your application.</h3>
        <p ref={bodyRef} className="text-foreground/70 max-w-md mx-auto" style={{ opacity: 0 }}>Our team will review it and reach out if there's a fit.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="hidden" name="form_source" value={FORM_SOURCE} />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ color: "#313131" }}>Full Name *</label>
          <input type="text" required placeholder="Name" value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ color: "#313131" }}>Email *</label>
          <input type="email" required placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ color: "#313131" }}>Phone Number *</label>
          <input type="tel" inputMode="numeric" required placeholder="(555) 000-0000" value={phone} onChange={(e) => onPhoneChange(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ color: "#313131" }}>Position Interested In</label>
          <select value={position} onChange={(e) => setPosition(e.target.value)} className={inputCls}>
            <option value="">Please select one</option>
            {positions.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
            <option value="General Application">General Application</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ color: "#313131" }}>Portfolio URL</label>
          <input type="url" placeholder="https://drive.google.com/..." value={portfolioUrl} onChange={(e) => setPortfolioUrl(e.target.value)} className={inputCls} />
        </div>
        <div>
          <label className="block text-sm font-semibold mb-1.5" style={{ color: "#313131" }}>LinkedIn URL</label>
          <input type="url" placeholder="https://www.linkedin.com/..." value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} className={inputCls} />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold mb-1.5" style={{ color: "#313131" }}>Tell us about yourself</label>
          <textarea
            rows={4}
            placeholder="Share your background, experience, and what excites you about joining JL Closets..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className={`${inputCls} resize-none`}
          />
        </div>
        <div className="sm:col-span-2">
          <label className="block text-sm font-semibold mb-1.5" style={{ color: "#313131" }}>Attach your Resume in .pdf or .doc format *</label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="shrink-0 px-4 py-2 text-sm font-semibold border border-foreground/30 bg-transparent hover:border-foreground/60 transition cursor-pointer font-sans"
              style={{ color: "#313131" }}
            >
              Choose File
            </button>
            <span className="text-sm truncate" style={{ color: "#31313199" }}>
              {resume ? resume.name : "No file chosen"}
            </span>
            <input
              ref={fileInputRef}
              type="file"
              required
              accept=".pdf,.doc,.docx"
              onChange={(e) => setResume(e.target.files?.[0] ?? null)}
              className="sr-only"
            />
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={!canSubmit}
        className={`mt-6 w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 font-sans text-sm font-semibold transition-colors ${canSubmit ? "cursor-pointer hover:opacity-90" : "opacity-40 cursor-not-allowed"}`}
        style={{ background: "#1a1a1a", color: "#fff" }}
      >
        Submit Application
        <Send className="w-4 h-4" />
      </button>
    </form>
  );
}
