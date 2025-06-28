import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import MentorList from '../src/pages/MentorList';

beforeEach(() => {
  global.fetch = jest.fn((url) => {
    if (url.includes('/api/mentors')) {
      return Promise.resolve({
        ok: true,
        json: async () => ([
          { id: 1, profile: { name: '멘토1', bio: '소개1', skills: ['React'], imageUrl: '' } },
          { id: 2, profile: { name: '멘토2', bio: '소개2', skills: ['Node'], imageUrl: '' } }
        ])
      });
    }
    return Promise.resolve({ ok: true, json: async () => ({}) });
  });
  localStorage.setItem('token', 'mocktoken');
});

describe('Mentor List Page UI & Functionality', () => {
  it('renders mentor list and search/sort controls', () => {
    render(
      <BrowserRouter>
        <MentorList />
      </BrowserRouter>
    );
    expect(screen.getByTestId('mentor-search-input')).toBeInTheDocument();
    expect(screen.getByTestId('mentor-sort-select')).toBeInTheDocument();
    expect(screen.getByTestId('mentor-list')).toBeInTheDocument();
  });

  it('can search and request mentor match', async () => {
    render(
      <BrowserRouter>
        <MentorList />
      </BrowserRouter>
    );
    fireEvent.change(screen.getByTestId('mentor-search-input'), { target: { value: '프론트엔드' } });
    fireEvent.click(screen.getAllByTestId('mentor-request-btn')[0]);
    await waitFor(() => {
      expect(screen.getByTestId('mentor-request-success-msg')).toBeInTheDocument();
    });
  });
});
