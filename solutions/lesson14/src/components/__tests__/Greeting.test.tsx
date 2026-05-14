import { render, screen } from '@testing-library/react';
import { Greeting } from '../Greeting/Greeting';
import userEvent from '@testing-library/user-event';

describe('Greeting', () => {
  it('renders the section heading', () => {
    render(<Greeting />);
    expect(screen.getByRole('heading', { name: 'Kveðja' })).toBeInTheDocument();
  });

  it('renders the name field with label Nafn', () => {
    render(<Greeting />);
    expect(screen.getByLabelText('Nafn')).toBeInTheDocument();
  });

  it('renders the Senda submit button', () => {
    render(<Greeting />);
    expect(screen.getByRole('button', { name: 'Senda' })).toBeInTheDocument();
  });

  it('does not show a status message initially', () => {
    render(<Greeting />);
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('shows a personalized message after submit with a name', async () => {
    const user = userEvent.setup();
    render(<Greeting />);
    await user.type(screen.getByLabelText('Nafn'), 'Jón');
    await user.click(screen.getByRole('button', { name: 'Senda' }));
    expect(await screen.findByRole('status')).toHaveTextContent('Halló, Jón!');
  });
});
