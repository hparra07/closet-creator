import type { Review } from "@/lib/reviews";

export function SourceIcon({ source }: { source: string }) {
  const cls = "w-4 h-4 shrink-0";
  if (source === "Google") {
    return (
      <svg className={cls} viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.7-6.1 8-11.3 8-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/>
        <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 16 18.9 13 24 13c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/>
        <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/>
        <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.3-2.3 4.3-4.1 5.6l6.2 5.2C41.7 36 44 30.5 44 24c0-1.3-.1-2.4-.4-3.5z"/>
      </svg>
    );
  }
  if (source === "Houzz") {
    return <svg className={cls} viewBox="0 0 24 24" fill="#4DBC15"><path d="M17 7v5h-5L7 7v17h5v-5h5v5h5V7z"/></svg>;
  }
  if (source === "Angi") {
    return (
      <svg className={cls} viewBox="0 0 365 220" fill="#ff6153">
        <path d="m333.39 52.36h28.71v123.47h-28.71zm14.36-11.55c8.89 0 15.85-6.85 15.85-15.6 0-8.74-7.11-15.85-15.85-15.85-8.75 0-15.6 6.96-15.6 15.85-.01 8.75 6.85 15.6 15.6 15.6zm-143.15 9.55c-10.25 0-17.81 4.06-22.48 12.06l-1.35 2.31-.32-2.66c-.7-5.81-7.08-9.71-12.61-9.71h-16.1l.25 123.47h28.96v-83.61c0-12.66 2.79-17.15 10.65-17.15 6.07 0 9.15 4.51 9.15 13.4v87.37h28.71v-93.87c-.01-20.97-8.37-31.61-24.86-31.61zm99.7 2h14.85l-.25 114.37c0 30.37-2.91 51.86-40.61 51.86-13.13 0-22.91-3.42-29.06-10.18-5.01-5.5-7.55-13.05-7.55-22.43v-.6h28.96v.35c0 9.65 7.2 10.4 9.4 10.4 9.65 0 10.4-8.56 10.4-20.65v-17.67l-1.71 3.53c-3.59 7.41-10.85 11.49-20.44 11.49-10.15 0-17.19-3.62-21.54-11.06-3.58-6.12-5.32-14.89-5.32-26.8v-48c0-7 .98-16.97 5.62-24.66 4.78-7.92 12.52-11.94 22.98-11.94 10.42 0 17.39 3.95 20.16 11.42l1.39 3.76.35-3.99c.46-5.19 7.03-9.2 12.37-9.2zm-14.35 38.36c0-7.74-1.09-15.65-9.15-15.65-7.17 0-10.65 4.71-10.65 14.4v43.01c0 7.74 1.12 15.65 9.4 15.65 8.74 0 10.4-6.38 10.4-18.15zm-174.35-86.12 27.47 171.23h-28.77l-1.52-11.13c-2.59-19.86-13.08-38.21-30.36-42.28-.6 7.01-3.96 30.77-5.41 36.96 0-.01.01-.03.01-.05-2.63 12.98-8.24 27.16-25.14 32.98a33.499 33.499 0 0 1 -10.9 1.81c-9.38 0-18.68-3.87-25.49-11.01-7.54-7.9-11.76-17.54-11.88-29.88-.28-29.52 24.06-55.9 55.41-60.07.3-.04.6-.06.91-.1l14.18-88.46h21zm-60.34 117.52c-12.81 4.54-24.4 16.11-24.26 30.86.05 5.28 1.62 8.41 4.3 11.23 2.08 2.18 5.17 3.07 7.66 2.21 4.18-1.44 6.14-6.44 7.63-14.81zm49.31-19.8-9.21-70.65h-1.02l-8.25 63.31c6.41 1.65 12.63 4.14 18.48 7.34z"/>
      </svg>
    );
  }
  if (source === "Best Pick Reports") {
    return (
      <svg className={cls} viewBox="0 0 51 50">
        <path fill="#0076CE" d="M25.4 0L0 14V35c0 3.4 2.8 6.2 6.2 6.2h22.5l8.6 8.6v-8.6h7.3c3.4 0 6.2-2.8 6.2-6.2V14L25.4 0z"/>
        <path fill="#FFFFFF" d="M25.4 7L0 21h6.1v11.2c0 1.6 1.3 2.9 2.9 2.9h22.2l6.1 6.1v-6.1h4.5c1.6 0 2.9-1.3 2.9-2.9V21h6.3L25.4 7zM16.1 27.2c-1.7 0-3.1-1.4-3.1-3.1s1.4-3.1 3.1-3.1 3.1 1.4 3.1 3.1-1.4 3.1-3.1 3.1zm9.3 0c-1.7 0-3.1-1.4-3.1-3.1s1.4-3.1 3.1-3.1 3.1 1.4 3.1 3.1-1.4 3.1-3.1 3.1zm9.3 0c-1.7 0-3.1-1.4-3.1-3.1s1.4-3.1 3.1-3.1 3.1 1.4 3.1 3.1-1.4 3.1-3.1 3.1z"/>
      </svg>
    );
  }
  if (source === "Facebook") {
    return (
      <svg className={cls} viewBox="0 0 1024 1024">
        <path fill="#1877f2" d="M1024 512C1024 229.2 794.8 0 512 0S0 229.2 0 512c0 255.6 187.2 467.4 432 505.8V660H302V512h130V399.3c0-128.3 76.4-199.2 193.4-199.2 56 0 114.6 10 114.6 10V336H675c-63.6 0-83.4 39.5-83.4 80v96H734L711.3 660H591.6v357.8C836.8 979.4 1024 767.6 1024 512z"/>
        <path fill="#fff" d="M711.3 660L734 512H591.6v-96c0-40.5 19.8-80 83.4-80h105.1V200s-58.6-10-114.6-10c-117 0-193.4 70.9-193.4 199.2V512H302v148h130v357.8c26.1 4.1 52.8 6.2 80 6.2s53.9-2.1 80-6.2V660h119.3z"/>
      </svg>
    );
  }
  return null;
}

/**
 * Review card in the wine design language: white panel, hairline border, wine
 * stars above the quote, and the attribution at the bottom. The source logo and
 * its "read the review" link are kept so each quote stays verifiable.
 */
export function ReviewCard({ review: r, className = "" }: { review: Review; className?: string }) {
  return (
    <div
      className={`flex flex-col p-6 md:p-7 bg-background border rounded-lg ${className}`}
      style={{ borderColor: "#E3E3E3", color: "#1B1B1B", userSelect: "text" }}
    >
      <p className="tracking-[0.2em] mb-4" style={{ color: "#7B1A30", fontSize: "15px" }}>★★★★★</p>

      <p className="font-sans text-[15px] leading-relaxed mb-6 flex-1" style={{ color: "#444444" }}>
        &ldquo;{r.quote}&rdquo;
      </p>

      <div className="flex items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="font-sans text-xs font-bold uppercase tracking-wider leading-tight">{r.a}</p>
          <p className="font-sans text-xs leading-tight mt-1" style={{ color: "#777777" }}>{r.loc}</p>
          <a
            href={r.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 font-sans text-xs font-semibold mt-2 hover:underline"
            style={{ color: "#7B1A30" }}
          >
            Read the Review on {r.source}
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M9 7h8v8"/></svg>
          </a>
        </div>
        <div className="shrink-0 [&_svg]:w-7 [&_svg]:h-7"><SourceIcon source={r.source} /></div>
      </div>
    </div>
  );
}
