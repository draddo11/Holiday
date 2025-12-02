import { Box } from '@mui/material';

/**
 * Landmark Icon Component
 * Uses large animated emojis to represent famous landmarks
 */

const IsometricLandmark = ({ destination, theme }) => {
  const getLandmarkEmoji = (dest) => {
    const d = dest.toLowerCase();
    
    // Famous landmarks
    if (d.includes('paris')) return '🗼';
    if (d.includes('tokyo')) return '🗼';
    if (d.includes('london')) return '🏰';
    if (d.includes('new york')) return '🗽';
    if (d.includes('rome')) return '🏛️';
    if (d.includes('dubai')) return '🏙️';
    if (d.includes('sydney')) return '🎭';
    if (d.includes('egypt')) return '🐫';
    if (d.includes('china')) return '🏯';
    if (d.includes('india')) return '🕌';
    if (d.includes('greece')) return '🏛️';
    if (d.includes('beach') || d.includes('bali') || d.includes('maldives') || d.includes('hawaii')) return '🏖️';
    if (d.includes('mountain') || d.includes('alps') || d.includes('himalaya')) return '⛰️';
    
    return '✈️';
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        bottom: 120,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 100,
        pointerEvents: 'none',
        fontSize: '120px',
        filter: 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))',
        animation: 'float 3s ease-in-out infinite',
        '@keyframes float': {
          '0%, 100%': { transform: 'translateX(-50%) translateY(0px)' },
          '50%': { transform: 'translateX(-50%) translateY(-10px)' },
        },
      }}
    >
      {getLandmarkEmoji(destination)}
    </Box>
  );
};

export default IsometricLandmark;
