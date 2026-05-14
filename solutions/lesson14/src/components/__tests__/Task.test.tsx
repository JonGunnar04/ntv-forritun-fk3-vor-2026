import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';
import Task from '../Task/Task';

describe('Task', () => {
  const user = userEvent.setup();

  const baseTask = {
    id: 't1',
    title: 'Write tests',
    state: 'TASK_INBOX' as const,
  };

  it('renders the task title', () => {
    render(
      <Task task={baseTask} onArchiveTask={vi.fn()} onPinTask={vi.fn()} />,
    );
    expect(screen.getByDisplayValue('Write tests')).toBeInTheDocument();
  });

  it('calls onPinTask when the pin button is clicked', async () => {
    const onPinTask = vi.fn();
    render(
      <Task task={baseTask} onArchiveTask={vi.fn()} onPinTask={onPinTask} />,
    );
    await user.click(screen.getByRole('button', { name: 'pinTask-t1' }));
    expect(onPinTask).toHaveBeenCalledWith('t1');
  });

  it('calls onArchiveTask when the archive control is clicked', async () => {
    const onArchiveTask = vi.fn();
    const { container } = render(
      <Task
        task={baseTask}
        onArchiveTask={onArchiveTask}
        onPinTask={vi.fn()}
      />,
    );
    const archiveTrigger = container.querySelector('.checkbox-custom');
    expect(archiveTrigger).toBeTruthy();
    await user.click(archiveTrigger!);
    expect(onArchiveTask).toHaveBeenCalledWith('t1');
  });

  it('shows archived state and hides the pin control when TASK_ARCHIVED', () => {
    render(
      <Task
        task={{ ...baseTask, state: 'TASK_ARCHIVED' }}
        onArchiveTask={vi.fn()}
        onPinTask={vi.fn()}
      />,
    );
    expect(screen.getByRole('checkbox')).toBeChecked();
    expect(
      screen.queryByRole('button', { name: 'pinTask-t1' }),
    ).not.toBeInTheDocument();
  });
});
