import { useState, useRef, useEffect } from 'react';
import { Box, Button, Dialog, DialogContent, Typography, CircularProgress } from '@mui/material';
import { Download, Close, AutoAwesome } from '@mui/icons-material';
import html2canvas from 'html2canvas';
import { colors, borderRadius } from '../theme/tokens';
import { generateWeatherScene } from '../services/api';

/**
 * 3D Weather Postcard Generator
 * Simple, clean weather card with emoji-based 3D scene
 */

function WeatherPostcardGenerator({ itinerary, open, onClose }) {
  const [downloading, setDownloading] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [aiImage, setAiImage] = useState(null);
  const [useAI, setUseAI] = useState(true);
  const postcardRef = useRef(null);

  if (!itinerary) return null;

  // Try to generate AI image when dialog opens
  useEffect(() => {
    if (open && itinerary && !aiImage && useAI) {
      handleGenerateAI();
    }
  }, [open, itinerary]);

  const handleGenerateAI = async () => {
    setGenerating(true);
    try {
      const result = await generateWeatherScene(
        itinerary.destination,
        itinerary.weather?.current?.temperature || '25',
        itinerary.weather?.current?.condition || 'sunny'
      );
      
      if (result.success && result.image_url) {
        setAiImage(result.image_url);
      } else {
        // AI generation failed, use emoji fallback
        setUseAI(false);
      }
    } catch (error) {
      console.error('Failed to generate AI scene:', error);
      setUseAI(false);
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!postcardRef.current) return;
    
    setDownloading(true);
    try {
      const canvas = await html2canvas(postcardRef.current, {
        backgroundColor: null,
        scale: 2,
        logging: false,
      });
      
      const link = document.createElement('a');
      link.download = `${itinerary.destination}-weather-card.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch (error) {
      console.error('Failed to generate image:', error);
    } finally {
      setDownloading(false);
    }
  };

  const getWeatherEmoji = () => {
    const weather = itinerary.weather?.current?.condition?.toLowerCase() || '';
    if (weather.includes('sun') || weather.includes('clear')) return '☀️';
    if (weather.includes('cloud')) return '☁️';
    if (weather.includes('rain')) return '🌧️';
    if (weather.includes('snow')) return '❄️';
    if (weather.includes('storm')) return '⛈️';
    return '🌤️';
  };

  const temperature = itinerary.weather?.current?.temperature || '25';
  const date = new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

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
            3D Weather Card
          </Typography>
          <Button onClick={onClose} sx={{ minWidth: 'auto', color: colors.neutral[400] }}>
            <Close />
          </Button>
        </Box>

        {/* Weather Card */}
        <Box
          ref={postcardRef}
          sx={{
            width: '600px',
            height: '600px',
            background: aiImage ? `url(${aiImage})` : 'linear-gradient(180deg, #B8E6F5 0%, #87CEEB 100%)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            borderRadius: borderRadius.xl,
            position: 'relative',
            overflow: 'hidden',
            mb: 3,
            mx: 'auto',
            boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: aiImage ? 'center' : 'space-between',
            p: 4,
          }}
        >
          {/* Loading Overlay */}
          {generating && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'rgba(0,0,0,0.8)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1000,
              }}
            >
              <CircularProgress size={60} sx={{ color: 'white', mb: 2 }} />
              <Typography variant="h6" sx={{ color: 'white', mb: 1 }}>
                <AutoAwesome sx={{ mr: 1, verticalAlign: 'middle' }} />
                Generating AI Scene...
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                Creating your isometric 3D weather card with Gemini
              </Typography>
            </Box>
          )}

          {/* Overlay for AI image to make text visible */}
          {aiImage && (
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(180deg, rgba(0,0,0,0.4) 0%, transparent 20%, transparent 80%, rgba(0,0,0,0.4) 100%)',
                zIndex: 1,
              }}
            />
          )}
          {/* Top Section - Destination & Weather */}
          <Box sx={{ textAlign: 'center', zIndex: 2 }}>
            <Typography
              variant="h1"
              sx={{
                fontSize: '4.5rem',
                fontWeight: 900,
                color: aiImage ? 'white' : '#2C3E50',
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                mb: 2,
                textShadow: aiImage ? '0 4px 12px rgba(0,0,0,0.8)' : '0 2px 4px rgba(0,0,0,0.1)',
              }}
            >
              {itinerary.destination.split(',')[0]}
            </Typography>

            <Box sx={{ fontSize: '90px', mb: 2 }}>
              {getWeatherEmoji()}
            </Box>

            <Typography
              variant="h6"
              sx={{
                fontSize: '1.1rem',
                fontWeight: 600,
                color: aiImage ? 'rgba(255,255,255,0.95)' : '#34495E',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                mb: 1,
                textShadow: aiImage ? '0 2px 8px rgba(0,0,0,0.6)' : 'none',
              }}
            >
              {date}
            </Typography>

            <Typography
              variant="h2"
              sx={{
                fontSize: '6rem',
                fontWeight: 900,
                color: aiImage ? 'white' : '#2C3E50',
                textShadow: aiImage ? '0 4px 12px rgba(0,0,0,0.8)' : '0 2px 8px rgba(0,0,0,0.1)',
              }}
            >
              {temperature}°C
            </Typography>
          </Box>

          {/* Bottom Section - 3D Scene (only show if no AI image) */}
          {!aiImage && <Box
            sx={{
              width: '100%',
              height: '250px',
              position: 'relative',
              zIndex: 1,
            }}
          >
            {/* Water */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: '10%',
                right: '10%',
                height: '90px',
                background: 'linear-gradient(180deg, #5BA3E8 0%, #4A90E2 50%, #357ABD 100%)',
                borderRadius: '12px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              }}
            />

            {/* Land Platform */}
            <Box
              sx={{
                position: 'absolute',
                bottom: '90px',
                left: '8%',
                right: '8%',
                height: '70px',
                background: 'linear-gradient(135deg, #A5D6A7 0%, #8BC34A 50%, #7CB342 100%)',
                borderRadius: '16px',
                boxShadow: '0 8px 20px rgba(0,0,0,0.25)',
                border: '3px solid rgba(139, 195, 74, 0.4)',
              }}
            >
              {/* Trees */}
              <Box sx={{ position: 'absolute', left: '10%', top: '10%', fontSize: '32px' }}>🌲</Box>
              <Box sx={{ position: 'absolute', left: '18%', top: '30%', fontSize: '28px' }}>🌲</Box>
              <Box sx={{ position: 'absolute', left: '25%', top: '15%', fontSize: '30px' }}>🌲</Box>
              <Box sx={{ position: 'absolute', right: '25%', top: '20%', fontSize: '29px' }}>🌲</Box>
              <Box sx={{ position: 'absolute', right: '18%', top: '35%', fontSize: '27px' }}>🌲</Box>
              <Box sx={{ position: 'absolute', right: '10%', top: '12%', fontSize: '31px' }}>🌲</Box>

              {/* Buildings */}
              <Box sx={{ position: 'absolute', left: '42%', top: '15%', fontSize: '42px' }}>🏠</Box>
              <Box sx={{ position: 'absolute', left: '52%', top: '18%', fontSize: '38px' }}>🏢</Box>

              {/* Bridge */}
              <Box sx={{ position: 'absolute', right: '8%', top: '25%', fontSize: '36px' }}>🌉</Box>
            </Box>

            {/* Mountains (background) */}
            <Box sx={{ position: 'absolute', bottom: '140px', left: '5%', fontSize: '70px', opacity: 0.6, filter: 'blur(1px)' }}>⛰️</Box>
            <Box sx={{ position: 'absolute', bottom: '130px', left: '20%', fontSize: '80px', opacity: 0.5, filter: 'blur(1.5px)' }}>⛰️</Box>
            <Box sx={{ position: 'absolute', bottom: '135px', right: '15%', fontSize: '75px', opacity: 0.55, filter: 'blur(1px)' }}>⛰️</Box>

            {/* Mountain on platform (foreground) */}
            <Box sx={{ position: 'absolute', bottom: '155px', left: '8%', fontSize: '65px' }}>⛰️</Box>

            {/* Clouds */}
            <Box sx={{ position: 'absolute', top: '-40px', left: '5%', fontSize: '55px', opacity: 0.85 }}>☁️</Box>
            <Box sx={{ position: 'absolute', top: '-20px', right: '10%', fontSize: '50px', opacity: 0.8 }}>☁️</Box>
          </Box>}
        </Box>

        {/* Download Button */}
        <Button
          fullWidth
          variant="contained"
          startIcon={downloading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : <Download />}
          onClick={handleDownload}
          disabled={downloading}
          sx={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            py: 1.5,
            fontSize: '1rem',
            fontWeight: 600,
            '&:hover': { opacity: 0.9 },
            '&:disabled': { opacity: 0.7 },
          }}
        >
          {downloading ? 'Generating Image...' : 'Download 3D Weather Card'}
        </Button>
      </DialogContent>
    </Dialog>
  );
}

export default WeatherPostcardGenerator;
