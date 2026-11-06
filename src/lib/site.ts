/** 사이트 주소: Vercel 운영 주소(자동) → 직접 지정(NEXT_PUBLIC_SITE_URL) → 로컬 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const SITE_NAME = "이대건 포트폴리오";
export const SITE_TITLE = "이대건 — 모션그래픽 디자이너";
export const SITE_DESCRIPTION =
  "알아듣는 건 쉽게, 보이는 건 낯설게. 모션그래픽 디자이너 이대건의 포트폴리오 — 키네틱 타이포그래피, 3D 모션그래픽, Unreal Engine 애니메이션, 프로젝션매핑, 타이틀 시퀀스.";
