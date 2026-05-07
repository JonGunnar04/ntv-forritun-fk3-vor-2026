export function HomePage() {
  return (
    <div className="mx-auto max-w-2xl space-y-4 text-left">
      <h1 className="text-3xl font-bold tracking-tight">Home Page</h1>
      <p className="text-muted-foreground text-sm">
        This app uses{' '}
        <strong>react-router-dom</strong> with <strong>BrowserRouter</strong>. Routes
        live in{' '}
        <code className="bg-muted rounded px-1.5 py-0.5 font-mono text-xs">
          App.tsx
        </code>
        ; the header uses <strong>NavLink</strong> for navigation and URL-driven
        active styles.
      </p>
    </div>
  );
}
