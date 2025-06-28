import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Signup from '../src/pages/Signup';

beforeEach(() => {
  global.fetch = jest.fn((url, opts) => {
    if (url.includes('/api/signup')) {
      const { email } = JSON.parse(opts.body);
      if (email === 'invalid') {
        return Promise.resolve({ ok: false, json: async () => ({}) });
      }
      return Promise.resolve({ ok: true, json: async () => ({}) });
    }
    return Promise.resolve({ ok: true, json: async () => ({}) });
  });
  localStorage.clear();
});

describe('Signup Page UI & Functionality', () => {
  it('renders signup form with all required fields and buttons', () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );
    expect(screen.getByTestId('signup-email-input')).toBeInTheDocument();
    expect(screen.getByTestId('signup-password-input')).toBeInTheDocument();
    expect(screen.getByTestId('signup-confirm-password-input')).toBeInTheDocument();
    expect(screen.getByTestId('signup-submit-btn')).toBeInTheDocument();
  });

  it('shows error message on invalid signup', async () => {
    render(
      <BrowserRouter>
        <Signup />
      </BrowserRouter>
    );
    fireEvent.change(screen.getByTestId('signup-email-input'), { target: { value: 'invalid' } });
    fireEvent.change(screen.getByTestId('signup-password-input'), { target: { value: '123' } });
    fireEvent.change(screen.getByTestId('signup-confirm-password-input'), { target: { value: '321' } });
    fireEvent.click(screen.getByTestId('signup-submit-btn'));
    await waitFor(() => {
      expect(screen.getByTestId('signup-error-msg')).toBeInTheDocument();
    });
  });
});
