import { useState } from "react";
import { YellowButton } from "@/components/common/YellowButton";

export function ContactForm() {
  const [step, setStep] = useState(0);
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [zip, setZip] = useState("");
  const [budget, setBudget] = useState("");
  const [contactMethod, setContactMethod] = useState("");
  const [consultFor, setConsultFor] = useState("");
  const [areas, setAreas] = useState<string[]>([]);
  const [findUs, setFindUs] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const toggle = (list: string[], setList: (v: string[]) => void, val: string) => {
    setList(list.includes(val) ? list.filter((v) => v !== val) : [...list, val]);
  };

  const inputCls =
    "w-full bg-transparent text-foreground placeholder:text-foreground/40 px-4 py-2 md:px-5 md:py-3.5 text-base border border-foreground/30 hover:border-foreground/60 focus:border-foreground focus:outline-none focus:ring-0 transition font-sans";

  const formatPhone = (raw: string) => {
    const d = raw.replace(/\D/g, "").slice(0, 10);
    if (d.length === 0) return "";
    if (d.length <= 3) return `(${d}`;
    if (d.length <= 6) return `(${d.slice(0, 3)}) ${d.slice(3)}`;
    return `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`;
  };
  const onPhoneChange = (raw: string) => {
    let d = raw.replace(/\D/g, "");
    if (d.startsWith("1")) d = d.slice(1);
    d = d.slice(0, 10);
    setPhone(formatPhone(d));
  };
  const phoneDigits = phone.replace(/\D/g, "");
  const phoneValid = phoneDigits.length === 10 && !phoneDigits.startsWith("1");
  const phoneError = phone.length > 0 && !phoneValid
    ? phoneDigits.length < 10
      ? "Phone number must be 10 digits."
      : "Area code cannot start with 1."
    : "";

  const formatZip = (raw: string) => {
    const d = raw.replace(/\D/g, "").slice(0, 10);
    if (d.length <= 5) return d;
    return `${d.slice(0, 5)}-${d.slice(5)}`;
  };
  const onZipChange = (raw: string) => setZip(formatZip(raw));
  const zipDigits = zip.replace(/\D/g, "");
  const zipValid = zipDigits.length === 5 || zipDigits.length === 10;
  const zipError = zip.length > 0 && !zipValid ? "ZIP code must be 5 or 10 digits." : "";

  const Pill = ({
    active,
    onClick,
    children,
  }: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 md:px-5 md:py-3 text-sm font-medium border transition cursor-pointer ${
        active
          ? "bg-ink text-ink-foreground border-ink"
          : "bg-transparent text-foreground border-foreground/30 hover:border-foreground"
      }`}
    >
      {children}
    </button>
  );

  const steps: { key: string; question: string; hint?: string }[] = [
    { key: "info", question: "Let's start with your details.", hint: "We'll only use these to get in touch." },
    { key: "budget", question: "What is your budget for this project?" },
    { key: "reach", question: "What's the best way to reach you?" },
    { key: "consult", question: "I want a free consultation for:" },
    { key: "find", question: "How did you find us?", hint: "Select all that apply." },
  ];

  const current = steps[step];
  const isLast = step === steps.length - 1;

  const canAdvance = () => {
    switch (current.key) {
      case "info": return !!(first.trim() && last.trim() && email.trim() && phoneValid && zipValid);
      case "budget": return !!budget;
      case "reach": return !!contactMethod;
      case "consult": return !!consultFor && (consultFor !== "My home" || areas.length > 0);
      case "find": return findUs.length > 0;
      default: return true;
    }
  };

  const next = () => {
    if (isLast) setSubmitted(true);
    else setStep((s) => s + 1);
  };
  const back = () => setStep((s) => Math.max(0, s - 1));

  if (submitted) {
    return (
      <div className="md:col-span-9 border border-foreground/15 p-10 md:p-14 text-center">
        <p className="eyebrow mb-4" style={{ color: "#313131" }}>— THANK YOU —</p>
        <h3 className="font-display text-3xl md:text-4xl mb-4 font-bold" style={{ color: "#313131" }}>We've received your inquiry.</h3>
        <p className="text-foreground/70 max-w-md mx-auto">Our team will reach out within one business day to schedule your free consultation.</p>
      </div>
    );
  }

  return (
    <div className="md:col-span-9">
      {/* Progress */}
      <div className="flex items-center gap-3 mb-5">
        <span className="eyebrow text-xs md:text-base text-foreground/60">STEP {String(step + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}</span>
        <div className="flex-1 h-px bg-foreground/15 relative">
          <div
            className="absolute left-0 top-0 h-full bg-primary transition-all duration-500"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <h3 className="font-display text-lg md:text-3xl leading-tight mb-2 font-bold" style={{ color: "#313131" }}>
        {current.question}
      </h3>
      {current.hint && <p className="text-sm text-foreground/60 mb-5">{current.hint}</p>}
      {!current.hint && <div className="mb-8" />}

      {/* Body */}
      <div className="min-h-[180px]">
        {current.key === "info" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" placeholder="First Name" value={first} onChange={(e) => setFirst(e.target.value)} className={inputCls} />
            <input type="text" placeholder="Last Name" value={last} onChange={(e) => setLast(e.target.value)} className={inputCls} />
            <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} className={`${inputCls} sm:col-span-2`} />
            <div>
              <input
                type="tel"
                inputMode="numeric"
                placeholder="ex: (555) 123-4567"
                value={phone}
                onChange={(e) => onPhoneChange(e.target.value)}
                className={`${inputCls} ${phoneError ? "border-destructive" : ""}`}
              />
              {phoneError && <p className="text-xs text-destructive mt-1.5">{phoneError}</p>}
            </div>
            <div>
              <input
                type="text"
                inputMode="numeric"
                placeholder="ZIP Code"
                value={zip}
                onChange={(e) => onZipChange(e.target.value)}
                className={`${inputCls} ${zipError ? "border-destructive" : ""}`}
              />
              {zipError && <p className="text-xs text-destructive mt-1.5">{zipError}</p>}
            </div>
          </div>
        )}

        {current.key === "budget" && (
          <div className="flex flex-wrap gap-3">
            {["$1,000 - $5,000", "$5,000 - $15,000", "+$15,000"].map((opt) => (
              <Pill key={opt} active={budget === opt} onClick={() => setBudget(opt)}>{opt}</Pill>
            ))}
          </div>
        )}

        {current.key === "reach" && (
          <div className="flex flex-wrap gap-3">
            {["Email", "SMS", "A phone call", "WhatsApp", "Any of the above"].map((opt) => (
              <Pill key={opt} active={contactMethod === opt} onClick={() => setContactMethod(opt)}>{opt}</Pill>
            ))}
          </div>
        )}

        {current.key === "consult" && (
          <div>
            <div className="flex flex-wrap gap-3">
              {["My home", "Residential project", "Commercial project"].map((opt) => (
                <Pill
                  key={opt}
                  active={consultFor === opt}
                  onClick={() => { setConsultFor(opt); if (opt !== "My home") setAreas([]); }}
                >
                  {opt}
                </Pill>
              ))}
            </div>
            {consultFor === "My home" && (
              <div className="mt-8 pt-8 border-t border-foreground/15">
                <p className="font-sans text-base font-medium mb-1" style={{ color: "#313131" }}>
                  Which areas of your home are you interested in?
                </p>
                <p className="text-sm text-foreground/60 mb-4">Choose all that apply.</p>
                <div className="flex flex-wrap gap-3">
                  {["Closets", "Garage", "Home Office", "Pantry", "Mud Room", "Laundry", "Media Center", "Other Built-Ins", "Other custom space"].map((opt) => (
                    <Pill key={opt} active={areas.includes(opt)} onClick={() => toggle(areas, setAreas, opt)}>{opt}</Pill>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {current.key === "find" && (
          <div>
            <div className="flex flex-wrap gap-3">
              {["Google", "Email", "Facebook", "Instagram", "LinkedIn", "Pinterest", "Realtor Referral Program", "Referral", "Repeat Customer", "TikTok", "YouTube"].map((opt) => (
                <Pill key={opt} active={findUs.includes(opt)} onClick={() => toggle(findUs, setFindUs, opt)}>{opt}</Pill>
              ))}
            </div>
            <p className="text-sm text-foreground/60 mt-8">
              We'll get in touch shortly to schedule your free consultation.
            </p>
          </div>
        )}
      </div>

      {/* Footer / nav */}
      <div className="flex items-center justify-between mt-6 pt-6 border-t border-foreground/15">
        <button
          type="button"
          onClick={back}
          disabled={step === 0}
          className={`text-sm font-medium underline-offset-4 hover:underline transition ${step === 0 ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
        >
          ← Back
        </button>
        <YellowButton onClick={canAdvance() ? next : undefined} className={!canAdvance() ? "opacity-40 cursor-not-allowed" : ""}>
          {isLast ? "Submit Inquiry" : "Continue"}
        </YellowButton>
      </div>
    </div>
  );
}
