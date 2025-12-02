import { Card, Typography, Box } from '@mui/material';
import { colors, shadows, borderRadius, transitions, spacing } from '../theme/tokens';
import { usePrefersReducedMotion } from '../hooks/useScrollAnimation';

/**
 * ModernStatsCard - Premium data visualization card component
 * 
 * Features:
 * - Gradient background with glassmorphism effect
 * - Icon container with gradient and glow
 * - Large, bold numerical values
 * - Uppercase label styling
 * - Additional info section with divider
 * - Smooth hover animations
 * - Decorative gradient overlay
 * 
 * @example
 * // Basic usage
 * <ModernStatsCard
 *   icon={<WbSunny />}
 *   label="Weather"
 *   value="23°C"
 *   description="Clear and pleasant"
 * />
 * 
 * @example
 * // With additional info
 * <ModernStatsCard
 *   icon={<Hotel />}
 *   label="Hotels"
 *   value="$120"
 *   description="Average per night"
 *   additionalInfo={[
 *     { label: 'Available', value: '45' },
 *     { label: 'Rating', value: '4.5★' }
 *   ]}
 * />
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.icon - Icon component to display
 * @param {string} props.label - Label text (will be uppercased via CSS)
 * @param {string|number} props.value - Main numerical value to display
 * @param {string} props.description - Description text below value
 * @param {Array<{label: string, value: string}>} props.additionalInfo - Additional info items
 * @param {string} props.iconColor - Icon color (defaults to white)
 * @param {string} props.gradientFrom - Starting color for gradient (defaults to primary)
 * @param {string} props.gradientTo - Ending color for gradient (defaults to secondary)
 */
function ModernStatsCard({ 
  icon, 
  label, 
  value, 
  description, 
  additionalInfo = [],
  iconColor = 'white',
  gradientFrom = colors.primary[600],
  gradientTo = colors.primary[700],
}) {
  const prefersReducedMotion = usePrefersReducedMotion();
  return (
    <Card
      elevation={0}
      role="article"
      aria-label={`${label}: ${value}. ${description}`}
      tabIndex={0}
      sx={{
        p: spacing[4],
        borderRadius: borderRadius.xl,
        background: `linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(100, 116, 139, 0.1) 100%)`,
        backdropFilter: 'blur(20px)',
        border: `1px solid rgba(59, 130, 246, 0.2)`,
        position: 'relative',
        overflow: 'hidden',
        transition: prefersReducedMotion ? 'none' : `all ${transitions.duration.slow} ${transitions.timing.spring}`,
        cursor: 'pointer',
        '&:hover': {
          transform: prefersReducedMotion ? 'none' : 'translateY(-8px) scale(1.02)',
          borderColor: 'rgba(59, 130, 246, 0.5)',
          boxShadow: shadows.xl,
          '& .icon-container': {
            transform: prefersReducedMotion ? 'none' : 'scale(1.1) rotate(5deg)',
            boxShadow: shadows.glowHover,
          },
        },
        '&:active': {
          transform: prefersReducedMotion ? 'none' : 'translateY(-4px) scale(1.01)',
        },
        // Decorative gradient overlay
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          width: '150px',
          height: '150px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
          borderRadius: '50%',
          transform: 'translate(30%, -30%)',
          pointerEvents: 'none',
          transition: prefersReducedMotion ? 'none' : `opacity ${transitions.duration.base} ${transitions.timing.ease}`,
        },
        '&:hover::before': {
          opacity: 1.5,
        }
      }}
    >
      {/* Icon Container */}
      <Box 
        className="icon-container"
        role="img"
        aria-label={`${label} icon`}
        sx={{
          width: 56,
          height: 56,
          borderRadius: borderRadius.lg,
          background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: spacing[3],
          boxShadow: shadows.glow,
          position: 'relative',
          zIndex: 1,
          transition: prefersReducedMotion ? 'none' : `all ${transitions.duration.slow} ${transitions.timing.spring}`,
        }}
      >
        <Box sx={{ 
          fontSize: 28, 
          color: iconColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {icon}
        </Box>
      </Box>

      {/* Label */}
      <Typography 
        variant="caption" 
        sx={{
          color: colors.neutral[400],
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          fontWeight: 600,
          fontSize: '0.75rem',
          display: 'block',
          mb: spacing[1],
          position: 'relative',
          zIndex: 1,
        }}
      >
        {label}
      </Typography>

      {/* Value */}
      <Typography 
        variant="h2" 
        sx={{
          fontWeight: 800,
          color: 'white',
          mb: 0.5,
          fontSize: { xs: '2.5rem', md: '3rem' },
          lineHeight: 1,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {value}
      </Typography>

      {/* Description */}
      <Typography 
        variant="body2" 
        sx={{
          color: colors.neutral[400],
          mb: additionalInfo.length > 0 ? spacing[3] : 0,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {description}
      </Typography>

      {/* Additional Info Section */}
      {additionalInfo.length > 0 && (
        <Box sx={{ 
          display: 'flex', 
          gap: spacing[3],
          pt: spacing[3],
          borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          position: 'relative',
          zIndex: 1,
        }}>
          {additionalInfo.map((info, index) => (
            <Box key={index}>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: colors.neutral[500], 
                  display: 'block',
                  mb: spacing[1],
                }}
              >
                {info.label}
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: 'white', 
                  fontWeight: 600,
                }}
              >
                {info.value}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
    </Card>
  );
}

export default ModernStatsCard;
