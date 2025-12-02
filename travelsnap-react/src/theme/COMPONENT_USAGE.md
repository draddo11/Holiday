# Component Usage Guide

## Overview

This guide provides detailed usage instructions for all components in the TravelSnap design system. Each component includes code examples, props documentation, and best practices.

## Table of Contents

1. [Buttons](#buttons)
2. [Cards](#cards)
3. [Navigation](#navigation)
4. [Forms](#forms)
5. [Loading States](#loading-states)
6. [Images](#images)
7. [Layout](#layout)
8. [Utility Components](#utility-components)

---

## Buttons

### Primary Button

Use for main actions and CTAs.

```jsx
import { Button } from '@mui/material';

<Button variant="contained" color="primary">
  Primary Action
</Button>
```

**Props:**
- `variant`: "contained" (default), "outlined", "text"
- `color`: "primary", "secondary", "success", "error", "warning", "info"
- `size`: "small", "medium" (default), "large"
- `disabled`: boolean
- `startIcon`: React element
- `endIcon`: React element

**Examples:**

```jsx
// With icon
<Button variant="contained" endIcon={<ArrowForward />}>
  Continue
</Button>

// Large size
<Button variant="contained" size="large">
  Get Started
</Button>

// Disabled state
<Button variant="contained" disabled>
  Disabled
</Button>
```

### Secondary Button

Use for secondary actions.

```jsx
<Button variant="outlined" color="primary">
  Secondary Action
</Button>
```

### Ghost Button

Use for tertiary actions.

```jsx
<Button variant="text" color="primary">
  Tertiary Action
</Button>
```

### Icon Button

Use for icon-only actions.

```jsx
import { IconButton } from '@mui/material';
import { Favorite } from '@mui/icons-material';

<IconButton 
  color="primary" 
  aria-label="Add to favorites"
  sx={{ minWidth: 44, minHeight: 44 }}
>
  <Favorite />
</IconButton>
```

**Accessibility Note:** Always include `aria-label` for icon buttons.

---

## Cards

### Standard Card

General purpose content container.

```jsx
import { Card, CardContent, Typography } from '@mui/material';

<Card>
  <CardContent>
    <Typography variant="h5" gutterBottom>
      Card Title
    </Typography>
    <Typography variant="body2" color="text.secondary">
      Card content goes here
    </Typography>
  </CardContent>
</Card>
```

**Props:**
- `elevation`: 0-24 (default: 0)
- `sx`: Style overrides

### Premium Destination Card

Showcase destinations with rich media.

```jsx
import PremiumDestinationCard from '../components/PremiumDestinationCard';

const destination = {
  id: 1,
  name: 'Paris, France',
  tagline: 'The City of Light',
  image: 'https://example.com/paris.jpg',
  features: ['Iconic', 'Romantic', 'Cultural'],
  popular: true,
};

<PremiumDestinationCard destination={destination} />
```

**Props:**
- `destination`: Object with properties:
  - `id`: number
  - `name`: string
  - `tagline`: string
  - `image`: string (URL)
  - `features`: string[]
  - `popular`: boolean (optional)

**Features:**
- Image with hover scale animation
- Gradient overlay
- Popular badge (if `popular: true`)
- Feature chips
- Smooth hover effect

### Modern Stats Card

Display data and statistics.

```jsx
import ModernStatsCard from '../components/ModernStatsCard';
import { WbSunny } from '@mui/icons-material';

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
```

**Props:**
- `icon`: React element (MUI icon)
- `label`: string
- `value`: string or number
- `description`: string (optional)
- `additionalInfo`: Array of { label: string, value: string } (optional)

---

## Navigation

### Modern Navigation

Sticky navigation with backdrop blur.

```jsx
import ModernNavigation from '../components/ModernNavigation';

<ModernNavigation />
```

**Features:**
- Sticky positioning
- Backdrop blur effect
- Gradient logo
- Underline hover animations
- Mobile hamburger menu
- Active page highlighting

**Customization:**

The navigation automatically highlights the active page based on the current route. Navigation items are defined in the component.

### Modern Footer

Comprehensive footer with links.

```jsx
import ModernFooter from '../components/ModernFooter';

<ModernFooter />
```

**Features:**
- Multi-column layout
- Social media icons
- Link sections
- Copyright information
- Responsive stacking on mobile

---

## Forms

### Text Field

Custom styled input fields.

```jsx
import { TextField } from '@mui/material';

<TextField
  fullWidth
  label="Email"
  placeholder="Enter your email..."
  type="email"
/>
```

**Props:**
- `label`: string
- `placeholder`: string
- `type`: "text", "email", "password", "number", etc.
- `fullWidth`: boolean
- `multiline`: boolean
- `rows`: number (for multiline)
- `disabled`: boolean
- `error`: boolean
- `helperText`: string

**Examples:**

```jsx
// With icon
<TextField
  fullWidth
  placeholder="Search..."
  InputProps={{
    startAdornment: (
      <InputAdornment position="start">
        <Search />
      </InputAdornment>
    ),
  }}
/>

// Multiline
<TextField
  fullWidth
  multiline
  rows={4}
  label="Message"
  placeholder="Enter your message..."
/>

// Error state
<TextField
  fullWidth
  label="Email"
  error
  helperText="Please enter a valid email"
/>
```

### Search Field

Specialized search input.

```jsx
import { TextField, InputAdornment } from '@mui/material';
import { Search } from '@mui/icons-material';

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
```

---

## Loading States

### Skeleton Loader

Show loading placeholders.

```jsx
import SkeletonCard from '../components/SkeletonCard';

<SkeletonCard variant="destination" />
```

**Props:**
- `variant`: "destination", "stats", "card" (default)

**Variants:**

```jsx
// Destination card skeleton
<SkeletonCard variant="destination" />

// Stats card skeleton
<SkeletonCard variant="stats" />

// Generic card skeleton
<SkeletonCard variant="card" />
```

### Loading Spinner

Show loading indicator.

```jsx
import LoadingSpinner from '../components/LoadingSpinner';

<LoadingSpinner />
```

**Props:**
- `size`: number (default: 40)
- `color`: string (default: primary color)

**Example:**

```jsx
<Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
  <LoadingSpinner size={60} />
</Box>
```

### Inline Skeleton

Use MUI Skeleton for custom loading states.

```jsx
import { Skeleton } from '@mui/material';

<Skeleton variant="text" width="60%" />
<Skeleton variant="circular" width={40} height={40} />
<Skeleton variant="rectangular" width="100%" height={200} />
```

---

## Images

### Lazy Image

Optimized image loading with lazy loading.

```jsx
import LazyImage from '../components/LazyImage';

<LazyImage
  src="https://example.com/image.jpg"
  alt="Description of image"
  style={{ width: '100%', height: 300, objectFit: 'cover' }}
/>
```

**Props:**
- `src`: string (image URL)
- `alt`: string (required for accessibility)
- `style`: object (CSS styles)
- `className`: string

**Features:**
- Lazy loading (loads when in viewport)
- Placeholder while loading
- Error handling
- Optimized performance

**Best Practices:**

```jsx
// Always provide alt text
<LazyImage
  src={imageUrl}
  alt="Paris Eiffel Tower at sunset"
/>

// Use object-fit for consistent sizing
<LazyImage
  src={imageUrl}
  alt="Description"
  style={{ 
    width: '100%', 
    height: 300, 
    objectFit: 'cover',
    borderRadius: '16px',
  }}
/>
```

---

## Layout

### Container

Responsive container with max-width.

```jsx
import { Container } from '@mui/material';

<Container maxWidth="xl">
  Content
</Container>
```

**Props:**
- `maxWidth`: "xs", "sm", "md", "lg", "xl", false
- `disableGutters`: boolean

**Max Widths:**
- xs: 444px
- sm: 600px
- md: 900px
- lg: 1200px
- xl: 1536px

### Grid

Responsive grid layout.

```jsx
import { Grid } from '@mui/material';

<Grid container spacing={4}>
  <Grid item xs={12} md={6}>
    Column 1
  </Grid>
  <Grid item xs={12} md={6}>
    Column 2
  </Grid>
</Grid>
```

**Props:**
- `container`: boolean (for grid container)
- `item`: boolean (for grid item)
- `spacing`: 0-10 (gap between items)
- `xs`, `sm`, `md`, `lg`, `xl`: 1-12 or "auto"

**Examples:**

```jsx
// 3 columns on desktop, 1 on mobile
<Grid container spacing={3}>
  {items.map(item => (
    <Grid item xs={12} md={4} key={item.id}>
      <Card>{item.content}</Card>
    </Grid>
  ))}
</Grid>

// Responsive spacing
<Grid container spacing={{ xs: 2, md: 4 }}>
  {/* Items */}
</Grid>
```

### Box

Flexible container component.

```jsx
import { Box } from '@mui/material';

<Box sx={{ p: 4, backgroundColor: 'background.paper' }}>
  Content
</Box>
```

**Common Use Cases:**

```jsx
// Flex container
<Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
  <Icon />
  <Typography>Text</Typography>
</Box>

// Centered content
<Box sx={{ 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center',
  minHeight: '100vh',
}}>
  <Content />
</Box>

// Responsive padding
<Box sx={{ p: { xs: 3, md: 6 } }}>
  Content
</Box>
```

---

## Utility Components

### Skip Link

Accessibility navigation for keyboard users.

```jsx
import SkipLink from '../components/SkipLink';

<SkipLink />
```

**Usage:**

Place at the very top of your app, before navigation:

```jsx
function App() {
  return (
    <>
      <SkipLink />
      <Navigation />
      <main id="main-content" tabIndex={-1}>
        {/* Content */}
      </main>
    </>
  );
}
```

### Page Transition

Smooth transitions between pages.

```jsx
import PageTransition from '../components/PageTransition';

<PageTransition>
  <YourPage />
</PageTransition>
```

**Features:**
- Fade in/out animation
- Smooth page changes
- Respects reduced motion

### Chips

Tags and labels.

```jsx
import { Chip } from '@mui/material';

<Chip label="Popular" />
```

**Props:**
- `label`: string
- `color`: "default", "primary", "secondary", "success", "error", "warning", "info"
- `variant`: "filled" (default), "outlined"
- `size`: "small", "medium" (default)
- `icon`: React element
- `onDelete`: function (shows delete icon)
- `onClick`: function (makes clickable)

**Examples:**

```jsx
// Colored chip
<Chip label="Featured" color="primary" />

// With icon
<Chip label="Flight" icon={<Flight />} />

// Deletable
<Chip label="Tag" onDelete={() => handleDelete()} />

// Clickable
<Chip label="Filter" onClick={() => handleClick()} />

// Small size
<Chip label="New" size="small" color="success" />
```

### Divider

Visual separator.

```jsx
import { Divider } from '@mui/material';

<Divider />
```

**Examples:**

```jsx
// Horizontal divider
<Divider />

// Vertical divider
<Divider orientation="vertical" />

// With text
<Divider>OR</Divider>

// Custom styling
<Divider sx={{ my: 4, borderColor: 'rgba(255, 255, 255, 0.2)' }} />
```

### Alerts

Feedback messages.

```jsx
import { Alert } from '@mui/material';

<Alert severity="success">
  Operation completed successfully!
</Alert>
```

**Props:**
- `severity`: "success", "info", "warning", "error"
- `variant`: "filled", "outlined", "standard" (default)
- `onClose`: function (shows close button)

**Examples:**

```jsx
// Success alert
<Alert severity="success">
  Your changes have been saved!
</Alert>

// Error alert
<Alert severity="error">
  Something went wrong. Please try again.
</Alert>

// With close button
<Alert severity="info" onClose={() => handleClose()}>
  This is an informational message.
</Alert>

// Outlined variant
<Alert severity="warning" variant="outlined">
  Please review your information.
</Alert>
```

---

## Responsive Design

### Breakpoints

```javascript
breakpoints: {
  xs: 0,      // Mobile
  sm: 600,    // Tablet
  md: 900,    // Small desktop
  lg: 1200,   // Desktop
  xl: 1536,   // Large desktop
}
```

### Responsive Props

Most MUI components accept responsive props:

```jsx
// Responsive spacing
<Box sx={{ 
  p: { xs: 2, sm: 4, md: 6 },
  mb: { xs: 4, md: 8 },
}}>
  Content
</Box>

// Responsive display
<Box sx={{ 
  display: { xs: 'none', md: 'block' } 
}}>
  Desktop only
</Box>

// Responsive grid
<Grid item xs={12} sm={6} md={4} lg={3}>
  Responsive column
</Grid>
```

### Media Queries

Use theme breakpoints in sx prop:

```jsx
<Box sx={{
  fontSize: '1rem',
  [theme.breakpoints.up('md')]: {
    fontSize: '1.25rem',
  },
  [theme.breakpoints.up('lg')]: {
    fontSize: '1.5rem',
  },
}}>
  Responsive text
</Box>
```

---

## Accessibility Best Practices

### 1. Always Provide Alt Text

```jsx
<img src={url} alt="Descriptive text" />
<LazyImage src={url} alt="Descriptive text" />
```

### 2. Use ARIA Labels

```jsx
<IconButton aria-label="Close dialog">
  <Close />
</IconButton>

<Button aria-label="Add to favorites">
  <Favorite />
</Button>
```

### 3. Ensure Keyboard Navigation

```jsx
<Box
  tabIndex={0}
  onKeyDown={(e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleClick();
    }
  }}
>
  Keyboard accessible
</Box>
```

### 4. Maintain Focus Indicators

```jsx
<Box sx={{
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: theme.palette.primary.main,
    outlineOffset: '2px',
  }
}}>
  Focusable element
</Box>
```

### 5. Minimum Touch Targets

```jsx
<IconButton sx={{ 
  minWidth: 44, 
  minHeight: 44 
}}>
  <Icon />
</IconButton>
```

---

## Common Patterns

### Loading State

```jsx
function MyComponent() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  if (loading) {
    return <SkeletonCard variant="destination" />;
  }

  return <PremiumDestinationCard destination={data} />;
}
```

### Error State

```jsx
function MyComponent() {
  const [error, setError] = useState(null);

  if (error) {
    return (
      <Alert severity="error" onClose={() => setError(null)}>
        {error.message}
      </Alert>
    );
  }

  return <Content />;
}
```

### Empty State

```jsx
function MyComponent() {
  const [items, setItems] = useState([]);

  if (items.length === 0) {
    return (
      <Box sx={{ textAlign: 'center', py: 8 }}>
        <Typography variant="h5" gutterBottom>
          No items found
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Try adjusting your filters
        </Typography>
      </Box>
    );
  }

  return <ItemList items={items} />;
}
```

---

## Resources

- [MUI Component Documentation](https://mui.com/components/)
- [Style Guide](./STYLE_GUIDE.md)
- [Animation Guide](./ANIMATION_GUIDE.md)
- [Theme Configuration](./theme.js)

---

**Last Updated**: 2025
**Version**: 1.0.0
