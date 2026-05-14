import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { QuoteCard } from './QuoteCard';

const meta = {
  title: 'Components/QuoteCard',
  component: QuoteCard,
} satisfies Meta<typeof QuoteCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const prevFetch = globalThis.fetch;
    globalThis.fetch = async () =>
      ({
        ok: true,
        json: async () => ({ content: 'Story quote', author: 'Author' }),
      }) as Response;

    try {
      const canvas = within(canvasElement);
      const user = userEvent.setup();
      await user.click(canvas.getByRole('button', { name: 'Sækja quote' }));
      await expect(await canvas.findByRole('status')).toHaveTextContent(
        '„Story quote“ — Author',
      );
    } finally {
      globalThis.fetch = prevFetch;
    }
  },
};
