# SkeletonCard Usage Guide

## Overview

The `SkeletonCard` component provides loading placeholders with shimmer animations that match the TravelSnap design system. It includes glassmorphism effects and smooth animations to maintain visual consistency during loading states.

## Features

- ✨ Smooth shimmer animation effect
- 🎨 Glassmorphism background matching design tokens
- 📱 Responsive and accessible
- 🎯 Multiple variants for different card types
- ⚡ Lightweight and performant

## Variants

### 1. Destination Card Skeleton

Use this variant for destination cards with images and content.

```jsx
import SkeletonCard from '../components/SkeletonCard';

<SkeletonCard variant="destination" />
```

### 2. Stats Card Skeleton

Use this variant for data visualization cards with icons and statistics.

```jsx
<SkeletonCard variant="stats" />
```

### 3. Compact Card Skeleton

Use this variant for smaller cards or list items.

```jsx
<SkeletonCard variant="compact" />
```

## Integration Examples

### Example 1: Loading Destinations Page

```jsx
import { useState, useEffect } from 'react';
import { Box, Grid } from '@mui/material';
import PremiumDestinationCard from '../components/PremiumDestinationCard';
import SkeletonCard from '../components/SkeletonCard';

function DestinationsPage() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      fetchDestinations().then(data => {
        setDestinations(data);
        setLoading(false);
      });
    }, 2000);
  }, []);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3 }}>
      {loading ? (
        // Show skeleton loaders while loading
        <>
          <SkeletonCard variant="destination" />
          <SkeletonCard variant="destination" />
          <SkeletonCard variant="destination" />
          <SkeletonCard variant="destination" />
          <SkeletonCard variant="destination" />
          <SkeletonCard variant="destination" />
        </>
      ) : (
        // Show actual cards when loaded
        destinations.map(destination => (
          <PremiumDestinationCard 
            key={destination.id} 
            destination={destination} 
          />
        ))
      )}
    </Box>
  );
}
```

### Example 2: Loading Stats Cards

```jsx
import { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import ModernStatsCard from '../components/ModernStatsCard';
import SkeletonCard from '../components/SkeletonCard';
import { WbSunny, Hotel, Flight } from '@mui/icons-material';

function CustomDestinationPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDestinationStats().then(data => {
      setStats(data);
      setLoading(false);
    });
  }, []);

  return (
    <Grid container spacing={3}>
      {loading ? (
        // Show skeleton loaders
        <>
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
        </>
      ) : (
        // Show actual stats cards
        <>
          <Grid item xs={12} sm={6} md={3}>
            <ModernStatsCard
              icon={<WbSunny />}
              label="Weather"
              value={stats.weather.temp}
              description={stats.weather.description}
            />
          </Grid>
          {/* ... more stats cards */}
        </>
      )}
    </Grid>
  );
}
```

### Example 3: Progressive Loading with Staggered Animation

```jsx
import { useState, useEffect } from 'react';
import { Box } from '@mui/material';
import SkeletonCard from '../components/SkeletonCard';
import PremiumDestinationCard from '../components/PremiumDestinationCard';

function ProgressiveLoadingExample() {
  const [loadedItems, setLoadedItems] = useState([]);
  const totalItems = 6;

  useEffect(() => {
    // Simulate progressive loading
    const loadItem = (index) => {
      if (index < totalItems) {
        setTimeout(() => {
          fetchDestination(index).then(data => {
            setLoadedItems(prev => [...prev, data]);
            loadItem(index + 1);
          });
        }, 500); // Load one item every 500ms
      }
    };
    loadItem(0);
  }, []);

  return (
    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3 }}>
      {Array.from({ length: totalItems }).map((_, index) => (
        loadedItems[index] ? (
          <PremiumDestinationCard 
            key={loadedItems[index].id} 
            destination={loadedItems[index]} 
          />
        ) : (
          <SkeletonCard key={`skeleton-${index}`} variant="destination" />
        )
      ))}
    </Box>
  );
}
```

## Custom Height

You can specify a custom height for any variant:

```jsx
<SkeletonCard variant="stats" height={300} />
<SkeletonCard variant="destination" height={500} />
```

## Custom Styling

You can pass additional MUI `sx` props for custom styling:

```jsx
<SkeletonCard 
  variant="destination" 
  sx={{ 
    maxWidth: 400,
    margin: '0 auto',
  }} 
/>
```

## Accessibility

The component includes proper ARIA attributes for screen readers:

- `role="status"` - Indicates a loading state
- `aria-label` - Descriptive label for each variant

## Performance Considerations

- The shimmer animation uses CSS transforms for optimal performance
- No JavaScript animations - pure CSS
- Minimal re-renders
- Lightweight component with no external dependencies beyond MUI

## Best Practices

1. **Match the variant to your content**: Use the same variant as the actual card you're loading
2. **Show the right number**: Display the same number of skeletons as items you expect to load
3. **Maintain layout**: Ensure skeletons maintain the same grid/layout as actual content
4. **Don't overuse**: Only show skeletons for initial loads, not for every state change
5. **Timeout fallback**: Consider showing an error state if loading takes too long

## Animation Details

The shimmer effect:
- Duration: 2 seconds
- Infinite loop
- Smooth gradient transition
- Hardware-accelerated (uses transform)
- Respects `prefers-reduced-motion` (can be enhanced)

## Browser Support

Works in all modern browsers that support:
- CSS animations
- CSS transforms
- CSS gradients
- Backdrop filter (with graceful degradation)
