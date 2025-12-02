import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@mui/material/styles';
import PremiumDestinationCard from './PremiumDestinationCard';
import theme from '../theme/theme';

describe('PremiumDestinationCard', () => {
  const mockDestination = {
    id: 'paris',
    name: 'Paris',
    tagline: 'The City of Love and Lights',
    imageUrl: 'https://example.com/paris.jpg',
    placesToVisit: ['Eiffel Tower', 'Louvre Museum', 'Notre Dame Cathedral'],
  };

  const renderWithTheme = (component) => {
    return render(
      <ThemeProvider theme={theme}>
        {component}
      </ThemeProvider>
    );
  };

  it('renders destination name and tagline', () => {
    renderWithTheme(<PremiumDestinationCard destination={mockDestination} />);
    
    expect(screen.getByText('Paris')).toBeInTheDocument();
    expect(screen.getByText('The City of Love and Lights')).toBeInTheDocument();
  });

  it('renders feature chips from placesToVisit', () => {
    renderWithTheme(<PremiumDestinationCard destination={mockDestination} />);
    
    expect(screen.getByText('Eiffel Tower')).toBeInTheDocument();
    expect(screen.getByText('Louvre Museum')).toBeInTheDocument();
    expect(screen.getByText('Notre Dame Cathedral')).toBeInTheDocument();
  });

  it('renders popular badge when isPopular is true', () => {
    renderWithTheme(<PremiumDestinationCard destination={mockDestination} isPopular={true} />);
    
    expect(screen.getByText('Popular')).toBeInTheDocument();
  });

  it('does not render popular badge when isPopular is false', () => {
    renderWithTheme(<PremiumDestinationCard destination={mockDestination} isPopular={false} />);
    
    expect(screen.queryByText('Popular')).not.toBeInTheDocument();
  });

  it('renders explore button', () => {
    renderWithTheme(<PremiumDestinationCard destination={mockDestination} />);
    
    expect(screen.getByText('Explore Destination')).toBeInTheDocument();
  });

  it('calls onClick when card is clicked', () => {
    const handleClick = vi.fn();
    renderWithTheme(<PremiumDestinationCard destination={mockDestination} onClick={handleClick} />);
    
    const card = screen.getByText('Paris').closest('.MuiCard-root');
    card.click();
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders image with correct alt text', () => {
    renderWithTheme(<PremiumDestinationCard destination={mockDestination} />);
    
    const image = screen.getByAltText('Paris');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://example.com/paris.jpg');
  });
});
