import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    role: 'mentee',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (form.password !== form.confirmPassword) {
      setError('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      const res = await fetch('http://localhost:8080/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: form.email, password: form.password, name: form.name, role: form.role })
      });
      if (!res.ok) throw new Error('회원가입 실패');
      setSuccess('회원가입에 성공했습니다. 로그인 해주세요.');
      setTimeout(() => navigate('/login'), 3000);
    } catch (err) {
      setError('회원가입에 실패했습니다.');
    }
  };

  return (
    <div className="signup-container">
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">이메일</label>
          <input id="email" data-testid="signup-email-input" type="email" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} required />
        </div>
        <div>
          <label htmlFor="password">비밀번호</label>
          <input id="password" data-testid="signup-password-input" type="password" value={form.password} onChange={e => setForm(f => ({...f, password: e.target.value}))} required />
        </div>
        <div>
          <label htmlFor="confirmPassword">비밀번호 확인</label>
          <input id="confirmPassword" data-testid="signup-confirm-password-input" type="password" value={form.confirmPassword} onChange={e => setForm(f => ({...f, confirmPassword: e.target.value}))} required />
        </div>
        <div>
          <label htmlFor="name">이름</label>
          <input id="name" data-testid="signup-name-input" type="text" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} required />
        </div>
        <div>
          <label htmlFor="role">역할</label>
          <select id="role" data-testid="signup-role-select" value={form.role} onChange={e => setForm(f => ({...f, role: e.target.value}))} required>
            <option value="mentor">멘토</option>
            <option value="mentee">멘티</option>
          </select>
        </div>
        <button id="signup" data-testid="signup-submit-btn" type="submit">회원가입</button>
      </form>
      <div data-testid="signup-error-msg" style={{display: error ? 'block' : 'none'}} className="error">{error}</div>
      <div data-testid="signup-success-msg" style={{display: success ? 'block' : 'none'}} className="success">{success}</div>
      <div style={{ marginTop: 16 }}>
        <button type="button" onClick={() => navigate('/login')}>로그인</button>
      </div>
    </div>
  );
}

export default Signup;
