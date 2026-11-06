import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { CSSProperties } from "react";
import { InlinePlayer } from "@/components/inline-player";
import { Line, Reveal } from "@/components/reveal";
import { Meta } from "@/components/work-row";
import { SceneGrid, type Tile } from "@/components/scene-grid";
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
  const tiles: Tile[] = w.scenes;

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

      {tiles.length > 0 && (
        <section className="wd-sec wrap" aria-labelledby="scenes-title">
          <Reveal className="sec-head sm sg-head">
            <h2 className="sec-title" id="scenes-title"><Line>Scenes</Line></h2>
            <p className="sec-desc"><Line d={80}>{w.pairsNote ?? w.sheetsNote ?? "장면을 누르면 크게 볼 수 있습니다."}</Line></p>
            {w.pairs && <p className="sg-hint mono"><Line d={140}>일부 장면은 마우스를 올리면 콘티가 함께 보입니다</Line></p>}
          </Reveal>
          <SceneGrid tiles={tiles} sheets={w.sheets} title={w.title} />
        </section>
      )}
      <NextWork next={next} prev={prev} />
    </article>
  );
}
