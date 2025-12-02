import { useState, useRef, useEffect } from 'react';
import { Box, Button, Dialog, DialogContent, Stack, ToggleButtonGroup, ToggleButton, Typography, CircularProgress } from '@mui/material';
import { Download, Close } from '@mui/icons-material';
import html2canvas from 'html2canvas';
import { SEASONAL_THEMES } from '../theme/seasonalThemes';
import { colors, borderRadius, spacing } from '../theme/tokens';
import IsometricLandmark from './IsometricLandmark';

function SeasonalPostcardGenerator({ itinerary, open, onClose }) {
  const [selectedTheme, setSelectedTheme] = useState('default');
  const [downloading, setDownloading] = useState(false);
  const [destinationImage, setDestinationImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);
  const postcardRef = useRef(null);
  
  const theme = SEASONAL_THEMES[selectedTheme];
  
  // Destination images mapping
  const destinationImages = {
    'paris': 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=600&h=600&fit=crop&q=80',
    'tokyo': 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&h=600&fit=crop&q=80',
    'london': 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&h=600&fit=crop&q=80',
    'new york': 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&h=600&fit=crop&q=80',
    'rome': 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=600&h=600&fit=crop&q=80',
    'barcelona': 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=600&h=600&fit=crop&q=80',
    'amsterdam': 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=600&h=600&fit=crop&q=80',
    'dubai': 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&h=600&fit=crop&q=80',
    'bali': 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=600&h=600&fit=crop&q=80',
    'thailand': 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=600&fit=crop&q=80',
    'greece': 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=600&h=600&fit=crop&q=80',
    'iceland': 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=600&h=600&fit=crop&q=80',
    'maldives': 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600&h=600&fit=crop&q=80',
    'sydney': 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?w=600&h=600&fit=crop&q=80',
    'prague': 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=600&h=600&fit=crop&q=80',
    'default': 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=600&h=600&fit=crop&q=80'
  };

  // Load destination image
  useEffect(() => {
    if (!itinerary || !open) return;
    
    setImageLoading(true);
    
    // Find matching image
    const destination = itinerary.destination.toLowerCase();
    let imageUrl = destinationImages.default;
    
    // Check for exact or partial matches
    for (const [key, url] of Object.entries(destinationImages)) {
      if (destination.includes(key) || key.includes(destination)) {
        imageUrl = url;
        break;
      }
    }
    
    // Preload image
    const img = new Image();
    img.onload = () => {
      setDestinationImage(imageUrl);
      setImageLoading(false);
    };
    img.onerror = () => {
      setDestinationImage(destinationImages.default);
      setImageLoading(false);
    };
    img.src = imageUrl;
    
  }, [itinerary, open]);
  
  if (!itinerary) return null;

  const handleDownload = async () => {
    if (!postcardRef.current) return;
    
    setDownloading(true);
    try {
      const canvas = await html2canvas(postcardRef.current, {
        backgroundColor: null,
        scale: 2, // Higher quality
        logging: false,
      });
      
      const link = document.createElement('a');
      link.download = `${itinerary.destination}-${theme.name}-postcard.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Failed to generate image:', error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          backgroundColor: colors.neutral[900],
          borderRadius: borderRadius.xl,
        },
      }}
    >
      <DialogContent sx={{ p: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h5" sx={{ color: 'white', fontWeight: 700 }}>
            Create Seasonal Postcard
          </Typography>
          <Button
            onClick={onClose}
            sx={{ minWidth: 'auto', color: colors.neutral[400] }}
          >
            <Close />
          </Button>
        </Box>

        {/* Theme Selector */}
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle2" sx={{ color: colors.neutral[400], mb: 2 }}>
            Choose Your Theme:
          </Typography>
          <ToggleButtonGroup
            value={selectedTheme}
            exclusive
            onChange={(e, value) => value && setSelectedTheme(value)}
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              '& .MuiToggleButton-root': {
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: borderRadius.md,
                color: 'white',
                '&.Mui-selected': {
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                },
              },
            }}
          >
            {Object.values(SEASONAL_THEMES).map((t) => (
              <ToggleButton key={t.id} value={t.id}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <span style={{ fontSize: '1.25rem' }}>{t.icon}</span>
                  <span>{t.name}</span>
                </Box>
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>

        {/* 3D Flip Container */}
        <Box
          sx={{
            width: '600px',
            height: '600px',
            mb: 3,
            mx: 'auto',
            perspective: '1000px',
            cursor: 'pointer',
          }}
          onClick={() => setIsFlipped(!isFlipped)}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              transition: 'transform 0.8s',
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            }}
          >
            {/* Front Side */}
            <Box
              ref={postcardRef}
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                borderRadius: borderRadius.xl,
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                backgroundColor: '#000',
              }}
            >
          {/* Destination Image Background */}
          {destinationImage && (
            <Box
              component="img"
              src={destinationImage}
              alt={itinerary.destination}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.4,
              }}
            />
          )}

          {/* Theme Gradient Overlay */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: theme.gradient,
              opacity: 0.85,
              mixBlendMode: 'multiply',
            }}
          />

          {/* Content Layer */}
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              p: 5,
            }}
          >
          {/* Decorative Background Elements */}
          <Box
            sx={{
              position: 'absolute',
              top: -100,
              right: -100,
              width: 300,
              height: 300,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.15)',
              filter: 'blur(60px)',
            }}
          />
          <Box
            sx={{
              position: 'absolute',
              bottom: -80,
              left: -80,
              width: 250,
              height: 250,
              borderRadius: '50%',
              background: 'rgba(0, 0, 0, 0.1)',
              filter: 'blur(50px)',
            }}
          />

          {/* Theme-Specific Decorations */}
          {selectedTheme === 'halloween' && (
            <>
              <Box sx={{ position: 'absolute', top: 20, left: 20, fontSize: '3rem', opacity: 0.3 }}>🎃</Box>
              <Box sx={{ position: 'absolute', top: 40, right: 30, fontSize: '2.5rem', opacity: 0.3 }}>👻</Box>
              <Box sx={{ position: 'absolute', bottom: 30, left: 40, fontSize: '2rem', opacity: 0.3 }}>🦇</Box>
              <Box sx={{ position: 'absolute', bottom: 50, right: 50, fontSize: '2.5rem', opacity: 0.3 }}>🕷️</Box>
            </>
          )}
          {selectedTheme === 'christmas' && (
            <>
              <Box sx={{ position: 'absolute', top: 20, left: 20, fontSize: '3rem', opacity: 0.3 }}>🎄</Box>
              <Box sx={{ position: 'absolute', top: 30, right: 30, fontSize: '2.5rem', opacity: 0.3 }}>❄️</Box>
              <Box sx={{ position: 'absolute', bottom: 40, left: 30, fontSize: '2rem', opacity: 0.3 }}>🎁</Box>
              <Box sx={{ position: 'absolute', bottom: 30, right: 40, fontSize: '2.5rem', opacity: 0.3 }}>⛄</Box>
              <Box sx={{ position: 'absolute', top: '50%', left: 50, fontSize: '1.5rem', opacity: 0.2 }}>🔔</Box>
            </>
          )}
          {selectedTheme === 'summer' && (
            <>
              <Box sx={{ position: 'absolute', top: 30, right: 30, fontSize: '4rem', opacity: 0.3 }}>☀️</Box>
              <Box sx={{ position: 'absolute', bottom: 30, left: 30, fontSize: '3rem', opacity: 0.3 }}>🏖️</Box>
              <Box sx={{ position: 'absolute', bottom: 50, right: 50, fontSize: '2.5rem', opacity: 0.3 }}>🌊</Box>
              <Box sx={{ position: 'absolute', top: '50%', right: 60, fontSize: '2rem', opacity: 0.2 }}>🍹</Box>
            </>
          )}
          {selectedTheme === 'spring' && (
            <>
              <Box sx={{ position: 'absolute', top: 20, left: 30, fontSize: '3rem', opacity: 0.3 }}>🌸</Box>
              <Box sx={{ position: 'absolute', top: 40, right: 40, fontSize: '2.5rem', opacity: 0.3 }}>🌷</Box>
              <Box sx={{ position: 'absolute', bottom: 40, left: 40, fontSize: '2rem', opacity: 0.3 }}>🦋</Box>
              <Box sx={{ position: 'absolute', bottom: 30, right: 30, fontSize: '2.5rem', opacity: 0.3 }}>🌺</Box>
              <Box sx={{ position: 'absolute', top: '50%', left: 60, fontSize: '2rem', opacity: 0.2 }}>🌈</Box>
            </>
          )}

          {/* 3D Isometric Landmark */}
          <IsometricLandmark destination={itinerary.destination} theme={theme} />

          {/* Content */}
          <Box sx={{ position: 'relative', zIndex: 3, height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Top Badge */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
              <Box
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.25)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '50px',
                  px: 3,
                  py: 1,
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                }}
              >
                <Typography variant="body2" sx={{ color: 'white', fontWeight: 700, fontSize: '0.9rem' }}>
                  {theme.emojis.slice(0, 3).join(' ')} {theme.name} Adventure
                </Typography>
              </Box>
            </Box>

            {/* Main Content */}
            <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center' }}>
              {/* Destination */}
              <Typography 
                variant="h2" 
                sx={{ 
                  color: 'white', 
                  fontWeight: 900, 
                  mb: 2,
                  fontSize: '3.5rem',
                  textShadow: '0 4px 20px rgba(0,0,0,0.3)',
                  letterSpacing: '-0.02em',
                }}
              >
                {itinerary.destination}
              </Typography>

              {/* Duration */}
              <Typography 
                variant="h5" 
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.95)', 
                  fontWeight: 600,
                  mb: 4,
                  textShadow: '0 2px 10px rgba(0,0,0,0.2)',
                }}
              >
                {itinerary.duration}-Day Journey
              </Typography>

              {/* Stats Cards */}
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 4 }}>
                <Box
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: borderRadius.lg,
                    p: 2.5,
                    minWidth: 140,
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                  }}
                >
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 800, mb: 0.5 }}>
                    ${itinerary.budgetSummary?.totalEstimated || itinerary.totalBudget}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Budget
                  </Typography>
                </Box>
                <Box
                  sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: borderRadius.lg,
                    p: 2.5,
                    minWidth: 140,
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                  }}
                >
                  <Typography variant="h4" sx={{ color: 'white', fontWeight: 800, mb: 0.5 }}>
                    {itinerary.dailyItinerary.reduce((sum, day) => sum + day.activities.length, 0)}
                  </Typography>
                  <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.9)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Activities
                  </Typography>
                </Box>
              </Box>

              {/* Highlights */}
              <Box
                sx={{
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: borderRadius.lg,
                  p: 2.5,
                  border: '1px solid rgba(255, 255, 255, 0.25)',
                }}
              >
                <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', mb: 1, display: 'block' }}>
                  Top Highlights
                </Typography>
                {itinerary.dailyItinerary.slice(0, 3).map((day, idx) => (
                  <Typography 
                    key={idx}
                    variant="body2" 
                    sx={{ 
                      color: 'white', 
                      fontWeight: 500,
                      mb: idx < 2 ? 0.5 : 0,
                      fontSize: '0.9rem',
                    }}
                  >
                    {idx + 1}. {day.title}
                  </Typography>
                ))}
              </Box>
            </Box>

            {/* Footer Branding */}
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                pt: 3,
                borderTop: '2px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="white"/>
                  </svg>
                </Box>
                <Typography variant="h6" sx={{ color: 'white', fontWeight: 800 }}>
                  TravelSnap
                </Typography>
              </Box>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 600 }}>
                AI-Powered Planning
              </Typography>
            </Box>
          </Box>
        </Box>
        </Box>

            {/* Back Side - Traditional Postcard */}
            <Box
              sx={{
                position: 'absolute',
                width: '100%',
                height: '100%',
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
                borderRadius: borderRadius.xl,
                overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                background: 'linear-gradient(135deg, #f5f5dc 0%, #fff8dc 100%)',
                p: 5,
              }}
            >
              {/* Postcard Lines */}
              <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {/* Top Section - Stamp Area */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                  <Box>
                    <Typography variant="caption" sx={{ color: '#8b7355', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                      Postcard
                    </Typography>
                  </Box>
                  {/* Stamp */}
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      border: '3px dashed #8b7355',
                      borderRadius: '4px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2.5rem',
                    }}
                  >
                    {theme.icon}
                  </Box>
                </Box>

                {/* Message Area */}
                <Box sx={{ flex: 1, borderBottom: '2px solid #d4c5b9', pb: 3, mb: 3 }}>
                  <Typography variant="h6" sx={{ color: '#5d4e37', fontWeight: 700, mb: 2, fontFamily: 'cursive' }}>
                    Greetings from {itinerary.destination}!
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b5d52', lineHeight: 1.8, fontFamily: 'cursive', fontSize: '0.95rem' }}>
                    Having an amazing {theme.name.toLowerCase()} adventure! 
                    Spending {itinerary.duration} incredible days exploring this beautiful destination.
                    {' '}Budget: ${itinerary.budgetSummary?.totalEstimated || itinerary.totalBudget}.
                    {' '}Can't wait to share all the stories!
                  </Typography>
                </Box>

                {/* Address Section */}
                <Box>
                  <Box sx={{ borderLeft: '2px solid #d4c5b9', pl: 3 }}>
                    <Typography variant="caption" sx={{ color: '#8b7355', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', display: 'block', mb: 1 }}>
                      Top Experiences:
                    </Typography>
                    {itinerary.dailyItinerary.slice(0, 3).map((day, idx) => (
                      <Typography 
                        key={idx}
                        variant="body2" 
                        sx={{ 
                          color: '#6b5d52',
                          mb: 0.5,
                          fontSize: '0.85rem',
                          fontFamily: 'cursive',
                        }}
                      >
                        ✓ {day.title}
                      </Typography>
                    ))}
                  </Box>

                  {/* Footer */}
                  <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #d4c5b9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="caption" sx={{ color: '#8b7355', fontWeight: 600, fontFamily: 'cursive' }}>
                      Created with TravelSnap ✈️
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#8b7355', fontWeight: 600 }}>
                      {new Date().toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        {/* Flip Instruction */}
        <Box sx={{ textAlign: 'center', mb: 2 }}>
          <Typography variant="caption" sx={{ color: colors.neutral[500], fontStyle: 'italic' }}>
            💡 Click the postcard to flip it and see the back side
          </Typography>
        </Box>

        {/* Actions */}
        <Stack direction="row" spacing={2}>
          <Button
            fullWidth
            variant="contained"
            startIcon={downloading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : <Download />}
            onClick={handleDownload}
            disabled={downloading}
            sx={{
              background: theme.gradient,
              py: 1.5,
              fontSize: '1rem',
              fontWeight: 600,
              '&:hover': {
                opacity: 0.9,
              },
              '&:disabled': {
                opacity: 0.7,
              },
            }}
          >
            {downloading ? 'Generating Image...' : `Download ${theme.name} Postcard`}
          </Button>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

export default SeasonalPostcardGenerator;
