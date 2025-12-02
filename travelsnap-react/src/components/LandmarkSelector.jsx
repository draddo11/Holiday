import { useState } from 'react';
import { Box, Typography, Card, CardMedia, CardContent, Grid, Skeleton } from '@mui/material';
import { CheckCircle, Image as ImageIcon } from '@mui/icons-material';

function LandmarkSelector({ landmarks, selectedLandmark, onSelect }) {
  const [loadingImages, setLoadingImages] = useState({});
  const [errorImages, setErrorImages] = useState({});

  const handleImageLoad = (landmarkId) => {
    setLoadingImages(prev => ({ ...prev, [landmarkId]: false }));
  };

  const handleImageError = (landmarkId) => {
    setLoadingImages(prev => ({ ...prev, [landmarkId]: false }));
    setErrorImages(prev => ({ ...prev, [landmarkId]: true }));
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography 
        variant="h6" 
        sx={{ mb: 2, fontWeight: 600 }}
        id="landmark-selector-label"
      >
        Select a Landmark
      </Typography>
      
      <Grid 
        container 
        spacing={2}
        role="radiogroup"
        aria-labelledby="landmark-selector-label"
      >
        {landmarks.map(landmark => (
          <Grid item xs={6} key={landmark.id}>
            <Card
              onClick={() => onSelect(landmark)}
              role="radio"
              tabIndex={0}
              aria-checked={selectedLandmark?.id === landmark.id}
              aria-label={`${landmark.name}, ${landmark.location}`}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onSelect(landmark);
                }
              }}
              sx={{
                cursor: 'pointer',
                position: 'relative',
                border: selectedLandmark?.id === landmark.id ? 2 : 0,
                borderColor: 'primary.main',
                transition: 'all 0.2s',
                minHeight: '44px',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            >
              {selectedLandmark?.id === landmark.id && (
                <CheckCircle
                  aria-hidden="true"
                  sx={{
                    position: 'absolute',
                    top: 8,
                    right: 8,
                    color: 'primary.main',
                    backgroundColor: 'white',
                    borderRadius: '50%',
                    zIndex: 1,
                  }}
                />
              )}
              
              {loadingImages[landmark.id] !== false && !errorImages[landmark.id] && (
                <Skeleton variant="rectangular" height={120} />
              )}
              
              {errorImages[landmark.id] ? (
                <Box
                  sx={{
                    height: 120,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: '#f0f0f0',
                    color: '#999',
                  }}
                  role="img"
                  aria-label={`Image unavailable for ${landmark.name}`}
                >
                  <ImageIcon sx={{ fontSize: 40 }} aria-hidden="true" />
                </Box>
              ) : (
                <CardMedia
                  component="img"
                  height="120"
                  image={landmark.imageUrl}
                  alt={`${landmark.name} in ${landmark.location}`}
                  sx={{
                    objectFit: 'cover',
                    display: loadingImages[landmark.id] === false ? 'block' : 'none',
                  }}
                  onLoad={() => handleImageLoad(landmark.id)}
                  onError={() => handleImageError(landmark.id)}
                />
              )}
              
              <CardContent sx={{ p: 1.5 }}>
                <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '0.875rem' }}>
                  {landmark.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {landmark.location}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default LandmarkSelector;
