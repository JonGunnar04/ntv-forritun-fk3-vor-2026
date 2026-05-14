import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';
import { Greeting } from './Greeting';

const meta = {
  title: 'Components/Greeting',
  component: Greeting,
} satisfies Meta<typeof Greeting>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const SubmitsName: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();
    await user.type(canvas.getByLabelText('Nafn'), 'Alex');
    await user.click(canvas.getByRole('button', { name: 'Senda' }));
    await expect(canvas.getByRole('status')).toHaveTextContent('Halló, Alex!');
  },
};
