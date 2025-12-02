import { useState } from 'react';
import { Box, Container, Typography, TextField, Button, Paper, Grid, Card, CardContent, Chip, Alert, Divider, InputAdornment } from '@mui/material';
import { Search, Flight, Event, Place, MyLocation, WbSunny, Hotel } from '@mui/icons-material';
import { getFlightPrices, getLiveEvents, getWeather, getHotelPrices } from '../services/api';
import { colors, shadows, borderRadius, transitions, spacing } from '../theme/tokens';
import { getSectionSpacing, getCardPadding } from '../theme/spacingUtils';
import ModernStatsCard from '../components/ModernStatsCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { useFadeIn, useStaggeredAnimation, usePrefersReducedMotion } from '../hooks/useScrollAnimation';

function CustomDestinationPage() {
  const [destination, setDestination] = useState('');
  const [origin, setOrigin] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);
  const [detectingLocation, setDetectingLocation] = useState(false);

  // Animation hooks
  const { ref: headerRef, isVisible: headerVisible } = useFadeIn({ threshold: 0.2 });
  const { ref: searchFormRef, isVisible: searchFormVisible } = useFadeIn({ threshold: 0.2 });
  const { setRef: setStatsRef, visibleIndices: visibleStats } = useStaggeredAnimation(4, {
    threshold: 0.2,
    staggerDelay: 100,
  });
  const { ref: eventsRef, isVisible: eventsVisible } = useFadeIn({ threshold: 0.1 });
  const prefersReducedMotion = usePrefersReducedMotion();

  const detectCurrentLocation = () => {
    setDetectingLocation(true);
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            // Use reverse geocoding to get city name
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`
            );
            const data = await response.json();
            const city = data.address.city || data.address.town || data.address.village || 'Your Location';
            setOrigin(city);
          } catch (err) {
            setOrigin('Current Location');
          } finally {
            setDetectingLocation(false);
          }
        },
        (error) => {
          setError('Unable to detect location. Please enter manually.');
          setDetectingLocation(false);
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
      setDetectingLocation(false);
    }
  };

  const handleSearch = async () => {
    if (!destination.trim()) {
      setError('Please enter a destination');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      // Fetch flight prices, events, weather, and hotels in parallel
      const [flightData, eventsData, weatherData, hotelData] = await Promise.all([
        getFlightPrices(destination, origin || 'New York'),
        getLiveEvents(destination),
        getWeather(destination),
        getHotelPrices(destination)
      ]);

      setResults({
        destination,
        origin: origin || 'New York',
        flights: flightData,
        events: eventsData.events || [],
        weather: weatherData,
        hotels: hotelData
      });
    } catch (err) {
      // Error already logged by API service
      setError(`Failed to fetch data: ${err.message || 'Please try again.'}`);
    } finally {
      setLoading(false);
    }
  };

  const getEventIcon = (type) => {
    const icons = {
      concert: '🎵',
      theater: '🎭',
      sports: '⚽',
      festival: '🎪',
      show: '🎬'
    };
    return icons[type?.toLowerCase()] || '🎉';
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: colors.gradients.hero,
        pt: getSectionSpacing('large'),
        pb: getSectionSpacing('medium'),
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
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          ref={headerRef}
          sx={{
            textAlign: 'center',
            mb: { xs: spacing[5], sm: spacing[6], md: spacing[6] },
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(-20px)',
            transition: prefersReducedMotion ? 'none' : 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              mb: spacing[2],
              fontWeight: 800,
              color: 'white',
            }}
          >
            Search Any Destination
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              mb: spacing[4],
              color: '#A8A29E',
              fontWeight: 400,
              maxWidth: '700px',
              mx: 'auto',
            }}
          >
            Get real-time travel data for any location worldwide
          </Typography>
        </Box>

        {/* Modern Search Form with Glassmorphism */}
        <Box
          ref={searchFormRef}
          sx={{
            ...getCardPadding('medium'),
            borderRadius: borderRadius.xl,
            mb: spacing[4],
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: shadows.lg,
            opacity: searchFormVisible ? 1 : 0,
            transform: searchFormVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: prefersReducedMotion 
              ? 'border-color 0.25s ease' 
              : `all ${transitions.duration.base} ${transitions.timing.ease}, opacity 0.6s ease, transform 0.6s ease`,
            '&:hover': {
              borderColor: 'rgba(255, 255, 255, 0.15)',
            }
          }}
        >
          <Grid container spacing={{ xs: 2, sm: 3, md: 3 }}>
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                placeholder="Where do you want to go?"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Place sx={{ color: colors.primary[400], fontSize: '1.5rem' }} />
                    </InputAdornment>
                  ),
                  sx: {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: borderRadius.lg,
                    fontSize: '1rem',
                    transition: `all ${transitions.duration.base} ${transitions.timing.ease}`,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      transition: `border-color ${transitions.duration.base} ${transitions.timing.ease}`,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(59, 130, 246, 0.3)',
                    },
                    '&.Mui-focused': {
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      transform: 'translateY(-2px)',
                      boxShadow: `0 0 0 3px rgba(59, 130, 246, 0.1)`,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: colors.primary[400],
                      borderWidth: '2px',
                    },
                    '& input': {
                      color: 'white',
                      py: 2,
                      fontSize: '1rem',
                    },
                    '& input::placeholder': {
                      color: colors.neutral[400], // WCAG AA compliant
                      opacity: 1,
                    }
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                placeholder="From where? (Optional)"
                value={origin}
                onChange={(e) => setOrigin(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Flight sx={{ color: colors.primary[400], fontSize: '1.5rem' }} />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button
                        size="small"
                        startIcon={<MyLocation />}
                        onClick={detectCurrentLocation}
                        disabled={detectingLocation}
                        sx={{
                          minWidth: 'auto',
                          color: colors.primary[400],
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          textTransform: 'none',
                          px: 2,
                          py: 0.5,
                          borderRadius: borderRadius.base,
                          transition: `all ${transitions.duration.fast} ${transitions.timing.ease}`,
                          '&:hover': {
                            backgroundColor: 'rgba(59, 130, 246, 0.1)',
                            color: colors.primary[300],
                          },
                          '&:disabled': {
                            color: colors.neutral[600],
                          }
                        }}
                      >
                        {detectingLocation ? 'Detecting...' : 'Detect'}
                      </Button>
                    </InputAdornment>
                  ),
                  sx: {
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: borderRadius.lg,
                    fontSize: '1rem',
                    transition: `all ${transitions.duration.base} ${transitions.timing.ease}`,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(255, 255, 255, 0.1)',
                      transition: `border-color ${transitions.duration.base} ${transitions.timing.ease}`,
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'rgba(59, 130, 246, 0.3)',
                    },
                    '&.Mui-focused': {
                      backgroundColor: 'rgba(255, 255, 255, 0.08)',
                      transform: 'translateY(-2px)',
                      boxShadow: `0 0 0 3px rgba(59, 130, 246, 0.1)`,
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: colors.primary[400],
                      borderWidth: '2px',
                    },
                    '& input': {
                      color: 'white',
                      py: 2,
                      fontSize: '1rem',
                    },
                    '& input::placeholder': {
                      color: colors.neutral[400], // WCAG AA compliant
                      opacity: 1,
                    }
                  }
                }}
              />
            </Grid>
            
            <Grid item xs={12} md={2}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                startIcon={<Search />}
                onClick={handleSearch}
                disabled={loading}
                sx={{
                  height: '56px',
                  fontSize: '1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: borderRadius.lg,
                  background: colors.primary[500],
                  color: 'white',
                  boxShadow: shadows.glow,
                  transition: `all ${transitions.duration.base} ${transitions.timing.ease}`,
                  '&:hover': {
                    background: colors.primary[600],
                    boxShadow: shadows.glowHover,
                    transform: 'translateY(-2px)',
                  },
                  '&:active': {
                    transform: 'translateY(0)',
                  },
                  '&:disabled': {
                    background: colors.neutral[700],
                    color: colors.neutral[500],
                  }
                }}
              >
                {loading ? 'Searching...' : 'Search'}
              </Button>
            </Grid>
          </Grid>

          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mt: spacing[3],
                borderRadius: borderRadius.md,
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                color: '#FCA5A5',
                '& .MuiAlert-icon': {
                  color: '#EF4444',
                }
              }}
            >
              {error}
            </Alert>
          )}
        </Box>

        {/* Loading State */}
        {loading && (
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              py: getSectionSpacing('medium'),
              '@keyframes fadeIn': {
                from: { opacity: 0, transform: 'scale(0.9)' },
                to: { opacity: 1, transform: 'scale(1)' },
              },
              animation: 'fadeIn 0.3s ease-out',
            }}
          >
            <LoadingSpinner size="large" />
          </Box>
        )}

        {/* Results */}
        {results && !loading && (
          <Box>
            {/* Header */}
            <Paper
              elevation={0}
              sx={{
                p: spacing[3],
                borderRadius: 3,
                mb: spacing[3],
                backgroundColor: colors.primary[600],
                color: 'white',
              }}
            >
              <Typography variant="h4" sx={{ fontWeight: 700, mb: spacing[1] }}>
                {results.destination}
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Travel information from {results.origin}
              </Typography>
            </Paper>

            <Grid container spacing={{ xs: 2, sm: 3, md: 3 }}>
              {/* Weather */}
              <Grid 
                item 
                xs={12} 
                md={3}
                ref={setStatsRef(0)}
              >
                {results.weather ? (
                  <ModernStatsCard
                    icon={<WbSunny />}
                    label="Weather"
                    value={results.weather.temperature}
                    description={results.weather.condition}
                    additionalInfo={[
                      { label: 'Humidity', value: results.weather.humidity },
                      { label: 'Wind', value: results.weather.wind }
                    ]}
                    gradientFrom={colors.primary[500]}
                    gradientTo={colors.primary[700]}
                  />
                ) : (
                  <ModernStatsCard
                    icon={<WbSunny />}
                    label="Weather"
                    value="N/A"
                    description="Weather data unavailable"
                    gradientFrom={colors.primary[500]}
                    gradientTo={colors.primary[700]}
                  />
                )}
              </Grid>

              {/* Hotel Prices */}
              <Grid 
                item 
                xs={12} 
                md={3}
                ref={setStatsRef(1)}
              >
                {results.hotels ? (
                  <ModernStatsCard
                    icon={<Hotel />}
                    label="Hotels"
                    value={`$${results.hotels.budget}`}
                    description={`Per night in ${results.destination}`}
                    additionalInfo={[
                      { label: 'Standard', value: `$${results.hotels.standard}` },
                      { label: 'Luxury', value: `$${results.hotels.luxury}` }
                    ]}
                    gradientFrom={colors.secondary[500]}
                    gradientTo={colors.secondary[700]}
                  />
                ) : (
                  <ModernStatsCard
                    icon={<Hotel />}
                    label="Hotels"
                    value="N/A"
                    description="Hotel prices unavailable"
                    gradientFrom={colors.secondary[500]}
                    gradientTo={colors.secondary[700]}
                  />
                )}
              </Grid>

              {/* Flight Prices */}
              <Grid 
                item 
                xs={12} 
                md={3}
                ref={setStatsRef(2)}
              >
                {results.flights ? (
                  <ModernStatsCard
                    icon={<Flight />}
                    label="Flight Prices"
                    value={`$${results.flights.economy}`}
                    description={`From ${results.flights.origin}`}
                    additionalInfo={[
                      { label: 'Premium', value: `$${results.flights.premium}` },
                      { label: 'Business', value: `$${results.flights.business}` }
                    ]}
                    gradientFrom="#3B82F6"
                    gradientTo="#2563EB"
                  />
                ) : (
                  <ModernStatsCard
                    icon={<Flight />}
                    label="Flight Prices"
                    value="N/A"
                    description="Flight prices unavailable"
                    gradientFrom="#3B82F6"
                    gradientTo="#2563EB"
                  />
                )}
              </Grid>

              {/* Popular Spots Summary */}
              <Grid 
                item 
                xs={12} 
                md={3}
                ref={setStatsRef(3)}
              >
                <ModernStatsCard
                  icon={<Event />}
                  label="Quick Info"
                  value={`${results.events.length}+`}
                  description="Current events and shows"
                  additionalInfo={
                    [...new Set(results.events.map(e => e.type))].slice(0, 2).map(type => ({
                      label: type,
                      value: results.events.filter(e => e.type === type).length.toString()
                    }))
                  }
                  gradientFrom={colors.secondary[600]}
                  gradientTo={colors.secondary[800]}
                />
              </Grid>

              {/* Events List */}
              <Grid 
                item 
                xs={12}
                ref={eventsRef}
              >
                <Paper
                  elevation={0}
                  sx={{
                    ...getCardPadding('medium'),
                    borderRadius: 3,
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: spacing[3] }}>
                    <Event sx={{ fontSize: 32, color: 'secondary.main', mr: spacing[2] }} />
                    <Typography variant="h5" sx={{ fontWeight: 600 }}>
                      Live Events & Attractions
                    </Typography>
                  </Box>

                  {results.events.length > 0 ? (
                    <Grid container spacing={{ xs: 2, sm: 2, md: 2 }}>
                      {results.events.map((event, index) => (
                        <Grid item xs={12} md={6} key={index}>
                          <Card
                            elevation={0}
                            sx={{
                              backgroundColor: 'rgba(255, 149, 0, 0.05)',
                              borderRadius: 2,
                              border: '1px solid rgba(255, 149, 0, 0.1)',
                            }}
                          >
                            <CardContent>
                              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: spacing[2] }}>
                                <Typography sx={{ fontSize: '2rem' }}>
                                  {getEventIcon(event.type)}
                                </Typography>
                                <Box sx={{ flex: 1 }}>
                                  <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: spacing[1] }}>
                                    {event.name}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary" sx={{ mb: spacing[1] }}>
                                    📍 {event.venue} • 📅 {event.date}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary">
                                    {event.description}
                                  </Typography>
                                  <Chip
                                    label={event.type}
                                    size="small"
                                    color="secondary"
                                    variant="outlined"
                                    sx={{ mt: spacing[1] }}
                                  />
                                </Box>
                              </Box>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  ) : (
                    <Typography color="text.secondary">No events available for this destination</Typography>
                  )}
                </Paper>
              </Grid>
            </Grid>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default CustomDestinationPage;
