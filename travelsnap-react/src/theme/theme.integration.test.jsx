import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider, Button, Typography, useTheme } from '@mui/material';
import theme from './theme';

// Test component that uses the theme
function ThemeConsumer() {
  const theme = useTheme();
  
  return (
    <div>
      <Typography variant="h1" data-testid="heading">
        Test Heading
      </Typography>
      <Button variant="contained" data-testid="button">
        Test Button
      </Button>
      <div data-testid="primary-color">{theme.palette.primary.main}</div>
      <div data-testid="spacing">{theme.spacing(2)}</div>
    </div>
  );
}

describe('MUI Theme Integration', () => {
  it('should provide theme to components via ThemeProvider', () => {
    render(
      <ThemeProvider theme={theme}>
        <ThemeConsumer />
      </ThemeProvider>
    );

    expect(screen.getByTestId('heading')).toBeInTheDocument();
    expect(screen.getByTestId('button')).toBeInTheDocument();
  });

  it('should make theme values accessible via useTheme hook', () => {
    render(
      <ThemeProvider theme={theme}>
        <ThemeConsumer />
      </ThemeProvider>
    );

    expect(screen.getByTestId('primary-color')).toHaveTextContent('#6366F1');
    expect(screen.getByTestId('spacing')).toHaveTextContent('16px');
  });

  it('should apply theme styles to MUI components', () => {
    render(
      <ThemeProvider theme={theme}>
        <Button variant="contained" data-testid="styled-button">
          Styled Button
        </Button>
      </ThemeProvider>
    );

    const button = screen.getByTestId('styled-button');
    expect(button).toBeInTheDocument();
    
    // Check if button has the theme's text transform style
    const styles = window.getComputedStyle(button);
    expect(styles.textTransform).toBe('none');
  });

  it('should apply typography variants from theme', () => {
    render(
      <ThemeProvider theme={theme}>
        <Typography variant="h1" data-testid="h1">
          Heading 1
        </Typography>
      </ThemeProvider>
    );

    const heading = screen.getByTestId('h1');
    expect(heading).toBeInTheDocument();
  });
});
