import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import { Layout } from '../Layout';

const logout = vi.fn();

vi.mock('@/auth/useAuth', () => ({
  useAuth: vi.fn(() => ({
    isAuthenticated: false,
    login: vi.fn(),
    logout,
  })),
}));

import { useAuth } from '@/auth/useAuth';

const mockedUseAuth = vi.mocked(useAuth);

describe('Layout', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    logout.mockReset();
    mockedUseAuth.mockReset();
    mockedUseAuth.mockImplementation(() => ({
      isAuthenticated: false,
      login: vi.fn(),
      logout,
    }));
  });

  function renderLayout(initialPath = '/') {
    render(
      <MemoryRouter initialEntries={[initialPath]}>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<p>Outlet content</p>} />
            <Route path="velkominn" element={<p>Welcome page</p>} />
            <Route path="login" element={<p>Login page</p>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );
  }

  it('shows home link and login link when unauthenticated', () => {
    renderLayout();
    expect(screen.getByRole('link', { name: 'Forsíða' })).toHaveAttribute(
      'href',
      '/',
    );
    expect(screen.getByRole('link', { name: 'Skrá inn' })).toHaveAttribute(
      'href',
      '/login',
    );
    expect(
      screen.queryByRole('button', { name: 'Skrá út' }),
    ).not.toBeInTheDocument();
  });

  it('shows post-login nav and logout when authenticated', () => {
    mockedUseAuth.mockImplementation(() => ({
      isAuthenticated: true,
      login: vi.fn(),
      logout,
    }));
    renderLayout();
    expect(
      screen.getByRole('link', { name: 'Eftir innskráningu' }),
    ).toHaveAttribute('href', '/velkominn');
    expect(screen.getByRole('button', { name: 'Skrá út' })).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: 'Skrá inn' }),
    ).not.toBeInTheDocument();
  });

  it('calls logout when Skrá út is clicked', async () => {
    mockedUseAuth.mockImplementation(() => ({
      isAuthenticated: true,
      login: vi.fn(),
      logout,
    }));
    renderLayout();
    await user.click(screen.getByRole('button', { name: 'Skrá út' }));
    expect(logout).toHaveBeenCalledTimes(1);
  });

  it('renders outlet child routes', () => {
    renderLayout('/');
    expect(screen.getByText('Outlet content')).toBeInTheDocument();
  });
});
