import Image from "next/image";
import type { CSSProperties } from "react";
import { Line, Reveal } from "@/components/reveal";
import { profile as P } from "@/lib/data";

function List({ title, rows, d }: { title: string; rows: { date: string; main: string; sub?: string }[]; d: number }) {
  return (
    <div className="ab-block">
      <h3 className="ab-h mono rv" style={{ "--d": d } as CSSProperties}>{title}</h3>
      <ul className="ab-list">
        {rows.map((r, i) => (
          <li key={r.date + r.main} className="rv" style={{ "--d": d + 50 + i * 45 } as CSSProperties}>
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

/** About: PDF 프로필처럼 세 열 — 한 화면(1440×900 이상)에 들어오게 */
export function About() {
  return (
    <section id="about" className="sec about" data-tl="about" data-tl-label="ABOUT" data-tl-sec="0">
      <div className="wrap">
        <Reveal className="ab-grid" threshold={0.08}>
          <div className="ab-me">
            <Line className="sec-no mono">ABOUT</Line>
            <div className="ab-id">
              <div className="ab-photo rv-media">
                <Image src={P.photo.src} width={P.photo.w} height={P.photo.h} alt={`${P.name_ko} 사진`} sizes="132px" />
              </div>
              <div>
                <h2 className="ab-name"><Line d={80}>{P.name_ko}</Line></h2>
                <p className="ab-en mono rv" style={{ "--d": 140 } as CSSProperties}>{P.name_en} · Motion Graphics Designer</p>
              </div>
            </div>
            <p className="ab-lead rv" style={{ "--d": 200 } as CSSProperties}>{P.intro[0]}</p>
            {P.intro.slice(1).map((t, i) => (
              <p key={i} className="ab-p rv" style={{ "--d": 260 + i * 60 } as CSSProperties}>{t}</p>
            ))}
            <p className="ab-mail rv" style={{ "--d": 320 } as CSSProperties}>
              <a href={`mailto:${P.email}`}>{P.email}</a>
            </p>
          </div>
          <div className="ab-col">
            <List title="EDUCATION · 학력" d={100} rows={P.education.map((e) => ({ date: e.date, main: e.text }))} />
            <List title="EXPERIENCE · 경력" d={200} rows={P.experience.map((e) => ({ date: e.date, main: e.title, sub: e.desc }))} />
          </div>
          <div className="ab-col">
            <List title="AWARDS · 수상·전시" d={150} rows={P.award.map((e) => ({ date: e.date, main: e.text }))} />
            <List title="CERTIFICATE · 자격·어학" d={260} rows={P.cert.map((e) => ({ date: e.date, main: e.text }))} />
            <List
              title="TOOLS · 툴"
              d={320}
              rows={[
                { date: "Main", main: P.tools_main },
                { date: "Sub", main: P.tools_sub },
              ]}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
