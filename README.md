# Let's Study SaaS (SaaS 학습 플랫폼)

React, Vite, Flask, Swagger UI, 그리고 Supabase를 마스터하기 위한 종합 학습 플랫폼입니다.

## 🚀 시작하기

이 프로젝트는 `frontend` (React + Vite)와 `backend` (Python Flask) 두 부분으로 나뉘어 있습니다.

### 1. 프론트엔드 설정 (React & Vite)
현대적인 UI를 빌드하고 실행합니다.

```bash
cd frontend
npm install
npm run dev
```
프론트엔드는 `http://localhost:5173`에서 확인할 수 있습니다.

### 2. 백엔드 설정 (Flask & Swagger)
자동 Swagger 문서화가 포함된 Python API를 실행합니다.

```bash
cd backend
# 가상 환경 생성 및 라이브러리 설치
python -m venv venv
.\venv\Scripts\activate  # Windows (또는 source venv/bin/activate - Linux/Mac)
pip install -r requirements.txt
python app.py
```
*   **API 루트:** `http://localhost:5000`
*   **Swagger UI:** `http://localhost:5000/swagger`

## 🛠 기술 스택
- **프론트엔드:** React 18, Vite 6, React Router, Lucide Icons
- **백엔드:** Python 3.13, Flask, Flask-RESTX (Swagger)
- **스타일링:** 바닐라 CSS 기반 현대적 디자인 (Glassmorphism, Dark Mode)
- **데이터베이스:** Supabase (통합 진행 중)

## 📁 프로젝트 구조
- `/frontend`: Vite를 사용한 React 애플리케이션.
- `/backend`: Swagger API 문서화가 포함된 Flask 애플리케이션.
- `PRD.md`: 원본 요구사항 문서.

## 🚢 배포 (Vercel)
1. 이 레포지토리를 GitHub에 푸시합니다.
2. Vercel 계정에 레포지토리를 연결합니다.
3. 웹 앱을 위해 `frontend` 루트 디렉토리를 설정합니다.
4. `backend`는 별도로 배포합니다 (예: Vercel Functions 또는 Render/Railway 같은 서비스 활용).
