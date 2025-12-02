import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Card,
  CardContent,
  TextField,
  Chip,
  IconButton,
  Grid,
  Divider,
  InputAdornment,
  Alert,
} from '@mui/material';
import {
  Search,
  Favorite,
  Share,
  WbSunny,
  Flight,
  Hotel,
  ArrowForward,
  Close,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import PremiumDestinationCard from '../components/PremiumDestinationCard';
import ModernStatsCard from '../components/ModernStatsCard';
import SkeletonCard from '../components/SkeletonCard';
import LoadingSpinner from '../components/LoadingSpinner';
import LazyImage from '../components/LazyImage';

/**
 * Component Showcase Page
 * 
 * This page demonstrates all components and design patterns from the TravelSnap
 * design system. Use this as a reference for implementing new features.
 */
function ComponentShowcase() {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);

  // Sample destination data
  const sampleDestination = {
    id: 1,
    name: 'Paris, France',
    tagline: 'The City of Light awaits your discovery',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800',
    features: ['Iconic', 'Romantic', 'Cultural'],
    popular: true,
  };

  return (
    <Box sx={{ backgroundColor: theme.palette.neutral[950], minHeight: '100vh', py: 8 }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ mb: 12, textAlign: 'center' }}>
          <Chip 
            label="✨ Design System Showcase"
            sx={{
              mb: 4,
              backgroundColor: 'rgba(37, 99, 235, 0.1)',
              border: '1px solid rgba(37, 99, 235, 0.3)',
              color: theme.palette.primary[300],
              fontWeight: 600,
            }}
          />
          <Typography variant="h1" sx={{ mb: 3 }}>
            Component Library
          </Typography>
          <Typography variant="h5" sx={{ color: theme.palette.neutral[400], maxWidth: 700, mx: 'auto' }}>
            A comprehensive showcase of all design system components and patterns
          </Typography>
        </Box>

        {/* Color Palette Section */}
        <Section title="Color Palette" description="Our professional color system">
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <ColorPaletteCard 
                title="Primary Colors"
                colors={[
                  { name: 'primary.500', value: theme.palette.primary.main },
                  { name: 'primary.400', value: theme.palette.primary[400] },
                  { name: 'primary.600', value: theme.palette.primary[600] },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <ColorPaletteCard 
                title="Secondary Colors"
                colors={[
                  { name: 'secondary.500', value: theme.palette.secondary.main },
                  { name: 'secondary.400', value: theme.palette.secondary[400] },
                  { name: 'secondary.600', value: theme.palette.secondary[600] },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <ColorPaletteCard 
                title="Neutral Colors"
                colors={[
                  { name: 'neutral.0', value: theme.palette.neutral[0] },
                  { name: 'neutral.400', value: theme.palette.neutral[400] },
                  { name: 'neutral.950', value: theme.palette.neutral[950] },
                ]}
              />
            </Grid>
          </Grid>
        </Section>

        {/* Typography Section */}
        <Section title="Typography" description="Font sizes, weights, and hierarchy">
          <Card>
            <CardContent sx={{ p: 6 }}>
              <Typography variant="h1" sx={{ mb: 2 }}>Heading 1 - Hero</Typography>
              <Typography variant="h2" sx={{ mb: 2 }}>Heading 2 - Section</Typography>
              <Typography variant="h3" sx={{ mb: 2 }}>Heading 3 - Subsection</Typography>
              <Typography variant="h4" sx={{ mb: 2 }}>Heading 4 - Card</Typography>
              <Typography variant="h5" sx={{ mb: 2 }}>Heading 5 - Small</Typography>
              <Typography variant="h6" sx={{ mb: 3 }}>Heading 6 - Smallest</Typography>
              <Divider sx={{ my: 3 }} />
              <Typography variant="body1" sx={{ mb: 2 }}>
                Body 1 - This is the primary body text style used throughout the application. 
                It has a comfortable reading size and line height.
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                Body 2 - This is the secondary body text style, slightly smaller than body1.
              </Typography>
              <Typography variant="caption" sx={{ display: 'block', mb: 2 }}>
                Caption - Small text for labels and captions
              </Typography>
              <Typography variant="overline" sx={{ display: 'block' }}>
                Overline - Uppercase labels
              </Typography>
            </CardContent>
          </Card>
        </Section>

        {/* Buttons Section */}
        <Section title="Buttons" description="Primary, secondary, and ghost button variants">
          <Card>
            <CardContent sx={{ p: 6 }}>
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 4 }}>
                <Button variant="contained" color="primary">
                  Primary Button
                </Button>
                <Button variant="outlined" color="primary">
                  Secondary Button
                </Button>
                <Button variant="text" color="primary">
                  Ghost Button
                </Button>
              </Box>
              
              <Typography variant="h6" sx={{ mb: 3 }}>Button Sizes</Typography>
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap', mb: 4 }}>
                <Button variant="contained" size="small">
                  Small
                </Button>
                <Button variant="contained" size="medium">
                  Medium
                </Button>
                <Button variant="contained" size="large">
                  Large
                </Button>
              </Box>

              <Typography variant="h6" sx={{ mb: 3 }}>With Icons</Typography>
              <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
                <Button variant="contained" endIcon={<ArrowForward />}>
                  Continue
                </Button>
                <Button variant="outlined" startIcon={<Favorite />}>
                  Save
                </Button>
                <IconButton color="primary" sx={{ minWidth: 44, minHeight: 44 }}>
                  <Share />
                </IconButton>
              </Box>
            </CardContent>
          </Card>
        </Section>

        {/* Cards Section */}
        <Section title="Cards" description="Various card styles and layouts">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h5" sx={{ mb: 2 }}>
                    Standard Card
                  </Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.neutral[400] }}>
                    This is a standard card with glassmorphism effect, subtle border, 
                    and rounded corners. Perfect for general content containers.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <ModernStatsCard 
                icon={<WbSunny />}
                label="Weather"
                value="23°C"
                description="Clear and pleasant"
                additionalInfo={[
                  { label: 'Humidity', value: '46%' },
                  { label: 'Wind', value: '18 km/h' },
                ]}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <PremiumDestinationCard destination={sampleDestination} />
            </Grid>
            <Grid item xs={12} md={6}>
              <SkeletonCard variant="destination" />
            </Grid>
          </Grid>
        </Section>

        {/* Forms Section */}
        <Section title="Form Elements" description="Inputs, search, and form controls">
          <Card>
            <CardContent sx={{ p: 6 }}>
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Standard Input"
                    placeholder="Enter text..."
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    placeholder="Search destinations..."
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <Search sx={{ color: theme.palette.neutral[400] }} />
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Textarea"
                    placeholder="Enter longer text..."
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Section>

        {/* Chips Section */}
        <Section title="Chips" description="Tags and labels">
          <Card>
            <CardContent sx={{ p: 6 }}>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 4 }}>
                <Chip label="Default" />
                <Chip label="Primary" color="primary" />
                <Chip label="Secondary" color="secondary" />
                <Chip label="Success" color="success" />
                <Chip label="Warning" color="warning" />
                <Chip label="Error" color="error" />
              </Box>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Chip label="Clickable" onClick={() => {}} />
                <Chip label="Deletable" onDelete={() => {}} />
                <Chip label="With Icon" icon={<Flight />} />
              </Box>
            </CardContent>
          </Card>
        </Section>

        {/* Alerts Section */}
        <Section title="Alerts" description="Feedback and notifications">
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Alert severity="success">This is a success alert</Alert>
            </Grid>
            <Grid item xs={12} md={6}>
              <Alert severity="info">This is an info alert</Alert>
            </Grid>
            <Grid item xs={12} md={6}>
              <Alert severity="warning">This is a warning alert</Alert>
            </Grid>
            <Grid item xs={12} md={6}>
              <Alert severity="error">This is an error alert</Alert>
            </Grid>
          </Grid>
        </Section>

        {/* Loading States Section */}
        <Section title="Loading States" description="Spinners and skeleton loaders">
          <Card>
            <CardContent sx={{ p: 6 }}>
              <Grid container spacing={4} alignItems="center">
                <Grid item xs={12} md={6}>
                  <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="h6" sx={{ mb: 3 }}>Loading Spinner</Typography>
                    <LoadingSpinner />
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" sx={{ mb: 3 }}>Skeleton Loader</Typography>
                  <SkeletonCard variant="stats" />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Section>

        {/* Spacing Section */}
        <Section title="Spacing System" description="8px base unit spacing scale">
          <Card>
            <CardContent sx={{ p: 6 }}>
              <Typography variant="body2" sx={{ mb: 4, color: theme.palette.neutral[400] }}>
                All spacing follows an 8px base unit for consistency
              </Typography>
              {[2, 4, 6, 8, 12, 16].map((space) => (
                <Box key={space} sx={{ mb: 3 }}>
                  <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
                    spacing[{space}] = {space * 8}px
                  </Typography>
                  <Box
                    sx={{
                      height: 40,
                      width: `${space * 8}px`,
                      backgroundColor: theme.palette.primary.main,
                      borderRadius: 1,
                    }}
                  />
                </Box>
              ))}
            </CardContent>
          </Card>
        </Section>

        {/* Images Section */}
        <Section title="Images" description="Lazy loading and optimization">
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card>
                <LazyImage
                  src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800"
                  alt="Paris cityscape"
                  style={{ width: '100%', height: 300, objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6">Lazy Loaded Image</Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.neutral[400] }}>
                    Images are lazy loaded for better performance
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card>
                <Box
                  sx={{
                    width: '100%',
                    height: 300,
                    background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.2) 0%, rgba(100, 116, 139, 0.2) 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Typography variant="h6">Placeholder</Typography>
                </Box>
                <CardContent>
                  <Typography variant="h6">Gradient Background</Typography>
                  <Typography variant="body2" sx={{ color: theme.palette.neutral[400] }}>
                    Subtle gradients for visual interest
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Section>

        {/* Footer */}
        <Box sx={{ mt: 12, textAlign: 'center' }}>
          <Divider sx={{ mb: 6 }} />
          <Typography variant="body2" sx={{ color: theme.palette.neutral[500] }}>
            TravelSnap Design System • Version 1.0.0
          </Typography>
          <Typography variant="caption" sx={{ color: theme.palette.neutral[600], display: 'block', mt: 1 }}>
            For more information, see the{' '}
            <a href="/theme/STYLE_GUIDE.md" style={{ color: theme.palette.primary.main }}>
              Style Guide
            </a>
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

// Helper Components

function Section({ title, description, children }) {
  const theme = useTheme();
  
  return (
    <Box sx={{ mb: 12 }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h2" sx={{ mb: 2 }}>
          {title}
        </Typography>
        <Typography variant="body1" sx={{ color: theme.palette.neutral[400] }}>
          {description}
        </Typography>
      </Box>
      {children}
    </Box>
  );
}

function ColorPaletteCard({ title, colors }) {
  const theme = useTheme();
  
  return (
    <Card>
      <CardContent>
        <Typography variant="h6" sx={{ mb: 3 }}>
          {title}
        </Typography>
        {colors.map((color) => (
          <Box key={color.name} sx={{ mb: 2 }}>
            <Box
              sx={{
                width: '100%',
                height: 60,
                backgroundColor: color.value,
                borderRadius: 2,
                mb: 1,
              }}
            />
            <Typography variant="caption" sx={{ color: theme.palette.neutral[400] }}>
              {color.name}
            </Typography>
            <Typography variant="caption" sx={{ display: 'block', color: theme.palette.neutral[500] }}>
              {color.value}
            </Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  );
}

export default ComponentShowcase;
