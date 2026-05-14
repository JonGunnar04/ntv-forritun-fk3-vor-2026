import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { expect, within } from 'storybook/test';
import { AuthProvider } from '@/auth/AuthProvider';
import { Layout } from './Layout';

const STORAGE_KEY = 'lesson14-auth';

const meta = {
  title: 'Components/Layout',
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

function loggedOutWrapper(children: ReactNode) {
  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    /* ignore */
  }
  return (
    <MemoryRouter initialEntries={['/']}>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={children} />
            <Route path="login" element={<p>Login route</p>} />
            <Route path="velkominn" element={<p>Welcome route</p>} />
          </Route>
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  );
}

function loggedInWrapper(children: ReactNode) {
  try {
    sessionStorage.setItem(STORAGE_KEY, 'true');
  } catch {
    /* ignore */
  }
  return (
    <MemoryRouter initialEntries={['/']}>
      <AuthProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={children} />
            <Route path="login" element={<p>Login route</p>} />
            <Route path="velkominn" element={<p>Welcome route</p>} />
          </Route>
        </Routes>
      </AuthProvider>
    </MemoryRouter>
  );
}

export const LoggedOutHome: Story = {
  name: 'Logged out (home)',
  render: () =>
    loggedOutWrapper(
      <p className="text-muted-foreground text-sm">Index outlet</p>,
    ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('link', { name: 'Skrá inn' }),
    ).toBeInTheDocument();
    await expect(
      canvas.queryByRole('button', { name: 'Skrá út' }),
    ).not.toBeInTheDocument();
  },
};

export const LoggedInHome: Story = {
  name: 'Logged in (home)',
  render: () =>
    loggedInWrapper(
      <p className="text-muted-foreground text-sm">Member outlet</p>,
    ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(
      canvas.getByRole('button', { name: 'Skrá út' }),
    ).toBeInTheDocument();
    await expect(
      canvas.queryByRole('link', { name: 'Skrá inn' }),
    ).not.toBeInTheDocument();
  },
};
