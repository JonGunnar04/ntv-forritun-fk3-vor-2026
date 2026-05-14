import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/auth-context';
import { loginFormSchema } from '@/lib/login-schema';
import { ROUTES } from '@/navigation';
import { useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

type LoginLocationState = { from?: { pathname: string } };

type FieldErrors = Partial<Record<'username' | 'password', string>>;

export function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as LoginLocationState | null;
  const from = state?.from?.pathname ?? ROUTES.dashboard;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const parsed = loginFormSchema.safeParse({ username, password });
    if (!parsed.success) {
      const flat = parsed.error.flatten();
      setFieldErrors({
        username: flat.fieldErrors.username?.[0],
        password: flat.fieldErrors.password?.[0],
      });
      return;
    }

    setFieldErrors({});
    login();
    navigate(from, { replace: true });
  }

  return (
    <div className="mx-auto max-w-md">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Log in</CardTitle>
          <CardDescription>
            Enter any username and password that pass validation. After login you
            can open the protected{' '}
            <Link
              to={ROUTES.dashboard}
              className="text-primary font-medium underline-offset-4 hover:underline"
            >
              dashboard
            </Link>
            .
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form noValidate onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="login-username">Username</Label>
              <Input
                id="login-username"
                name="username"
                type="text"
                autoComplete="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                  if (fieldErrors.username) {
                    setFieldErrors((prev) => ({ ...prev, username: undefined }));
                  }
                }}
                aria-invalid={Boolean(fieldErrors.username)}
                aria-describedby={
                  fieldErrors.username ? 'login-username-error' : undefined
                }
              />
              {fieldErrors.username ? (
                <p
                  id="login-username-error"
                  className="text-destructive text-sm"
                  role="alert"
                >
                  {fieldErrors.username}
                </p>
              ) : null}
            </div>
            <div className="space-y-2">
              <Label htmlFor="login-password">Password</Label>
              <Input
                id="login-password"
                name="password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (fieldErrors.password) {
                    setFieldErrors((prev) => ({ ...prev, password: undefined }));
                  }
                }}
                aria-invalid={Boolean(fieldErrors.password)}
                aria-describedby={
                  fieldErrors.password ? 'login-password-error' : undefined
                }
              />
              {fieldErrors.password ? (
                <p
                  id="login-password-error"
                  className="text-destructive text-sm"
                  role="alert"
                >
                  {fieldErrors.password}
                </p>
              ) : null}
            </div>
            <Button type="submit" className="w-full">
              Sign in
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
