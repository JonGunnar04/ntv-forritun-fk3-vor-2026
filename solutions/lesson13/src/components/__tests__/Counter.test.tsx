import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from '../Counter';

describe('Counter', () => {
  let user: ReturnType<typeof userEvent.setup>;

  beforeEach(() => {
    user = userEvent.setup();
    render(<Counter />);
  });

  it('starts at 0', () => {
    const section = screen.getByRole('region', { name: 'Teljari' });
    expect(within(section).getByText('0')).toBeInTheDocument();
  });

  it('renders the Teljari heading', () => {
    expect(screen.getByRole('heading', { level: 2, name: 'Teljari' })).toBeInTheDocument();
  });

  it('increments when Hækka is clicked', async () => {
    await user.click(screen.getByRole('button', { name: 'Hækka' }));
    expect(screen.getByText('1')).toHaveTextContent('1');
  });

  it('increments more than once', async () => {
    await user.click(screen.getByRole('button', { name: 'Hækka' }));
    await user.click(screen.getByRole('button', { name: 'Hækka' }));
    expect(screen.getByText('2')).toHaveTextContent('2');
  });

  it('decrements when Minnka is clicked (can go negative)', async () => {
    await user.click(screen.getByRole('button', { name: 'Minnka' }));
    expect(screen.getByText('-1')).toHaveTextContent('-1');
  });

  it('resets to 0 when Endurstilla is clicked', async () => {
    await user.click(screen.getByRole('button', { name: 'Hækka' }));
    await user.click(screen.getByRole('button', { name: 'Hækka' }));
    expect(screen.getByText('2')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Endurstilla' }));
    expect(screen.getByText('0')).toHaveTextContent('0');
  });
});
