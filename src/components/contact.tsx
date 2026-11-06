"use client";

import { useState } from "react";
import { Line, Reveal } from "@/components/reveal";
import { profile } from "@/lib/data";

export function Contact() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      const t = document.createElement("textarea");
      t.value = profile.email;
      document.body.appendChild(t);
      t.select();
      document.execCommand("copy");
      t.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <section id="contact" className="sec contact" data-tl="contact" data-tl-label="END" data-tl-sec="0">
      <div className="wrap">
        <Reveal className="ct">
          <Line className="sec-no mono">END</Line>
          <h2 className="ct-title">
            <Line d={80}>감사합니다</Line>
          </h2>
          <div className="ct-row">
            <Line d={240}>
              <a className="ct-mail" href={`mailto:${profile.email}`}>{profile.email}</a>
            </Line>
            <Line d={300}>
              <button type="button" className={`btn btn-ghost ${copied ? "is-done" : ""}`} onClick={copy} aria-live="polite">
                {copied ? "복사했어요" : "메일 주소 복사"}
              </button>
            </Line>
          </div>
        </Reveal>
      </div>
      <footer className="foot wrap mono">
        <span>© 2026 {profile.name_ko} · {profile.name_en}</span>
        <a href="#top">맨 위로 ↑</a>
      </footer>
    </section>
  );
}
