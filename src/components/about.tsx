import Image from "next/image";
import type { CSSProperties } from "react";
import { Line, Reveal } from "@/components/reveal";
import { profile as P } from "@/lib/data";

function List({ title, rows, d }: { title: string; rows: { date: string; main: string; sub?: string }[]; d: number }) {
  return (
    <div className="ab-block">
      <h3 className="ab-h rv" style={{ "--d": d } as CSSProperties}>{title}</h3>
      <ul className="ab-list">
        {rows.map((r, i) => (
          <li key={r.date + r.main} className="rv" style={{ "--d": d + 60 + i * 60 } as CSSProperties}>
            <span className="mono">{r.date}</span>
            <div>
              <b>{r.main}</b>
              {r.sub && <small>{r.sub}</small>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="sec about" data-tl="about" data-tl-label="ABOUT" data-tl-sec="0">
      <div className="wrap">
        <Reveal className="sec-head">
          <Line className="sec-no mono">ABOUT</Line>
          <h2 className="sec-title"><Line d={60}>{P.name_ko}</Line></h2>
        </Reveal>
        <Reveal className="ab-grid" threshold={0.08}>
          <div className="ab-me">
            <div className="ab-photo rv-media">
              <Image src={P.photo.src} width={P.photo.w} height={P.photo.h} alt={`${P.name_ko} 사진`} sizes="200px" />
            </div>
            <p className="ab-en mono rv" style={{ "--d": 120 } as CSSProperties}>{P.name_en}</p>
            <p className="ab-lead rv" style={{ "--d": 180 } as CSSProperties}>{P.intro[0]}</p>
            {P.intro.slice(1).map((t, i) => (
              <p key={i} className="ab-p rv" style={{ "--d": 240 + i * 60 } as CSSProperties}>{t}</p>
            ))}
            <p className="ab-mail rv" style={{ "--d": 320 } as CSSProperties}>
              <span className="mono">메일</span>
              <a href={`mailto:${P.email}`}>{P.email}</a>
            </p>
          </div>
          <div className="ab-cols">
            <div>
              <List title="학력" d={100} rows={P.education.map((e) => ({ date: e.date, main: e.text }))} />
              <List title="경력" d={220} rows={P.experience.map((e) => ({ date: e.date, main: e.title, sub: e.desc }))} />
            </div>
            <div>
              <List title="수상 · 전시" d={160} rows={P.award.map((e) => ({ date: e.date, main: e.text }))} />
              <List title="자격 · 어학" d={280} rows={P.cert.map((e) => ({ date: e.date, main: e.text }))} />
              <List
                title="툴"
                d={340}
                rows={[
                  { date: "주로 씀", main: P.tools_main },
                  { date: "다룰 수 있음", main: P.tools_sub },
                ]}
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
