import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { BookOpen, Code, Terminal, Database, ArrowRight } from 'lucide-react'
import './App.css'

const Card = ({ title, desc, icon: Icon, to, color }) => (
  <Link to={to} className="glass-card" style={{ textDecoration: 'none' }}>
    <div style={{
      background: color,
      width: '48px',
      height: '48px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '1.5rem',
      boxShadow: `0 8px 16px -4px ${color}`
    }}>
      <Icon size={24} color="white" />
    </div>
    <h3 style={{ marginBottom: '0.5rem' }}>{title}</h3>
    <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', marginBottom: '1.5rem' }}>{desc}</p>
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600', color: 'var(--primary)' }}>
      Start Learning <ArrowRight size={16} />
    </div>
  </Link>
)

const Dashboard = () => (
  <div className="container">
    <header style={{ marginBottom: '4rem', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>
        나만의 <span className="gradient-text">웹 서비스 개발자</span> 도전하기
      </h1>
      <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
        우리가 매일 쓰는 웹사이트는 어떻게 동작할까요? 화면 설계부터 서버 구축까지 직접 경험해봐요!
      </p>
    </header>

    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem'
    }}>
      <Card
        title="화면 구성 요소 (React)"
        desc="레고 블록처럼 화면의 부품(컴포넌트)을 만들고 하나로 합쳐서 멋진 페이지를 완성해요."
        icon={Code}
        to="/react"
        color="#6366f1"
      />
      <Card
        title="데이터 처리 서버 (Flask)"
        desc="사용자의 요청을 분석하고 알맞은 답을 보내주는 똑똑한 '서버'의 원리를 배웁니다."
        icon={Terminal}
        to="/flask"
        color="#ec4899"
      />
      <Card
        title="정보 보관 창고 (DB)"
        desc="데이터가 사라지지 않게 안전하게 저장하고 나중에 다시 꺼내 쓰는 데이터베이스를 사용해봐요."
        icon={Database}
        to="/supabase"
        color="#10b981"
      />
    </div>
  </div>
)

import ReactWorkbook from './ReactWorkbook'
import FlaskWorkbook from './FlaskWorkbook'
import PracticeScreen from './PracticeScreen'

const PagePlaceholder = ({ title, content }) => (
  <div className="container">
    <Link to="/" style={{ color: 'var(--text-secondary)', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
      &larr; 홈으로 돌아가기
    </Link>
    <h1 style={{ marginBottom: '2rem' }} className="gradient-text">{title}</h1>
    <div className="glass-card">
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
        <strong>{content}</strong>에 대한 재미있는 워크북과 실습 화면이 곧 준비됩니다! 조금만 기다려주세요. 😊
      </p>
    </div>
  </div>
)

function App() {
  return (
    <Router>
      <div className="app-layout">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/react" element={<ReactWorkbook />} />
          <Route path="/flask" element={<FlaskWorkbook />} />
          <Route path="/practice" element={<PracticeScreen />} />
          <Route path="/supabase" element={<PagePlaceholder title="Supabase & DB Mastery" content="Database schema, policy management, and integration" />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
