import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Terminal, RefreshCcw, Send, Check, XCircle } from 'lucide-react'

const templates = {
    react: {
        title: "컴포넌트 개발 실습",
        hint: "힌트: useState 훅을 사용하여 버튼 클릭 시 숫자가 1씩 증가하는 동적 화면을 구현해보세요!",
        defaultCode: `// 클릭하면 숫자가 변하는 컴포넌트를 코딩해봐요\\nfunction Counter() {\\n  const [count, setCount] = useState(0);\\n  \\n  return (\\n    <button onClick={() => setCount(count + 1)}>\\n      클릭 횟수: {count}\\n    </button>\\n  );\\n}`,
        validate: (code) => code.includes('useState') && code.includes('setCount') && code.includes('button')
    },
    flask: {
        title: "백엔드 API 개발 실습",
        hint: "힌트: @app.route 데코레이터를 사용해 서버 주소를 연결하고, JSON 데이터를 반환해보세요!",
        defaultCode: `# 사용자가 /hello 주소로 들어왔을 때 인사하는 API를 만듭니다\\n@app.route('/hello')\\ndef say_hello():\\n    return {"message": "반가워요! 서버가 성공적으로 응답했습니다."}`,
        validate: (code) => code.includes('@app.route') && code.includes('def') && code.includes('return')
    }
}

const PracticeScreen = () => {
    const location = useLocation();
    const topic = location.state?.topic || 'react';
    const lessonTitle = location.state?.lesson || '실습 시작';
    const config = templates[topic] || templates.react;

    const [code, setCode] = useState(config.defaultCode);
    const [status, setStatus] = useState('idle');
    const [terminalOutput, setTerminalOutput] = useState(['실습실에 입장하셨습니다.', `현재 주제: ${lessonTitle}`]);

    const handleRun = () => {
        setStatus('running');
        setTerminalOutput([...terminalOutput, '> 코드 분석 중...', '> 테스트 시나리오 실행 중...']);

        setTimeout(() => {
            if (config.validate(code)) {
                setStatus('success');
                setTerminalOutput(prev => [...prev, '✓ 성공! 코드가 정확하게 작성되었습니다.', '✓ 모든 테스트 통과']);
            } else {
                setStatus('error');
                setTerminalOutput(prev => [...prev, '✗ 실패: 필요한 키워드가 누락되었습니다.', config.hint]);
            }
        }, 1200);
    }

    return (
        <div className="container" style={{ paddingTop: '2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <Link to={`/${topic}`} style={{ color: 'var(--text-secondary)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    &larr; 워크북으로 돌아가기
                </Link>
                <h2 className="gradient-text">{config.title} - {lessonTitle}</h2>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="glass-card" style={{ padding: '1.5rem', flex: 1, border: status === 'error' ? '1px solid #ef4444' : '1px solid var(--border)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                            <h3 style={{ fontSize: '1rem', textTransform: 'uppercase' }}>코드 에디터</h3>
                            <div style={{ display: 'flex', gap: '0.8rem' }}>
                                <button onClick={() => setCode(config.defaultCode)} style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer' }}><RefreshCcw size={16} /></button>
                                <button
                                    onClick={handleRun}
                                    className="btn-primary"
                                    style={{
                                        padding: '0.5rem 1.2rem',
                                        fontSize: '0.9rem',
                                        background: topic === 'flask' ? 'var(--secondary)' : 'var(--gradient)'
                                    }}
                                >
                                    {status === 'running' ? '채점 중...' : '실행 및 채점'}
                                </button>
                            </div>
                        </div>
                        <textarea
                            value={code}
                            onChange={(e) => {
                                setCode(e.target.value);
                                if (status === 'error') setStatus('idle');
                            }}
                            style={{
                                width: '100%',
                                height: '450px',
                                background: '#0a0a0a',
                                border: '1px solid var(--border)',
                                borderRadius: '12px',
                                color: topic === 'flask' ? '#ec4899' : '#6366f1',
                                fontFamily: 'monospace',
                                fontSize: '1.05rem',
                                padding: '1.5rem',
                                outline: 'none',
                                resize: 'none',
                                lineHeight: '1.6'
                            }}
                        />
                    </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div className="glass-card" style={{ padding: '1.5rem', background: '#050505', flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                            <Terminal size={18} color={topic === 'flask' ? 'var(--secondary)' : 'var(--primary)'} />
                            <h3 style={{ fontSize: '1rem' }}>실행 로그</h3>
                        </div>
                        <div style={{ flex: 1, fontFamily: 'monospace', fontSize: '0.95rem', color: '#94a3b8', overflowY: 'auto' }}>
                            {terminalOutput.map((line, i) => (
                                <div key={i} style={{ marginBottom: '6px', color: line.startsWith('✓') ? '#10b981' : line.startsWith('✗') ? '#ef4444' : '#94a3b8' }}>{line}</div>
                            ))}
                        </div>
                    </div>

                    <div className="glass-card" style={{ padding: '1.5rem' }}>
                        <h3 style={{ marginBottom: '1rem' }}>💡 오늘의 미션</h3>
                        <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '1rem', borderRadius: '8px', borderLeft: `4px solid ${topic === 'flask' ? 'var(--secondary)' : 'var(--primary)'}` }}>
                            <p style={{ color: 'var(--text-primary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                                {config.hint}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PracticeScreen;
