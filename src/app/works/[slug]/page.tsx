import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { InlinePlayer } from "@/components/inline-player";
import { Line, Reveal } from "@/components/reveal";
import { Meta } from "@/components/work-row";
import { FilmStrip } from "@/components/film-strip";
import { Compare } from "@/components/compare";
import { NextWork } from "@/components/next-work";
import { ArrowIcon } from "@/components/icons";
import { getWork, works } from "@/lib/data";

export const dynamicParams = false;

export function generateStaticParams() {
  return works.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({ params }: PageProps<"/works/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const g = getWork(slug);
  if (!g) return {};
  const { work: w } = g;
  const description = `${w.kind} · ${w.year} · ${w.tools}. ${w.text[0]}`;
  return {
    title: w.title,
    description,
    alternates: { canonical: `/works/${w.slug}` },
    openGraph: { type: "article", title: `${w.title} — 이대건`, description, url: `/works/${w.slug}`, images: [{ url: w.hero.src, width: w.hero.w, height: w.hero.h }] },
    twitter: { card: "summary_large_image", title: `${w.title} — 이대건`, description, images: [w.hero.src] },
  };
}

export default async function WorkPage({ params }: PageProps<"/works/[slug]">) {
  const { slug } = await params;
  const g = getWork(slug);
  if (!g) notFound();
  const { work: w, next, prev, index } = g;

  return (
    <article className="wd">
      <div className="wrap">
        <Reveal className="wd-top mono">
          <Line><Link href="/#work" className="wd-back"><ArrowIcon dir="left" /> 전체 작업</Link></Line>
          <Line d={60}><span className="dim">{String(index + 1).padStart(2, "0")} / {String(works.length).padStart(2, "0")}</span></Line>
        </Reveal>
        <Reveal as="header" className="wd-head" threshold={0}>
          <Line className="wd-kind mono" d={80}>{w.no} — {w.kind}</Line>
          <h1 className="wd-title"><Line d={140}>{w.title}</Line></h1>
        </Reveal>
      </div>

      {/* 마스크(rv-media)는 감지 요소(Reveal) 자체가 아니라 안쪽에: 감지 요소가 잘려 있으면 IntersectionObserver가 등장을 못 잡음 */}
      <Reveal className="wd-player wrap" threshold={0.05}>
        <div className="rv-media">
          <InlinePlayer youtube={w.youtube} loop={w.loop} poster={w.poster} title={w.title} eager caption={<><span>{w.title}</span><span>{w.length}</span></>} />
        </div>
      </Reveal>

      <div className="wrap">
        <Reveal className="wd-info">
          <Meta work={w} base={0} />
          <div className="wd-body">
            {w.text.map((t, i) => (
              <p key={i} className="rv" style={{ "--d": 120 + i * 80 } as CSSProperties}>{t}</p>
            ))}
            {w.palette && (
              <div className="wd-sub rv" style={{ "--d": 300 } as CSSProperties}>
                <h2 className="wd-h mono">COLOR</h2>
                <ul className="pal">
                  {w.palette.map((c) => (
                    <li key={c.hex}><i style={{ background: c.hex }} /><span>{c.name}<small className="mono">{c.hex}</small></span></li>
                  ))}
                </ul>
              </div>
            )}
            {w.tech && (
              <div className="wd-sub rv" style={{ "--d": 360 } as CSSProperties}>
                <h2 className="wd-h mono">TECHNIQUE</h2>
                <ul className="tech">{w.tech.map((t) => <li key={t}>{t}</li>)}</ul>
              </div>
            )}
            {w.steps && (
              <div className="wd-sub rv" style={{ "--d": 360 } as CSSProperties}>
                <h2 className="wd-h mono">PIPELINE</h2>
                <ol className="steps">{w.steps.map((t) => <li key={t}>{t}</li>)}</ol>
              </div>
            )}
          </div>
        </Reveal>
      </div>

      {w.frames.length > 0 && <FilmStrip frames={[w.hero, ...w.frames]} title={w.title} />}

      {w.pairs && (
        <section className="wd-sec wrap" aria-labelledby="sb-title">
          <Reveal className="sec-head sm">
            <Line className="sec-no mono">STORYBOARD</Line>
            <h2 className="sec-title" id="sb-title"><Line d={60}>콘티 → 완성</Line></h2>
            <p className="sec-desc"><Line d={120}>가운데 손잡이를 좌우로 끌어 보세요.</Line></p>
          </Reveal>
          <Reveal threshold={0.1}>
            <div className="rv-media">
              <Compare pairs={w.pairs} note={w.pairsNote} title={w.title} />
            </div>
          </Reveal>
        </section>
      )}

      {w.sheets && (
        <section className="wd-sec" aria-labelledby="sheet-title">
          <div className="wrap">
            <Reveal className="sec-head sm">
              <Line className="sec-no mono">HAND-DRAWN</Line>
              <h2 className="sec-title" id="sheet-title"><Line d={60}>손그림 콘티</Line></h2>
              {w.sheetsNote && <p className="sec-desc"><Line d={120}>{w.sheetsNote}</Line></p>}
            </Reveal>
          </div>
          <Reveal className="sheets" threshold={0.1}>
            {w.sheets.map((s, i) => (
              <figure key={s.src} className="sheet rv" style={{ "--d": i * 100 } as CSSProperties}>
                <Image src={s.src} width={s.w} height={s.h} alt={`${w.title} 손그림 콘티 ${i + 1}`} sizes="(min-width: 1024px) 30vw, 78vw" />
              </figure>
            ))}
          </Reveal>
        </section>
      )}

      <NextWork next={next} prev={prev} />
    </article>
  );
}
