import { Box, CircularProgress } from '@mui/material';
import { colors } from '../theme/tokens';

/**
 * LoadingSpinner component
 * Displays an animated loading spinner with optional overlay
 * Uses CSS transforms for smooth animation
 * 
 * @param {Object} props
 * @param {string} props.size - Size of spinner: 'small', 'medium', 'large'
 * @param {boolean} props.overlay - Whether to show full-screen overlay
 * @param {string} props.color - Color of the spinner
 */
function LoadingSpinner({ 
  size = 'medium', 
  overlay = false,
  color = colors.primary[500],
}) {
  const sizeMap = {
    small: 24,
    medium: 40,
    large: 60,
  };

  const spinner = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '@keyframes pulse': {
          '0%, 100%': {
            opacity: 1,
            transform: 'scale(1)',
          },
          '50%': {
            opacity: 0.8,
            transform: 'scale(1.05)',
          },
        },
        animation: 'pulse 2s ease-in-out infinite',
      }}
    >
      <CircularProgress
        size={sizeMap[size]}
        sx={{
          color: color,
          '@keyframes spin': {
            '0%': {
              transform: 'rotate(0deg)',
            },
            '100%': {
              transform: 'rotate(360deg)',
            },
          },
        }}
      />
    </Box>
  );

  if (overlay) {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(3, 7, 18, 0.8)',
          backdropFilter: 'blur(10px)',
          zIndex: 9999,
          '@keyframes fadeIn': {
            from: {
              opacity: 0,
            },
            to: {
              opacity: 1,
            },
          },
          animation: 'fadeIn 0.3s ease-out',
        }}
      >
        {spinner}
      </Box>
    );
  }

  return spinner;
}

export default LoadingSpinner;
