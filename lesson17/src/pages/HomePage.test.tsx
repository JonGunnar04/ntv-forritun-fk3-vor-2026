import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { HomePage } from './HomePage';

describe('HomePage', () => {
  it('sýnir fyrirsögn', () => {
    render(<HomePage />);
    expect(
      screen.getByRole('heading', { name: /home page/i }),
    ).toBeInTheDocument();
  });
});
