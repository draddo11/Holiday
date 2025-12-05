import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Chip,
  Card,
  CardContent,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  CircularProgress,
  InputAdornment,
  Stack,
} from '@mui/material';
import {
  AutoAwesome,
  Flight,
  Hotel,
  AttachMoney,
  CalendarToday,
  ExpandMore,
  CheckCircle,
  Schedule,
  Restaurant,
  LocalActivity,
  TipsAndUpdates,
  Backpack,
  Download,
  Share,
  ContentCopy,
  CardGiftcard,
} from '@mui/icons-material';
import { generateAIItinerary } from '../services/api';
import { colors, spacing, borderRadius, shadows, transitions } from '../theme/tokens';
import LoadingSpinner from '../components/LoadingSpinner';
import SeasonalPostcardGenerator from '../components/SeasonalPostcardGenerator';

const interestOptions = [
  'Culture & History',
  'Food & Dining',
  'Adventure',
  'Nightlife',
  'Shopping',
  'Nature',
  'Art & Museums',
  'Photography',
  'Relaxation',
  'Local Experiences',
];

function AITripPlannerPage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    destination: '',
    origin: '',
    budget: 2000,
    days: 3,
    interests: [],
  });
  const [loading, setLoading] = useState(false);
  const [itinerary, setItinerary] = useState(null);
  const [error, setError] = useState(null);
  const [postcardOpen, setPostcardOpen] = useState(false);

  const handleInterestToggle = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleGenerate = async () => {
    if (!formData.destination) {
      setError('Please enter a destination');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const result = await generateAIItinerary(
        formData.destination,
        formData.origin || 'New York',
        formData.budget,
        formData.days,
        formData.interests
      );
      setItinerary(result);
      setStep(1);
    } catch (err) {
      setError(`Failed to generate itinerary: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadPDF = () => {
    // Simple text export for now
    const text = `
TRIP ITINERARY: ${itinerary.destination}
Duration: ${itinerary.duration} days
Budget: $${itinerary.totalBudget}

COST BREAKDOWN:
- Flights: $${itinerary.costBreakdown.flights}
- Accommodation: $${itinerary.costBreakdown.accommodation}
- Activities: $${itinerary.costBreakdown.activities}
- Food: $${itinerary.costBreakdown.food}
- Transportation: $${itinerary.costBreakdown.transportation}

DAILY ITINERARY:
${itinerary.dailyItinerary.map((day) => `
Day ${day.day}: ${day.title}
${day.activities.map((act) => `  ${act.time} - ${act.activity}: ${act.description}`).join('\n')}
Estimated Daily Cost: $${day.estimatedDailyCost}
`).join('\n')}

TRAVEL TIPS:
${itinerary.travelTips.map((tip) => `- ${tip}`).join('\n')}
    `.trim();

    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${itinerary.destination}-itinerary.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleShare = async () => {
    const shareText = `🌍 Check out my ${itinerary.duration}-day trip to ${itinerary.destination}!

💰 Budget: $${itinerary.budgetSummary?.totalEstimated || itinerary.totalBudget}
✨ ${itinerary.dailyItinerary.reduce((sum, day) => sum + day.activities.length, 0)} amazing activities planned

Highlights:
${itinerary.dailyItinerary.slice(0, 3).map((day, idx) => `${idx + 1}. ${day.title}`).join('\n')}

Planned with TravelSnap AI 🚀`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: `My ${itinerary.destination} Trip`,
          text: shareText,
        });
      } catch (err) {
        // User cancelled or share failed
        if (err.name !== 'AbortError') {
          // Fallback to copy
          handleCopyToClipboard(shareText);
        }
      }
    } else {
      // Fallback to copy
      handleCopyToClipboard(shareText);
    }
  };

  const handleCopyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      // You could add a toast notification here
      alert('Trip details copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSurpriseMe = () => {
    const destinations = [
      'Paris, France',
      'Tokyo, Japan',
      'Bali, Indonesia',
      'Barcelona, Spain',
      'Dubai, UAE',
      'New York City, USA',
      'Rome, Italy',
      'London, UK',
      'Bangkok, Thailand',
      'Sydney, Australia',
      'Santorini, Greece',
      'Iceland',
      'Maldives',
      'Amsterdam, Netherlands',
      'Prague, Czech Republic',
    ];
    const randomDestination = destinations[Math.floor(Math.random() * destinations.length)];
    const randomDays = Math.floor(Math.random() * 7) + 3; // 3-9 days
    const randomBudget = Math.floor(Math.random() * 3000) + 1000; // $1000-$4000
    
    setFormData({
      ...formData,
      destination: randomDestination,
      days: randomDays,
      budget: randomBudget,
    });
  };

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
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Chip
            label="✨ AI-Powered"
            sx={{
              mb: 3,
              backgroundColor: 'rgba(37, 99, 235, 0.1)',
              border: '1px solid rgba(37, 99, 235, 0.3)',
              color: colors.primary[300],
              fontWeight: 600,
            }}
          />
          <Typography variant="h2" sx={{ mb: 2, fontWeight: 800, color: 'white' }}>
            AI Trip Planner
          </Typography>
          <Typography variant="h6" sx={{ color: '#A8A29E', fontWeight: 400, maxWidth: '700px', mx: 'auto', mb: 3 }}>
            Get a personalized, budget-optimized itinerary in seconds using real travel data
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            <Typography variant="body2" sx={{ color: colors.primary[400], fontWeight: 600 }}>
              🌍 Join 1,247+ travelers
            </Typography>
            <Typography variant="body2" sx={{ color: colors.neutral[500] }}>
              •
            </Typography>
            <Typography variant="body2" sx={{ color: colors.neutral[400] }}>
              Planning smarter with AI
            </Typography>
          </Box>
        </Box>

        {/* Stepper */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: borderRadius.xl,
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <Stepper activeStep={step} sx={{ '& .MuiStepLabel-label': { color: colors.neutral[400] } }}>
            <Step>
              <StepLabel>Plan Your Trip</StepLabel>
            </Step>
            <Step>
              <StepLabel>Your Itinerary</StepLabel>
            </Step>
          </Stepper>
        </Paper>

        {step === 0 && (
          <Paper
            elevation={0}
            sx={{
              p: 6,
              borderRadius: borderRadius.xl,
              background: 'rgba(255, 255, 255, 0.03)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ color: 'white' }}>
                    Where do you want to go?
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<AutoAwesome />}
                    onClick={handleSurpriseMe}
                    sx={{
                      borderColor: colors.primary[400],
                      color: colors.primary[400],
                      '&:hover': {
                        borderColor: colors.primary[300],
                        backgroundColor: 'rgba(37, 99, 235, 0.1)',
                      },
                    }}
                  >
                    Surprise Me!
                  </Button>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Destination"
                  placeholder="e.g., Paris, Tokyo, New York"
                  value={formData.destination}
                  onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Flight sx={{ color: colors.primary[400] }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="From (Optional)"
                  placeholder="e.g., New York"
                  value={formData.origin}
                  onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Budget (USD)"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: parseInt(e.target.value) })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <AttachMoney sx={{ color: colors.primary[400] }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="number"
                  label="Number of Days"
                  value={formData.days}
                  onChange={(e) => setFormData({ ...formData, days: parseInt(e.target.value) })}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarToday sx={{ color: colors.primary[400] }} />
                      </InputAdornment>
                    ),
                    inputProps: { min: 1, max: 14 },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mb: 2, color: 'white' }}>
                  Your Interests
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                  {interestOptions.map((interest) => (
                    <Chip
                      key={interest}
                      label={interest}
                      onClick={() => handleInterestToggle(interest)}
                      color={formData.interests.includes(interest) ? 'primary' : 'default'}
                      variant={formData.interests.includes(interest) ? 'filled' : 'outlined'}
                      sx={{
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        transition: `all ${transitions.duration.fast} ${transitions.timing.ease}`,
                        '&:hover': {
                          transform: 'translateY(-2px)',
                        },
                      }}
                    />
                  ))}
                </Box>
              </Grid>

              {error && (
                <Grid item xs={12}>
                  <Alert severity="error">{error}</Alert>
                </Grid>
              )}

              <Grid item xs={12}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  startIcon={loading ? <CircularProgress size={20} /> : <AutoAwesome />}
                  onClick={handleGenerate}
                  disabled={loading || !formData.destination}
                  sx={{
                    py: 2,
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    background: colors.primary[500],
                    boxShadow: shadows.glow,
                    '&:hover': {
                      boxShadow: shadows.glowHover,
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  {loading ? 'Generating Your Perfect Trip...' : 'Generate AI Itinerary'}
                </Button>
              </Grid>
            </Grid>
          </Paper>
        )}

        {step === 1 && itinerary && (
          <Box>
            {/* Budget Summary Card */}
            <Card
              elevation={0}
              sx={{
                mb: 4,
                borderRadius: borderRadius.xl,
                background: `linear-gradient(135deg, ${colors.primary[600]} 0%, ${colors.primary[700]} 100%)`,
                color: 'white',
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={8}>
                    <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                      {itinerary.destination} - {itinerary.duration} Days
                    </Typography>
                    <Typography variant="body1" sx={{ opacity: 0.9 }}>
                      Optimized for your ${itinerary.totalBudget} budget
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                    <Typography variant="h3" sx={{ fontWeight: 800 }}>
                      ${itinerary.budgetSummary?.totalEstimated || itinerary.totalBudget}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.8, mb: 2 }}>
                      Total Estimated Cost
                    </Typography>
                    <Button
                      variant="contained"
                      startIcon={<Download />}
                      onClick={async () => {
                        try {
                          const { generateItineraryPDF } = await import('../services/api');
                          await generateItineraryPDF(itinerary);
                        } catch (error) {
                          console.error('Error downloading PDF:', error);
                        }
                      }}
                      sx={{
                        bgcolor: 'white',
                        color: colors.primary[600],
                        '&:hover': { bgcolor: colors.neutral[100] },
                        fontWeight: 600,
                        px: 3
                      }}
                    >
                      Download PDF
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            {/* Cost Breakdown */}
            <Paper
              elevation={0}
              sx={{
                p: 4,
                mb: 4,
                borderRadius: borderRadius.xl,
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: 'white' }}>
                Cost Breakdown
              </Typography>
              <Grid container spacing={2}>
                {Object.entries(itinerary.costBreakdown).map(([key, value]) => (
                  <Grid item xs={6} md={4} key={key}>
                    <Box sx={{ textAlign: 'center', p: 2 }}>
                      <Typography variant="h6" sx={{ color: colors.primary[400], fontWeight: 700 }}>
                        ${value}
                      </Typography>
                      <Typography variant="caption" sx={{ color: colors.neutral[400], textTransform: 'capitalize' }}>
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Paper>

            {/* Daily Itinerary */}
            <Paper
              elevation={0}
              sx={{
                p: 4,
                mb: 4,
                borderRadius: borderRadius.xl,
                background: 'rgba(255, 255, 255, 0.03)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: 'white' }}>
                Daily Itinerary
              </Typography>
              {itinerary.dailyItinerary.map((day) => (
                <Accordion
                  key={day.day}
                  sx={{
                    mb: 2,
                    background: 'rgba(255, 255, 255, 0.05)',
                    '&:before': { display: 'none' },
                  }}
                >
                  <AccordionSummary expandIcon={<ExpandMore sx={{ color: 'white' }} />}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
                      <Chip label={`Day ${day.day}`} color="primary" />
                      <Typography variant="h6" sx={{ color: 'white', flex: 1 }}>
                        {day.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: colors.neutral[400] }}>
                        ${day.estimatedDailyCost}
                      </Typography>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <List>
                      {day.activities.map((activity, idx) => (
                        <ListItem key={idx} sx={{ alignItems: 'flex-start' }}>
                          <ListItemIcon>
                            <Schedule sx={{ color: colors.primary[400], mt: 0.5 }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={
                              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                <Typography variant="subtitle1" sx={{ color: 'white', fontWeight: 600 }}>
                                  {activity.time} - {activity.activity}
                                </Typography>
                                <Typography variant="body2" sx={{ color: colors.primary[400] }}>
                                  ${activity.cost}
                                </Typography>
                              </Box>
                            }
                            secondary={
                              <Box component="div">
                                <Typography component="div" variant="body2" sx={{ color: colors.neutral[400], mb: 0.5 }}>
                                  {activity.description}
                                </Typography>
                                <Typography component="div" variant="caption" sx={{ color: colors.neutral[500] }}>
                                  📍 {activity.location} • ⏱️ {activity.duration}
                                </Typography>
                                {activity.tips && (
                                  <Typography component="div" variant="caption" sx={{ color: colors.primary[300], display: 'block', mt: 0.5 }}>
                                    💡 {activity.tips}
                                  </Typography>
                                )}
                              </Box>
                            }
                            secondaryTypographyProps={{ component: 'div' }}
                          />
                        </ListItem>
                      ))}
                    </List>
                    <Divider sx={{ my: 2, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                    <Typography variant="subtitle2" sx={{ color: 'white', mb: 1 }}>
                      <Restaurant sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
                      Meals
                    </Typography>
                    <Grid container spacing={2}>
                      {Object.entries(day.meals).map(([meal, recommendation]) => (
                        <Grid item xs={12} md={4} key={meal}>
                          <Typography variant="caption" sx={{ color: colors.neutral[500], textTransform: 'capitalize' }}>
                            {meal}
                          </Typography>
                          <Typography variant="body2" sx={{ color: colors.neutral[300] }}>
                            {recommendation}
                          </Typography>
                        </Grid>
                      ))}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Paper>

            {/* Travel Tips & Packing */}
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: borderRadius.xl,
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2, color: 'white', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <TipsAndUpdates sx={{ color: colors.primary[400] }} />
                    Travel Tips
                  </Typography>
                  <List>
                    {itinerary.travelTips.map((tip, idx) => (
                      <ListItem key={idx}>
                        <ListItemIcon>
                          <CheckCircle sx={{ color: colors.primary[400], fontSize: 20 }} />
                        </ListItemIcon>
                        <ListItemText primary={tip} sx={{ '& .MuiListItemText-primary': { color: colors.neutral[300] } }} />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              </Grid>

              <Grid item xs={12} md={6}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    borderRadius: borderRadius.xl,
                    background: 'rgba(255, 255, 255, 0.03)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <Typography variant="h6" sx={{ mb: 2, color: 'white', display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Backpack sx={{ color: colors.primary[400] }} />
                    Packing List
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {itinerary.packingList.map((item, idx) => (
                      <Chip key={idx} label={item} size="small" sx={{ color: colors.neutral[300] }} />
                    ))}
                  </Box>
                </Paper>
              </Grid>
            </Grid>

            {/* Action Buttons */}
            <Stack direction="row" spacing={2} sx={{ mt: 4, justifyContent: 'center', flexWrap: 'wrap' }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<Share />}
                onClick={handleShare}
                sx={{
                  px: 4,
                  py: 1.5,
                  background: `linear-gradient(135deg, ${colors.primary[500]} 0%, ${colors.primary[600]} 100%)`,
                  boxShadow: shadows.glow,
                  '&:hover': {
                    boxShadow: shadows.glowHover,
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Share Trip
              </Button>
              <Button
                variant="contained"
                size="large"
                startIcon={<CardGiftcard />}
                onClick={() => setPostcardOpen(true)}
                sx={{
                  px: 4,
                  py: 1.5,
                  background: `linear-gradient(135deg, #EC4899 0%, #F59E0B 100%)`,
                  boxShadow: shadows.glow,
                  '&:hover': {
                    boxShadow: shadows.glowHover,
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                Create Postcard
              </Button>

              <Button
                variant="contained"
                size="large"
                startIcon={<Download />}
                onClick={handleDownloadPDF}
                sx={{
                  px: 4,
                  py: 1.5,
                  background: colors.primary[500],
                  boxShadow: shadows.glow,
                  '&:hover': {
                    boxShadow: shadows.glowHover,
                  },
                }}
              >
                Download
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => {
                  setStep(0);
                  setItinerary(null);
                }}
                sx={{
                  px: 4,
                  py: 1.5,
                  borderColor: 'rgba(255, 255, 255, 0.2)',
                  color: 'white',
                  '&:hover': {
                    borderColor: colors.primary[400],
                    backgroundColor: 'rgba(37, 99, 235, 0.1)',
                  },
                }}
              >
                Plan Another Trip
              </Button>
            </Stack>

            {/* Seasonal Postcard Generator */}
            <SeasonalPostcardGenerator
              itinerary={itinerary}
              open={postcardOpen}
              onClose={() => setPostcardOpen(false)}
            />


          </Box>
        )}

        {loading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
            <Box sx={{ textAlign: 'center' }}>
              <LoadingSpinner size={60} />
              <Typography variant="h6" sx={{ mt: 3, color: 'white' }}>
                Creating your perfect itinerary...
              </Typography>
              <Typography variant="body2" sx={{ mt: 1, color: colors.neutral[400] }}>
                Analyzing real prices, events, and optimizing your schedule
              </Typography>
            </Box>
          </Box>
        )}
      </Container>
    </Box>
  );
}

export default AITripPlannerPage;
