"use client";

import { useEffect, useRef, useState } from "react";
import { Line, Reveal } from "@/components/reveal";
import { LoopVideo } from "@/components/loop-video";
import { PlayButton } from "@/components/video-modal";
import { easeSnap, easeSwoosh, tween, useReducedMotion } from "@/lib/motion";
import { profile, showreel, timecode, works } from "@/lib/data";

// 클립 폭: 길이의 제곱근 (3초짜리도 보이고 4분짜리가 화면을 다 먹지 않게). a~b = 스트립에서 차지하는 구간(0–1), s0 = 누적 시작 초
const WTS = works.map((w) => Math.max(4, Math.sqrt(w.seconds)));
const SUM = WTS.reduce((a, b) => a + b, 0);
const clips = works.map((w, i) => {
  const before = WTS.slice(0, i).reduce((a, b) => a + b, 0);
  return { w, a: before / SUM, b: (before + WTS[i]) / SUM, s0: works.slice(0, i).reduce((s, x) => s + x.seconds, 0), grow: WTS[i] };
});

/**
 * 첫 화면: 제목 + 작품 8개 클립 스트립.
 * 처음 열리면 재생 헤드가 왼쪽→오른쪽으로 쓸고 지나가며 클립이 드러나고(렌더링되듯), 끝에서 0으로 탁 돌아온다.
 * 마우스를 올리면 재생 헤드가 커서를 따라오며 그 지점의 타임코드를 보여 준다.
 */
export function Hero() {
  const reduce = useReducedMotion();
  const strip = useRef<HTMLDivElement>(null);
  const ph = useRef<HTMLDivElement>(null);
  const tc = useRef<HTMLSpanElement>(null);
  const cover = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(-1);
  const [swept, setSwept] = useState(false);
  const ready = swept || reduce;

  const setHead = (x: number) => {
    const i = Math.max(0, clips.findIndex((c) => x >= c.a && x <= c.b));
    const c = clips[i];
    const sec = c.s0 + ((x - c.a) / (c.b - c.a)) * c.w.seconds;
    if (ph.current) ph.current.style.transform = `translateX(${x * (strip.current?.clientWidth ?? 0)}px)`;
    if (tc.current) tc.current.textContent = timecode(sec);
    return i;
  };

  useEffect(() => {
    if (reduce) {
      if (cover.current) cover.current.style.transform = "scaleX(0)";
      return;
    }
    let cancel = () => {};
    const start = setTimeout(() => {
      cancel = tween(1900, easeSwoosh, (v) => {
        setHead(v);
        if (cover.current) cover.current.style.transform = `scaleX(${1 - v})`;
      }, () => {
        cancel = tween(520, easeSnap, (v) => setHead(1 - v), () => setSwept(true));
      });
    }, 650);
    return () => { clearTimeout(start); cancel(); };
  }, [reduce]);

  const onMove = (e: React.PointerEvent) => {
    if (!ready || e.pointerType !== "mouse" || !strip.current) return;
    const r = strip.current.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
    ph.current?.classList.remove("is-return");
    const i = setHead(x);
    if (i !== active) setActive(i);
  };
  const onLeave = () => {
    if (!ready) return;
    ph.current?.classList.add("is-return");
    setHead(0);
    setActive(-1);
  };

  return (
    <section className="hero" id="top" data-tl="intro" data-tl-label="INTRO" data-tl-sec="0">
      <div className="wrap hero-in">
        <Reveal as="h1" className="hero-title" threshold={0}>
          <Line d={120}>알아듣는 건 쉽게,</Line>
          <Line d={220}>
            보이는 건 <em className="hero-em">낯설게.</em>
            <span className="hero-caret" aria-hidden />
          </Line>
        </Reveal>

        <Reveal className="hero-sub" threshold={0}>
          <Line d={420}>
            <span className="hero-who">모션그래픽 디자이너 <b>{profile.name_ko}</b></span>
          </Line>
          <Line d={500}>
            <PlayButton id={showreel.youtube} title="Showreel 2026" label="쇼릴 보기" className="btn-accent" />
          </Line>
        </Reveal>

        <div className="hero-tl">
          <div className="hero-ph" ref={ph} aria-hidden>
            <span className="hero-tc mono" ref={tc}>00:00:00:00</span>
          </div>
          <div className="hero-strip" ref={strip} onPointerMove={onMove} onPointerLeave={onLeave} data-active={active >= 0 ? "" : undefined}>
            {clips.map((c, i) => (
              <a
                key={c.w.slug}
                href={`#w-${c.w.slug}`}
                className={`hclip ${active === i ? "is-on" : ""}`}
                style={{ flexGrow: c.grow }}
                aria-label={`${c.w.no} ${c.w.title}`}
              >
                <span className="hclip-media">
                  <LoopVideo src={c.w.loopSm} poster={c.w.poster} className="hclip-v" eager />
                </span>
                <span className="hclip-lbl">
                  <span className="mono">{c.w.no}</span> {c.w.title}
                </span>
              </a>
            ))}
            <div className="hero-cover" ref={cover} aria-hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
