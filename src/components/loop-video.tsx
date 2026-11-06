"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/motion";

/**
 * 무음 반복 영상. 화면 근처에 오면 src를 붙여 로드하고, 보일 때만 재생 (화면 밖에선 일시정지).
 * 움직임 줄이기 설정이면 포스터만 보여 준다.
 */
export function LoopVideo({
  src,
  poster,
  className = "",
  label,
  eager = false,
}: {
  src: string;
  poster: string;
  className?: string;
  label?: string;
  eager?: boolean;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [load, setLoad] = useState(eager);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const near = new IntersectionObserver((es) => es.some((e) => e.isIntersecting) && setLoad(true), { rootMargin: "60% 0px" });
    const vis = new IntersectionObserver(
      (es) => es.forEach((e) => {
        if (reduce) return;
        if (e.isIntersecting) v.play().catch(() => {});
        else v.pause();
      }),
      { threshold: 0.05 },
    );
    near.observe(v);
    vis.observe(v);
    return () => { near.disconnect(); vis.disconnect(); };
  }, [reduce]);

  useEffect(() => {
    const v = ref.current;
    if (!v || !load) return;
    if (reduce) v.pause();
    else {
      const r = v.getBoundingClientRect();
      if (r.bottom > 0 && r.top < window.innerHeight) v.play().catch(() => {});
    }
  }, [load, reduce]);

  return (
    <video
      ref={ref}
      className={className}
      src={load ? src : undefined}
      poster={poster}
      muted
      loop
      playsInline
      preload={load ? "auto" : "none"}
      aria-label={label}
      disablePictureInPicture
    />
  );
}
