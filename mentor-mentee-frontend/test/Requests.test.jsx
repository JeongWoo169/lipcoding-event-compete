import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Requests from '../src/pages/Requests';

beforeEach(() => {
  global.fetch = jest.fn((url) => {
    if (url.includes('/api/match-requests/outgoing')) {
      return Promise.resolve({
        ok: true,
        json: async () => ([
          { id: 1, mentorId: 1, status: 'pending' },
          { id: 2, mentorId: 2, status: 'accepted' }
        ])
      });
    }
    return Promise.resolve({ ok: true, json: async () => ({}) });
  });
  localStorage.setItem('token', 'mocktoken');
});

describe('Mentee Requests Page UI & Functionality', () => {
  it('renders mentee requests list', () => {
    render(
      <BrowserRouter>
        <Requests />
      </BrowserRouter>
    );
    expect(screen.getByTestId('mentee-requests-list')).toBeInTheDocument();
  });

  it('shows request status and allows cancel', async () => {
    render(
      <BrowserRouter>
        <Requests />
      </BrowserRouter>
    );
    fireEvent.click(screen.getAllByTestId('mentee-request-cancel-btn')[0]);
    await waitFor(() => {
      expect(screen.getByTestId('mentee-request-cancel-success-msg')).toBeInTheDocument();
    });
  });
});
