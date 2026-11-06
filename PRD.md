# PRD — 이대건 모션그래픽 포트폴리오 웹사이트

## 1. 목적
KBS 등 방송사 그래픽·모션 직무 지원용 포트폴리오. PDF 포트폴리오(v4)와 같은 내용을 웹답게 보여 준다.
- 보는 사람: 채용 담당자(데스크톱으로 훑어봄), 링크를 받은 사람(모바일)
- 성공 기준: 첫 화면 5초 안에 "모션 하는 사람"이 보이고, 쇼릴을 바로 틀 수 있고, 작품 하나만 링크로 보낼 수 있다

## 2. 기술
Next.js 16 (App Router, 전 페이지 정적 생성) · React 19 · TypeScript · Tailwind v4 · Vercel 배포 (GitHub `SuperSlowStarter/portfolio` main push → 자동 배포)
- 데이터: `src/data/portfolio.json` — `../portfolio_build/scripts/export_next.py`가 PDF 원본(data2/data3)에서 생성. **직접 고치지 말고 원본을 고친 뒤 다시 내보낸다**
- 영상: 전체 영상은 YouTube 일부공개 임베드(youtube-nocookie). 미리보기는 `public/media/{key}.mp4`(1280px)·`{key}-sm.mp4`(480px) 무음 반복 영상 — `make_loops.py`가 원본에서 자름

## 3. 페이지
### 3.1 홈 `/` (한 페이지)
1. **Hero** — "알아듣는 건 쉽게, / 보이는 건 낯설게." 줄 단위 등장. 모션그래픽 디자이너 이대건. `쇼릴 보기`. 아래에 작품 8개 반복 영상 클립 스트립 + 재생 헤드(마우스를 올리면 따라오며 타임코드 표시, 클릭 시 해당 작품으로)
2. **Showreel** (`#showreel`) — 16:9 큰 화면. 스크롤로 들어오며 86% → 100%로 커짐. 쇼릴 반복 영상 위 재생 버튼 → 그 자리에서 YouTube 재생
3. **Work** (`#work`) — 작품 8개 지그재그. 반복 영상(누르면 상세), 번호·제목·종류, 메타(연도·길이·툴·역할), 소개 첫 문단, `영상 보기`(영상 창) · `자세히 보기`(상세)
4. **About** (`#about`) — 사진, 이름, 소개, 메일 / 학력·경력·수상·자격·툴. **전화번호 넣지 않음**
5. **Contact** (`#contact`) — "감사합니다", 메일(복사 버튼), 타임라인 END
- 화면 아래 고정 **타임라인**(Design.md 콘셉트). 클립 클릭 시 그 섹션으로 이동

### 3.2 작품 상세 `/works/[slug]` (8개, 빌드 때 생성)
- 상단: ← 전체 작업, `03 / 08`
- 제목·종류 등장 → 반복 영상 큰 화면(재생 버튼 → YouTube 그 자리 재생) → 메타 4칸 → 소개 전문 → 컬러·기법·작업 순서(있는 작품만)
- **장면**: 필름 스트립. 데스크톱은 세로 스크롤에 맞춰 가로로 흐름(고정 구간), 모바일은 손가락으로 넘김
- **콘티 → 완성**(있는 작품만): 큰 비교 슬라이더 + 장면 선택 썸네일. 화면에 들어오면 손잡이가 한 번 움직여 사용법을 보여 줌
- **손그림 콘티 시트**(미추홀): 가로 갤러리
- 하단: 다음 작품(번호·제목·반복 영상), 이전 작품
- slug: really-like-you, momentum, take-it, mukbit, dokkaebi, run-beat-michuhol, make-human-great-again, media-therapy

## 4. 공통
- 헤더: 왼쪽 `이대건`(홈), 오른쪽 Showreel · Work · About · Contact. 스크롤하면 반투명 배경
- SEO: metadata(제목 템플릿 `%s — 이대건`), 작품별 description·OG 이미지(대표 장면), `robots.ts`, `sitemap.ts`, 사이트 주소는 Vercel 환경 변수 `VERCEL_PROJECT_PRODUCTION_URL`
- 접근성: 키보드로 모든 버튼·슬라이더 조작, 영상 창 Esc 닫기, `prefers-reduced-motion` 대응, 이미지 alt
- 성능: 반복 영상은 화면 근처에서만 로드·재생, 이미지는 next/image

## 5. 변경 기록
- 2026-11-06: 첫 버전. PDF를 그대로 축소해 띄우던 정적 사이트(커밋 `928e475`)를 대체
