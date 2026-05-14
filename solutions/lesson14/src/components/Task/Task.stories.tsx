import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import Task from './Task';

const meta = {
  title: 'Components/Task',
  component: Task,
  args: {
    task: {
      id: '1',
      title: 'Example task',
      state: 'TASK_INBOX' as const,
    },
    onArchiveTask: fn(),
    onPinTask: fn(),
  },
} satisfies Meta<typeof Task>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Inbox: Story = {};

export const PinsWhenClicked: Story = {
  args: {
    task: {
      id: 'pin-1',
      title: 'Pin me',
      state: 'TASK_INBOX',
    },
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const user = userEvent.setup();
    await user.click(canvas.getByRole('button', { name: 'pinTask-pin-1' }));
    await expect(args.onPinTask).toHaveBeenCalledWith('pin-1');
  },
};

export const Archived: Story = {
  args: {
    task: {
      id: '2',
      title: 'Done',
      state: 'TASK_ARCHIVED',
    },
  },
};

export const Pinned: Story = {
  args: {
    task: {
      id: '3',
      title: 'Pinned work',
      state: 'TASK_PINNED',
    },
  },
};
