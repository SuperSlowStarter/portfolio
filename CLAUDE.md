@AGENTS.md

# 포트폴리오 웹사이트 작업 규칙

- 무엇을 만드는지는 `PRD.md`, 색·글꼴·모션은 `Design.md`. 기능이나 디자인을 바꾸면 해당 문서도 같이 고친다
- 문구·이미지는 `src/data/portfolio.json`을 직접 고치지 않는다. `../portfolio_build/scripts/data2.py`·`data3.py`(PDF와 공유)를 고치고 `python ../portfolio_build/scripts/export_next.py`로 다시 내보낸다. 유튜브 링크·slug는 `export_next.py` 상단
- 반복 영상 구간: `../portfolio_build/scripts/make_loops.py` → 실행 후 export_next.py
- 이징은 Design.md의 ease-punch / ease-swoosh / ease-snap만 쓴다. 기본 Easy Ease, `ease`, `ease-out`, `ease-in-out` 금지
- 전화번호는 사이트에 넣지 않는다
- D 드라이브가 exFAT라 git이 소유자 경고를 냄 → 이 폴더는 safe.directory 등록됨
- 확인: `npm run build` 통과 + 데스크톱(1440)·모바일(390) 화면 캡처
