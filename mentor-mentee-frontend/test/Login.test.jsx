import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Login from '../src/pages/Login';

beforeEach(() => {
  global.fetch = jest.fn((url, opts) => {
    if (url.includes('/api/login')) {
      const { email, password } = JSON.parse(opts.body);
      if (email === 'wrong@example.com') {
        return Promise.resolve({ ok: false, json: async () => ({}) });
      }
      return Promise.resolve({ ok: true, json: async () => ({ token: 'mocktoken' }) });
    }
    return Promise.resolve({ ok: true, json: async () => ({}) });
  });
  localStorage.clear();
});

describe('Login Page UI & Functionality', () => {
  it('renders login form with all required fields and buttons', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    expect(screen.getByTestId('login-email-input')).toBeInTheDocument();
    expect(screen.getByTestId('login-password-input')).toBeInTheDocument();
    expect(screen.getByTestId('login-submit-btn')).toBeInTheDocument();
  });

  it('shows error message on invalid login', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    );
    fireEvent.change(screen.getByTestId('login-email-input'), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByTestId('login-password-input'), { target: { value: 'wrongpass' } });
    fireEvent.click(screen.getByTestId('login-submit-btn'));
    await waitFor(() => {
      expect(screen.getByTestId('login-error-msg')).toBeInTheDocument();
    });
  });
});
