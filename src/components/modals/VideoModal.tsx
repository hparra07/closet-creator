export function VideoModal({ url, onClose }: { url: string | null; onClose: () => void }) {
  if (!url) return null;
  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative w-full max-w-3xl aspect-video" onClick={(e) => e.stopPropagation()}>
        <iframe
          src={url.replace("watch?v=", "embed/") + "?autoplay=1"}
          className="w-full h-full rounded-lg"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
        <button
          className="absolute -top-10 right-0 text-white text-sm font-medium hover:opacity-70 transition-opacity cursor-pointer"
          onClick={onClose}
        >
          Close ✕
        </button>
      </div>
    </div>
  );
}
