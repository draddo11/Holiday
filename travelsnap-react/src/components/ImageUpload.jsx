import { useState } from 'react';
import { Box, Typography, Button, Alert } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';

function ImageUpload({ onImageSelect }) {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    
    if (!file) return;

    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!validTypes.includes(file.type)) {
      setError('Please upload a JPG or PNG image');
      setPreview(null);
      onImageSelect(null);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('Image file is too large. Please upload an image under 10MB');
      setPreview(null);
      onImageSelect(null);
      return;
    }

    setError(null);
    onImageSelect(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Typography 
        variant="h6" 
        sx={{ mb: 2, fontWeight: 600 }}
        id="image-upload-label"
      >
        Upload Your Photo
      </Typography>
      
      <Button
        component="label"
        variant="outlined"
        startIcon={<CloudUpload />}
        fullWidth
        aria-label="Choose image file to upload"
        sx={{
          py: 2,
          borderStyle: 'dashed',
          borderWidth: 2,
          minHeight: '44px',
        }}
      >
        Choose Image
        <input
          type="file"
          hidden
          accept="image/jpeg,image/jpg,image/png"
          onChange={handleFileChange}
          aria-labelledby="image-upload-label"
          aria-describedby="image-upload-description"
        />
      </Button>
      
      <Typography 
        variant="caption" 
        sx={{ display: 'block', mt: 1, color: 'text.secondary' }}
        id="image-upload-description"
      >
        Accepted formats: JPG, PNG. Maximum size: 10MB
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mt: 2 }}>
          {error}
        </Alert>
      )}

      {preview && (
        <Box
          sx={{
            mt: 2,
            borderRadius: 2,
            overflow: 'hidden',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
          role="img"
          aria-label="Preview of uploaded image"
        >
          <img
            src={preview}
            alt="Preview of your uploaded photo"
            style={{
              width: '100%',
              display: 'block',
            }}
          />
        </Box>
      )}
    </Box>
  );
}

export default ImageUpload;
