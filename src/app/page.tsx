import { Hero } from "@/components/hero";
import { ShowreelSection } from "@/components/showreel-section";
import { WorkRow } from "@/components/work-row";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Timeline } from "@/components/timeline";
import { Line, Reveal } from "@/components/reveal";
import { works } from "@/lib/data";

/** 홈: 첫 화면 → 쇼릴 → About → Works → 연락처 (아래 고정 타임라인은 이 순서를 그대로 따른다) */
export default function Home() {
  return (
    <>
      <Hero />
      <ShowreelSection />
      <About />
      <section id="work" className="sec work" aria-labelledby="work-title">
        <div className="wrap">
          <Reveal className="sec-head">
            <h2 className="sec-title sec-title-xl" id="work-title">
              <Line>
                Works<sup className="sec-count mono">{String(works.length).padStart(2, "0")}</sup>
              </Line>
            </h2>
          </Reveal>
          <div className="wlist">
            {works.map((w, i) => (
              <WorkRow key={w.slug} work={w} flip={i % 2 === 1} />
            ))}
          </div>
        </div>
      </section>
      <Contact />
      <Timeline />
    </>
  );
}
