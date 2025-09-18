# 🎮 타자 연습 게임 (Typing Practice Game)

[![Vercel 배포](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge\&logo=vercel)](https://vercel.com/dlaudcks228-3091s-projects/v0-typing-practice-game)
[![v0.app 제작](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/5UeRtQpui3a)

> **v0.app**에서 제작하고 **Vercel**에 배포된 간단하고 직관적인 **타자 연습 게임**입니다. 이 저장소는 v0 프로젝트와 자동으로 동기화되어, v0에서 수정 시 바로 배포됩니다.

---

## 🧭 개요

* 빠르고 간단한 타자 연습을 제공하는 웹 애플리케이션
* 시각적인 빌드 툴인 **v0.app** 기반
* **Vercel**을 통한 무중단 배포

---

## ✨ 주요 기능

* 실시간 타자 속도(WPM)와 정확도 측정
* 단어/문장 데이터 자유 교체 가능
* 라이트/다크 테마 지원
* 반응형 UI (모바일 친화적)
* v0 ➜ Git ➜ Vercel 자동 동기화 배포

---

## 🌐 데모 링크

👉 [타자 연습 게임 실행하기](https://vercel.com/dlaudcks228-3091s-projects/v0-typing-practice-game)

---

## 🧩 기술 스택

* **Framework:** Next.js (v0.app 생성 프로젝트 기준)
* **Deployment:** Vercel
* **Design & Build:** v0.app

---

## ✅ 사전 준비물

* Node.js **v18+** (LTS 권장)
* 패키지 매니저: **pnpm**, **npm** 또는 **yarn**
* **Vercel** 계정 (원클릭 배포)
* 선택: **v0.app** 계정 (시각적으로 UI/로직 편집)

---

## 🚀 빠른 시작

```bash
# 저장소 클론
git clone <이_저장소_URL>
cd v0-typing-practice-game

# 의존성 설치 (아래 중 하나 선택)
pnpm install
npm install
yarn

# 로컬 실행
pnpm dev
npm run dev
yarn dev

# 브라우저에서 열기
http://localhost:3000
```

---

## ⚙️ 설정 방법

* **환경 변수:** API를 통해 단어를 불러온다면 `.env.local`에 `NEXT_PUBLIC_API_BASE` 등을 설정
* **단어 목록:** 정적 데이터는 `data/words.ts` 또는 `data/words.json` 수정
* **테마:** `theme.ts` 또는 CSS 변수에서 라이트/다크 테마 변경

---

## 🕹️ 사용 방법

1. **Start** 버튼 클릭으로 시작
2. 제시된 텍스트 입력 → 오타는 자동 강조
3. 라운드 종료 후 **타자 속도(WPM)**, **정확도**, **시간** 확인
4. **재시작**하거나 난이도/길이 조정 가능

---

## ⌨️ 단축키

* **Enter**: 시작 / 재시작
* **Esc**: 일시정지 / 설정
* **Tab**: 입력창 포커스

---

## 📦 빌드 & 배포

**Vercel 자동 배포**

1. `main` 브랜치로 푸시
2. Vercel이 자동으로 빌드 및 배포 진행
3. 환경 변수는 Vercel ➜ 프로젝트 설정 ➜ Environment Variables에서 관리

**v0.app 연동**

* v0 UI에서 배포하면 자동으로 이 저장소와 동기화되어 Vercel이 재배포

---

## 🗂️ 디렉터리 구조 (예시)

```
.
├─ app/ 또는 src/     # Next.js 라우터
├─ components/         # UI 컴포넌트
├─ data/               # 단어 리스트
├─ lib/                # 계산 유틸 (WPM, 정확도)
├─ public/             # 정적 파일
├─ styles/             # 전역 CSS / 테마
└─ package.json
```

---

## 🧯 문제 해결

* **포트 충돌 (3000 사용 중):** `PORT=3001 pnpm dev`
* **Vercel 빌드 실패:** Node 버전 / 환경 변수 확인
* **Hydration 오류:** `window` 사용 컴포넌트는 client 전용 처리 필요

---

## 🤝 기여 방법

1. 저장소 포크 → 기능 브랜치 생성 → PR 요청
2. 가능하면 테스트 코드 추가
3. 커밋 메시지는 컨벤션을 따르는 것을 권장

---

## 📄 라이선스

MIT

---

## 🙏 감사의 말

* **v0.app**: 시각적 빌드 툴 제공
* **Vercel**: 배포 및 CI/CD 지원
