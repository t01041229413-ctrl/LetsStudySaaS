import { useState } from 'react'
import { Link } from 'react-router-dom'
import { CheckCircle, Play, Layers, MessageSquare, Terminal } from 'lucide-react'

const LessonCard = ({ title, status, duration, active, onClick }) => (
    <div
        onClick={onClick}
        className={`lesson-item ${active ? 'active' : ''}`}
        style={{
            padding: '1.25rem',
            borderRadius: '12px',
            background: active ? 'var(--secondary)' : 'var(--bg-card)',
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

const FlaskWorkbook = () => {
    const [activeLesson, setActiveLesson] = useState(0);
    const lessons = [
        { title: "웹 서버의 역할 (Flask)", duration: "15", content: "웹사이트 뒤에서 보이지 않게 작동하며 데이터를 처리해주는 '서버'를 만들어봅시다. Flask는 빠르고 똑똑하게 데이터를 배달해주는 역할을 해요!" },
        { title: "API 문서와 설계도 (Swagger)", duration: "20", content: "우리 서버가 어떤 일을 할 수 있는지 다른 사람들에게 알려주는 설계도인 Swagger를 완성해봐요. 잘 만든 설계도 하나가 열 명의 개발자 부럽지 않답니다!" },
        { title: "요청(Request)과 응답(Response)", duration: "25", content: "사용자가 서버에게 부탁을 하고 결과를 받는 대화 과정을 이해해봅니다. '쪽지'를 주고받듯 정확한 형식에 맞춰 데이터를 전송하는 법을 배워요!" },
        { title: "데이터베이스와 Supabase", duration: "30", content: "중요한 정보를 안전하게 모아두는 '정보 창고'인 데이터베이스를 연동해봅시다. Supabase를 통해 데이터를 실시간으로 관리해봐요!" }
    ];

    return (
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 1fr) 2fr', gap: '3rem', paddingTop: '2rem' }}>
            <aside>
                <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2rem', fontSize: '0.9rem' }}>
                    &larr; 모든 워크북
                </Link>
                <div style={{ marginBottom: '2rem' }}>
                    <h2 style={{ fontSize: '1.75rem' }}>Flask & <span style={{ color: 'var(--secondary)' }}>Swagger</span></h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem' }}>RESTful API 기초</p>
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
                            <span style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--secondary)', letterSpacing: '0.1em' }}>레슨 {activeLesson + 1}</span>
                            <h2 style={{ marginTop: '0.5rem' }}>{lessons[activeLesson].title}</h2>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <Link to="/practice" state={{ topic: 'flask', lesson: lessons[activeLesson].title }} className="btn-primary" style={{ background: 'var(--secondary)', display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
                                <Terminal size={18} /> API 탐색기
                            </Link>
                        </div>
                    </div>

                    <div className="lesson-content" style={{ flex: 1 }}>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                            {lessons[activeLesson].content}
                        </p>
                        <div style={{ marginTop: '3rem', padding: '2rem', background: '#1c1c1c', borderRadius: '12px', border: '1px solid var(--border)', position: 'relative' }}>
                            <div style={{ position: 'absolute', top: '10px', right: '15px', fontSize: '0.75rem', color: 'var(--text-secondary)', opacity: 0.5 }}>app_example.py</div>
                            <pre style={{ color: '#ec4899', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                                <code>{`
@ns.route('/data')
class DataResource(Resource):
    @ns.doc('get_data')
    def get(self):
        """모든 학습 데이터 가져오기"""
        return {'status': 'ok', 'data': []}
                                `}</code>
                            </pre>
                        </div>
                    </div>

                    <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between' }}>
                        <button
                            disabled={activeLesson === 0}
                            onClick={() => setActiveLesson(v => v - 1)}
                            style={{ background: 'none', border: 'none', color: activeLesson === 0 ? 'var(--text-secondary)' : 'var(--secondary)', cursor: 'pointer', fontWeight: '600' }}
                        >
                            &larr; 이전 레슨
                        </button>
                        <button
                            disabled={activeLesson === lessons.length - 1}
                            onClick={() => setActiveLesson(v => v + 1)}
                            style={{ background: 'none', border: 'none', color: activeLesson === lessons.length - 1 ? 'var(--text-secondary)' : 'var(--secondary)', cursor: 'pointer', fontWeight: '600' }}
                        >
                            다음 레슨 &rarr;
                        </button>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default FlaskWorkbook;
