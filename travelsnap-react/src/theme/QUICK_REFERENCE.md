# Quick Reference Card

A quick reference for the most commonly used design tokens and patterns.

## Colors

```javascript
// Primary
theme.palette.primary.main        // #2563EB
theme.palette.primary[400]        // Hover states
theme.palette.primary[600]        // Active states

// Neutral
theme.palette.neutral[0]          // White text
theme.palette.neutral[400]        // Secondary text
theme.palette.neutral[950]        // Background

// Semantic
theme.palette.success.main        // #10B981
theme.palette.error.main          // #EF4444
theme.palette.warning.main        // #F59E0B
```

## Spacing

```javascript
// Common values (8px base unit)
sx={{ p: 4 }}      // 32px padding
sx={{ mb: 6 }}     // 48px margin-bottom
sx={{ gap: 3 }}    // 24px gap

// Responsive
sx={{ p: { xs: 3, md: 6 } }}  // 24px mobile, 48px desktop
```

## Typography

```jsx
<Typography variant="h1">Hero Heading</Typography>      // 60px, 800 weight
<Typography variant="h2">Section</Typography>           // 48px, 800 weight
<Typography variant="h3">Subsection</Typography>        // 36px, 700 weight
<Typography variant="body1">Body text</Typography>      // 16px, 400 weight
<Typography variant="caption">Small text</Typography>   // 12px, 400 weight
```

## Buttons

```jsx
// Primary
<Button variant="contained" color="primary">Primary</Button>

// Secondary
<Button variant="outlined" color="primary">Secondary</Button>

// Ghost
<Button variant="text" color="primary">Ghost</Button>

// Sizes
<Button size="small">Small</Button>
<Button size="medium">Medium</Button>
<Button size="large">Large</Button>
```

## Cards

```jsx
// Standard
<Card>
  <CardContent>Content</CardContent>
</Card>

// Premium Destination
<PremiumDestinationCard destination={data} />

// Stats
<ModernStatsCard 
  icon={<Icon />}
  label="Label"
  value="Value"
/>
```

## Forms

```jsx
// Text input
<TextField fullWidth label="Label" placeholder="Placeholder..." />

// Search
<TextField
  fullWidth
  placeholder="Search..."
  InputProps={{
    startAdornment: <InputAdornment position="start"><Search /></InputAdornment>
  }}
/>
```

## Layout

```jsx
// Container
<Container maxWidth="xl">Content</Container>

// Grid
<Grid container spacing={4}>
  <Grid item xs={12} md={6}>Column</Grid>
</Grid>

// Flex
<Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
  Items
</Box>
```

## Animations

```jsx
// Hover effect
sx={{
  transition: 'all 0.25s ease',
  '&:hover': {
    transform: 'translateY(-4px)',
  }
}}

// Fade in
sx={{
  animation: 'fadeIn 0.5s ease',
  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  }
}}
```

## Loading States

```jsx
// Skeleton
<SkeletonCard variant="destination" />

// Spinner
<LoadingSpinner />
```

## Responsive Breakpoints

```javascript
xs: 0      // Mobile
sm: 600    // Tablet
md: 900    // Small desktop
lg: 1200   // Desktop
xl: 1536   // Large desktop
```

## Common Patterns

### Centered Content
```jsx
<Box sx={{ 
  display: 'flex', 
  justifyContent: 'center', 
  alignItems: 'center',
  minHeight: '100vh',
}}>
  Content
</Box>
```

### Card with Hover
```jsx
<Card sx={{
  transition: 'all 0.35s ease',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: theme.shadows['2xl'],
  }
}}>
  Content
</Card>
```

### Responsive Spacing
```jsx
<Box sx={{ 
  p: { xs: 3, md: 6 },
  mb: { xs: 4, md: 8 },
}}>
  Content
</Box>
```

### Glassmorphism Effect
```jsx
<Box sx={{
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '24px',
}}>
  Content
</Box>
```

## Accessibility

```jsx
// Icon button with label
<IconButton aria-label="Close">
  <Close />
</IconButton>

// Image with alt text
<img src={url} alt="Description" />

// Minimum touch target
<IconButton sx={{ minWidth: 44, minHeight: 44 }}>
  <Icon />
</IconButton>

// Focus indicator
sx={{
  '&:focus-visible': {
    outline: '2px solid',
    outlineColor: theme.palette.primary.main,
    outlineOffset: '2px',
  }
}}
```

## Performance

```jsx
// Use transforms (GPU-accelerated)
transform: 'translateY(-4px)'  ✅
top: '-4px'                    ❌

// Lazy load images
<LazyImage src={url} alt="Description" />

// Code splitting
const Page = lazy(() => import('./Page'));
```

## Resources

- Full documentation: [STYLE_GUIDE.md](./STYLE_GUIDE.md)
- Animations: [ANIMATION_GUIDE.md](./ANIMATION_GUIDE.md)
- Components: [COMPONENT_USAGE.md](./COMPONENT_USAGE.md)
- Live examples: `/showcase`
