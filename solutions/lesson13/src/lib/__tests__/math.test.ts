import { add } from '@/lib/math';

describe('add', () => {
  it('returns the sum of two positive numbers', () => {
    expect(add(1, 2)).toBe(3);
  });

  it('returns the sum of two negative numbers', () => {
    expect(add(-4, -1)).toBe(-5);
  });

  it('adds a negative and a positive number', () => {
    expect(add(-2, 7)).toBe(5);
  });

  it('handles zero', () => {
    expect(add(0, 0)).toBe(0);
    expect(add(5, 0)).toBe(5);
    expect(add(0, -3)).toBe(-3);
  });

  it('handles floating-point values', () => {
    expect(add(0.1, 0.2)).toBeCloseTo(0.3);
  });
});
