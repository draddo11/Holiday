# Design Document

## Overview

This design adds an optional Halloween horror theme to TravelSnap's photo generation feature. Users can toggle between standard travel photos and horror movie-inspired versions with spooky visual effects. The implementation uses a combination of AI prompt engineering, image post-processing filters, and themed UI elements to create an immersive Halloween experience.

## Architecture

### System Flow

```
┌─────────────────────────────────────────────────────────────┐
│                        User Interface                        │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Horror Toggle│  │ Style Picker │  │ Theme UI     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                    Theme Configuration                       │
│  - Horror mode enabled/disabled                             │
│  - Selected horror style preset                             │
│  - UI theme state                                           │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                  Image Generation Pipeline                   │
│  ┌──────────────────────────────────────────────────┐      │
│  │ 1. User Image Processing (background removal)    │      │
│  │ 2. Background Image Fetch                        │      │
│  │ 3. Horror Effects (if enabled)                   │      │
│  │    - Color grading                               │      │
│  │    - Atmospheric overlays                        │      │
│  │    - Lighting adjustments                        │      │
│  │ 4. Image Composition                             │      │
│  │ 5. Final Enhancement                             │      │
│  └──────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│                      Generated Image                         │
│  - Standard travel photo OR Horror-themed photo             │
└─────────────────────────────────────────────────────────────┘
```

## Components and Interfaces

### 1. Horror Theme Toggle Component (React)

**Purpose**: Allow users to enable/disable horror theme

**File**: `travelsnap-react/src/components/HorrorThemeToggle.jsx`

**Interface**:
```jsx
interface HorrorThemeToggleProps {
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}

function HorrorThemeToggle({ enabled, onChange }: HorrorThemeToggleProps)
```

**Features**:
- Animated toggle switch with Halloween colors (orange/purple)
- Icon changes (🎃 for enabled, 📸 for disabled)
- Smooth transition animation
- Accessible keyboard controls

### 2. Horror Style Selector Component (React)

**Purpose**: Let users choose specific horror aesthetic

**File**: `travelsnap-react/src/components/HorrorStyleSelector.jsx`

**Interface**:
```jsx
interface HorrorStyle {
  id: string;
  name: string;
  description: string;
  icon: string;
  effects: HorrorEffectConfig;
}

interface HorrorStyleSelectorProps {
  selectedStyle: string;
  onStyleChange: (styleId: string) => void;
  disabled: boolean;
}
```

**Horror Style Presets**:

1. **Classic Horror** (`classic`)
   - Dark, desaturated colors
   - Heavy vignette
   - Fog/mist overlay
   - Inspired by: Classic Universal Monsters

2. **Slasher** (`slasher`)
   - High contrast
   - Red color tint
   - Sharp shadows
   - Inspired by: 80s slasher films

3. **Gothic** (`gothic`)
   - Purple/blue tones
   - Moonlight effect
   - Ethereal glow
   - Inspired by: Gothic horror

4. **Found Footage** (`found-footage`)
   - Grainy texture
   - VHS artifacts
   - Timestamp overlay
   - Inspired by: Blair Witch, Paranormal Activity

### 3. Horror Effects Processor (Python)

**Purpose**: Apply horror-themed image effects

**File**: `backend/horror_effects.py`

**Interface**:
```python
from PIL import Image
from typing import Dict, Any

class HorrorEffectsProcessor:
    def __init__(self, style: str):
        self.style = style
        self.config = self._load_style_config(style)
    
    def apply_effects(self, image: Image.Image) -> Image.Image:
        """Apply horror effects to image based on selected style"""
        pass
    
    def apply_color_grading(self, image: Image.Image) -> Image.Image:
        """Apply horror-themed color grading"""
        pass
    
    def add_atmospheric_effects(self, image: Image.Image) -> Image.Image:
        """Add fog, mist, or other atmospheric elements"""
        pass
    
    def adjust_lighting(self, image: Image.Image) -> Image.Image:
        """Create dramatic, eerie lighting"""
        pass
    
    def add_texture_overlay(self, image: Image.Image) -> Image.Image:
        """Add grain, scratches, or other texture effects"""
        pass
```

**Effect Implementation Details**:

**Classic Horror Effects**:
```python
def apply_classic_horror(image: Image.Image) -> Image.Image:
    # 1. Desaturate (reduce color saturation by 40%)
    # 2. Darken (reduce brightness by 20%)
    # 3. Add blue/green tint
    # 4. Apply vignette (darken edges)
    # 5. Add fog overlay (semi-transparent white gradient)
    # 6. Increase contrast
```

**Slasher Effects**:
```python
def apply_slasher(image: Image.Image) -> Image.Image:
    # 1. Increase contrast dramatically
    # 2. Add red color tint (especially in shadows)
    # 3. Sharpen image
    # 4. Deepen shadows
    # 5. Add film grain
```

**Gothic Effects**:
```python
def apply_gothic(image: Image.Image) -> Image.Image:
    # 1. Add purple/blue color cast
    # 2. Create moonlight effect (bright spot with glow)
    # 3. Add ethereal mist
    # 4. Soften edges slightly
    # 5. Increase luminosity in highlights
```

**Found Footage Effects**:
```python
def apply_found_footage(image: Image.Image) -> Image.Image:
    # 1. Add heavy grain/noise
    # 2. Reduce resolution slightly (simulate VHS)
    # 3. Add scan lines
    # 4. Slight color bleeding
    # 5. Add timestamp in corner
    # 6. Random slight blur
```

### 4. Updated Image Generation Endpoint

**Purpose**: Integrate horror effects into generation pipeline

**File**: `backend/app.py`

**Modified Endpoint**:
```python
@app.route('/generate-travel-photo', methods=['POST'])
def generate_travel_photo():
    data = request.json
    user_image_base64 = data.get('userImage')
    background_image_url = data.get('backgroundImageUrl')
    horror_enabled = data.get('horrorEnabled', False)
    horror_style = data.get('horrorStyle', 'classic')
    
    # ... existing image processing ...
    
    # Apply horror effects if enabled
    if horror_enabled:
        horror_processor = HorrorEffectsProcessor(horror_style)
        final_image = horror_processor.apply_effects(final_image)
    
    # ... return result ...
```

### 5. Theme UI Manager (React)

**Purpose**: Apply Halloween theme to UI when horror mode is active

**File**: `travelsnap-react/src/contexts/ThemeContext.jsx`

**Interface**:
```jsx
interface ThemeContextValue {
  horrorMode: boolean;
  setHorrorMode: (enabled: boolean) => void;
  horrorStyle: string;
  setHorrorStyle: (style: string) => void;
}

const ThemeContext = createContext<ThemeContextValue>(null);
```

**CSS Variables for Horror Theme**:
```css
/* Standard Theme */
:root {
  --primary-color: #4A90E2;
  --background-color: #FFFFFF;
  --text-color: #333333;
  --accent-color: #FF6B6B;
}

/* Horror Theme */
:root[data-horror-mode="true"] {
  --primary-color: #8B4513;
  --background-color: #1A1A1A;
  --text-color: #E0E0E0;
  --accent-color: #FF4500;
  --shadow-color: rgba(139, 0, 0, 0.5);
}
```

### 6. Horror-Themed Loading States

**Purpose**: Show themed loading indicators

**File**: `travelsnap-react/src/components/HorrorLoadingIndicator.jsx`

**Features**:
- Animated pumpkin or ghost icon
- Spooky loading messages:
  - "Summoning spirits..."
  - "Adding spooky effects..."
  - "Haunting your photo..."
  - "Brewing dark magic..."
- Flickering animation effect

## Data Models

### Horror Configuration

```typescript
interface HorrorConfig {
  enabled: boolean;
  style: 'classic' | 'slasher' | 'gothic' | 'found-footage';
  intensity: number; // 0-100, for future fine-tuning
}

interface HorrorEffectConfig {
  colorGrading: {
    saturation: number;
    brightness: number;
    tint: { r: number; g: number; b: number };
  };
  atmospheric: {
    fogIntensity: number;
    mistOpacity: number;
    vignetteStrength: number;
  };
  lighting: {
    contrast: number;
    shadowDepth: number;
    highlightBoost: number;
  };
  texture: {
    grainAmount: number;
    scratchesEnabled: boolean;
    scanLinesEnabled: boolean;
  };
}
```

### API Request/Response

**Request**:
```json
{
  "userImage": "data:image/jpeg;base64,...",
  "backgroundImageUrl": "https://...",
  "horrorEnabled": true,
  "horrorStyle": "classic"
}
```

**Response**:
```json
{
  "generatedImageUrl": "data:image/jpeg;base64,...",
  "horrorApplied": true,
  "style": "classic"
}
```

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system-essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Theme toggle consistency
*For any* user interaction with the horror theme toggle, the UI state and the image generation parameters should always match (both enabled or both disabled).
**Validates: Requirements 1.2, 1.3**

### Property 2: Effect preservation
*For any* generated image with horror effects applied, the original subject and location should remain recognizable despite the visual modifications.
**Validates: Requirements 2.5**

### Property 3: Style application
*For any* selected horror style preset, the generated image should exhibit the characteristic visual effects of that style.
**Validates: Requirements 3.2**

### Property 4: Backward compatibility
*For any* image generation request with horror mode disabled, the output should be identical to the original implementation without horror features.
**Validates: Requirements 4.1**

### Property 5: UI theme synchronization
*For any* change to the horror mode toggle, the UI theme should update to match within the same render cycle.
**Validates: Requirements 5.1, 5.4**

## Error Handling

### Image Processing Errors

**Horror Effect Failure**:
```python
try:
    if horror_enabled:
        final_image = horror_processor.apply_effects(final_image)
except Exception as e:
    logger.error(f"Horror effect processing failed: {e}")
    # Fall back to standard image without horror effects
    logger.info("Returning standard image without horror effects")
```

**Invalid Style Selection**:
```python
VALID_HORROR_STYLES = ['classic', 'slasher', 'gothic', 'found-footage']

horror_style = data.get('horrorStyle', 'classic')
if horror_style not in VALID_HORROR_STYLES:
    logger.warning(f"Invalid horror style: {horror_style}, defaulting to 'classic'")
    horror_style = 'classic'
```

### UI Error States

**Effect Preview Failure**:
- Show placeholder preview image
- Display message: "Preview unavailable"
- Allow user to proceed with generation

**Theme Toggle Failure**:
- Revert to previous state
- Show error toast
- Log error for debugging

## Testing Strategy

### Unit Testing

**Horror Effects Processor**:
- Test each effect function independently
- Verify color grading produces expected RGB shifts
- Test atmospheric overlay composition
- Verify lighting adjustments stay within valid ranges
- Test texture overlay doesn't corrupt image data

**Theme Toggle Component**:
- Test toggle state changes
- Verify callback invocation
- Test keyboard accessibility
- Verify animation triggers

**Style Selector Component**:
- Test style selection updates state
- Verify disabled state prevents interaction
- Test style persistence

### Integration Testing

**End-to-End Horror Generation**:
- Upload image → Enable horror → Select style → Generate
- Verify horror effects are applied
- Verify output image is valid
- Test with different style presets

**Theme Switching**:
- Toggle horror mode on/off multiple times
- Verify UI updates correctly
- Verify no state inconsistencies

### Visual Regression Testing

**Effect Consistency**:
- Generate reference images for each horror style
- Compare new generations against references
- Flag significant visual deviations

### Property-Based Testing

We will use `fast-check` for JavaScript/TypeScript property-based testing. Each property-based test should run a minimum of 100 iterations.

**Property Tests**:
1. Theme toggle consistency (Property 1)
2. Effect preservation (Property 2)
3. Backward compatibility (Property 4)

### Manual Testing Checklist

- [ ] Horror toggle works on all browsers
- [ ] Each horror style produces distinct visual effects
- [ ] UI theme changes are smooth and complete
- [ ] Loading indicators show appropriate messages
- [ ] Generated images look appropriately spooky
- [ ] Standard mode still works correctly
- [ ] Mobile responsive design works with horror UI

## Implementation Notes

### Performance Considerations

**Image Processing**:
- Horror effects add ~1-2 seconds to generation time
- Use PIL's efficient image operations
- Cache style configurations
- Consider async processing for heavy effects

**UI Animations**:
- Use CSS transforms for smooth animations
- Debounce rapid toggle switches
- Lazy load horror style preview images

### Browser Compatibility

**CSS Features**:
- CSS custom properties (variables) - IE11 fallback needed
- CSS filters - widely supported
- Transitions - widely supported

**JavaScript Features**:
- Context API - React 16.3+
- Async/await - transpile for older browsers

### Accessibility

**Horror Theme Toggle**:
- ARIA labels for screen readers
- Keyboard navigation support
- Focus indicators
- High contrast mode compatibility

**Color Contrast**:
- Ensure text remains readable in horror theme
- Minimum 4.5:1 contrast ratio
- Test with color blindness simulators

### Future Enhancements

**Additional Horror Styles**:
- Zombie apocalypse
- Haunted house
- Creepy doll
- Alien invasion

**Customization Options**:
- Intensity slider (subtle to extreme)
- Individual effect toggles
- Custom color tints
- Add horror elements (bats, ghosts, etc.)

**Social Features**:
- Share horror-themed photos
- Halloween photo gallery
- Horror style voting/ratings

### Halloween-Specific Features

**Seasonal Activation**:
- Auto-enable horror theme in October
- Special Halloween day effects
- Countdown to Halloween

**Easter Eggs**:
- Random spooky sound effects
- Hidden horror elements in UI
- Special effects on Halloween (Oct 31)
