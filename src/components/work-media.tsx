"use client";

import Link from "next/link";
import { useRef } from "react";
import { LoopVideo } from "@/components/loop-video";
import { ArrowIcon } from "@/components/icons";

/** 작품 반복 영상 = 상세 페이지 링크. 마우스를 올리면 '자세히 보기' 칩이 커서를 따라온다 */
export function WorkMedia({ href, loop, poster, title, sizes = "wide" }: { href: string; loop: string; poster: string; title: string; sizes?: "wide" | "card" }) {
  const chip = useRef<HTMLSpanElement>(null);
  const move = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== "mouse" || !chip.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    chip.current.style.transform = `translate(${e.clientX - r.left}px, ${e.clientY - r.top}px)`;
    e.currentTarget.classList.add("has-pos"); // 위치를 받은 뒤에만 칩 표시 (스크롤로 커서 밑에 들어온 경우 (0,0)에 뜨지 않게)
  };
  return (
    <Link
      href={href}
      className={`wmedia rv-media wmedia-${sizes}`}
      onPointerMove={move}
      onPointerLeave={(e) => e.currentTarget.classList.remove("has-pos")}
      aria-label={`${title} 자세히 보기`}
    >
      <span className="wmedia-inner">
        <LoopVideo src={loop} poster={poster} className="wmedia-v" label={`${title} 미리보기`} />
      </span>
      <span className="wmedia-chip" ref={chip} aria-hidden>
        <span>자세히 보기 <ArrowIcon /></span>
      </span>
    </Link>
  );
}
