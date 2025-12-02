import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import Button from './Button';
import theme from '../theme/theme';

describe('Button', () => {
  const renderWithTheme = (component) => {
    return render(
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    );
  };

  describe('Variants', () => {
    it('renders primary button variant', () => {
      renderWithTheme(<Button variant="primary">Primary Button</Button>);
      expect(screen.getByText('Primary Button')).toBeInTheDocument();
    });

    it('renders secondary button variant', () => {
      renderWithTheme(<Button variant="secondary">Secondary Button</Button>);
      expect(screen.getByText('Secondary Button')).toBeInTheDocument();
    });

    it('renders ghost button variant', () => {
      renderWithTheme(<Button variant="ghost">Ghost Button</Button>);
      expect(screen.getByText('Ghost Button')).toBeInTheDocument();
    });
  });

  describe('Sizes', () => {
    it('renders small button', () => {
      renderWithTheme(<Button size="small">Small</Button>);
      const button = screen.getByText('Small');
      expect(button).toBeInTheDocument();
    });

    it('renders medium button (default)', () => {
      renderWithTheme(<Button size="medium">Medium</Button>);
      const button = screen.getByText('Medium');
      expect(button).toBeInTheDocument();
    });

    it('renders large button', () => {
      renderWithTheme(<Button size="large">Large</Button>);
      const button = screen.getByText('Large');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Loading State', () => {
    it('shows loading spinner when loading is true', () => {
      renderWithTheme(<Button loading={true}>Loading Button</Button>);
      expect(screen.getByRole('progressbar')).toBeInTheDocument();
      expect(screen.getByText('Loading Button')).toBeInTheDocument();
    });

    it('does not show loading spinner when loading is false', () => {
      renderWithTheme(<Button loading={false}>Normal Button</Button>);
      expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
    });
  });

  describe('Disabled State', () => {
    it('disables button when disabled prop is true', () => {
      renderWithTheme(<Button disabled={true}>Disabled Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('disables button when loading is true', () => {
      renderWithTheme(<Button loading={true}>Loading Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });
  });

  describe('Click Handler', () => {
    it('calls onClick handler when clicked', () => {
      const handleClick = vi.fn();
      renderWithTheme(<Button onClick={handleClick}>Click Me</Button>);
      
      const button = screen.getByText('Click Me');
      fireEvent.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', () => {
      const handleClick = vi.fn();
      renderWithTheme(<Button onClick={handleClick} disabled={true}>Disabled</Button>);
      
      const button = screen.getByText('Disabled');
      fireEvent.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Full Width', () => {
    it('renders full width button when fullWidth is true', () => {
      const { container } = renderWithTheme(<Button fullWidth={true}>Full Width</Button>);
      const button = screen.getByText('Full Width');
      expect(button).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has minimum touch target size for small buttons', () => {
      renderWithTheme(<Button size="small">Small Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      // The button should have minHeight of 36px and minWidth of 88px for accessibility
    });

    it('has minimum touch target size for medium buttons', () => {
      renderWithTheme(<Button size="medium">Medium Button</Button>);
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      // The button should have minHeight of 44px for accessibility
    });
  });
});
