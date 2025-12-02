# Implementation Plan

- [ ] 1. Create horror effects processor module
  - Create `backend/horror_effects.py` with HorrorEffectsProcessor class
  - Implement color grading function (saturation, brightness, tint adjustments)
  - Implement atmospheric effects function (fog, mist, vignette)
  - Implement lighting adjustment function (contrast, shadows, highlights)
  - Implement texture overlay function (grain, scratches, scan lines)
  - Define configuration for each horror style preset (classic, slasher, gothic, found-footage)
  - _Requirements: 2.1, 2.2, 2.3, 2.4_

- [ ] 2. Implement horror style effect methods
  - Implement `apply_classic_horror()` method with desaturation, fog, and vignette
  - Implement `apply_slasher()` method with high contrast and red tint
  - Implement `apply_gothic()` method with purple/blue tones and moonlight effect
  - Implement `apply_found_footage()` method with grain, scan lines, and timestamp
  - Implement main `apply_effects()` method that routes to appropriate style
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 3.1, 3.2_

- [ ] 3. Update Flask image generation endpoint
  - Modify `/generate-travel-photo` endpoint to accept `horrorEnabled` and `horrorStyle` parameters
  - Import and integrate HorrorEffectsProcessor
  - Add conditional horror effect application after image composition
  - Implement error handling for horror effect failures with fallback to standard image
  - Validate horror style parameter against allowed values
  - Update response to include horror metadata
  - _Requirements: 1.2, 1.3, 4.1, 4.2, 4.3, 4.5_

- [ ] 4. Create React theme context
  - Create `travelsnap-react/src/contexts/ThemeContext.jsx`
  - Implement ThemeProvider with horror mode and style state
  - Add localStorage persistence for user preferences
  - Export useTheme hook for consuming components
  - _Requirements: 1.4, 3.4_

- [ ] 5. Create horror theme toggle component
  - Create `travelsnap-react/src/components/HorrorThemeToggle.jsx`
  - Implement animated toggle switch with Halloween colors
  - Add icons (🎃 for enabled, 📸 for disabled)
  - Implement smooth transition animations
  - Add ARIA labels and keyboard accessibility
  - Connect to theme context
  - _Requirements: 1.1, 1.5, 5.2_

- [ ] 6. Create horror style selector component
  - Create `travelsnap-react/src/components/HorrorStyleSelector.jsx`
  - Define horror style presets with names, descriptions, and icons
  - Implement style selection UI with visual cards or buttons
  - Add preview descriptions for each style
  - Connect to theme context for state management
  - Disable selector when horror mode is off
  - _Requirements: 3.1, 3.2, 3.3, 3.5_

- [ ] 7. Create horror-themed loading indicator
  - Create `travelsnap-react/src/components/HorrorLoadingIndicator.jsx`
  - Implement animated Halloween icon (pumpkin or ghost)
  - Add array of spooky loading messages
  - Implement message rotation during loading
  - Add flickering animation effect
  - _Requirements: 5.3_

- [ ] 8. Update AI photo generation page with horror controls
  - Import and add HorrorThemeToggle to AIPhotoPage
  - Import and add HorrorStyleSelector to AIPhotoPage
  - Update layout to accommodate new controls
  - Pass horror configuration to API call
  - Replace standard loading indicator with HorrorLoadingIndicator when horror mode is active
  - _Requirements: 1.1, 3.1, 4.4_

- [ ] 9. Implement horror-themed UI styling
  - Create CSS variables for horror theme colors in global styles
  - Implement data-horror-mode attribute toggling on root element
  - Define horror theme color palette (dark backgrounds, orange/purple accents)
  - Add CSS transitions for smooth theme switching
  - Update component styles to respect theme variables
  - _Requirements: 5.1, 5.4, 5.5_

- [ ] 10. Update API service to support horror parameters
  - Modify `travelsnap-react/src/services/api.js`
  - Update `generateTravelPhoto()` function signature to accept horror parameters
  - Include horrorEnabled and horrorStyle in request payload
  - Handle horror metadata in response
  - _Requirements: 4.4, 4.5_

- [ ] 11. Add error handling and fallbacks
  - Implement try-catch in horror effects processor with logging
  - Add fallback to standard image if horror processing fails
  - Show user-friendly error messages in UI
  - Add error state handling in React components
  - Test error scenarios (invalid style, processing failure)
  - _Requirements: 4.3_

- [ ] 12. Test horror theme functionality
  - Test each horror style produces distinct visual effects
  - Test toggle enables/disables horror effects correctly
  - Test style selector updates generation parameters
  - Test UI theme switches correctly with horror mode
  - Test backward compatibility (horror disabled works like before)
  - Test error handling and fallbacks
  - Test on multiple browsers and devices
  - Verify accessibility features work correctly
  - _Requirements: 1.2, 1.3, 2.5, 3.2, 4.1, 5.1, 5.4_

- [ ] 13. Add documentation and user guidance
  - Add horror theme section to README
  - Document horror style options and their effects
  - Add inline help text or tooltips in UI
  - Create example images showing each horror style
  - Document API parameters for horror features
  - _Requirements: 1.5, 3.3_
