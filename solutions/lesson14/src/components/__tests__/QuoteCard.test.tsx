import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { QuoteCard } from '../Quote/QuoteCard';

vi.mock('@/lib/quotes', () => ({
  fetchRandomQuote: vi.fn(),
}));

import { fetchRandomQuote } from '@/lib/quotes';

const mockedFetchRandomQuote = vi.mocked(fetchRandomQuote);

describe('QuoteCard', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    mockedFetchRandomQuote.mockReset();
  });

  it('displays a quote from mocked fetchRandomQuote', async () => {
    mockedFetchRandomQuote.mockResolvedValue('"Test quote" — Student');

    render(<QuoteCard />);
    await user.click(screen.getByRole('button', { name: 'Sækja quote' }));

    expect(await screen.findByRole('status')).toHaveTextContent(
      '"Test quote" — Student',
    );
    expect(mockedFetchRandomQuote).toHaveBeenCalledTimes(1);
  });

  it('shows an error when fetchRandomQuote rejects', async () => {
    mockedFetchRandomQuote.mockRejectedValue(new Error('net'));

    render(<QuoteCard />);
    await user.click(screen.getByRole('button', { name: 'Sækja quote' }));

    expect(await screen.findByRole('alert')).toHaveTextContent(
      'Ekki tókst að sækja quote.',
    );
    expect(mockedFetchRandomQuote).toHaveBeenCalledTimes(1);
  });
});
