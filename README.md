# 이대건 모션그래픽 포트폴리오

Next.js 16 · React 19 · Tailwind v4. GitHub `main`에 push하면 Vercel이 자동 배포합니다.
기획은 [`PRD.md`](PRD.md), 색·글꼴·모션 규칙은 [`Design.md`](Design.md).

## 로컬에서 보기
```bash
npm install          # 처음 한 번
npm run dev          # http://localhost:3000 (수정하면 바로 반영)
# 배포본과 똑같이 보려면
npm run build && npm start
```

## 내용 바꾸기
문구·이미지는 PDF 포트폴리오와 같은 원본을 씁니다. `src/data/portfolio.json`은 직접 고치지 마세요.

| 바꿀 것 | 고칠 곳 (`../portfolio_build/scripts/`) | 그다음 |
|---|---|---|
| 작품 소개·프로필 문구, 이미지 | `data2.py`, `data3.py` | `python export_next.py` |
| 유튜브 링크, 주소(slug) | `export_next.py` 상단 `VIDEO`, `SLUG` | `python export_next.py` |
| 미리보기 반복 영상 구간 | `make_loops.py` 의 `CLIPS` | `python make_loops.py ../web_media` → `python export_next.py` |

```bash
git add -A && git commit -m "내용 수정" && git push
```

## 구조
- `src/app/page.tsx` — 홈 (첫 화면 → 쇼릴 → 작업 8개 → 소개 → 연락처, 아래 고정 타임라인)
- `src/app/works/[slug]/page.tsx` — 작품 상세 (그 자리 재생, 장면 필름 스트립, 콘티 → 완성 비교, 손그림 콘티)
- `src/components/` — `hero`(클립 스트립·재생 헤드), `timeline`, `showreel-section`, `work-row`, `film-strip`, `compare`, `video-modal`, `loop-video`, `reveal`
- `src/lib/motion.ts` — 이징(ease-punch/swoosh/snap)과 스크롤 진행도
- `public/media/` — 무음 반복 영상·포스터, `public/img/` — 장면·콘티 이미지
