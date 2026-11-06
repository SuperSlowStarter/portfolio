export function PlayIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={`ic-play ${className}`} viewBox="0 0 12 14" aria-hidden="true">
      <path d="M0 0v14l12-7z" fill="currentColor" />
    </svg>
  );
}

export function ArrowIcon({ className = "", dir = "right" }: { className?: string; dir?: "right" | "left" | "up" }) {
  const r = { right: 0, left: 180, up: -90 }[dir];
  return (
    <svg className={`ic-arrow ${className}`} viewBox="0 0 16 16" aria-hidden="true" style={{ transform: `rotate(${r}deg)` }}>
      <path d="M2 8h11M9 4l4 4-4 4" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
