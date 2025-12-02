# Button Component Usage Guide

## Overview

The Button component is a custom, reusable button with three variants (primary, secondary, ghost), multiple sizes, hover/press animations, and loading state support.

## Import

```jsx
import Button from './components/Button';
```

## Basic Usage

### Primary Button (Default)

```jsx
<Button variant="primary" onClick={handleClick}>
  Get Started
</Button>
```

### Secondary Button (Outline Style)

```jsx
<Button variant="secondary" onClick={handleClick}>
  Learn More
</Button>
```

### Ghost Button (Minimal Style)

```jsx
<Button variant="ghost" onClick={handleClick}>
  Cancel
</Button>
```

## Sizes

```jsx
<Button size="small">Small Button</Button>
<Button size="medium">Medium Button</Button>
<Button size="large">Large Button</Button>
```

## Loading State

```jsx
<Button loading={isLoading} onClick={handleSubmit}>
  Submit Form
</Button>
```

## Disabled State

```jsx
<Button disabled={true}>
  Disabled Button
</Button>
```

## Full Width

```jsx
<Button fullWidth={true}>
  Full Width Button
</Button>
```

## Complete Example

```jsx
import React, { useState } from 'react';
import Button from './components/Button';
import { Box } from '@mui/material';

function MyComponent() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      await submitForm();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <Button 
        variant="primary" 
        size="large"
        loading={loading}
        onClick={handleSubmit}
      >
        Submit
      </Button>
      
      <Button 
        variant="secondary" 
        size="large"
        onClick={() => console.log('Cancel')}
      >
        Cancel
      </Button>
    </Box>
  );
}
```

## Features

- **Three Variants**: Primary (gradient), Secondary (outline), Ghost (minimal)
- **Three Sizes**: Small, Medium, Large
- **Hover Animations**: Scale, translateY, and glow effects
- **Press Animation**: Scale down on click
- **Loading State**: Shows spinner while loading
- **Accessibility**: Minimum 44x44px touch targets
- **Consistent Spacing**: Uses design token system
- **Smooth Transitions**: 250ms ease timing

## Design Tokens Used

- Colors: `colors.primary`, `colors.neutral`
- Shadows: `shadows.md`, `shadows.glow`, `shadows.glowHover`
- Border Radius: `borderRadius.lg`
- Transitions: `transitions.duration.base`, `transitions.timing.ease`

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| variant | string | 'primary' | Button style: 'primary', 'secondary', or 'ghost' |
| size | string | 'medium' | Button size: 'small', 'medium', or 'large' |
| loading | boolean | false | Shows loading spinner |
| disabled | boolean | false | Disables the button |
| fullWidth | boolean | false | Makes button full width |
| onClick | function | - | Click handler |
| children | node | - | Button content |
| sx | object | {} | Additional MUI sx styles |
