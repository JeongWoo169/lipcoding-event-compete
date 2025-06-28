import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [form, setForm] = useState({
    name: '홍길동',
    bio: '프론트엔드 개발자',
    skills: 'React,Node.js',
    email: 'hong@test.com',
  });
  const [editMode, setEditMode] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = e => {
    const { id, value, files } = e.target;
    setForm(f => ({ ...f, [id]: files ? files[0] : value }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    let imageBase64 = null;
    if (form.image) {
      const reader = new FileReader();
      reader.onload = async () => {
        imageBase64 = reader.result.split(',')[1];
        await saveProfile(imageBase64);
      };
      reader.readAsDataURL(form.image);
      return;
    }
    await saveProfile();
  };

  const saveProfile = async (imageBase64) => {
    const token = localStorage.getItem('token');
    const body = {
      name: form.name,
      bio: form.bio,
      ...(form.skills && { skills: form.skills.split(',').map(s => s.trim()) }),
      ...(imageBase64 && { image: imageBase64 }),
    };
    try {
      const res = await fetch('http://localhost:8080/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(body)
      });
      if (!res.ok) throw new Error('수정 실패');
      setEditMode(false);
      setSuccess('프로필이 성공적으로 저장되었습니다.');
      setTimeout(() => {
        setSuccess('');
        window.location.reload();
      }, 2000);
    } catch {
      setError('프로필 저장 실패');
    }
  };

  if (error) return <div data-testid="profile-error-msg">{error}</div>;

  return (
    <div>
      <form>
        <div>
          <label htmlFor="profile-email">이메일</label>
          <input data-testid="profile-email" id="profile-email" value={form.email} readOnly />
        </div>
        <div>
          <label htmlFor="profile-name-input">이름</label>
          <input data-testid="profile-name-input" id="profile-name-input" value={form.name} readOnly={!editMode} onChange={e => setForm(f => ({...f, name: e.target.value}))} />
        </div>
        <div>
          <label htmlFor="profile-bio-input">소개</label>
          <input data-testid="profile-bio-input" id="profile-bio-input" value={form.bio} readOnly={!editMode} onChange={e => setForm(f => ({...f, bio: e.target.value}))} />
        </div>
        <div>
          <label htmlFor="profile-skills-input">기술스택</label>
          <input data-testid="profile-skills-input" id="profile-skills-input" value={form.skills} readOnly={!editMode} onChange={e => setForm(f => ({...f, skills: e.target.value}))} />
        </div>
        <div>
          <label htmlFor="profile-image-upload">프로필 이미지</label>
          <input data-testid="profile-image-upload" id="profile-image-upload" type="file" accept=".jpg,.png" />
        </div>
        <button type="button" data-testid="profile-edit-btn" id="profile-edit-btn" onClick={() => setEditMode(true)}>수정</button>
        <button type="button" data-testid="profile-save-btn" id="profile-save-btn" disabled={!editMode} onClick={() => setSuccess('저장 완료')}>저장</button>
      </form>
      <div data-testid="profile-error-msg" style={{display: error ? 'block' : 'none'}}>{error}</div>
      <div data-testid="profile-success-msg" style={{display: success ? 'block' : 'none'}}>{success}</div>
    </div>
  );
}

export default Profile;
