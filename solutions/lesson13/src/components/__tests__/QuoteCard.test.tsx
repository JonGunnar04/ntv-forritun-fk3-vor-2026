import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import { QuoteCard } from '../QuoteCard';

vi.mock('@/lib/quotes', () => ({
  fetchRandomQuote: vi.fn(),
}));

import { fetchRandomQuote } from '@/lib/quotes';

const mockedFetchRandomQuote = vi.mocked(fetchRandomQuote);

describe('QuoteCard', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
    mockedFetchRandomQuote.mockReset();
  });

  it('renders the Quote heading and fetch button with no prior result', () => {
    render(<QuoteCard />);
    expect(screen.getByRole('heading', { name: 'Quote' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Sækja quote' })).toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('shows loading: button disabled with Sæki… while waiting', async () => {
    let resolveText!: (value: string) => void;
    const promise = new Promise<string>((res) => {
      resolveText = res;
    });
    mockedFetchRandomQuote.mockReturnValue(promise);

    render(<QuoteCard />);
    await user.click(screen.getByRole('button', { name: 'Sækja quote' }));

    const loadingButton = screen.getByRole('button', { name: 'Sæki…' });
    expect(loadingButton).toBeDisabled();

    resolveText('“Done” — Author');
    expect(await screen.findByRole('status')).toHaveTextContent('“Done” — Author');
    expect(screen.getByRole('button', { name: 'Sækja quote' })).not.toBeDisabled();
  });

  it('displays the quote from mocked fetchRandomQuote after the response', async () => {
    mockedFetchRandomQuote.mockResolvedValue('“Test” — Student');

    render(<QuoteCard />);
    await user.click(screen.getByRole('button', { name: 'Sækja quote' }));

    expect(await screen.findByRole('status')).toHaveTextContent('“Test” — Student');
    expect(mockedFetchRandomQuote).toHaveBeenCalledTimes(1);
  });

  it('replaces the previous quote when fetch is triggered again', async () => {
    mockedFetchRandomQuote
      .mockResolvedValueOnce('First')
      .mockResolvedValueOnce('Second');

    render(<QuoteCard />);
    await user.click(screen.getByRole('button', { name: 'Sækja quote' }));
    expect(await screen.findByRole('status')).toHaveTextContent('First');

    await user.click(screen.getByRole('button', { name: 'Sækja quote' }));
    expect(await screen.findByRole('status')).toHaveTextContent('Second');
    expect(mockedFetchRandomQuote).toHaveBeenCalledTimes(2);
  });

  it('shows an error and no quote when fetchRandomQuote throws', async () => {
    mockedFetchRandomQuote.mockRejectedValue(new Error('net'));

    render(<QuoteCard />);
    await user.click(screen.getByRole('button', { name: 'Sækja quote' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('Ekki tókst að sækja quote.');
    expect(mockedFetchRandomQuote).toHaveBeenCalledTimes(1);
  });

  it('recovers: error clears after a successful retry', async () => {
    mockedFetchRandomQuote
      .mockRejectedValueOnce(new Error('temporary'))
      .mockResolvedValueOnce('“Success” — Quote');

    render(<QuoteCard />);
    await user.click(screen.getByRole('button', { name: 'Sækja quote' }));
    expect(await screen.findByRole('alert')).toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: 'Sækja quote' }));
    expect(await screen.findByRole('status')).toHaveTextContent('“Success” — Quote');
    await waitFor(() => {
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });
});
