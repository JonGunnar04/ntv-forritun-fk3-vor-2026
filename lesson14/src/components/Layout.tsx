import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '@/auth/useAuth';

const navClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-md px-3 py-2 text-sm font-medium',
    isActive
      ? 'bg-accent text-accent-foreground'
      : 'text-muted-foreground hover:text-foreground',
  ].join(' ');

export function Layout() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <nav
          className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-2 px-4 py-3"
          aria-label="Aðalvalmynd"
        >
          <NavLink to="/" end className={navClass}>
            Forsíða
          </NavLink>
          {isAuthenticated ? (
            <>
              <NavLink to="/velkominn" className={navClass}>
                Eftir innskráningu
              </NavLink>
              <button
                type="button"
                onClick={() => logout()}
                className="text-muted-foreground hover:text-foreground ml-auto rounded-md px-3 py-2 text-sm font-medium"
              >
                Skrá út
              </button>
            </>
          ) : (
            <NavLink
              to="/login"
              className={({ isActive }) =>
                [navClass({ isActive }), 'ml-auto'].join(' ')
              }
            >
              Skrá inn
            </NavLink>
          )}
        </nav>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
}
