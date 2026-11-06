"use client";

import { useEffect, useRef, useState } from "react";
import { TOTAL_SECONDS, timecode } from "@/lib/data";

type Seg = { key: string; label: string; sec: number; a: number; b: number; s0: number; el: HTMLElement };

/**
 * 화면 아래 고정 타임라인 (홈). [data-tl] 섹션마다 클립 하나, 폭 = 섹션의 실제 높이.
 * 재생 헤드 = 스크롤 위치 (읽는 위치가 화면 위→아래로 내려가도록 보정), 타임코드 = 작품 길이 누적.
 */
export function Timeline() {
  const [segs, setSegs] = useState<Seg[]>([]);
  const segsRef = useRef<Seg[]>([]);
  const root = useRef<HTMLDivElement>(null);
  const ph = useRef<HTMLDivElement>(null);
  const tc = useRef<HTMLSpanElement>(null);
  const lbl = useRef<HTMLSpanElement>(null);
  const cur = useRef("");

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      const els = [...document.querySelectorAll<HTMLElement>("[data-tl]")];
      const H = document.documentElement.scrollHeight;
      let s0 = 0;
      const out = els.map((el, i) => {
        const top = el.getBoundingClientRect().top + window.scrollY;
        const next = els[i + 1] ? els[i + 1].getBoundingClientRect().top + window.scrollY : H;
        const sec = Number(el.dataset.tlSec || 0);
        const seg = { key: el.dataset.tl!, label: el.dataset.tlLabel || "", sec, a: top / H, b: next / H, s0, el };
        s0 += sec;
        return seg;
      });
      segsRef.current = out;
      setSegs(out);
      paint();
    };
    const paint = () => {
      frame = 0;
      const H = document.documentElement.scrollHeight, vh = window.innerHeight;
      const max = Math.max(1, H - vh), y = window.scrollY;
      const p = Math.min(1, (y + vh * (y / max)) / H);
      root.current?.classList.toggle("is-on", y > vh * 0.55);
      if (ph.current) ph.current.style.left = `${p * 100}%`;
      const s = segsRef.current.find((g) => p >= g.a && p <= g.b) ?? segsRef.current.at(-1);
      if (!s) return;
      const local = (p - s.a) / Math.max(1e-6, s.b - s.a);
      if (tc.current) tc.current.textContent = p > 0.995 ? "END" : timecode(s.s0 + local * s.sec);
      if (cur.current !== s.key) {
        cur.current = s.key;
        if (lbl.current) lbl.current.textContent = s.label;
        root.current?.querySelectorAll(".tl-seg").forEach((n) => n.classList.toggle("is-cur", (n as HTMLElement).dataset.k === s.key));
      }
    };
    const on = () => { if (!frame) frame = requestAnimationFrame(paint); };
    measure();
    const ro = new ResizeObserver(() => measure());
    ro.observe(document.body);
    window.addEventListener("scroll", on, { passive: true });
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", on);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="tl" ref={root} aria-label="페이지 타임라인">
      <div className="tl-in">
        <div className="tl-info mono">
          <span className="tl-tc" ref={tc}>00:00:00:00</span>
          <span className="tl-lbl" ref={lbl}>INTRO</span>
        </div>
        <div className="tl-track">
          {segs.map((s) => (
            <button
              key={s.key}
              type="button"
              data-k={s.key}
              className={`tl-seg ${s.sec ? "" : "is-mark"}`}
              style={{ left: `${s.a * 100}%`, width: `${(s.b - s.a) * 100}%` }}
              onClick={() => s.el.scrollIntoView({ behavior: "smooth" })}
              aria-label={`${s.label}로 이동`}
              title={s.label}
            >
              <i />
            </button>
          ))}
          <div className="tl-ph" ref={ph} aria-hidden />
        </div>
        <span className="tl-total mono" aria-label="전체 길이">{timecode(TOTAL_SECONDS)}</span>
      </div>
    </div>
  );
}
