"use client";

import Image from "next/image";
import { useCallback, useEffect, useState, type CSSProperties } from "react";
import { Reveal } from "@/components/reveal";
import type { Img } from "@/lib/data";

export type Tile = { img: Img; sketch?: Img; caption?: string };

/**
 * 장면 격자: 같은 크기 16:9 3열 (모바일 2열). 콘택트 시트처럼 정돈되게.
 * 콘티가 있는 장면은 표시 없이, 마우스를 올리면 모서리에 작은 카드로 콘티가 뜬다 — 완성 화면이 늘 주인공.
 * 누르면 크게 보기 (← → 로 넘김, Esc 닫기). 콘티는 크게 보기에서도 옆에 작게.
 */
export function SceneGrid({ tiles, sheets = [], title }: { tiles: Tile[]; sheets?: Img[]; title: string }) {
  const [open, setOpen] = useState<number | null>(null);
  const [on, setOn] = useState(false);
  const all: { img: Img; sketch?: Img; caption?: string; sheet?: boolean }[] = [...tiles, ...sheets.map((s) => ({ img: s, sheet: true }))];

  const show = (i: number) => {
    setOpen(i);
    requestAnimationFrame(() => requestAnimationFrame(() => setOn(true)));
  };
  const close = useCallback(() => {
    setOn(false);
    setTimeout(() => setOpen(null), 420);
  }, []);
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + all.length) % all.length)), [all.length]);

  useEffect(() => {
    if (open === null) return;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.addEventListener("keydown", key);
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", key);
      document.documentElement.style.overflow = "";
    };
  }, [open, close, step]);

  const cur = open === null ? null : all[open];
  return (
    <>
      <Reveal className="sg" threshold={0.05}>
        {tiles.map((t, i) => (
          <button
            key={t.img.src}
            type="button"
            className="sg-tile rv-media"
            style={{ "--d": (i % 3) * 90 + Math.floor(i / 3) * 60 } as CSSProperties}
            onClick={() => show(i)}
            aria-label={`${t.caption ?? `장면 ${i + 1}`} 크게 보기`}
          >
            <Image src={t.img.src} fill alt={t.caption ?? `${title} 장면 ${i + 1}`} sizes="(min-width: 768px) 31vw, 50vw" />
            <span className="sg-cap">
              <span className="mono">{String(i + 1).padStart(2, "0")}</span>
              {t.caption && <span className="sg-cap-t">{t.caption}</span>}
            </span>
            {t.sketch && (
              <span className="sg-pip" aria-hidden>
                <Image src={t.sketch.src} fill alt="" sizes="240px" />
              </span>
            )}
          </button>
        ))}
      </Reveal>
      {sheets.length > 0 && (
        <Reveal className="sg-sheets" threshold={0.1}>
          {sheets.map((s, j) => (
            <button key={s.src} type="button" className="sg-sheet rv" style={{ "--d": j * 90 } as CSSProperties} onClick={() => show(tiles.length + j)} aria-label={`손그림 콘티 ${j + 1} 크게 보기`}>
              <Image src={s.src} width={s.w} height={s.h} alt={`${title} 손그림 콘티 ${j + 1}`} sizes="(min-width: 768px) 22vw, 33vw" />
            </button>
          ))}
        </Reveal>
      )}

      {cur && (
        <div className={`lb ${on ? "is-on" : ""}`} role="dialog" aria-modal="true" aria-label="크게 보기" onClick={(e) => e.target === e.currentTarget && close()}>
          <div className="lb-bar mono">
            <span>{String(open! + 1).padStart(2, "0")} / {String(all.length).padStart(2, "0")}{cur.caption ? ` · ${cur.caption}` : ""}</span>
            <button type="button" onClick={close} autoFocus>닫기 ✕</button>
          </div>
          <figure className={`lb-fig ${cur.sheet ? "is-sheet" : ""}`} key={cur.img.src}>
            <Image src={cur.img.src} width={cur.img.w} height={cur.img.h} alt={cur.caption ?? `${title} 장면`} sizes="90vw" />
            {cur.sketch && (
              <figcaption className="lb-sketch">
                <span className="mono">STORYBOARD</span>
                <Image src={cur.sketch.src} width={cur.sketch.w} height={cur.sketch.h} alt={`콘티: ${cur.caption ?? ""}`} sizes="280px" />
              </figcaption>
            )}
          </figure>
          <button type="button" className="lb-nav lb-prev" onClick={() => step(-1)} aria-label="이전">←</button>
          <button type="button" className="lb-nav lb-next" onClick={() => step(1)} aria-label="다음">→</button>
        </div>
      )}
    </>
  );
}
