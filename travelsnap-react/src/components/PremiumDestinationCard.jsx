import { Card, CardContent, Typography, Box, Chip, Button } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';
import { colors, shadows, borderRadius, transitions, spacing } from '../theme/tokens';
import { usePrefersReducedMotion } from '../hooks/useScrollAnimation';
import LazyImage from './LazyImage';

function PremiumDestinationCard({ destination, onClick, isPopular = false }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  
  // Extract features from destination data
  const features = destination.placesToVisit?.slice(0, 3) || [];

  return (
    <Card
      elevation={0}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Explore ${destination.name}. ${destination.tagline}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      sx={{
        borderRadius: borderRadius.xl,
        overflow: 'hidden',
        background: colors.gradients.glass,
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        transition: prefersReducedMotion ? 'none' : `all ${transitions.duration.slow} ${transitions.timing.spring}`,
        cursor: 'pointer',
        '&:hover': {
          transform: prefersReducedMotion ? 'none' : 'translateY(-12px) scale(1.02)',
          boxShadow: shadows['2xl'],
          borderColor: colors.primary[400],
          '& .card-image': {
            transform: prefersReducedMotion ? 'none' : 'scale(1.1)',
          },
          '& .card-overlay': {
            opacity: 0.8,
          },
          '& .card-button': {
            borderColor: colors.primary[400],
            backgroundColor: 'rgba(99, 102, 241, 0.15)',
          }
        },
        '&:active': {
          transform: prefersReducedMotion ? 'none' : 'translateY(-8px) scale(1.01)',
        }
      }}
    >
      {/* Image Container with Lazy Loading */}
      <Box sx={{ 
        position: 'relative',
        overflow: 'hidden',
      }}>
        <LazyImage
          src={destination.imageUrl}
          alt={`Beautiful view of ${destination.name}`}
          aspectRatio={0.6667}
          className="card-image"
          sx={{
            transition: prefersReducedMotion ? 'none' : `transform ${transitions.duration.slower} ease`,
            '& img': {
              transition: prefersReducedMotion ? 'none' : `transform ${transitions.duration.slower} ease`,
            }
          }}
        />
        
        {/* Gradient Overlay */}
        <Box
          className="card-overlay"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)',
            opacity: 0.6,
            transition: prefersReducedMotion ? 'none' : `opacity ${transitions.duration.slow} ease`,
            pointerEvents: 'none',
          }}
        />

        {/* Popular Badge */}
        {isPopular && (
          <Chip
            label="Popular"
            size="small"
            aria-label="Popular destination"
            sx={{
              position: 'absolute',
              top: 16,
              right: 16,
              backgroundColor: colors.primary[600],
              backdropFilter: 'blur(10px)',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.75rem',
              zIndex: 1,
            }}
          />
        )}
      </Box>

      {/* Content */}
      <CardContent sx={{ p: spacing[4] }}>
        <Typography variant="h5" sx={{ 
          fontWeight: 700, 
          mb: spacing[1],
          color: 'white',
        }}>
          {destination.name}
        </Typography>
        
        <Typography variant="body2" sx={{ 
          color: colors.neutral[400],
          mb: spacing[3],
          lineHeight: 1.6,
        }}>
          {destination.tagline}
        </Typography>

        {/* Feature Chips */}
        <Box sx={{ display: 'flex', gap: spacing[1], flexWrap: 'wrap', mb: spacing[3] }}>
          {features.map((feature, index) => (
            <Chip
              key={index}
              label={feature}
              size="small"
              sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: colors.neutral[300],
                fontSize: '0.75rem',
                fontWeight: 500,
              }}
            />
          ))}
        </Box>

        {/* Action Button */}
        <Button
          fullWidth
          variant="outlined"
          className="card-button"
          aria-label={`Explore ${destination.name} destination`}
          sx={{
            borderColor: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            py: spacing[2],
            borderRadius: borderRadius.md,
            fontWeight: 600,
            textTransform: 'none',
            transition: prefersReducedMotion ? 'none' : `all ${transitions.duration.base} ${transitions.timing.ease}`,
            '&:hover': {
              borderColor: colors.primary[400],
              backgroundColor: 'rgba(99, 102, 241, 0.15)',
              transform: prefersReducedMotion ? 'none' : 'translateY(-2px)',
            },
            '&:active': {
              transform: prefersReducedMotion ? 'none' : 'translateY(0)',
            }
          }}
        >
          Explore Destination
          <ArrowForward sx={{ 
            ml: spacing[1], 
            fontSize: '1rem',
            transition: prefersReducedMotion ? 'none' : `transform ${transitions.duration.base} ${transitions.timing.ease}`,
          }} />
        </Button>
      </CardContent>
    </Card>
  );
}

export default PremiumDestinationCard;
