import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      // 실제 API 연동 시 아래 fetch 부분을 수정하세요
      const res = await fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) throw new Error('로그인 실패');
      const data = await res.json();
      localStorage.setItem('token', data.token);
      navigate('/profile');
    } catch (err) {
      setError('이메일 또는 비밀번호가 올바르지 않습니다.');
    }
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">이메일</label>
          <input id="email" data-testid="login-email-input" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input id="password" data-testid="login-password-input" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button id="login" data-testid="login-submit-btn" type="submit">로그인</button>
        {error && <div data-testid="login-error-msg" className="error">{error}</div>}
      </form>
      <div style={{ marginTop: 16 }}>
        <button type="button" onClick={() => navigate('/signup')}>회원가입</button>
      </div>
    </div>
  );
}

export default Login;
