import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MentorIncomingRequests from '../src/pages/MentorIncomingRequests';

beforeEach(() => {
  global.fetch = jest.fn((url) => {
    if (url.includes('/api/match-requests/incoming')) {
      return Promise.resolve({
        ok: true,
        json: async () => ([
          { id: 1, menteeId: 10, message: '멘토링 요청합니다', status: 'pending' },
          { id: 2, menteeId: 11, message: '안녕하세요', status: 'pending' }
        ])
      });
    }
    if (url.includes('/accept') || url.includes('/reject')) {
      return Promise.resolve({ ok: true, json: async () => ({}) });
    }
    return Promise.resolve({ ok: true, json: async () => ({}) });
  });
  localStorage.setItem('token', 'mocktoken');
});

describe('Mentor Incoming Requests Page UI & Functionality', () => {
  it('renders mentor incoming requests list', () => {
    render(
      <BrowserRouter>
        <MentorIncomingRequests />
      </BrowserRouter>
    );
    expect(screen.getByTestId('mentor-incoming-requests-list')).toBeInTheDocument();
  });

  it('can accept or reject a request', async () => {
    render(
      <BrowserRouter>
        <MentorIncomingRequests />
      </BrowserRouter>
    );
    fireEvent.click(screen.getAllByTestId('mentor-incoming-accept-btn')[0]);
    await waitFor(() => {
      expect(screen.getByTestId('mentor-incoming-accept-success-msg')).toBeInTheDocument();
    });
    fireEvent.click(screen.getAllByTestId('mentor-incoming-reject-btn')[0]);
    await waitFor(() => {
      expect(screen.getByTestId('mentor-incoming-reject-success-msg')).toBeInTheDocument();
    });
  });
});
