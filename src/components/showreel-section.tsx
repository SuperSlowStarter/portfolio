"use client";

import { InlinePlayer } from "@/components/inline-player";
import { Line, Reveal } from "@/components/reveal";
import { useScrollProgress } from "@/lib/motion";
import { showreel } from "@/lib/data";

/** 쇼릴: 스크롤로 들어오며 86% → 100%로 커지는 16:9 화면. 재생 버튼 → 그 자리에서 YouTube 재생 */
export function ShowreelSection() {
  const grow = useScrollProgress<HTMLDivElement>(1, 0.2);
  return (
    <section id="showreel" className="sec reel" data-tl="showreel" data-tl-label="00 SHOWREEL" data-tl-sec={showreel.seconds}>
      <div className="wrap">
        <Reveal className="sec-head">
          <Line className="sec-no mono">00</Line>
          <h2 className="sec-title"><Line d={60}>Showreel 2026</Line></h2>
        </Reveal>
      </div>
      <div className="reel-stage" ref={grow}>
        <div className="reel-frame">
          <InlinePlayer
            youtube={showreel.youtube}
            loop={showreel.loop}
            poster={showreel.poster}
            title="Showreel 2026"
            caption={
              <>
                <span>SHOWREEL 2026</span>
                <span>Future Is Now — FLYIN · {showreel.length}</span>
              </>
            }
          />
        </div>
      </div>
    </section>
  );
}
