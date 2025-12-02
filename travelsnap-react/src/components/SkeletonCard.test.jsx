import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import SkeletonCard from './SkeletonCard';

describe('SkeletonCard', () => {
  it('renders destination variant with correct aria label', () => {
    render(<SkeletonCard variant="destination" />);
    expect(screen.getByRole('status', { name: /loading destination card/i })).toBeInTheDocument();
  });

  it('renders stats variant with correct aria label', () => {
    render(<SkeletonCard variant="stats" />);
    expect(screen.getByRole('status', { name: /loading stats card/i })).toBeInTheDocument();
  });

  it('renders compact variant with correct aria label', () => {
    render(<SkeletonCard variant="compact" />);
    expect(screen.getByRole('status', { name: /loading card/i })).toBeInTheDocument();
  });

  it('defaults to destination variant when no variant specified', () => {
    render(<SkeletonCard />);
    expect(screen.getByRole('status', { name: /loading destination card/i })).toBeInTheDocument();
  });

  it('applies custom height when provided', () => {
    const { container } = render(<SkeletonCard variant="stats" height={300} />);
    const card = container.querySelector('[role="status"]');
    expect(card).toHaveStyle({ height: '300px' });
  });
});
