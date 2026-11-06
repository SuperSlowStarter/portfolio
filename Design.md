---
name: "Timeline"
description: "편집 타임라인을 스크롤하는 모션그래픽 포트폴리오. PDF 포트폴리오(v4)의 톤을 웹으로 옮김."
colors:
  bg: "#111112"        # 바탕. 순수 검정 금지
  surface: "#18181a"   # 카드·패널
  line: "#2b2b2e"      # 구분선, 타임라인 트랙
  ink: "#f2f2f0"       # 제목·본문 강조
  ink2: "#b9b9b6"      # 본문
  dim: "#77777a"       # 라벨, 보조 정보
  accent: "#ff4d1f"    # 재생 헤드·타임코드·포커스. 이 색은 '지금 위치'에만 쓴다
fonts:
  display: "Paperlogy 900"     # 제목
  body: "Pretendard 400–700"   # 본문
  mono: "Geist Mono 400/500"   # 타임코드, 메타 라벨(연도·길이·툴·역할), 번호
motion:
  # After Effects 속도 그래프식 비대칭 베지어 (시작/끝 영향력). 기본 Easy Ease(33%)·ease-out 금지
  ease-punch: "cubic-bezier(0.10, 0, 0.05, 1)"   # 확 치고 길게 감속 (10%/95%) — 등장, 호버
  ease-swoosh: "cubic-bezier(0.85, 0, 0.15, 1)"  # 천천히 → 슉 → 천천히 (85%/85%) — 열기·닫기, 전환, 재생 헤드 이동
  ease-snap: "cubic-bezier(0.90, 0, 0.90, 1)"    # 길게 모았다가 탁 (90%/10%) — 강조, END
rounded:
  media: 4px   # 영상·이미지
  pill: 999px  # 버튼
---

## 콘셉트
**"알아듣는 건 쉽게, 보이는 건 낯설게."** 사이트 전체가 하나의 편집 시퀀스다. 스크롤 = 재생 헤드가 타임라인 위를 지나가는 것.
- 화면 아래 고정 타임라인: 섹션마다 클립 하나. 폭 = 그 섹션의 실제 스크롤 길이. 재생 헤드(주황 선)가 스크롤 위치를 그대로 따라가고, 타임코드(`HH:MM:SS:FF`, 30fps)는 작품의 실제 길이를 누적해서 흐른다. 마지막에 `END`.
- 장식은 줄이고 작품(영상)이 주인공. 글래스·그라디언트 광원·이모지 없음.
- 정지 이미지 대신 짧은 무음 반복 영상을 쓴다 (`public/media/*.mp4`).

## 레이아웃
- 최대 폭 1440px, 좌우 여백 `clamp(20px, 5vw, 96px)`. 섹션 간격 `clamp(96px, 14vw, 200px)`
- 작품 목록: 지그재그(영상 7 : 글 5, 홀짝 반전). 768px 아래에서는 한 열
- 메타 정보는 After Effects 레이어 속성 패널처럼: 모노 라벨(dim) + 값(ink), 한 줄씩
- 고정 요소 z-index: 헤더 50 / 타임라인 40 / 영상 창 100

## 모션 규칙
- transform·opacity·clip-path만 움직인다. 레이아웃을 바꾸는 속성은 애니메이션하지 않는다
- 등장: 마스크 안에서 아래→위 (`translateY(105%)→0`), 700–900ms `ease-punch`, 줄·항목 간 80ms 스태거
- 영상 등장: `clip-path: inset(0 0 100% 0)` → `inset(0)` 1000ms `ease-punch`
- 호버: 200–400ms `ease-punch`
- 영상 창 열기/닫기, 재생 헤드 점프: `ease-swoosh`
- 스크롤 연동(쇼릴 확대, 필름 스트립): requestAnimationFrame으로 진행도 `--p`(0–1)만 갱신, CSS가 transform 계산
- 화면 밖 영상은 일시정지. `prefers-reduced-motion`이면 반복 영상 자동재생 끔(포스터만), 등장 애니메이션 없음

## 컴포넌트
- 버튼: 알약형 1px 테두리(`#ffffff38`), 호버 시 accent 채움. 아이콘은 인라인 SVG
- 재생 헤드: 2px accent 세로선 + 위쪽 타임코드 라벨(모노 12px)
- 콘티 비교: 콘티 위에 완성 화면을 겹치고 손잡이를 끌어 경계 이동. 키보드 ←→ 지원
