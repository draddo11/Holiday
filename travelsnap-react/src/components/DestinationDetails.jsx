import { useState, useEffect } from 'react';
import { Dialog, DialogContent, IconButton, Typography, Box, List, ListItem, ListItemText, Chip, CircularProgress, Grid, Card, CardContent, Divider } from '@mui/material';
import { Close, Flight, Event, TheaterComedy, Stadium, MusicNote } from '@mui/icons-material';
import { getFlightPrices, getLiveEvents } from '../services/api';

function DestinationDetails({ destination, onClose }) {
  const [flightPrices, setFlightPrices] = useState(null);
  const [liveEvents, setLiveEvents] = useState(null);
  const [loadingFlights, setLoadingFlights] = useState(true);
  const [loadingEvents, setLoadingEvents] = useState(true);

  useEffect(() => {
    // Fetch live flight prices
    const fetchFlightPrices = async () => {
      try {
        const data = await getFlightPrices(destination.name);
        setFlightPrices(data);
      } catch (error) {
        // Error already logged by API service
      } finally {
        setLoadingFlights(false);
      }
    };

    // Fetch live events
    const fetchLiveEvents = async () => {
      try {
        const data = await getLiveEvents(destination.name);
        setLiveEvents(data);
      } catch (error) {
        // Error already logged by API service
      } finally {
        setLoadingEvents(false);
      }
    };

    fetchFlightPrices();
    fetchLiveEvents();
  }, [destination.name]);

  const getEventIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'concert':
        return <MusicNote />;
      case 'theater':
        return <TheaterComedy />;
      case 'sports':
        return <Stadium />;
      default:
        return <Event />;
    }
  };

  return (
    <Dialog
      open={true}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          maxHeight: '90vh',
        },
      }}
    >
      <IconButton
        onClick={onClose}
        sx={{
          position: 'absolute',
          right: 16,
          top: 16,
          zIndex: 1,
          backgroundColor: 'rgba(255,255,255,0.9)',
          backdropFilter: 'blur(10px)',
          '&:hover': {
            backgroundColor: 'rgba(255,255,255,1)',
          },
        }}
      >
        <Close />
      </IconButton>
      
      <Box
        component="img"
        src={destination.imageUrl}
        alt={destination.name}
        sx={{
          width: '100%',
          height: 300,
          objectFit: 'cover',
        }}
      />
      
      <DialogContent sx={{ p: 4 }}>
        <Typography variant="h4" sx={{ mb: 3, fontWeight: 700 }}>
          {destination.name}
        </Typography>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
            Quick Facts
          </Typography>
          <List dense>
            {destination.quickFacts.map((fact, index) => (
              <ListItem key={index} sx={{ px: 0 }}>
                <ListItemText primary={fact} />
              </ListItem>
            ))}
          </List>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
            Places to Visit
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {destination.placesToVisit.map((place, index) => (
              <Chip key={index} label={place} variant="outlined" />
            ))}
          </Box>
        </Box>

        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 600 }}>
            Shows & Activities
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {destination.showsActivities.map((activity, index) => (
              <Chip key={index} label={activity} color="secondary" variant="outlined" />
            ))}
          </Box>
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Live Flight Prices */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Flight /> Live Flight Prices
          </Typography>
          {loadingFlights ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
              <CircularProgress size={30} />
            </Box>
          ) : flightPrices ? (
            <Card elevation={0} sx={{ backgroundColor: 'rgba(0, 122, 255, 0.05)', borderRadius: 2 }}>
              <CardContent>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  From {flightPrices.origin} to {flightPrices.destination}
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="caption" color="text.secondary">Economy</Typography>
                      <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
                        ${flightPrices.economy}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="caption" color="text.secondary">Premium</Typography>
                      <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
                        ${flightPrices.premium}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography variant="caption" color="text.secondary">Business</Typography>
                      <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>
                        ${flightPrices.business}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
                <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2, textAlign: 'center' }}>
                  Updated: {flightPrices.lastUpdated}
                </Typography>
              </CardContent>
            </Card>
          ) : (
            <Typography variant="body2" color="text.secondary">
              Flight prices unavailable
            </Typography>
          )}
        </Box>

        {/* Live Events & Concerts */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, color: 'secondary.main', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Event /> Live Events & Concerts
          </Typography>
          {loadingEvents ? (
            <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
              <CircularProgress size={30} />
            </Box>
          ) : liveEvents && liveEvents.events ? (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {liveEvents.events.map((event, index) => (
                <Card key={index} elevation={0} sx={{ backgroundColor: 'rgba(255, 149, 0, 0.05)', borderRadius: 2 }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                      <Box sx={{ color: 'secondary.main', mt: 0.5 }}>
                        {getEventIcon(event.type)}
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 0.5 }}>
                          {event.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
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
                          sx={{ mt: 1 }}
                        />
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              ))}
            </Box>
          ) : (
            <Typography variant="body2" color="text.secondary">
              No events available
            </Typography>
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default DestinationDetails;
