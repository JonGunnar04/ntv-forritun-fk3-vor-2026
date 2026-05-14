export function AboutPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-4 text-left">
      <h1 className="text-3xl font-bold tracking-tight">About the app</h1>
      <p className="text-muted-foreground text-sm">
        This is the about view, still driven by state in{' '}
        <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-xs">
          App.tsx
        </code>
        . After you add React Router, this screen can live at a real path like{' '}
        <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-xs">
          /about
        </code>
        , with <strong>useNavigate</strong> updating the URL from the header.
      </p>
    </div>
  );
}
