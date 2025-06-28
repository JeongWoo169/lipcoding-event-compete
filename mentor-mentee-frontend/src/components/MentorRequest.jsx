import React, { useState } from 'react';

function MentorRequest({ mentorId, onRequestSent }) {
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');

  const handleRequest = async () => {
    setError('');
    setStatus('');
    const token = localStorage.getItem('token');
    if (!token) return setError('로그인이 필요합니다.');
    try {
      const res = await fetch('http://localhost:8080/api/match-requests', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ mentorId, message })
      });
      if (!res.ok) throw new Error('요청 실패');
      setStatus('요청 완료');
      onRequestSent && onRequestSent();
    } catch (e) {
      setError('매칭 요청에 실패했습니다.');
    }
  };

  return (
    <div>
      <input
        id="message"
        data-mentor-id={mentorId}
        data-testid={`message-${mentorId}`}
        type="text"
        placeholder="요청 메시지"
        value={message}
        onChange={e => setMessage(e.target.value)}
      />
      <button id="request" onClick={handleRequest}>매칭 요청</button>
      {status && <span id="request-status">{status}</span>}
      {error && <span className="error">{error}</span>}
    </div>
  );
}

export default MentorRequest;
