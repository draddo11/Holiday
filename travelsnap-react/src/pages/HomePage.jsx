import { Link } from 'react-router-dom';
import { Box, Container, Typography, Button, Chip } from '@mui/material';
import { ArrowForward, AutoAwesome } from '@mui/icons-material';
import { colors, shadows, spacing } from '../theme/tokens';
import { getSectionSpacing, getResponsiveGap } from '../theme/spacingUtils';
import { useFadeIn, useStaggeredAnimation, usePrefersReducedMotion } from '../hooks/useScrollAnimation';

function HomePage() {
  // Animation hooks
  const { ref: heroRef, isVisible: heroVisible } = useFadeIn({ threshold: 0.2 });
  const { setRef: setStatRef, visibleIndices: visibleStats } = useStaggeredAnimation(3, {
    threshold: 0.3,
    staggerDelay: 150,
  });
  const prefersReducedMotion = usePrefersReducedMotion();

  return (
    <Box 
      component="section"
      aria-label="Hero section"
      sx={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        background: colors.gradients.hero,
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
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box 
          ref={heroRef}
          sx={{ 
            textAlign: 'center', 
            py: getSectionSpacing('large'),
            opacity: heroVisible ? 1 : 0,
            transform: heroVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: prefersReducedMotion ? 'none' : 'opacity 0.8s ease, transform 0.8s ease',
          }}
        >
          {/* Eyebrow Chip */}
          <Chip 
            icon={<AutoAwesome sx={{ fontSize: '1rem !important' }} aria-hidden="true" />}
            label="AI-Powered Travel Photos"
            aria-label="Feature: AI-Powered Travel Photos"
            sx={{
              mb: { xs: spacing[3], sm: spacing[4], md: spacing[4] },
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              color: colors.primary[400],
              fontWeight: 600,
              fontSize: '0.875rem',
              px: spacing[2],
              py: spacing[3],
              '& .MuiChip-icon': {
                color: colors.primary[400],
              }
            }}
          />

          {/* Main Heading with Gradient */}
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '3rem', md: '5rem', lg: '6rem' },
              fontWeight: 800,
              lineHeight: 1.1,
              mb: { xs: spacing[2], sm: spacing[3], md: spacing[3] },
              color: 'white',
              letterSpacing: '-0.02em',
            }}
          >
            Your Journey,
            <br />
            Reimagined
          </Typography>

          {/* Subheading */}
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: '1.125rem', md: '1.5rem' },
              color: colors.neutral[400],
              mb: { xs: spacing[5], sm: spacing[6], md: spacing[6] },
              maxWidth: '700px',
              mx: 'auto',
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            Create stunning travel memories with AI. Transform your photos into
            professional travel postcards in seconds.
          </Typography>

          {/* CTA Buttons */}
          <Box 
            sx={{ 
              display: 'flex', 
              gap: getResponsiveGap(3), 
              justifyContent: 'center', 
              flexWrap: 'wrap', 
              mb: { xs: spacing[10], sm: spacing[12], md: spacing[12] }
            }}
            role="group"
            aria-label="Call to action buttons"
          >
            <Button
              component={Link}
              to="/ai-photo"
              variant="contained"
              size="large"
              endIcon={<ArrowForward aria-hidden="true" />}
              aria-label="Start creating AI-powered travel photos"
              sx={{
                backgroundColor: colors.primary[600],
                px: { xs: spacing[5], sm: spacing[6], md: spacing[6] },
                py: { xs: spacing[2], sm: spacing[2], md: spacing[2] },
                fontSize: '1.125rem',
                fontWeight: 600,
                borderRadius: '16px',
                textTransform: 'none',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: colors.primary[700],
                  transform: 'translateY(-4px)',
                }
              }}
            >
              Start Creating
            </Button>

            <Button
              component={Link}
              to="/destinations"
              variant="outlined"
              size="large"
              aria-label="Explore available destinations"
              sx={{
                px: { xs: spacing[5], sm: spacing[6], md: spacing[6] },
                py: { xs: spacing[2], sm: spacing[2], md: spacing[2] },
                fontSize: '1.125rem',
                fontWeight: 600,
                borderRadius: '16px',
                textTransform: 'none',
                borderColor: 'rgba(255, 255, 255, 0.2)',
                color: 'white',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: colors.primary[500],
                  backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  transform: 'translateY(-2px)',
                }
              }}
            >
              Explore Destinations
            </Button>
          </Box>

          {/* Stats Section */}
          <Box 
            component="section"
            aria-label="Platform statistics"
            sx={{ 
              display: 'flex', 
              gap: { xs: spacing[6], sm: spacing[8], md: spacing[8] }, 
              justifyContent: 'center', 
              flexWrap: 'wrap'
            }}
          >
            {[
              { value: '10K+', label: 'Photos Created' },
              { value: '50+', label: 'Destinations' },
              { value: '4.9', label: 'User Rating' },
            ].map((stat, index) => (
              <Box 
                key={index} 
                ref={setStatRef(index)}
                role="group"
                aria-label={`${stat.value} ${stat.label}`}
                sx={{ 
                  textAlign: 'center',
                  opacity: visibleStats.has(index) ? 1 : 0,
                  transform: visibleStats.has(index) ? 'translateY(0)' : 'translateY(30px)',
                  transition: prefersReducedMotion 
                    ? 'none' 
                    : 'opacity 0.6s ease, transform 0.6s ease',
                }}
              >
                <Typography 
                  variant="h3" 
                  aria-hidden="true"
                  sx={{ 
                    fontWeight: 800, 
                    color: 'white',
                    mb: spacing[1],
                    fontSize: { xs: '2rem', md: '3rem' }
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography 
                  variant="body2" 
                  aria-hidden="true"
                  sx={{ 
                    color: colors.neutral[400],
                    fontSize: '0.875rem'
                  }}
                >
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>

      {/* Decorative Gradient Overlay at Bottom */}
      <Box 
        aria-hidden="true"
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '200px',
          background: 'linear-gradient(180deg, transparent 0%, rgba(3, 7, 18, 1) 100%)',
        }} 
      />
    </Box>
  );
}

export default HomePage;
