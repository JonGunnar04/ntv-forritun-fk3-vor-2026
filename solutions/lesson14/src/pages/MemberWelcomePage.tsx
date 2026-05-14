import { Link } from 'react-router-dom';

export function MemberWelcomePage() {
  return (
    <div className="mx-auto max-w-lg space-y-6 text-left">
      <header>
        <h1 className="text-3xl font-bold tracking-tight">Velkomin(n) inn</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Þessi síða er aðeins aðgengileg eftir að þú hefur skráð þig inn.
        </p>
      </header>
      <section
        className="bg-card text-card-foreground rounded-xl border p-6 shadow-sm"
        aria-labelledby="member-info-heading"
      >
        <h2 id="member-info-heading" className="text-lg font-semibold">
          Vernduð svæði
        </h2>
        <p className="text-muted-foreground mt-2 text-sm">
          Hér gæti komið persónuleg gögn, stillingar eða annað efni sem á að
          vera læst fyrir óinnskráðum notendum.
        </p>
      </section>
      <p className="text-sm">
        <Link to="/" className="underline-offset-4 hover:underline">
          Til forsíðu
        </Link>
      </p>
    </div>
  );
}
