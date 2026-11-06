import raw from "@/data/portfolio.json";

export type Img = { src: string; w: number; h: number };
export type Pair = { sketch: Img; final: Img; caption: string };
export type Work = {
  key: string;
  slug: string;
  no: string;
  title: string;
  kind: string;
  year: string;
  length: string;
  seconds: number;
  tools: string;
  role: string;
  text: string[];
  youtube: string;
  loop: string;
  loopSm: string;
  poster: string;
  hero: Img;
  frames: Img[];
  palette?: { hex: string; name: string }[];
  tech?: string[];
  steps?: string[];
  pairs?: Pair[];
  pairsNote?: string;
  sheets?: Img[];
  sheetsNote?: string;
};
export type Profile = {
  name_ko: string;
  name_en: string;
  email: string;
  intro: string[];
  tools_main: string;
  tools_sub: string;
  education: { date: string; text: string }[];
  experience: { date: string; title: string; desc: string }[];
  award: { date: string; text: string }[];
  cert: { date: string; text: string }[];
  photo: Img;
  site: string;
};
export type Showreel = { youtube: string; loop: string; poster: string; length: string; seconds: number };

const data = raw as unknown as { profile: Profile; works: Work[]; showreel: Showreel };

export const profile = data.profile;
export const works = data.works;
export const showreel = data.showreel;
export const TOTAL_SECONDS = showreel.seconds + works.reduce((s, w) => s + w.seconds, 0);

export function getWork(slug: string) {
  const i = works.findIndex((w) => w.slug === slug);
  if (i < 0) return null;
  return { work: works[i], prev: works[(i - 1 + works.length) % works.length], next: works[(i + 1) % works.length], index: i };
}

/** 초 → HH:MM:SS:FF (30fps) */
export function timecode(sec: number) {
  const f = Math.max(0, Math.round(sec * 30));
  const p = (n: number) => String(n).padStart(2, "0");
  return `${p(Math.floor(f / 108000))}:${p(Math.floor(f / 1800) % 60)}:${p(Math.floor(f / 30) % 60)}:${p(f % 30)}`;
}
