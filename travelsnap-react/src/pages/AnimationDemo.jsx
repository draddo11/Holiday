import { Box, Container, Typography, Grid } from '@mui/material';
import { WbSunny, Hotel, Flight } from '@mui/icons-material';
import Button from '../components/Button';
import PremiumDestinationCard from '../components/PremiumDestinationCard';
import ModernStatsCard from '../components/ModernStatsCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { colors, borderRadius, spacing } from '../theme/tokens';

/**
 * Animation Demo Page
 * Demonstrates all micro-animations implemented in Task 14
 */
function AnimationDemo() {
  const sampleDestination = {
    name: 'Paris',
    tagline: 'The City of Light',
    imageUrl: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
    placesToVisit: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame'],
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: colors.gradients.hero,
        pt: 12,
        pb: 8,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h2"
          sx={{
            mb: 2,
            fontWeight: 800,
            color: 'white',
            textAlign: 'center',
          }}
        >
          Micro-Animations Demo
        </Typography>
        
        <Typography
          variant="h6"
          sx={{
            mb: 6,
            color: colors.neutral[400],
            textAlign: 'center',
          }}
        >
          Hover and click to see animations in action
        </Typography>

        {/* Button Animations */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" sx={{ mb: 3, color: 'white', fontWeight: 700 }}>
            1. Button Ripple Effects
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Button variant="primary" fullWidth>
                Primary Button (Click for Ripple)
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button variant="secondary" fullWidth>
                Secondary Button
              </Button>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button variant="ghost" fullWidth>
                Ghost Button
              </Button>
            </Grid>
          </Grid>
        </Box>

        {/* Card Scale Animations */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" sx={{ mb: 3, color: 'white', fontWeight: 700 }}>
            2. Card Scale Animations
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <PremiumDestinationCard
                destination={sampleDestination}
                isPopular={true}
                onClick={() => {}}
              />
            </Grid>
          </Grid>
        </Box>

        {/* Stats Card Animations */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" sx={{ mb: 3, color: 'white', fontWeight: 700 }}>
            3. Stats Card Hover Animations
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <ModernStatsCard
                icon={<WbSunny />}
                label="Weather"
                value="23°C"
                description="Clear and pleasant"
                additionalInfo={[
                  { label: 'Humidity', value: '46%' },
                  { label: 'Wind', value: '18 km/h' },
                ]}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ModernStatsCard
                icon={<Hotel />}
                label="Hotels"
                value="$120"
                description="Average per night"
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <ModernStatsCard
                icon={<Flight />}
                label="Flights"
                value="$450"
                description="Round trip"
              />
            </Grid>
          </Grid>
        </Box>

        {/* Loading Animations */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" sx={{ mb: 3, color: 'white', fontWeight: 700 }}>
            4. Loading Animations
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  p: 4,
                  borderRadius: borderRadius.xl,
                  background: 'rgba(255, 255, 255, 0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Typography variant="body1" sx={{ color: 'white' }}>
                  Small Spinner
                </Typography>
                <LoadingSpinner size="small" />
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  p: 4,
                  borderRadius: borderRadius.xl,
                  background: 'rgba(255, 255, 255, 0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Typography variant="body1" sx={{ color: 'white' }}>
                  Medium Spinner
                </Typography>
                <LoadingSpinner size="medium" />
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box
                sx={{
                  p: 4,
                  borderRadius: borderRadius.xl,
                  background: 'rgba(255, 255, 255, 0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 2,
                }}
              >
                <Typography variant="body1" sx={{ color: 'white' }}>
                  Large Spinner
                </Typography>
                <LoadingSpinner size="large" />
              </Box>
            </Grid>
          </Grid>
        </Box>

        {/* Color Transitions */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" sx={{ mb: 3, color: 'white', fontWeight: 700 }}>
            5. Smooth Color Transitions
          </Typography>
          <Typography variant="body1" sx={{ color: colors.neutral[400], mb: 2 }}>
            All interactive elements have smooth color transitions on hover.
            Try hovering over buttons, cards, and links throughout the app.
          </Typography>
        </Box>

        {/* Page Transitions */}
        <Box>
          <Typography variant="h4" sx={{ mb: 3, color: 'white', fontWeight: 700 }}>
            6. Page Transitions
          </Typography>
          <Typography variant="body1" sx={{ color: colors.neutral[400], mb: 2 }}>
            Navigate between pages to see smooth fade and slide transitions.
            All route changes include a 400ms fade animation.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default AnimationDemo;
