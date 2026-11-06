"use client";

import { useState } from "react";
import { LoopVideo } from "@/components/loop-video";
import { PlayIcon } from "@/components/icons";
import { YT_ALLOW, ytSrc } from "@/components/video-modal";

/** 반복 영상 위 재생 버튼 → 누르면 그 자리에서 YouTube 재생 (쇼릴, 작품 상세 상단) */
export function InlinePlayer({
  youtube,
  loop,
  poster,
  title,
  caption,
  eager,
}: {
  youtube: string;
  loop: string;
  poster: string;
  title: string;
  caption?: React.ReactNode;
  eager?: boolean;
}) {
  const [playing, setPlaying] = useState(false);
  return (
    <div className={`iplayer ${playing ? "is-playing" : ""}`}>
      {playing ? (
        <iframe src={ytSrc(youtube)} title={title} allow={YT_ALLOW} referrerPolicy="strict-origin-when-cross-origin" />
      ) : (
        <>
          <LoopVideo src={loop} poster={poster} className="iplayer-loop" label={`${title} 미리보기`} eager={eager} />
          <div className="iplayer-shade" aria-hidden />
          {caption && <div className="iplayer-cap">{caption}</div>}
          <button type="button" className="iplayer-btn" onClick={() => setPlaying(true)} aria-label={`${title} 전체 영상 재생`}>
            <span className="iplayer-disc"><PlayIcon /></span>
            <span className="iplayer-lbl">전체 영상 재생</span>
          </button>
        </>
      )}
    </div>
  );
}
