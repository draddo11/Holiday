# Theme Configuration

This directory contains the MUI theme configuration for TravelSnap, inspired by Jeton's modern design language.

## Files

- `tokens.js` - Design tokens (colors, typography, spacing, shadows, etc.)
- `theme.js` - MUI theme configuration that uses the design tokens
- `theme.test.js` - Unit tests for theme configuration
- `theme.integration.test.jsx` - Integration tests for theme with React components

## Usage

### Basic Usage

Import and wrap your app with the ThemeProvider:

```jsx
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme/theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Your app components */}
    </ThemeProvider>
  );
}
```

### Using Theme Values in Components

Access theme values using the `useTheme` hook or `sx` prop:

```jsx
import { useTheme } from '@mui/material';
import { Box, Typography, Button } from '@mui/material';

function MyComponent() {
  const theme = useTheme();
  
  return (
    <Box sx={{ 
      p: 4, // Uses theme.spacing(4) = 32px
      backgroundColor: theme.palette.primary.main,
    }}>
      <Typography variant="h1">
        Heading with theme typography
      </Typography>
      
      <Button variant="contained">
        Button with theme styles
      </Button>
    </Box>
  );
}
```

### Using Design Tokens Directly

You can also import design tokens directly:

```jsx
import { colors, typography, spacing } from './theme/tokens';

const customStyles = {
  color: colors.primary[500],
  fontSize: typography.fontSize.xl,
  padding: spacing[4],
};
```

## Theme Features

### Color Palette
- **Primary**: Blue-purple gradient (#6366F1)
- **Secondary**: Vibrant purple (#A855F7)
- **Neutral**: Clean grayscale
- **Semantic**: Success, warning, error, info colors

### Typography
- **Font Family**: Inter (primary), Cal Sans (display)
- **Variants**: h1-h6, body1-2, button, caption, overline
- **Weights**: 400 (normal), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold)

### Spacing
- **Base Unit**: 8px
- **Scale**: 0, 1 (4px), 2 (8px), 3 (12px), 4 (16px), 6 (24px), 8 (32px), etc.

### Component Customization
Pre-configured styles for:
- Buttons (with gradient backgrounds and hover effects)
- Cards (glassmorphism effect)
- Text fields (custom focus states)
- App bar (backdrop blur)
- And more...

## Breakpoints

- **xs**: 0px
- **sm**: 600px
- **md**: 900px
- **lg**: 1200px
- **xl**: 1536px

## Testing

Run tests with:

```bash
npm test
```

This will run both unit tests and integration tests for the theme configuration.


## Documentation

### Complete Style Guide
- **[STYLE_GUIDE.md](./STYLE_GUIDE.md)** - Comprehensive design system documentation
  - Color palette with usage guidelines
  - Typography system and variants
  - Spacing scale and vertical rhythm
  - Component variants and examples
  - Animation guidelines
  - Accessibility standards
  - Best practices

### Animation Guidelines
- **[ANIMATION_GUIDE.md](./ANIMATION_GUIDE.md)** - Detailed animation documentation
  - Animation principles
  - Timing and easing functions
  - Common animation patterns
  - Performance optimization
  - Reduced motion support
  - Testing guidelines

### Component Usage
- **[COMPONENT_USAGE.md](./COMPONENT_USAGE.md)** - Component implementation guide
  - All component examples
  - Props documentation
  - Responsive design patterns
  - Accessibility best practices
  - Common patterns and recipes

### Additional Resources
- **[SPACING_GUIDE.md](./SPACING_GUIDE.md)** - Spacing system details
- **[COLOR_USAGE_GUIDELINES.md](./COLOR_USAGE_GUIDELINES.md)** - Color usage rules
- **[CONTRAST_AUDIT_REPORT.md](./CONTRAST_AUDIT_REPORT.md)** - Accessibility audit results

## Live Examples

Visit `/showcase` in the application to see all components in action with live examples.

```bash
# Start the development server
npm run dev

# Navigate to http://localhost:5173/showcase
```

---

**Documentation Version**: 1.0.0
**Last Updated**: 2025
