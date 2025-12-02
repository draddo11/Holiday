import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * PageTransition component
 * Provides smooth fade and slide transitions between pages
 * Uses CSS transforms for optimal performance
 */
function PageTransition({ children }) {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeIn');

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('fadeOut');
    }
  }, [location, displayLocation]);

  return (
    <Box
      sx={{
        '@keyframes fadeIn': {
          from: {
            opacity: 0,
            transform: 'translateY(20px)',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0)',
          },
        },
        '@keyframes fadeOut': {
          from: {
            opacity: 1,
            transform: 'translateY(0)',
          },
          to: {
            opacity: 0,
            transform: 'translateY(-20px)',
          },
        },
        animation: transitionStage === 'fadeIn' 
          ? 'fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards'
          : 'fadeOut 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      }}
      onAnimationEnd={() => {
        if (transitionStage === 'fadeOut') {
          setDisplayLocation(location);
          setTransitionStage('fadeIn');
        }
      }}
    >
      {children}
    </Box>
  );
}

export default PageTransition;
