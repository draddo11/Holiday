import { useState } from 'react';
import { Box, Container, Typography, Button, Alert, CircularProgress, Paper, Grid, Stack, Switch, FormControlLabel, Chip } from '@mui/material';
import { AutoAwesome, Download, Share, Psychology } from '@mui/icons-material';
import landmarksData from '../data/landmarks.json';
import ImageUpload from '../components/ImageUpload';
import LandmarkSelector from '../components/LandmarkSelector';
import { generateTravelPhoto } from '../services/api';
import { colors } from '../theme/tokens';
import { useFadeIn, usePrefersReducedMotion } from '../hooks/useScrollAnimation';

function AIPhotoPage() {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedLandmark, setSelectedLandmark] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [error, setError] = useState(null);
  const [useAI, setUseAI] = useState(true);

  // Animation hooks
  const { ref: headerRef, isVisible: headerVisible } = useFadeIn({ threshold: 0.2 });
  const { ref: uploadSectionRef, isVisible: uploadSectionVisible } = useFadeIn({ threshold: 0.2 });
  const { ref: previewSectionRef, isVisible: previewSectionVisible } = useFadeIn({ threshold: 0.2 });
  const prefersReducedMotion = usePrefersReducedMotion();

  const handleGenerate = async () => {
    if (!uploadedImage || !selectedLandmark) {
      setError('Please upload an image and select a landmark');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const reader = new FileReader();
      reader.readAsDataURL(uploadedImage);
      reader.onload = async () => {
        const base64Image = reader.result;

        const data = await generateTravelPhoto(
          base64Image,
          selectedLandmark.id,
          selectedLandmark.imageUrl,
          useAI
        );

        setGeneratedImage(data.generatedImageUrl);
      };
    } catch (err) {
      setError('An error occurred: ' + err.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const landmark = landmarksData.find(l => l.id === selectedLandmark?.id);

  const handleDownload = () => {
    if (!generatedImage) return;

    // Create a temporary link element
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `travelsnap-${landmark?.location || 'photo'}-${Date.now()}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    if (!generatedImage) return;

    // Convert base64 to blob
    const response = await fetch(generatedImage);
    const blob = await response.blob();
    const file = new File([blob], `travelsnap-${landmark?.location || 'photo'}.jpg`, { type: 'image/jpeg' });

    // Check if Web Share API is supported
    if (navigator.share && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          title: `My Travel Photo in ${landmark?.location || 'destination'}!`,
          text: `Check out my AI-generated travel photo!`,
          files: [file]
        });
      } catch (err) {
        // User cancelled share - no need to log
      }
    } else {
      // Fallback: just download
      handleDownload();
    }
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
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          ref={headerRef}
          sx={{
            textAlign: 'center',
            mb: 6,
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(-20px)',
            transition: prefersReducedMotion ? 'none' : 'opacity 0.6s ease, transform 0.6s ease',
          }}
        >
          <Typography
            variant="h2"
            sx={{
              mb: 2,
              fontWeight: 800,
              color: 'white',
            }}
          >
            AI Travel Photos
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              color: '#A8A29E',
              fontWeight: 400,
              maxWidth: '700px',
              mx: 'auto',
            }}
          >
            Upload your photo and place yourself in iconic landmarks worldwide
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          <Grid 
            item 
            xs={12} 
            md={6}
            ref={uploadSectionRef}
            sx={{
              opacity: uploadSectionVisible ? 1 : 0,
              transform: uploadSectionVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: prefersReducedMotion ? 'none' : 'opacity 0.6s ease, transform 0.6s ease',
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 3,
                background: 'rgba(19, 24, 41, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)',
                boxShadow: 'none',
              }}
            >
              <ImageUpload onImageSelect={setUploadedImage} />
              <LandmarkSelector
                landmarks={landmarksData}
                selectedLandmark={selectedLandmark}
                onSelect={setSelectedLandmark}
              />
              
              {/* AI Generation Toggle */}
              <Box sx={{ mt: 3, p: 2, backgroundColor: 'rgba(59, 130, 246, 0.1)', borderRadius: 2, border: '1px solid rgba(59, 130, 246, 0.3)' }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={useAI}
                      onChange={(e) => setUseAI(e.target.checked)}
                      color="primary"
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Psychology sx={{ color: colors.primary[400] }} />
                      <Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, color: 'white' }}>
                          AI-Powered Generation
                        </Typography>
                        <Typography variant="caption" sx={{ color: colors.neutral[400] }}>
                          {useAI 
                            ? 'Creates stunning, realistic travel photos using Flux AI' 
                            : 'Basic photo compositing (faster but less realistic)'}
                        </Typography>
                      </Box>
                      {useAI && (
                        <Chip 
                          label="Recommended" 
                          size="small" 
                          sx={{ 
                            ml: 'auto',
                            backgroundColor: colors.primary[500],
                            color: 'white',
                            fontWeight: 600
                          }} 
                        />
                      )}
                    </Box>
                  }
                />
              </Box>

              <Button
                variant="contained"
                size="large"
                fullWidth
                startIcon={<AutoAwesome />}
                onClick={handleGenerate}
                disabled={!uploadedImage || !selectedLandmark || isGenerating}
                sx={{
                  mt: 2,
                  py: 1.5,
                  fontSize: '1.125rem',
                }}
              >
                {isGenerating ? 'Generating...' : useAI ? 'Generate AI Photo' : 'Generate Photo'}
              </Button>

              {error && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {error}
                </Alert>
              )}
            </Paper>
          </Grid>

          <Grid 
            item 
            xs={12} 
            md={6}
            ref={previewSectionRef}
            sx={{
              opacity: previewSectionVisible ? 1 : 0,
              transform: previewSectionVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: prefersReducedMotion ? 'none' : 'opacity 0.6s ease, transform 0.6s ease',
              transitionDelay: '0.1s',
            }}
          >
            <Paper
              elevation={0}
              sx={{
                p: 4,
                borderRadius: 3,
                background: 'rgba(19, 24, 41, 0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.1)',
                minHeight: 400,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'none',
              }}
            >
              {isGenerating && (
                <Box sx={{ textAlign: 'center' }}>
                  <CircularProgress size={60} sx={{ mb: 2 }} />
                  <Typography variant="body1" color="text.secondary">
                    Creating your travel photo...
                  </Typography>
                </Box>
              )}

              {generatedImage && !isGenerating && (
                <Box sx={{ textAlign: 'center', width: '100%' }}>
                  <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: 'white' }}>
                    {landmark?.location}
                  </Typography>
                  <Box
                    component="img"
                    src={generatedImage}
                    alt="Generated travel photo"
                    sx={{
                      width: '100%',
                      borderRadius: 2,
                      mb: 3,
                      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                    }}
                  />
                  <Typography variant="body1" sx={{ color: '#94A3B8', fontWeight: 500, mb: 3 }}>
                    Your AI-generated travel photo
                  </Typography>
                  
                  {/* Download and Share Buttons */}
                  <Stack direction="row" spacing={2} justifyContent="center">
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<Download />}
                      onClick={handleDownload}
                      sx={{
                        px: 4,
                        py: 1.5,
                        fontSize: '1.125rem',
                      }}
                    >
                      Download Photo
                    </Button>
                    
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<Share />}
                      onClick={handleShare}
                      sx={{
                        px: 4,
                        py: 1.5,
                        fontSize: '1.125rem',
                      }}
                    >
                      Share Photo
                    </Button>
                  </Stack>
                </Box>
              )}

              {!isGenerating && !generatedImage && (
                <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center' }}>
                  Your generated photo will appear here
                </Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default AIPhotoPage;
