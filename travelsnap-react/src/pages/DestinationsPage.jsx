import { useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import destinationsData from '../data/destinations.json';
import PremiumDestinationCard from '../components/PremiumDestinationCard';
import DestinationDetails from '../components/DestinationDetails';
import { colors, spacing } from '../theme/tokens';
import { getSectionSpacing, getGridGap } from '../theme/spacingUtils';
import { useFadeIn, useStaggeredAnimation, usePrefersReducedMotion } from '../hooks/useScrollAnimation';

function DestinationsPage() {
  const [selectedDestination, setSelectedDestination] = useState(null);
  
  // Animation hooks
  const { ref: headerRef, isVisible: headerVisible } = useFadeIn({ threshold: 0.2 });
  const { setRef: setCardRef, visibleIndices: visibleCards } = useStaggeredAnimation(
    destinationsData.length,
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
      staggerDelay: 100,
    }
  );
  const prefersReducedMotion = usePrefersReducedMotion();

  // Mark popular destinations (first 3)
  const popularIds = ['paris', 'tokyo', 'santorini'];

  // Bento grid layout configuration - varying card sizes
  const getBentoGridStyle = (index) => {
    // Create varying sizes for visual interest
    // Pattern: large, medium, medium, large, medium, medium
    const pattern = index % 6;
    
    if (pattern === 0 || pattern === 3) {
      // Large cards - span 2 columns on desktop
      return {
        gridColumn: { xs: 'span 1', md: 'span 2' },
      };
    } else {
      // Medium cards - span 1 column
      return {
        gridColumn: { xs: 'span 1', md: 'span 1' },
      };
    }
  };

  return (
    <Box
      component="section"
      aria-label="Destinations page"
      sx={{
        minHeight: '100vh',
        background: colors.gradients.hero,
        pt: getSectionSpacing('large'),
        pb: getSectionSpacing('medium'),
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: colors.gradients.heroOverlay,
        }
      }}
    >
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Box 
          ref={headerRef}
          component="header"
          sx={{ 
            textAlign: 'center', 
            mb: { xs: spacing[6], sm: spacing[8], md: spacing[8] },
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: prefersReducedMotion ? 'none' : 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '3.5rem', lg: '4rem' },
              fontWeight: 800,
              lineHeight: 1.1,
              mb: spacing[2],
              color: 'white',
              letterSpacing: '-0.02em',
            }}
          >
            Popular Destinations
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: colors.neutral[400],
              fontSize: { xs: '1rem', md: '1.25rem' },
              fontWeight: 400,
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.6,
            }}
          >
            Discover breathtaking locations around the world
          </Typography>
        </Box>
        
        {/* Bento Grid Layout */}
        <Box
          role="list"
          aria-label="Available destinations"
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)',
              lg: 'repeat(4, 1fr)',
            },
            gap: getGridGap('medium'),
            mb: getSectionSpacing('medium'),
          }}
        >
          {destinationsData.map((destination, index) => (
            <Box
              key={destination.id}
              ref={setCardRef(index)}
              role="listitem"
              sx={{
                ...getBentoGridStyle(index),
                opacity: visibleCards.has(index) ? 1 : 0,
                transform: visibleCards.has(index) 
                  ? 'translateY(0)' 
                  : 'translateY(30px)',
                transition: prefersReducedMotion 
                  ? 'none' 
                  : 'opacity 0.6s ease, transform 0.6s ease',
              }}
            >
              <PremiumDestinationCard
                destination={destination}
                onClick={() => setSelectedDestination(destination)}
                isPopular={popularIds.includes(destination.id)}
              />
            </Box>
          ))}
        </Box>
      </Container>
      
      {selectedDestination && (
        <DestinationDetails
          destination={selectedDestination}
          onClose={() => setSelectedDestination(null)}
        />
      )}
    </Box>
  );
}

export default DestinationsPage;
