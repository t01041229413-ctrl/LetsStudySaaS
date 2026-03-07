import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, Play, Layers, MessageSquare, Code } from 'lucide-react'

const LessonCard = ({ title, status, duration, active, onClick }) => (
    <div
        onClick={onClick}
        className={`lesson-item ${active ? 'active' : ''}`}
        style={{
            padding: '1.25rem',
            borderRadius: '12px',
            background: active ? 'var(--primary-hover)' : 'var(--bg-card)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            transition: 'all 0.2s ease',
            border: '1px solid var(--border)',
            marginBottom: '0.75rem',
            color: active ? 'white' : 'var(--text-primary)'
        }}>
        {status === 'complete' ? <CheckCircle size={20} color={active ? 'white' : '#10b981'} /> : <Play size={20} color={active ? 'white' : 'var(--text-secondary)'} />}
        <div style={{ flex: 1 }}>
            <div style={{ fontWeight: '600' }}>{title}</div>
            <div style={{ fontSize: '0.85rem', opacity: 0.7 }}>{duration} mins</div>
        </div>
    </div>
)

const ReactWorkbook = () => {
    const [activeLesson, setActiveLesson] = useState(0);
    const lessons = [
        { title: "React 프로젝트와 Vite", duration: "10", content: "웹사이트를 만들기 위한 최신 도구인 Vite를 사용해 프로젝트를 세팅해봅시다. Vite는 우리가 작성한 코드를 브라우저가 바로 읽을 수 있게 번개처럼 빠르게 준비해준답니다!" },
        { title: "부품 단위의 화면 설계", duration: "15", content: "화면에 보이는 버튼, 메뉴 등을 하나의 '부품(컴포넌트)'으로 설계하는 법을 배워요. 이렇게 만들면 수정하기도 좋고, 다른 곳에서도 다시 쓸 수 있어서 아주 편리해요!" },
        { title: "데이터 관리와 상태(State)", duration: "25", content: "웹 앱은 데이터를 어떻게 기억할까요? useState라는 도구를 사용해서 화면의 정보가 바뀔 때마다 자동으로 새로고침되는 '상태 관리'의 기본 원리를 알아봅시다." },
        { title: "첫 번째 웹 컴포넌트 실습", duration: "30", content: "지금까지 배운 부품 조립 기술과 상태 관리법을 합쳐서 숫자가 바뀌는 카운터 컴포넌트를 직접 구현해봐요. 아래 실습 버튼을 눌러보세요!" }
    ];

    return (
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '3rem', paddingTop: '2rem' }}>
            <aside>
                <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2rem', fontSize: '0.9rem' }}>
                    &larr; 모든 워크북
                </Link>
                <div style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.75rem' }}>React & <span className="gradient-text">Vite</span></h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem' }}>기초부터 마스터까지</p>
                </div>
                <div>
                    {lessons.map((lesson, idx) => (
                        <LessonCard
                            key={idx}
                            active={activeLesson === idx}
                            onClick={() => setActiveLesson(idx)}
                            {...lesson}
                        />
                    ))}
                </div>
            </aside>
            <main>
                <div className="glass-card" style={{ height: 'auto', minHeight: '600px', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ borderBottom: '1px solid var(--border)', paddingBottom: '1.5rem', marginBottom: '2.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <span style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--primary)', letterSpacing: '0.1em' }}>레슨 {activeLesson + 1}</span>
                            <h2 style={{ marginTop: '0.5rem' }}>{lessons[activeLesson].title}</h2>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Link to="/practice" state={{ topic: 'react', lesson: lessons[activeLesson].title }} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                                <Code size={18} /> 지금 실택하기
                            </Link>
                        </div>
                    </div>

                    <div className="lesson-content" style={{ flex: 1 }}>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                            {lessons[activeLesson].content}
                        </p>
                        <div style={{ marginTop: '3rem', padding: '2rem', background: '#0a0a0a', borderRadius: '12px', border: '1px solid var(--border)', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '10px', right: '15px', fontSize: '0.75rem', color: 'var(--text-secondary)', opacity: 0.5 }}>workbook_example.jsx</div>
                            <pre style={{ color: '#d1d5db', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                                <code>{`
// Interactive learning snippet
function WelcomeComponent({ name }) {
    return (
        <div className="welcome">
            <h1>Hello, {name}!</h1>
            <p>Welcome to the React Workbook.</p>
        </div>
    );
}
                                `}</code>
                            </pre>
                        </div>
                    </div>

                    <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
                        <button
                            disabled={activeLesson === 0}
                            onClick={() => setActiveLesson(v => v - 1)}
                            style={{ background: 'none', border: 'none', color: activeLesson === 0 ? 'var(--text-secondary)' : 'var(--primary)', cursor: 'pointer', fontWeight: '600' }}
                        >
                            &larr; 이전 레슨
                        </button>
                        <button
                            disabled={activeLesson === lessons.length - 1}
                            onClick={() => setActiveLesson(v => v + 1)}
                            style={{ background: 'none', border: 'none', color: activeLesson === lessons.length - 1 ? 'var(--text-secondary)' : 'var(--primary)', cursor: 'pointer', fontWeight: '600' }}
                        >
                            다음 레슨 &rarr;
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default ReactWorkbook;
