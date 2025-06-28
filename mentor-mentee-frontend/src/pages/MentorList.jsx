import React, { useEffect, useState } from 'react';
import MentorRequest from '../components/MentorRequest.jsx';

function MentorList() {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');
  const [mentors, setMentors] = useState([
    { id: 1, name: '홍길동', skills: ['React', 'Node.js'] }
  ]);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    let url = 'http://localhost:8080/api/mentors';
    const params = [];
    if (search) params.push(`skill=${encodeURIComponent(search)}`);
    if (sort) params.push(`order_by=${sort}`);
    if (params.length) url += '?' + params.join('&');
    fetch(url, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error('멘토 목록 조회 실패');
        return res.json();
      })
      .then(setMentors)
      .catch(() => setError('멘토 목록을 불러올 수 없습니다.'));
  }, [search, sort]);

  return (
    <div className="mentor-list-container">
      <h2>멘토 목록</h2>
      <div>
        <input data-testid="mentor-search-input" id="mentor-search-input" value={search} onChange={e => setSearch(e.target.value)} placeholder="기술 스택 검색" />
        <select data-testid="mentor-sort-select" id="mentor-sort-select" value={sort} onChange={e => setSort(e.target.value)}>
          <option value="">정렬 없음</option>
          <option value="name">이름순</option>
          <option value="skill">기술스택순</option>
        </select>
      </div>
      <div data-testid="mentor-list" id="mentor-list">
        {mentors.length === 0 ? (
          <div>멘토가 없습니다.</div>
        ) : (
          mentors.map(mentor => (
            <div className="mentor-item" data-testid={`mentor-item-${mentor.id}`} key={mentor.id}>
              <span>{mentor.name}</span>
              <span>{mentor.skills.join(', ')}</span>
              <button data-testid="mentor-request-btn" id={`mentor-request-btn-${mentor.id}`}>매칭 요청</button>
            </div>
          ))
        )}
      </div>
      <div data-testid="mentor-request-success-msg" style={{display: success ? 'block' : 'none'}}>{success}</div>
      <div data-testid="mentor-request-error-msg" style={{display: error ? 'block' : 'none'}}>{error}</div>
    </div>
  );
}

export default MentorList;
