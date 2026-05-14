import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Greeting } from '../Greeting';

describe('Greeting', () => {
  it('renders the Kveðja heading', () => {
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

  it('does not show a message when the name is empty', async () => {
    const user = userEvent.setup();
    render(<Greeting />);
    await user.click(screen.getByRole('button', { name: 'Senda' }));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('does not show a message when the name is only spaces (trim)', async () => {
    const user = userEvent.setup();
    render(<Greeting />);
    await user.type(screen.getByLabelText('Nafn'), '   ');
    await user.click(screen.getByRole('button', { name: 'Senda' }));
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('submits the form on Enter after typing a name', async () => {
    const user = userEvent.setup();
    render(<Greeting />);
    const input = screen.getByLabelText('Nafn');
    await user.type(input, 'Anna{enter}');
    expect(await screen.findByRole('status')).toHaveTextContent('Halló, Anna!');
  });
});
