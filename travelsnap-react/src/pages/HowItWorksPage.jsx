import { Box, Container, Typography, Paper, Avatar } from '@mui/material';
import { Explore, CloudUpload, LocationOn, AutoAwesome } from '@mui/icons-material';
import { colors } from '../theme/tokens';
import { useFadeIn, useStaggeredAnimation, usePrefersReducedMotion } from '../hooks/useScrollAnimation';

function HowItWorksPage() {
  // Animation hooks
  const { ref: headerRef, isVisible: headerVisible } = useFadeIn({ threshold: 0.2 });
  const { setRef: setStepRef, visibleIndices: visibleSteps } = useStaggeredAnimation(4, {
    threshold: 0.2,
    staggerDelay: 150,
  });
  const prefersReducedMotion = usePrefersReducedMotion();
  const steps = [
    {
      number: 1,
      icon: <Explore sx={{ fontSize: 32 }} />,
      title: 'Explore Destinations',
      description: 'Browse through our curated list of amazing travel destinations from around the world',
    },
    {
      number: 2,
      icon: <CloudUpload sx={{ fontSize: 32 }} />,
      title: 'Upload Your Photo',
      description: 'Choose a photo of yourself that you\'d like to place in a famous landmark',
    },
    {
      number: 3,
      icon: <LocationOn sx={{ fontSize: 32 }} />,
      title: 'Select a Landmark',
      description: 'Pick from iconic landmarks like the Eiffel Tower, Times Square, or Santorini',
    },
    {
      number: 4,
      icon: <AutoAwesome sx={{ fontSize: 32 }} />,
      title: 'Generate Your Travel Photo',
      description: 'Our AI will create a personalized travel postcard with you at your chosen destination',
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: colors.gradients.hero,
        pt: 12,
        pb: 8,
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
          pointerEvents: 'none',
        }
      }}
    >
      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          ref={headerRef}
          variant="h2"
          sx={{
            mb: 6,
            textAlign: 'center',
            fontWeight: 800,
            color: 'white',
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(-20px)',
            transition: prefersReducedMotion ? 'none' : 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          How It Works
        </Typography>
        
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {steps.map((step, index) => (
            <Paper
              key={step.number}
              ref={setStepRef(index)}
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 3,
                background: 'rgba(19, 24, 41, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)',
                display: 'flex',
                gap: 3,
                alignItems: 'flex-start',
                opacity: visibleSteps.has(index) ? 1 : 0,
                transform: visibleSteps.has(index) ? 'translateY(0)' : 'translateY(30px)',
                transition: prefersReducedMotion 
                  ? 'border-color 0.3s ease, transform 0.3s ease' 
                  : 'all 0.3s ease, opacity 0.6s ease, transform 0.6s ease',
                '&:hover': {
                  transform: visibleSteps.has(index) ? 'translateY(-4px)' : 'translateY(30px)',
                  borderColor: colors.primary[500],
                },
              }}
            >
              <Avatar
                sx={{
                  width: 64,
                  height: 64,
                  backgroundColor: colors.primary[600],
                  fontSize: '1.5rem',
                  fontWeight: 700,
                }}
              >
                {step.number}
              </Avatar>
              
              <Box sx={{ flex: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <Box sx={{ color: colors.primary[400] }}>
                    {step.icon}
                  </Box>
                  <Typography variant="h5" sx={{ fontWeight: 600, color: 'white' }}>
                    {step.title}
                  </Typography>
                </Box>
                <Typography variant="body1" sx={{ color: '#A8A29E', lineHeight: 1.7 }}>
                  {step.description}
                </Typography>
              </Box>
            </Paper>
          ))}
        </Box>
      </Container>
    </Box>
  );
}

export default HowItWorksPage;
