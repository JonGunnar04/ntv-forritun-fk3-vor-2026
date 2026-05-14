export function HomePage() {
  return (
    <div className="mx-auto max-w-2xl space-y-4 text-left">
      <h1 className="text-3xl font-bold tracking-tight">Home Page</h1>
      <p className="text-muted-foreground text-sm">
        This is the home view. The app keeps the current screen in React state
        (no <strong>react-router-dom</strong> yet). Try adding{' '}
        <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-xs">
          Routes
        </code>{' '}
        /{' '}
        <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-xs">
          Route
        </code>{' '}
        in <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-xs">App.tsx</code>{' '}
        and <strong>useNavigate</strong> in the layout when you learn routing.
      </p>
    </div>
  );
}
