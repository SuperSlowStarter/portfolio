# 이대건 모션그래픽 포트폴리오

정적 웹사이트 (빌드 단계 없음). Vercel에서 Framework Preset = Other, Root Directory = `./` 로 배포.

이 폴더는 `../portfolio_build/scripts/build_web.py`가 생성합니다. 직접 고치지 말고 원본을 고친 뒤 다시 빌드하세요.

- 문구·이미지: `portfolio_build/scripts/data2.py`, `data3.py` (PDF와 공유)
- 유튜브 영상 링크: `portfolio_build/scripts/data_web.py`
- 웹 전용 스타일·동작: `portfolio_build/scripts/web.css`, `web.js`

```
cd portfolio_build
python scripts/build_web.py
cd ../portfolio_web
git add -A && git commit -m "업데이트" && git push     # push하면 Vercel이 자동 재배포
```
