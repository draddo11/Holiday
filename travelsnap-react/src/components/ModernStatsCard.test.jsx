import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import ModernStatsCard from './ModernStatsCard';
import theme from '../theme/theme';
import { WbSunny } from '@mui/icons-material';

describe('ModernStatsCard', () => {
  const renderWithTheme = (component) => {
    return render(
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    );
  };

  it('renders label, value, and description', () => {
    renderWithTheme(
      <ModernStatsCard
        icon={<WbSunny />}
        label="Weather"
        value="23°C"
        description="Clear and pleasant"
      />
    );
    
    expect(screen.getByText('Weather')).toBeInTheDocument();
    expect(screen.getByText('23°C')).toBeInTheDocument();
    expect(screen.getByText('Clear and pleasant')).toBeInTheDocument();
  });

  it('renders icon', () => {
    const { container } = renderWithTheme(
      <ModernStatsCard
        icon={<WbSunny data-testid="weather-icon" />}
        label="Weather"
        value="23°C"
        description="Clear and pleasant"
      />
    );
    
    expect(screen.getByTestId('weather-icon')).toBeInTheDocument();
  });

  it('renders additional info when provided', () => {
    const additionalInfo = [
      { label: 'Humidity', value: '46%' },
      { label: 'Wind', value: '18 km/h' },
    ];

    renderWithTheme(
      <ModernStatsCard
        icon={<WbSunny />}
        label="Weather"
        value="23°C"
        description="Clear and pleasant"
        additionalInfo={additionalInfo}
      />
    );
    
    expect(screen.getByText('Humidity')).toBeInTheDocument();
    expect(screen.getByText('46%')).toBeInTheDocument();
    expect(screen.getByText('Wind')).toBeInTheDocument();
    expect(screen.getByText('18 km/h')).toBeInTheDocument();
  });

  it('does not render additional info section when empty', () => {
    const { container } = renderWithTheme(
      <ModernStatsCard
        icon={<WbSunny />}
        label="Weather"
        value="23°C"
        description="Clear and pleasant"
      />
    );
    
    // Check that there's no divider (which is part of additional info section)
    const dividers = container.querySelectorAll('[style*="border-top"]');
    expect(dividers.length).toBe(0);
  });

  it('applies uppercase styling to label text', () => {
    const { container } = renderWithTheme(
      <ModernStatsCard
        icon={<WbSunny />}
        label="weather forecast"
        value="23°C"
        description="Clear and pleasant"
      />
    );
    
    // The label text content remains lowercase, but CSS applies textTransform: 'uppercase'
    const label = screen.getByText('weather forecast');
    expect(label).toBeInTheDocument();
    // Verify it has the caption variant which includes the uppercase styling
    expect(label).toHaveClass('MuiTypography-caption');
  });

  it('renders with custom gradient colors', () => {
    const { container } = renderWithTheme(
      <ModernStatsCard
        icon={<WbSunny />}
        label="Weather"
        value="23°C"
        description="Clear and pleasant"
        gradientFrom="#FF0000"
        gradientTo="#00FF00"
      />
    );
    
    // Component should render without errors
    expect(screen.getByText('23°C')).toBeInTheDocument();
  });

  it('renders numeric values correctly', () => {
    renderWithTheme(
      <ModernStatsCard
        icon={<WbSunny />}
        label="Temperature"
        value={25}
        description="Warm day"
      />
    );
    
    expect(screen.getByText('25')).toBeInTheDocument();
  });
});
