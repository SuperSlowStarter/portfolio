"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { easeSwoosh, tween } from "@/lib/motion";
import type { Pair } from "@/lib/data";

/**
 * 콘티 → 완성 비교. 완성 화면 위에 콘티를 겹치고, 손잡이를 끌어 경계를 옮긴다 (왼쪽 = 콘티, 오른쪽 = 완성).
 * 처음 화면에 들어오면 손잡이가 한 번 움직여 사용법을 보여 준다. 키보드 ← → 로도 조작.
 */
export function Compare({ pairs, note, title }: { pairs: Pair[]; note?: string; title: string }) {
  const [i, setI] = useState(0);
  const [x, setX] = useState(50);
  const box = useRef<HTMLDivElement>(null);
  const drag = useRef(false);
  const hinted = useRef(false);

  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver((es) => {
      if (!es[0].isIntersecting || hinted.current) return;
      hinted.current = true;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      tween(900, easeSwoosh, (v) => setX(50 + 38 * v), () => {
        setTimeout(() => tween(1100, easeSwoosh, (v) => setX(88 - 38 * v)), 250);
      });
    }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const at = (clientX: number) => {
    const r = box.current!.getBoundingClientRect();
    setX(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  };
  const p = pairs[i];

  return (
    <div className="cmp">
      <div
        className="cmp-box"
        ref={box}
        onPointerDown={(e) => { drag.current = true; e.currentTarget.setPointerCapture(e.pointerId); at(e.clientX); }}
        onPointerMove={(e) => drag.current && at(e.clientX)}
        onPointerUp={() => (drag.current = false)}
        onPointerCancel={() => (drag.current = false)}
      >
        <div className="cmp-layer cmp-final" key={`f${i}`}>
          <Image src={p.final.src} width={p.final.w} height={p.final.h} alt={`완성: ${p.caption}`} sizes="(min-width: 1024px) 70vw, 100vw" />
        </div>
        <div className="cmp-layer cmp-sketch" key={`s${i}`} style={{ clipPath: `inset(0 ${100 - x}% 0 0)` }}>
          <Image src={p.sketch.src} width={p.sketch.w} height={p.sketch.h} alt={`콘티: ${p.caption}`} sizes="(min-width: 1024px) 70vw, 100vw" />
        </div>
        <span className="cmp-tag cmp-tag-l mono" aria-hidden>콘티</span>
        <span className="cmp-tag cmp-tag-r mono" aria-hidden>완성</span>
        <div
          className="cmp-handle"
          style={{ left: `${x}%` }}
          role="slider"
          tabIndex={0}
          aria-label={`${title} 콘티와 완성 화면 비교`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(x)}
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") setX((v) => Math.max(0, v - 5));
            if (e.key === "ArrowRight") setX((v) => Math.min(100, v + 5));
          }}
        >
          <span className="cmp-knob" aria-hidden>
            <svg viewBox="0 0 20 12"><path d="M6 1 1 6l5 5M14 1l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.5" /></svg>
          </span>
        </div>
      </div>
      <div className="cmp-foot">
        <p className="cmp-cap"><span className="mono">{String(i + 1).padStart(2, "0")}</span> {p.caption}</p>
        <ul className="cmp-thumbs" aria-label="장면 선택">
          {pairs.map((q, j) => (
            <li key={q.caption}>
              <button type="button" className={j === i ? "is-on" : ""} onClick={() => setI(j)} aria-label={q.caption} aria-pressed={j === i}>
                <Image src={q.final.src} width={q.final.w} height={q.final.h} alt="" sizes="120px" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      {note && <p className="cmp-note">{note}</p>}
    </div>
  );
}
