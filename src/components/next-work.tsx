import Link from "next/link";
import { LoopVideo } from "@/components/loop-video";
import { ArrowIcon } from "@/components/icons";
import type { Work } from "@/lib/data";

/** 상세 페이지 하단: 다음 작품 (크게) + 이전 작품 */
export function NextWork({ next, prev }: { next: Work; prev: Work }) {
  return (
    <nav className="nw wrap" aria-label="다른 작품">
      <Link href={`/works/${next.slug}`} className="nw-next">
        <span className="nw-media" aria-hidden>
          <LoopVideo src={next.loopSm} poster={next.poster} className="nw-v" />
        </span>
        <span className="nw-txt">
          <span className="mono dim">NEXT · {next.no}</span>
          <span className="nw-title">{next.title}</span>
          <span className="nw-kind">{next.kind}</span>
        </span>
        <span className="nw-arrow" aria-hidden><ArrowIcon /></span>
      </Link>
      <div className="nw-row mono">
        <Link href={`/works/${prev.slug}`}><ArrowIcon dir="left" /> PREV · {prev.no} {prev.title}</Link>
        <Link href="/#work">전체 작업</Link>
      </div>
    </nav>
  );
}
