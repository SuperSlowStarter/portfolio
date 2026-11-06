"use client";

import { useEffect, useRef, type CSSProperties, type ElementType, type ReactNode } from "react";

/**
 * 화면에 들어오면 .is-in 을 붙인다 (한 번만). 실제 움직임은 globals.css 의 .rv / .mask / .rv-media 가 담당.
 * 자식에 style={{"--d": 80}} 처럼 지연(ms)을 주면 스태거
 */
export function Reveal({
  as: Tag = "div",
  className = "",
  children,
  threshold = 0.18,
  style,
  id,
  ...rest
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  threshold?: number;
  style?: CSSProperties;
  id?: string;
  [k: `data-${string}`]: string | number | undefined;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (e.isIntersecting) { el.classList.add("is-in"); io.disconnect(); }
      }),
      { threshold, rootMargin: "0px 0px -6% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return (
    <Tag ref={ref} id={id} className={`rv-root ${className}`} style={style} {...rest}>
      {children}
    </Tag>
  );
}

/** 마스크 안에서 아래→위로 올라오는 한 줄 */
export function Line({ children, d = 0, className = "" }: { children: ReactNode; d?: number; className?: string }) {
  return (
    <span className={`mask ${className}`}>
      <span style={{ "--d": d } as CSSProperties}>{children}</span>
    </span>
  );
}
