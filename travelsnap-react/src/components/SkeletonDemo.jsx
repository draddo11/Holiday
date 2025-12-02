import { Box, Container, Typography, Grid } from '@mui/material';
import SkeletonCard from './SkeletonCard';
import { colors, spacing } from '../theme/tokens';

/**
 * SkeletonDemo - Demo page to showcase skeleton loader variants
 * This component is for development/testing purposes only
 */
function SkeletonDemo() {
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      backgroundColor: colors.neutral[950],
      py: 8,
    }}>
      <Container maxWidth="xl">
        <Typography 
          variant="h3" 
          sx={{ 
            color: 'white', 
            fontWeight: 700, 
            mb: 2,
          }}
        >
          Skeleton Loader Components
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: colors.neutral[400], 
            mb: 6,
          }}
        >
          Loading states with shimmer animation and glassmorphism effects
        </Typography>

        {/* Destination Card Skeletons */}
        <Typography 
          variant="h5" 
          sx={{ 
            color: 'white', 
            fontWeight: 600, 
            mb: 3,
          }}
        >
          Destination Card Variant
        </Typography>
        <Grid container spacing={3} sx={{ mb: 8 }}>
          <Grid item xs={12} md={6} lg={4}>
            <SkeletonCard variant="destination" />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <SkeletonCard variant="destination" />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <SkeletonCard variant="destination" />
          </Grid>
        </Grid>

        {/* Stats Card Skeletons */}
        <Typography 
          variant="h5" 
          sx={{ 
            color: 'white', 
            fontWeight: 600, 
            mb: 3,
          }}
        >
          Stats Card Variant
        </Typography>
        <Grid container spacing={3} sx={{ mb: 8 }}>
          <Grid item xs={12} sm={6} md={3}>
            <SkeletonCard variant="stats" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SkeletonCard variant="stats" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SkeletonCard variant="stats" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SkeletonCard variant="stats" />
          </Grid>
        </Grid>

        {/* Compact Card Skeletons */}
        <Typography 
          variant="h5" 
          sx={{ 
            color: 'white', 
            fontWeight: 600, 
            mb: 3,
          }}
        >
          Compact Card Variant
        </Typography>
        <Grid container spacing={2} sx={{ mb: 8 }}>
          <Grid item xs={12} md={6}>
            <SkeletonCard variant="compact" />
          </Grid>
          <Grid item xs={12} md={6}>
            <SkeletonCard variant="compact" />
          </Grid>
          <Grid item xs={12} md={6}>
            <SkeletonCard variant="compact" />
          </Grid>
          <Grid item xs={12} md={6}>
            <SkeletonCard variant="compact" />
          </Grid>
        </Grid>

        {/* Custom Height Example */}
        <Typography 
          variant="h5" 
          sx={{ 
            color: 'white', 
            fontWeight: 600, 
            mb: 3,
          }}
        >
          Custom Height Example
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <SkeletonCard variant="stats" height={250} />
          </Grid>
          <Grid item xs={12} md={4}>
            <SkeletonCard variant="stats" height={300} />
          </Grid>
          <Grid item xs={12} md={4}>
            <SkeletonCard variant="stats" height={350} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default SkeletonDemo;
