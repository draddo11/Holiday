import { useState, useEffect, useRef } from 'react';
import { Box, Skeleton } from '@mui/material';

/**
 * LazyImage component with WebP support and fallback
 * Implements intersection observer for lazy loading
 * 
 * @param {string} src - Image source URL (JPEG/PNG)
 * @param {string} webpSrc - WebP version of the image (optional)
 * @param {string} alt - Alt text for accessibility
 * @param {object} sx - MUI sx prop for styling
 * @param {string} className - CSS class name
 * @param {number} aspectRatio - Aspect ratio for skeleton (height/width)
 */
function LazyImage({ 
  src, 
  webpSrc, 
  alt, 
  sx = {}, 
  className = '',
  aspectRatio = 0.6667, // Default 3:2 ratio
  ...props 
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const imgRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!imgRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
      }
    );

    observer.observe(imgRef.current);

    return () => {
      if (observer) observer.disconnect();
    };
  }, []);

  // Load image when in view
  useEffect(() => {
    if (!isInView) return;

    // Check WebP support and use appropriate source
    const checkWebPSupport = () => {
      const elem = document.createElement('canvas');
      if (elem.getContext && elem.getContext('2d')) {
        return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
      }
      return false;
    };

    const supportsWebP = checkWebPSupport();
    const sourceToUse = supportsWebP && webpSrc ? webpSrc : src;

    // Preload image
    const img = new Image();
    img.src = sourceToUse;
    img.onload = () => {
      setImageSrc(sourceToUse);
      setIsLoaded(true);
    };
    img.onerror = () => {
      // Fallback to original src if WebP fails
      if (sourceToUse === webpSrc && src) {
        const fallbackImg = new Image();
        fallbackImg.src = src;
        fallbackImg.onload = () => {
          setImageSrc(src);
          setIsLoaded(true);
        };
      }
    };
  }, [isInView, src, webpSrc]);

  return (
    <Box
      ref={imgRef}
      sx={{
        position: 'relative',
        width: '100%',
        paddingTop: `${aspectRatio * 100}%`,
        overflow: 'hidden',
        ...sx,
      }}
      className={className}
    >
      {!isLoaded && (
        <Skeleton
          variant="rectangular"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            bgcolor: 'rgba(255, 255, 255, 0.05)',
            '&::after': {
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
            },
          }}
          animation="wave"
        />
      )}
      {imageSrc && (
        <Box
          component="img"
          src={imageSrc}
          alt={alt}
          loading="lazy"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.4s ease-in-out',
          }}
          {...props}
        />
      )}
    </Box>
  );
}

export default LazyImage;
