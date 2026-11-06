import Link from "next/link";
import type { CSSProperties } from "react";
import { Line, Reveal } from "@/components/reveal";
import { WorkMedia } from "@/components/work-media";
import { PlayButton } from "@/components/video-modal";
import { ArrowIcon } from "@/components/icons";
import type { Work } from "@/lib/data";

/** 연도·길이·툴(·역할). 홈 요약에서는 역할을 뺀다 */
export function Meta({ work, base = 200, role = true }: { work: Work; base?: number; role?: boolean }) {
  const rows: [string, string][] = [["연도", work.year], ["길이", work.length], ["툴", work.tools]];
  if (role) rows.push(["역할", work.role]);
  return (
    <dl className="meta">
      {rows.map(([k, v], i) => (
        <div key={k} className="rv" style={{ "--d": base + i * 80 } as CSSProperties}>
          <dt className="mono">{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

/** 홈 작품 목록의 한 줄 (지그재그). 영상을 누르면 영상 창, 상세는 '자세히 보기' 버튼으로만 */
export function WorkRow({ work, flip }: { work: Work; flip: boolean }) {
  const href = `/works/${work.slug}`;
  return (
    <Reveal
      as="article"
      id={`w-${work.slug}`}
      className={`wrow ${flip ? "is-flip" : ""}`}
      threshold={0.12}
      data-tl={work.key}
      data-tl-label={`${work.no} ${work.title}`}
      data-tl-sec={work.seconds}
    >
      <WorkMedia youtube={work.youtube} loop={work.loop} poster={work.poster} title={work.title} />
      <div className="wrow-txt">
        <div className="wrow-no mono"><Line>{work.no}</Line><Line d={40}><span className="dim">/ {work.kind}</span></Line></div>
        <h3 className="wrow-title">
          <Line d={80}><Link href={href}>{work.title}</Link></Line>
        </h3>
        <Meta work={work} role={false} />
        <p className="wrow-body rv" style={{ "--d": 440 } as CSSProperties}>{work.text[0]}</p>
        <div className="wrow-cta rv" style={{ "--d": 520 } as CSSProperties}>
          <PlayButton id={work.youtube} title={work.title} />
          <Link href={href} className="btn btn-ghost">
            자세히 보기 <ArrowIcon />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}
