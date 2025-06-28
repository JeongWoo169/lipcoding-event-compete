import React, { useEffect, useState } from 'react';

function MentorIncomingRequests() {
  const [requests, setRequests] = useState([
    { id: 1, menteeName: '김철수', message: '멘토링 요청합니다.' },
    { id: 2, menteeName: '이영희', message: '안녕하세요' }
  ]);
  const [success, setSuccess] = useState('');
  const [rejectSuccess, setRejectSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    fetch('http://localhost:8080/api/match-requests/incoming', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error('요청 목록 조회 실패');
        return res.json();
      })
      .then(setRequests)
      .catch(() => setError('요청 목록을 불러올 수 없습니다.'));
  }, []);

  const handleAccept = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`http://localhost:8080/api/match-requests/${id}/accept`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setRequests(reqs => reqs.map(r => r.id === id ? { ...r, status: 'accepted' } : r));
      setSuccess('요청을 수락했습니다.');
    } catch {
      setError('수락 실패');
    }
  };

  const handleReject = async (id) => {
    const token = localStorage.getItem('token');
    try {
      await fetch(`http://localhost:8080/api/match-requests/${id}/reject`, {
        method: 'PUT',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setRequests(reqs => reqs.map(r => r.id === id ? { ...r, status: 'rejected' } : r));
      setRejectSuccess('요청을 거절했습니다.');
    } catch {
      setError('거절 실패');
    }
  };

  return (
    <div className="mentor-incoming-requests">
      <h2>받은 매칭 요청</h2>
      <div data-testid="mentor-incoming-requests-list" id="mentor-incoming-requests-list">
        {requests.length === 0 ? (
          <div>요청이 없습니다.</div>
        ) : (
          requests.map(req => (
            <div className="mentor-incoming-request-item" data-testid={`mentor-incoming-request-item-${req.id}`} key={req.id}>
              <span>{req.menteeName}</span>
              <span>{req.message}</span>
              <button data-testid="mentor-incoming-accept-btn" id={`mentor-incoming-accept-btn-${req.id}`} onClick={() => handleAccept(req.id)} disabled={req.status !== 'pending'}>수락</button>
              <button data-testid="mentor-incoming-reject-btn" id={`mentor-incoming-reject-btn-${req.id}`} onClick={() => handleReject(req.id)} disabled={req.status !== 'pending'}>거절</button>
            </div>
          ))
        )}
      </div>
      <div data-testid="mentor-incoming-accept-success-msg" style={{display: success ? 'block' : 'none'}}>{success}</div>
      <div data-testid="mentor-incoming-reject-success-msg" style={{display: rejectSuccess ? 'block' : 'none'}}>{rejectSuccess}</div>
      <div data-testid="mentor-incoming-error-msg" style={{display: error ? 'block' : 'none'}}>{error}</div>
    </div>
  );
}

export default MentorIncomingRequests;
