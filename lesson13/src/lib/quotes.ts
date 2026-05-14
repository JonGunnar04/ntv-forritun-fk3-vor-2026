export async function fetchRandomQuote(): Promise<string> {
  const response = await fetch('https://catfact.ninja/facts?limit=5');
  if (!response.ok) {
    throw new Error('Ekki tókst að sækja quote');
  }
  const data = (await response.json()) as { content: string; author: string };
  return `„${data.content}“ — ${data.author}`;
}
