import { forwardRef } from 'react';
import { Box, Typography, Chip, Stack } from '@mui/material';
import { Flight, AttachMoney, CalendarToday, TipsAndUpdates } from '@mui/icons-material';
import { colors, spacing, borderRadius } from '../theme/tokens';

const ShareableTripCard = forwardRef(({ itinerary }, ref) => {
  if (!itinerary) return null;

  const highlights = itinerary.dailyItinerary.slice(0, 3).map(day => day.title);

  return (
    <Box
      ref={ref}
      sx={{
        width: '600px',
        minHeight: '800px',
        background: `linear-gradient(135deg, ${colors.primary[900]} 0%, ${colors.primary[700]} 50%, ${colors.primary[500]} 100%)`,
        borderRadius: borderRadius.xl,
        overflow: 'hidden',
        position: 'relative',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
    >
      {/* Decorative Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          filter: 'blur(60px)',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -50,
          left: -50,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.08)',
          filter: 'blur(40px)',
        }}
      />

      {/* Content */}
      <Box sx={{ position: 'relative', zIndex: 1, p: 6 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Chip
            label="✨ AI-Generated Trip"
            sx={{
              mb: 2,
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              fontWeight: 600,
              fontSize: '0.875rem',
            }}
          />
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              color: 'white',
              mb: 1,
              fontSize: '3rem',
              textShadow: '0 2px 20px rgba(0,0,0,0.3)',
            }}
          >
            {itinerary.destination}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: 400,
            }}
          >
            Your Perfect {itinerary.duration}-Day Adventure
          </Typography>
        </Box>

        {/* Key Stats */}
        <Stack
          direction="row"
          spacing={2}
          sx={{
            mb: 4,
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 2,
          }}
        >
          <Box
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              borderRadius: borderRadius.lg,
              p: 2,
              minWidth: 120,
              textAlign: 'center',
            }}
          >
            <CalendarToday sx={{ color: 'white', mb: 0.5, fontSize: 28 }} />
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
              {itinerary.duration}
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Days
            </Typography>
          </Box>

          <Box
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              borderRadius: borderRadius.lg,
              p: 2,
              minWidth: 120,
              textAlign: 'center',
            }}
          >
            <AttachMoney sx={{ color: 'white', mb: 0.5, fontSize: 28 }} />
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
              ${itinerary.budgetSummary?.totalEstimated || itinerary.totalBudget}
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Total Budget
            </Typography>
          </Box>

          <Box
            sx={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              borderRadius: borderRadius.lg,
              p: 2,
              minWidth: 120,
              textAlign: 'center',
            }}
          >
            <Flight sx={{ color: 'white', mb: 0.5, fontSize: 28 }} />
            <Typography variant="h6" sx={{ color: 'white', fontWeight: 700 }}>
              {itinerary.dailyItinerary.reduce((sum, day) => sum + day.activities.length, 0)}
            </Typography>
            <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)' }}>
              Activities
            </Typography>
          </Box>
        </Stack>

        {/* Highlights */}
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: borderRadius.lg,
            p: 3,
            mb: 4,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: 'white',
              fontWeight: 700,
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              gap: 1,
            }}
          >
            <TipsAndUpdates sx={{ fontSize: 24 }} />
            Trip Highlights
          </Typography>
          <Stack spacing={1.5}>
            {highlights.map((highlight, idx) => (
              <Box
                key={idx}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: 'white',
                  }}
                />
                <Typography
                  variant="body1"
                  sx={{
                    color: 'white',
                    fontWeight: 500,
                  }}
                >
                  {highlight}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* Cost Breakdown */}
        <Box
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: borderRadius.lg,
            p: 3,
            mb: 4,
          }}
        >
          <Typography
            variant="subtitle2"
            sx={{
              color: 'rgba(255, 255, 255, 0.9)',
              fontWeight: 600,
              mb: 2,
            }}
          >
            Budget Breakdown
          </Typography>
          <Stack spacing={1}>
            {Object.entries(itinerary.costBreakdown).slice(0, 4).map(([key, value]) => (
              <Box
                key={key}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.8)', textTransform: 'capitalize' }}>
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </Typography>
                <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                  ${value}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* Footer */}
        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Typography
            variant="h5"
            sx={{
              color: 'white',
              fontWeight: 800,
              mb: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
            }}
          >
            <Box
              component="span"
              sx={{
                width: 36,
                height: 36,
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.2)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                mr: 1,
              }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="white"/>
              </svg>
            </Box>
            TravelSnap
          </Typography>
          <Typography
            variant="body2"
            sx={{
              color: 'rgba(255, 255, 255, 0.8)',
              fontWeight: 500,
            }}
          >
            AI-Powered Travel Planning
          </Typography>
        </Box>
      </Box>
    </Box>
  );
});

ShareableTripCard.displayName = 'ShareableTripCard';

export default ShareableTripCard;
