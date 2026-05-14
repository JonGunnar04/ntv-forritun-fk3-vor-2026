export function DashboardPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-4 text-left">
      <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
      <p className="text-muted-foreground text-sm">
        This route is protected: you only see it when authenticated. Unauthenticated
        visitors are redirected to the login page.
      </p>
    </div>
  );
}
