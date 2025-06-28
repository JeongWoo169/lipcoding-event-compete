import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Profile from './pages/Profile.jsx';
import MentorList from './pages/MentorList.jsx';
import Requests from './pages/Requests.jsx';
import MentorIncomingRequests from './pages/MentorIncomingRequests.jsx';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <a href="/profile">프로필</a> | <a href="/mentors">멘토목록</a> | <a href="/requests">매칭요청</a>
      </nav>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/mentors" element={<MentorList />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/mentor-requests" element={<MentorIncomingRequests />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App
