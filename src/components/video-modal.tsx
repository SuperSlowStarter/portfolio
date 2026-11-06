"use client";

import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { PlayIcon } from "@/components/icons";

/** YouTube 일부공개 영상 임베드 주소. youtube-nocookie + referrer 정책(없으면 오류 153) */
export function ytSrc(id: string) {
  return `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0&playsinline=1&modestbranding=1`;
}
export const YT_ALLOW = "autoplay; encrypted-media; picture-in-picture; fullscreen";

type Ctx = { open: (id: string, title: string) => void };
const VideoCtx = createContext<Ctx>({ open: () => {} });
export const useVideo = () => useContext(VideoCtx);

export function VideoModalProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{ id: string; title: string } | null>(null);
  const [on, setOn] = useState(false);
  const last = useRef<HTMLElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const open = useCallback((id: string, title: string) => {
    last.current = document.activeElement as HTMLElement;
    setState({ id, title });
    requestAnimationFrame(() => requestAnimationFrame(() => setOn(true)));
  }, []);
  const close = useCallback(() => {
    setOn(false);
    setTimeout(() => setState(null), 500);
    last.current?.focus();
  }, []);

  useEffect(() => {
    if (!state) return;
    closeRef.current?.focus();
    const key = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", key);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", key);
      document.documentElement.style.overflow = "";
    };
  }, [state, close]);

  return (
    <VideoCtx.Provider value={{ open }}>
      {children}
      {state && (
        <div
          className={`vmodal ${on ? "is-on" : ""}`}
          role="dialog"
          aria-modal="true"
          aria-label={`${state.title} 영상`}
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <div className="vmodal-in">
            <div className="vmodal-bar">
              <span className="mono">{state.title}</span>
              <button ref={closeRef} type="button" className="vmodal-x" onClick={close}>
                닫기 <span aria-hidden>✕</span>
              </button>
            </div>
            <div className="vmodal-frame">
              <iframe src={ytSrc(state.id)} title={state.title} allow={YT_ALLOW} referrerPolicy="strict-origin-when-cross-origin" />
            </div>
          </div>
        </div>
      )}
    </VideoCtx.Provider>
  );
}

export function PlayButton({ id, title, label = "영상 보기", className = "" }: { id: string; title: string; label?: string; className?: string }) {
  const { open } = useVideo();
  if (!id) return null;
  return (
    <button type="button" className={`btn ${className}`} onClick={() => open(id, title)}>
      <PlayIcon />
      {label}
    </button>
  );
}
