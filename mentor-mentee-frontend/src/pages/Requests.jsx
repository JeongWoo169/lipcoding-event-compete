import React, { useEffect, useState } from 'react';

function Requests() {
  const [requests, setRequests] = useState([
    { id: 1, mentorName: '홍길동', status: '대기중' }
  ]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    // 멘토/멘티 역할에 따라 API 분기 필요 (여기서는 멘티 기준)
    fetch('http://localhost:8080/api/match-requests/outgoing', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error('요청 목록 조회 실패');
        return res.json();
      })
      .then(setRequests)
      .catch(() => setError('요청 목록을 불러올 수 없습니다.'));
  }, []);

  return (
    <div className="requests-container">
      <h2>매칭 요청 목록</h2>
      <div data-testid="mentee-requests-list" id="mentee-requests-list">
        {requests.length === 0 ? (
          <div>요청이 없습니다.</div>
        ) : (
          requests.map(req => (
            <div className="request-item" data-testid={`mentee-request-item-${req.id}`} key={req.id}>
              <span>{req.mentorName}</span>
              <span data-testid={`mentee-request-status-${req.id}`}>{req.status}</span>
              <button data-testid="mentee-request-cancel-btn" id={`mentee-request-cancel-btn-${req.id}`}>취소</button>
            </div>
          ))
        )}
      </div>
      <div data-testid="mentee-request-cancel-success-msg" style={{display: success ? 'block' : 'none'}}>{success}</div>
      <div data-testid="mentee-request-error-msg" style={{display: error ? 'block' : 'none'}}>{error}</div>
    </div>
  );
}

export default Requests;
