import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Counter } from './Counter';

const meta = {
  title: 'Components/Counter',
  component: Counter,
} satisfies Meta<typeof Counter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const IncrementsOnClick: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();
    await user.click(canvas.getByRole('button', { name: 'Hækka' }));
    await expect(canvas.getByText('1')).toBeInTheDocument();
  },
};
