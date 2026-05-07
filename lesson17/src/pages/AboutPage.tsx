export function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-4 text-left">
      <h1 className="text-3xl font-bold tracking-tight">About the app</h1>
      <p className="text-muted-foreground text-sm">
        This screen is served at{' '}
        <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-xs">
          /about
        </code>
        . The dashboard at{' '}
        <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-xs">
          /dashboard
        </code>{' '}
        is wrapped in a protected route: sign in first, or you are redirected to{' '}
        <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-xs">
          /login
        </code>
        .
      </p>
    </div>
  );
}
