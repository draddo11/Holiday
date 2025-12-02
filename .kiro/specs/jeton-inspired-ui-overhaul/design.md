# Design Document

## Overview

This design transforms TravelSnap into a premium, modern travel application inspired by Jeton's sophisticated design language. The overhaul focuses on clean aesthetics, bold typography, smooth animations, and a professional color palette that builds trust and enhances usability.

### Key Design Principles (Jeton-Inspired)

1. **Bold Typography** - Large, confident headings with clear hierarchy
2. **Generous White Space** - Breathing room between elements
3. **Subtle Gradients** - Soft color transitions for depth
4. **Smooth Animations** - Purposeful motion that enhances UX
5. **Clean Cards** - Minimal borders, subtle shadows, rounded corners
6. **Professional Color Palette** - Trust-building blues, purples, and neutrals
7. **Consistent Spacing** - 8px base unit system
8. **Premium Feel** - High-quality imagery and polished details

## Architecture

### Design System Structure

```
┌─────────────────────────────────────────────────────────────┐
│                     Design Tokens                            │
│  - Colors (Primary, Secondary, Neutral, Semantic)           │
│  - Typography (Font families, sizes, weights)               │
│  - Spacing (8px base unit scale)                            │
│  - Shadows (Elevation system)                               │
│  - Border Radius (Consistent rounding)                      │
│  - Transitions (Timing functions, durations)                │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    Component Library                         │
│  - Buttons (Primary, Secondary, Ghost)                      │
│  - Cards (Standard, Featured, Data)                         │
│  - Navigation (Header, Footer, Mobile Menu)                 │
│  - Forms (Inputs, Selects, Checkboxes)                      │
│  - Data Display (Stats, Charts, Tables)                     │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      Page Layouts                            │
│  - Homepage (Hero + Features + CTA)                         │
│  - Destinations (Grid + Filters)                            │
│  - Search (Results + Sidebar)                               │
│  - AI Photo (Upload + Preview)                              │
└─────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### 1. Design Tokens System

**File**: `travelsnap-react/src/theme/tokens.js`


**Color Palette** (Jeton-Inspired):
```javascript
export const colors = {
  // Primary - Trust & Professionalism (Blue-Purple)
  primary: {
    50: '#F0F4FF',
    100: '#E0E7FF',
    200: '#C7D2FE',
    300: '#A5B4FC',
    400: '#818CF8',
    500: '#6366F1',  // Main brand color
    600: '#4F46E5',
    700: '#4338CA',
    800: '#3730A3',
    900: '#312E81',
  },
  
  // Secondary - Energy & Action (Vibrant Purple)
  secondary: {
    50: '#FAF5FF',
    100: '#F3E8FF',
    200: '#E9D5FF',
    300: '#D8B4FE',
    400: '#C084FC',
    500: '#A855F7',  // Accent color
    600: '#9333EA',
    700: '#7E22CE',
    800: '#6B21A8',
    900: '#581C87',
  },
  
  // Neutral - Clean & Modern
  neutral: {
    0: '#FFFFFF',
    50: '#F9FAFB',
    100: '#F3F4F6',
    200: '#E5E7EB',
    300: '#D1D5DB',
    400: '#9CA3AF',
    500: '#6B7280',
    600: '#4B5563',
    700: '#374151',
    800: '#1F2937',
    900: '#111827',
    950: '#030712',
  },
  
  // Semantic Colors
  success: '#10B981',
  warning: '#F59E0B',
  error: '#EF4444',
  info: '#3B82F6',
  
  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #6366F1 0%, #A855F7 100%)',
    hero: 'linear-gradient(180deg, #030712 0%, #1F2937 50%, #374151 100%)',
    card: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
    glass: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
  }
};
```

**Typography System**:
```javascript
export const typography = {
  fontFamily: {
    primary: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    display: '"Cal Sans", "Inter", sans-serif', // For hero headings
    mono: '"JetBrains Mono", "Fira Code", monospace',
  },
  
  fontSize: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
    '7xl': '4.5rem',    // 72px
  },
  
  fontWeight: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },
  
  lineHeight: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },
  
  letterSpacing: {
    tight: '-0.02em',
    normal: '0',
    wide: '0.02em',
  }
};
```

**Spacing Scale** (8px base unit):
```javascript
export const spacing = {
  0: '0',
  1: '0.25rem',   // 4px
  2: '0.5rem',    // 8px
  3: '0.75rem',   // 12px
  4: '1rem',      // 16px
  5: '1.25rem',   // 20px
  6: '1.5rem',    // 24px
  8: '2rem',      // 32px
  10: '2.5rem',   // 40px
  12: '3rem',     // 48px
  16: '4rem',     // 64px
  20: '5rem',     // 80px
  24: '6rem',     // 96px
  32: '8rem',     // 128px
};
```

**Shadow System**:
```javascript
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  glow: '0 0 20px rgba(99, 102, 241, 0.3)',
  glowHover: '0 0 30px rgba(99, 102, 241, 0.5)',
};
```

**Border Radius**:
```javascript
export const borderRadius = {
  none: '0',
  sm: '0.25rem',   // 4px
  base: '0.5rem',  // 8px
  md: '0.75rem',   // 12px
  lg: '1rem',      // 16px
  xl: '1.5rem',    // 24px
  '2xl': '2rem',   // 32px
  full: '9999px',
};
```

**Transitions**:
```javascript
export const transitions = {
  duration: {
    fast: '150ms',
    base: '250ms',
    slow: '350ms',
    slower: '500ms',
  },
  
  timing: {
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
    easeIn: 'cubic-bezier(0.4, 0, 1, 1)',
    easeOut: 'cubic-bezier(0, 0, 0.2, 1)',
    easeInOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
    spring: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  }
};
```

### 2. Modern Navigation Component

**File**: `travelsnap-react/src/components/Navigation.jsx`

**Design Specifications**:


```jsx
// Sticky navigation with backdrop blur
<AppBar 
  position="sticky"
  elevation={0}
  sx={{
    backgroundColor: 'rgba(3, 7, 18, 0.8)',
    backdropFilter: 'blur(20px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease',
  }}
>
  <Container maxWidth="xl">
    <Toolbar sx={{ py: 2, justifyContent: 'space-between' }}>
      {/* Logo */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        <Box sx={{
          width: 40,
          height: 40,
          borderRadius: '12px',
          background: colors.gradients.primary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.5rem',
        }}>
          ✈️
        </Box>
        <Typography variant="h6" sx={{ 
          fontWeight: 800, 
          fontSize: '1.5rem',
          background: colors.gradients.primary,
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          TravelSnap
        </Typography>
      </Box>

      {/* Navigation Links */}
      <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1 }}>
        {navItems.map((item) => (
          <Button
            key={item.path}
            sx={{
              color: 'white',
              px: 3,
              py: 1.5,
              fontSize: '0.9375rem',
              fontWeight: 500,
              position: 'relative',
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: 0,
                left: '50%',
                transform: 'translateX(-50%) scaleX(0)',
                width: '80%',
                height: '2px',
                background: colors.gradients.primary,
                transition: 'transform 0.3s ease',
              },
              '&:hover::after': {
                transform: 'translateX(-50%) scaleX(1)',
              },
              '&.active': {
                color: colors.primary[400],
                '&::after': {
                  transform: 'translateX(-50%) scaleX(1)',
                }
              }
            }}
          >
            {item.label}
          </Button>
        ))}
      </Box>

      {/* CTA Button */}
      <Button
        variant="contained"
        sx={{
          background: colors.gradients.primary,
          px: 4,
          py: 1.5,
          borderRadius: '12px',
          fontWeight: 600,
          textTransform: 'none',
          boxShadow: shadows.glow,
          transition: 'all 0.3s ease',
          '&:hover': {
            boxShadow: shadows.glowHover,
            transform: 'translateY(-2px)',
          }
        }}
      >
        Get Started
      </Button>
    </Toolbar>
  </Container>
</AppBar>
```

### 3. Hero Section (Homepage)

**Design Specifications**:

```jsx
<Box sx={{
  minHeight: '90vh',
  display: 'flex',
  alignItems: 'center',
  background: colors.gradients.hero,
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 50%, rgba(99, 102, 241, 0.15) 0%, transparent 50%)',
  }
}}>
  <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
    <Box sx={{ textAlign: 'center', py: 12 }}>
      {/* Eyebrow */}
      <Chip 
        label="✨ AI-Powered Travel Photos"
        sx={{
          mb: 4,
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          color: colors.primary[300],
          fontWeight: 600,
          fontSize: '0.875rem',
          px: 2,
          py: 3,
        }}
      />

      {/* Main Heading */}
      <Typography
        variant="h1"
        sx={{
          fontSize: { xs: '3rem', md: '5rem', lg: '6rem' },
          fontWeight: 800,
          lineHeight: 1.1,
          mb: 3,
          background: 'linear-gradient(135deg, #FFFFFF 0%, #A5B4FC 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '-0.02em',
        }}
      >
        Your Journey,
        <br />
        Reimagined
      </Typography>

      {/* Subheading */}
      <Typography
        variant="h5"
        sx={{
          fontSize: { xs: '1.125rem', md: '1.5rem' },
          color: colors.neutral[400],
          mb: 6,
          maxWidth: '700px',
          mx: 'auto',
          lineHeight: 1.6,
          fontWeight: 400,
        }}
      >
        Create stunning travel memories with AI. Transform your photos into
        professional travel postcards in seconds.
      </Typography>

      {/* CTA Buttons */}
      <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
        <Button
          variant="contained"
          size="large"
          sx={{
            background: colors.gradients.primary,
            px: 6,
            py: 2,
            fontSize: '1.125rem',
            fontWeight: 600,
            borderRadius: '16px',
            textTransform: 'none',
            boxShadow: shadows.glow,
            transition: 'all 0.3s ease',
            '&:hover': {
              boxShadow: shadows.glowHover,
              transform: 'translateY(-4px) scale(1.02)',
            }
          }}
        >
          Start Creating
          <ArrowForward sx={{ ml: 1 }} />
        </Button>

        <Button
          variant="outlined"
          size="large"
          sx={{
            px: 6,
            py: 2,
            fontSize: '1.125rem',
            fontWeight: 600,
            borderRadius: '16px',
            textTransform: 'none',
            borderColor: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            transition: 'all 0.3s ease',
            '&:hover': {
              borderColor: colors.primary[400],
              backgroundColor: 'rgba(99, 102, 241, 0.1)',
              transform: 'translateY(-2px)',
            }
          }}
        >
          Explore Destinations
        </Button>
      </Box>

      {/* Stats */}
      <Box sx={{ 
        display: 'flex', 
        gap: 8, 
        justifyContent: 'center', 
        mt: 12,
        flexWrap: 'wrap'
      }}>
        {[
          { value: '10K+', label: 'Photos Created' },
          { value: '50+', label: 'Destinations' },
          { value: '4.9', label: 'User Rating' },
        ].map((stat, index) => (
          <Box key={index} sx={{ textAlign: 'center' }}>
            <Typography variant="h3" sx={{ 
              fontWeight: 800, 
              color: 'white',
              mb: 1 
            }}>
              {stat.value}
            </Typography>
            <Typography variant="body2" sx={{ color: colors.neutral[400] }}>
              {stat.label}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  </Container>

  {/* Decorative Elements */}
  <Box sx={{
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '200px',
    background: 'linear-gradient(180deg, transparent 0%, rgba(3, 7, 18, 1) 100%)',
  }} />
</Box>
```

### 4. Premium Destination Cards

**Design Specifications**:

```jsx
<Card
  elevation={0}
  sx={{
    borderRadius: '24px',
    overflow: 'hidden',
    background: colors.gradients.glass,
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
    cursor: 'pointer',
    '&:hover': {
      transform: 'translateY(-12px) scale(1.02)',
      boxShadow: shadows['2xl'],
      borderColor: 'rgba(99, 102, 241, 0.3)',
      '& .card-image': {
        transform: 'scale(1.1)',
      },
      '& .card-overlay': {
        opacity: 1,
      }
    }
  }}
>
  {/* Image Container */}
  <Box sx={{ 
    position: 'relative', 
    paddingTop: '66.67%', // 3:2 aspect ratio
    overflow: 'hidden',
  }}>
    <Box
      className="card-image"
      component="img"
      src={destination.image}
      alt={destination.name}
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        transition: 'transform 0.6s ease',
      }}
    />
    
    {/* Gradient Overlay */}
    <Box
      className="card-overlay"
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.7) 100%)',
        opacity: 0.6,
        transition: 'opacity 0.4s ease',
      }}
    />

    {/* Badge */}
    <Chip
      label="Popular"
      size="small"
      sx={{
        position: 'absolute',
        top: 16,
        right: 16,
        backgroundColor: 'rgba(99, 102, 241, 0.9)',
        backdropFilter: 'blur(10px)',
        color: 'white',
        fontWeight: 600,
        fontSize: '0.75rem',
      }}
    />
  </Box>

  {/* Content */}
  <CardContent sx={{ p: 4 }}>
    <Typography variant="h5" sx={{ 
      fontWeight: 700, 
      mb: 1,
      color: 'white',
    }}>
      {destination.name}
    </Typography>
    
    <Typography variant="body2" sx={{ 
      color: colors.neutral[400],
      mb: 3,
      lineHeight: 1.6,
    }}>
      {destination.tagline}
    </Typography>

    {/* Features */}
    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
      {destination.features.map((feature, index) => (
        <Chip
          key={index}
          label={feature}
          size="small"
          sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            color: colors.neutral[300],
            fontSize: '0.75rem',
            fontWeight: 500,
          }}
        />
      ))}
    </Box>

    {/* Action */}
    <Button
      fullWidth
      variant="outlined"
      sx={{
        borderColor: 'rgba(255, 255, 255, 0.1)',
        color: 'white',
        py: 1.5,
        borderRadius: '12px',
        fontWeight: 600,
        textTransform: 'none',
        transition: 'all 0.3s ease',
        '&:hover': {
          borderColor: colors.primary[400],
          backgroundColor: 'rgba(99, 102, 241, 0.1)',
        }
      }}
    >
      Explore Destination
      <ArrowForward sx={{ ml: 1, fontSize: '1rem' }} />
    </Button>
  </CardContent>
</Card>
```

### 5. Data Visualization Cards (Search Page)

**Design Specifications**:


```jsx
// Modern Stats Card
<Card
  elevation={0}
  sx={{
    p: 4,
    borderRadius: '24px',
    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(168, 85, 247, 0.1) 100%)',
    backdropFilter: 'blur(20px)',
    border: '1px solid rgba(99, 102, 241, 0.2)',
    position: 'relative',
    overflow: 'hidden',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      borderColor: 'rgba(99, 102, 241, 0.4)',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      right: 0,
      width: '150px',
      height: '150px',
      background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)',
      borderRadius: '50%',
      transform: 'translate(30%, -30%)',
    }
  }}
>
  {/* Icon */}
  <Box sx={{
    width: 56,
    height: 56,
    borderRadius: '16px',
    background: colors.gradients.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    mb: 3,
    boxShadow: shadows.glow,
  }}>
    <WbSunny sx={{ fontSize: 28, color: 'white' }} />
  </Box>

  {/* Label */}
  <Typography variant="caption" sx={{
    color: colors.neutral[400],
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    fontWeight: 600,
    fontSize: '0.75rem',
    display: 'block',
    mb: 1,
  }}>
    Weather
  </Typography>

  {/* Value */}
  <Typography variant="h2" sx={{
    fontWeight: 800,
    color: 'white',
    mb: 0.5,
    fontSize: { xs: '2.5rem', md: '3rem' },
    lineHeight: 1,
  }}>
    23°C
  </Typography>

  {/* Description */}
  <Typography variant="body2" sx={{
    color: colors.neutral[400],
    mb: 3,
  }}>
    Clear and pleasant
  </Typography>

  {/* Additional Info */}
  <Box sx={{ 
    display: 'flex', 
    gap: 3,
    pt: 3,
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  }}>
    <Box>
      <Typography variant="caption" sx={{ color: colors.neutral[500], display: 'block' }}>
        Humidity
      </Typography>
      <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
        46%
      </Typography>
    </Box>
    <Box>
      <Typography variant="caption" sx={{ color: colors.neutral[500], display: 'block' }}>
        Wind
      </Typography>
      <Typography variant="body1" sx={{ color: 'white', fontWeight: 600 }}>
        18 km/h
      </Typography>
    </Box>
  </Box>
</Card>
```

### 6. Modern Search Interface

**Design Specifications**:

```jsx
<Box sx={{
  p: 4,
  borderRadius: '24px',
  background: 'rgba(255, 255, 255, 0.03)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
}}>
  <TextField
    fullWidth
    placeholder="Search destinations..."
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <Search sx={{ color: colors.neutral[400] }} />
        </InputAdornment>
      ),
      sx: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '16px',
        fontSize: '1.125rem',
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(255, 255, 255, 0.1)',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: 'rgba(99, 102, 241, 0.3)',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: colors.primary[400],
          borderWidth: '2px',
        },
        '& input': {
          color: 'white',
          py: 2,
        },
        '& input::placeholder': {
          color: colors.neutral[500],
          opacity: 1,
        }
      }
    }}
  />
</Box>
```

### 7. Skeleton Loaders

**Design Specifications**:

```jsx
// Shimmer effect skeleton
<Box sx={{
  borderRadius: '24px',
  overflow: 'hidden',
  background: 'rgba(255, 255, 255, 0.03)',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
    animation: 'shimmer 2s infinite',
  },
  '@keyframes shimmer': {
    '0%': { left: '-100%' },
    '100%': { left: '100%' },
  }
}}>
  <Box sx={{ p: 4 }}>
    <Skeleton variant="circular" width={56} height={56} sx={{ mb: 2, bgcolor: 'rgba(255, 255, 255, 0.05)' }} />
    <Skeleton variant="text" width="60%" sx={{ mb: 1, bgcolor: 'rgba(255, 255, 255, 0.05)' }} />
    <Skeleton variant="text" width="40%" sx={{ bgcolor: 'rgba(255, 255, 255, 0.05)' }} />
  </Box>
</Box>
```

### 8. Footer Component

**Design Specifications**:

```jsx
<Box sx={{
  backgroundColor: colors.neutral[950],
  borderTop: '1px solid rgba(255, 255, 255, 0.1)',
  pt: 12,
  pb: 6,
}}>
  <Container maxWidth="xl">
    <Grid container spacing={6}>
      {/* Brand Column */}
      <Grid item xs={12} md={4}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
          <Box sx={{
            width: 48,
            height: 48,
            borderRadius: '12px',
            background: colors.gradients.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
          }}>
            ✈️
          </Box>
          <Typography variant="h5" sx={{ fontWeight: 800, color: 'white' }}>
            TravelSnap
          </Typography>
        </Box>
        <Typography variant="body2" sx={{ color: colors.neutral[400], mb: 3, lineHeight: 1.7 }}>
          Create stunning travel memories with AI-powered photo generation.
          Transform your journey into professional postcards.
        </Typography>
        {/* Social Icons */}
        <Box sx={{ display: 'flex', gap: 2 }}>
          {['twitter', 'instagram', 'facebook'].map((social) => (
            <IconButton
              key={social}
              sx={{
                width: 40,
                height: 40,
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                color: colors.neutral[400],
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: 'rgba(99, 102, 241, 0.2)',
                  color: colors.primary[400],
                  transform: 'translateY(-2px)',
                }
              }}
            >
              {/* Icon component */}
            </IconButton>
          ))}
        </Box>
      </Grid>

      {/* Links Columns */}
      {footerSections.map((section) => (
        <Grid item xs={6} md={2} key={section.title}>
          <Typography variant="subtitle2" sx={{
            color: 'white',
            fontWeight: 700,
            mb: 3,
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontSize: '0.75rem',
          }}>
            {section.title}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {section.links.map((link) => (
              <Link
                key={link}
                href="#"
                sx={{
                  color: colors.neutral[400],
                  textDecoration: 'none',
                  fontSize: '0.875rem',
                  transition: 'color 0.3s ease',
                  '&:hover': {
                    color: colors.primary[400],
                  }
                }}
              >
                {link}
              </Link>
            ))}
          </Box>
        </Grid>
      ))}
    </Grid>

    {/* Bottom Bar */}
    <Box sx={{
      mt: 12,
      pt: 6,
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      flexWrap: 'wrap',
      gap: 3,
    }}>
      <Typography variant="body2" sx={{ color: colors.neutral[500] }}>
        © 2025 TravelSnap. All rights reserved.
      </Typography>
      <Box sx={{ display: 'flex', gap: 4 }}>
        <Link href="#" sx={{ color: colors.neutral[500], fontSize: '0.875rem', textDecoration: 'none' }}>
          Privacy Policy
        </Link>
        <Link href="#" sx={{ color: colors.neutral[500], fontSize: '0.875rem', textDecoration: 'none' }}>
          Terms of Service
        </Link>
      </Box>
    </Box>
  </Container>
</Box>
```

## Data Models

### Theme Configuration

```typescript
interface ThemeConfig {
  colors: ColorPalette;
  typography: TypographySystem;
  spacing: SpacingScale;
  shadows: ShadowSystem;
  borderRadius: BorderRadiusScale;
  transitions: TransitionConfig;
}

interface ColorPalette {
  primary: ColorScale;
  secondary: ColorScale;
  neutral: ColorScale;
  success: string;
  warning: string;
  error: string;
  info: string;
  gradients: GradientSet;
}

interface TypographySystem {
  fontFamily: FontFamilySet;
  fontSize: FontSizeScale;
  fontWeight: FontWeightScale;
  lineHeight: LineHeightScale;
  letterSpacing: LetterSpacingScale;
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Spacing consistency
*For any* UI element using spacing values, the spacing should be a multiple of the 8px base unit.
**Validates: Requirements 9.1**

### Property 2: Color contrast compliance
*For any* text element, the contrast ratio between text and background should meet WCAG AA standards (minimum 4.5:1 for normal text).
**Validates: Requirements 10.1**

### Property 3: Animation respect for reduced motion
*For any* animated element, when prefers-reduced-motion is enabled, animations should be disabled or significantly reduced.
**Validates: Requirements 10.5**

### Property 4: Touch target size
*For any* interactive element, the minimum touch target size should be 44x44px on mobile devices.
**Validates: Requirements 10.4**

### Property 5: Responsive breakpoint consistency
*For any* responsive layout, breakpoints should follow the defined system (xs: 0px, sm: 600px, md: 900px, lg: 1200px, xl: 1536px).
**Validates: Requirements 9.5**

## Error Handling

### Theme Loading Errors

**Missing Design Tokens**:
```javascript
const getToken = (path, fallback) => {
  try {
    return get(tokens, path);
  } catch (error) {
    console.warn(`Design token not found: ${path}, using fallback`);
    return fallback;
  }
};
```

### Animation Performance

**Frame Rate Monitoring**:
```javascript
const usePerformanceMonitor = () => {
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();
    
    const checkFPS = () => {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime >= lastTime + 1000) {
        const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
        if (fps < 30) {
          console.warn('Low FPS detected, consider reducing animations');
        }
        frameCount = 0;
        lastTime = currentTime;
      }
      
      requestAnimationFrame(checkFPS);
    };
    
    requestAnimationFrame(checkFPS);
  }, []);
};
```

## Testing Strategy

### Visual Regression Testing

**Component Screenshots**:
- Capture baseline screenshots of all components
- Test at multiple breakpoints
- Compare against baselines on each build
- Flag visual differences for review

### Accessibility Testing

**Automated Tests**:
- Run axe-core on all pages
- Check color contrast ratios
- Verify ARIA labels
- Test keyboard navigation
- Validate focus indicators

### Performance Testing

**Metrics to Monitor**:
- First Contentful Paint (FCP) < 1.8s
- Largest Contentful Paint (LCP) < 2.5s
- Cumulative Layout Shift (CLS) < 0.1
- First Input Delay (FID) < 100ms
- Time to Interactive (TTI) < 3.8s

### Cross-Browser Testing

**Test Matrix**:
- Chrome (latest 2 versions)
- Firefox (latest 2 versions)
- Safari (latest 2 versions)
- Edge (latest 2 versions)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android 10+)

## Implementation Notes

### Performance Optimization

**Code Splitting**:
```javascript
// Lazy load heavy components
const DestinationsPage = lazy(() => import('./pages/DestinationsPage'));
const AIPhotoPage = lazy(() => import('./pages/AIPhotoPage'));
```

**Image Optimization**:
- Use WebP format with JPEG fallback
- Implement lazy loading for images
- Use responsive images with srcset
- Compress images to < 200KB

**CSS Optimization**:
- Use CSS-in-JS with emotion for better tree-shaking
- Minimize use of inline styles
- Use CSS transforms for animations (not position/size)
- Implement critical CSS extraction

### Browser Compatibility

**Polyfills Needed**:
- Intersection Observer (for lazy loading)
- ResizeObserver (for responsive components)
- CSS backdrop-filter (for glassmorphism)

**Fallbacks**:
```css
/* Backdrop filter fallback */
.glass-card {
  background: rgba(255, 255, 255, 0.1); /* Fallback */
  backdrop-filter: blur(20px);
}

@supports not (backdrop-filter: blur(20px)) {
  .glass-card {
    background: rgba(255, 255, 255, 0.15);
  }
}
```

### Accessibility Best Practices

**Focus Management**:
- Visible focus indicators on all interactive elements
- Logical tab order
- Skip links for keyboard users
- Focus trap in modals

**Screen Reader Support**:
- Semantic HTML elements
- ARIA labels where needed
- Alt text for all images
- Live regions for dynamic content

### Future Enhancements

**Advanced Features**:
- Dark/Light mode toggle with smooth transition
- Custom theme builder for users
- Advanced animations with Framer Motion
- 3D card effects with CSS transforms
- Parallax scrolling effects
- Interactive data visualizations
- Micro-interactions on all interactive elements
- Advanced loading states with skeleton screens
