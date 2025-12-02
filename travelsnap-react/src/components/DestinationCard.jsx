import { Card, CardMedia, CardContent, Typography, Box } from '@mui/material';
import { transitions } from '../theme/tokens';

function DestinationCard({ destination, onClick }) {
  return (
    <Card
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${destination.name}. ${destination.tagline}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      sx={{
        cursor: 'pointer',
        transition: `all ${transitions.duration.slow} ${transitions.timing.spring}`,
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-12px) scale(1.02)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
          '& .card-media': {
            transform: 'scale(1.1)',
          },
        },
        '&:active': {
          transform: 'translateY(-8px) scale(1.01)',
        },
      }}
    >
      <CardMedia
        component="img"
        height="220"
        image={destination.imageUrl}
        alt={`Scenic view of ${destination.name}`}
        className="card-media"
        sx={{
          objectFit: 'cover',
          transition: `transform ${transitions.duration.slower} ${transitions.timing.ease}`,
        }}
      />
      <CardContent>
        <Typography
          variant="h6"
          sx={{
            fontWeight: 600,
            mb: 0.5,
            color: 'text.primary',
            transition: `color ${transitions.duration.base} ${transitions.timing.ease}`,
          }}
        >
          {destination.name}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            transition: `color ${transitions.duration.base} ${transitions.timing.ease}`,
          }}
        >
          {destination.tagline}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default DestinationCard;
