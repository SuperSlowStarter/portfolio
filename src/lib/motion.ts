"use client";

import { useEffect, useRef, useState } from "react";

/** CSS cubic-bezier와 같은 곡선을 JS에서 (rAF 트윈용). Design.md의 ease-* 와 같은 값 */
export function bezier(x1: number, y1: number, x2: number, y2: number) {
  const cx = 3 * x1, bx = 3 * (x2 - x1) - cx, ax = 1 - cx - bx;
  const cy = 3 * y1, by = 3 * (y2 - y1) - cy, ay = 1 - cy - by;
  const sx = (t: number) => ((ax * t + bx) * t + cx) * t;
  const sy = (t: number) => ((ay * t + by) * t + cy) * t;
  return (x: number) => {
    if (x <= 0) return 0;
    if (x >= 1) return 1;
    let lo = 0, hi = 1, t = x;
    for (let i = 0; i < 30; i++) {
      const v = sx(t);
      if (Math.abs(v - x) < 1e-5) break;
      if (v < x) lo = t; else hi = t;
      t = (lo + hi) / 2;
    }
    return sy(t);
  };
}
export const easePunch = bezier(0.1, 0, 0.05, 1);
export const easeSwoosh = bezier(0.85, 0, 0.15, 1);
export const easeSnap = bezier(0.9, 0, 0.9, 1);

/** requestAnimationFrame 트윈. 취소 함수 반환 */
export function tween(ms: number, ease: (x: number) => number, onUpdate: (v: number) => void, onDone?: () => void) {
  const t0 = performance.now();
  let id = 0;
  const step = (now: number) => {
    const x = Math.min(1, (now - t0) / ms);
    onUpdate(ease(x));
    if (x < 1) id = requestAnimationFrame(step);
    else onDone?.();
  };
  id = requestAnimationFrame(step);
  return () => cancelAnimationFrame(id);
}

export function useReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const on = () => setReduce(m.matches);
    on();
    m.addEventListener("change", on);
    return () => m.removeEventListener("change", on);
  }, []);
  return reduce;
}

/**
 * 요소가 화면을 지나가는 진행도(0–1)를 CSS 변수 --p 로 넣는다 (리렌더 없음).
 * start: 요소 top이 화면 높이의 start배 위치일 때 0, end: end배 위치일 때 1
 */
export function useScrollProgress<T extends HTMLElement>(start = 1, end = 0) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;
    const paint = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (start * vh - r.top) / ((start - end) * vh);
      el.style.setProperty("--p", Math.min(1, Math.max(0, p)).toFixed(4));
    };
    const on = () => { if (!frame) frame = requestAnimationFrame(paint); };
    paint();
    window.addEventListener("scroll", on, { passive: true });
    window.addEventListener("resize", on);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", on);
      window.removeEventListener("resize", on);
    };
  }, [start, end]);
  return ref;
}
