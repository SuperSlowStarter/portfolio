"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const NAV = [
  { href: "/#showreel", label: "Showreel" },
  { href: "/#work", label: "Work" },
  { href: "/#about", label: "About" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <header className={`hdr ${scrolled ? "is-scrolled" : ""}`}>
      <div className="hdr-in wrap">
        <Link href="/" className="hdr-logo" aria-label="이대건 포트폴리오 홈">
          <span className="hdr-mark" aria-hidden />
          이대건
          <span className="hdr-role">Motion Graphics</span>
        </Link>
        <nav aria-label="주요 메뉴">
          <ul className="hdr-nav">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href}>{n.label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
