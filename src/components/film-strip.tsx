"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { Img } from "@/lib/data";

/**
 * 장면 필름 스트립.
 * 데스크톱(마우스·넓은 화면): 구간이 화면에 고정되고 세로 스크롤만큼 가로로 흐른다.
 * 모바일·좁은 화면: 손가락으로 넘기는 가로 스크롤.
 */
export function FilmStrip({ frames, title }: { frames: Img[]; title: string }) {
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const o = outer.current, t = track.current;
    if (!o || !t) return;
    const mq = window.matchMedia("(min-width: 1024px) and (hover: hover)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0, dist = 0;
    const layout = () => {
      const pinned = mq.matches && !reduce.matches;
      dist = Math.max(0, t.scrollWidth - window.innerWidth);
      const on = pinned && dist > 40;
      o.classList.toggle("is-pinned", on);
      o.style.height = on ? `${window.innerHeight + dist}px` : "";
      if (!on) t.style.transform = "";
      paint();
    };
    const paint = () => {
      frame = 0;
      if (!o.classList.contains("is-pinned")) return;
      const r = o.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -r.top / Math.max(1, r.height - window.innerHeight)));
      t.style.transform = `translate3d(${-p * dist}px,0,0)`;
      o.style.setProperty("--p", p.toFixed(4));
    };
    const on = () => { if (!frame) frame = requestAnimationFrame(paint); };
    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(t);
    window.addEventListener("resize", layout);
    window.addEventListener("scroll", on, { passive: true });
    mq.addEventListener("change", layout);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", layout);
      window.removeEventListener("scroll", on);
      mq.removeEventListener("change", layout);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="fstrip" ref={outer}>
      <div className="fstrip-sticky">
        <div className="fstrip-head wrap">
          <span className="mono">SCENES</span>
          <span className="mono dim">{String(frames.length).padStart(2, "0")} FRAMES</span>
        </div>
        <div className="fstrip-track" ref={track}>
          {frames.map((f, i) => (
            <figure key={f.src} className="fstrip-item">
              <Image src={f.src} width={f.w} height={f.h} alt={`${title} 장면 ${i + 1}`} sizes="(min-width: 1024px) 62vw, 82vw" />
              <figcaption className="mono">{String(i + 1).padStart(2, "0")}</figcaption>
            </figure>
          ))}
        </div>
        <div className="fstrip-bar wrap" aria-hidden><i /></div>
      </div>
    </div>
  );
}
