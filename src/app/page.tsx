import { Hero } from "@/components/hero";
import { ShowreelSection } from "@/components/showreel-section";
import { WorkRow } from "@/components/work-row";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Timeline } from "@/components/timeline";
import { Line, Reveal } from "@/components/reveal";
import { works } from "@/lib/data";

export default function Home() {
  return (
    <>
      <Hero />
      <ShowreelSection />
      <section id="work" className="sec work" aria-labelledby="work-title">
        <div className="wrap">
          <Reveal className="sec-head">
            <Line className="sec-no mono">WORK</Line>
            <h2 className="sec-title" id="work-title"><Line d={60}>작업 {works.length}개</Line></h2>
            <p className="sec-desc"><Line d={140}>영상을 누르면 콘티와 제작 과정까지 볼 수 있습니다.</Line></p>
          </Reveal>
          <div className="wlist">
            {works.map((w, i) => (
              <WorkRow key={w.slug} work={w} flip={i % 2 === 1} />
            ))}
          </div>
        </div>
      </section>
      <About />
      <Contact />
      <Timeline />
    </>
  );
}
