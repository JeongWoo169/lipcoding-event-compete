import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Profile from '../src/pages/Profile';

beforeEach(() => {
  global.fetch = jest.fn((url, opts) => {
    if (url.includes('/api/me')) {
      return Promise.resolve({
        ok: true,
        json: async () => ({
          profile: { name: '홍길동', bio: '소개', skills: ['React'], imageUrl: '' }
        })
      });
    }
    if (url.includes('/api/profile')) {
      return Promise.resolve({ ok: true, json: async () => ({}) });
    }
    return Promise.resolve({ ok: true, json: async () => ({}) });
  });
  localStorage.setItem('token', 'mocktoken');
});

describe('Profile Page UI & Functionality', () => {
  it('renders profile form with all required fields and buttons', async () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );
    expect(screen.getByTestId('profile-email')).toBeInTheDocument();
    expect(screen.getByTestId('profile-name-input')).toBeInTheDocument();
    expect(screen.getByTestId('profile-save-btn')).toBeInTheDocument();
    expect(screen.getByTestId('profile-edit-btn')).toBeInTheDocument();
    expect(screen.getByTestId('profile-image-upload')).toBeInTheDocument();
  });

  it('enables editing and saves changes', async () => {
    render(
      <BrowserRouter>
        <Profile />
      </BrowserRouter>
    );
    fireEvent.click(screen.getByTestId('profile-edit-btn'));
    fireEvent.change(screen.getByTestId('profile-name-input'), { target: { value: 'New Name' } });
    fireEvent.click(screen.getByTestId('profile-save-btn'));
    await waitFor(() => {
      expect(screen.getByTestId('profile-success-msg')).toBeInTheDocument();
    });
  });
});
