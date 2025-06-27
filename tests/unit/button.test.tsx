import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  it('renders with default variant and size', () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  it('renders with custom variant', () => {
    render(<Button variant="destructive">Delete</Button>);
    const button = screen.getByRole('button', { name: /delete/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-destructive');
  });

  it('renders with custom size', () => {
    render(<Button size="lg">Large Button</Button>);
    const button = screen.getByRole('button', { name: /large button/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('h-11');
  });

  it('handles click events', async () => {
    const handleClick = vi.fn();
    const user = userEvent.setup();

    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole('button', { name: /click me/i });

    await user.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    const button = screen.getByRole('button', { name: /disabled button/i });
    expect(button).toBeDisabled();
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom</Button>);
    const button = screen.getByRole('button', { name: /custom/i });
    expect(button).toHaveClass('custom-class');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Button ref={ref}>Ref Button</Button>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('renders all variant styles correctly', () => {
    const variants = [
      'default',
      'destructive',
      'outline',
      'secondary',
      'ghost',
      'link',
    ] as const;

    variants.forEach(variant => {
      const { unmount } = render(<Button variant={variant}>{variant}</Button>);
      const button = screen.getByRole('button', { name: variant });
      expect(button).toBeInTheDocument();
      unmount();
    });
  });

  it('renders all size styles correctly', () => {
    const sizes = ['default', 'sm', 'lg', 'icon'] as const;

    sizes.forEach(size => {
      const { unmount } = render(<Button size={size}>{size}</Button>);
      const button = screen.getByRole('button', { name: size });
      expect(button).toBeInTheDocument();
      unmount();
    });
  });

  it('has correct accessibility attributes', () => {
    render(<Button aria-label="Accessible button">Submit</Button>);
    const button = screen.getByRole('button', { name: /accessible button/i });
    expect(button).toHaveAttribute('aria-label', 'Accessible button');
  });
});
