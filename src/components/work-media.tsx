"use client";

import { useRef } from "react";
import { LoopVideo } from "@/components/loop-video";
import { PlayIcon } from "@/components/icons";
import { useVideo } from "@/components/video-modal";

/**
 * 작품 반복 영상. 누르면 영상 창에서 전체 영상 재생 (페이지는 넘어가지 않음 — 상세는 '자세히 보기' 버튼).
 * 마우스를 올리면 '영상 보기' 칩이 커서를 따라온다.
 */
export function WorkMedia({ youtube, loop, poster, title }: { youtube: string; loop: string; poster: string; title: string }) {
  const chip = useRef<HTMLSpanElement>(null);
  const { open } = useVideo();
  const move = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== "mouse" || !chip.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    chip.current.style.transform = `translate(${e.clientX - r.left}px, ${e.clientY - r.top}px)`;
    e.currentTarget.classList.add("has-pos"); // 위치를 받은 뒤에만 칩 표시 (스크롤로 커서 밑에 들어온 경우 (0,0)에 뜨지 않게)
  };
  return (
    <button
      type="button"
      className="wmedia rv-media"
      onClick={() => youtube && open(youtube, title)}
      onPointerMove={move}
      onPointerLeave={(e) => e.currentTarget.classList.remove("has-pos")}
      aria-label={`${title} 영상 보기`}
    >
      <span className="wmedia-inner">
        <LoopVideo src={loop} poster={poster} className="wmedia-v" label={`${title} 미리보기`} />
      </span>
      <span className="wmedia-play" aria-hidden><PlayIcon /></span>
      <span className="wmedia-chip" ref={chip} aria-hidden>
        <span><PlayIcon /> 영상 보기</span>
      </span>
    </button>
  );
}
