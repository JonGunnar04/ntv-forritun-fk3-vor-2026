import type { FormEvent } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/auth/useAuth';

const defaultAfterLogin = '/velkominn';

type LocationState = {
  from?: { pathname: string };
};

export function LoginPage() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LocationState | null;
  const redirectTo = state?.from?.pathname ?? defaultAfterLogin;

  if (isAuthenticated) {
    return <Navigate to={redirectTo} replace />;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    login();
    navigate(redirectTo, { replace: true });
  }

  return (
    <div className="mx-auto max-w-md space-y-6 text-left">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Innskráning</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Þetta er sýnishorn: hvaða notandanafn og lykilorð sem er virkar. Eftir
          innskráningu ferðu á verndaða síðu.
        </p>
      </header>
      <form
        onSubmit={handleSubmit}
        className="bg-card text-card-foreground space-y-4 rounded-xl border p-6 shadow-sm"
      >
        <div className="space-y-2">
          <label htmlFor="login-user" className="text-sm font-medium">
            Notandanafn
          </label>
          <input
            id="login-user"
            name="user"
            type="text"
            autoComplete="username"
            className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border px-3 py-1 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            placeholder="t.d. kennari"
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="login-pass" className="text-sm font-medium">
            Lykilorð
          </label>
          <input
            id="login-pass"
            name="password"
            type="password"
            autoComplete="current-password"
            className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border px-3 py-1 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            placeholder="••••••••"
          />
        </div>
        <button
          type="submit"
          className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-9 w-full items-center justify-center rounded-md px-4 text-sm font-medium"
        >
          Skrá inn
        </button>
      </form>
      <p className="text-sm">
        <Link to="/" className="underline-offset-4 hover:underline">
          Til baka á forsíðu
        </Link>
      </p>
    </div>
  );
}
