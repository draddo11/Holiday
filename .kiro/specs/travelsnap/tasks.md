# Implementation Plan

- [x] 1. Set up project structure and dependencies
  - Initialize React project with Create React App or Vite
  - Install required dependencies: react-router-dom, axios, fast-check (for property testing), jest, react-testing-library
  - Install Material Design 3 dependencies: @mui/material, @mui/icons-material, @emotion/react, @emotion/styled
  - Configure Material-UI theme with Material Design 3 principles
  - Set up project folder structure: components, pages, services, utils, tests
  - Create .env file template for environment variables
  - _Requirements: All requirements depend on proper setup_

- [ ] 2. Create destination data model and static data
  - Define TypeScript interfaces for Destination, Landmark, FlightPrice models
  - Create static JSON file with 5-10 destination objects including places to visit, shows/activities, quick facts, and images
  - Create static JSON file with at least 3 landmark objects
  - Implement data validation utilities to ensure destinations meet count constraints (3-5 places, 2-4 activities, 2-3 facts)
  - _Requirements: 1.1, 2.2, 2.3, 2.4, 4.2_

- [ ] 2.1 Write property test for destination data constraints
  - **Property 3: Destination details data constraints**
  - **Validates: Requirements 2.2, 2.3, 2.4**

- [ ] 2.2 Write property test for destination count
  - **Property 1: Destination count constraint**
  - **Validates: Requirements 1.1**

- [ ] 2.3 Write property test for landmark minimum count
  - **Property 6: Landmark selection minimum**
  - **Validates: Requirements 4.2**

- [ ] 3. Implement HomePage component
  - Create HomePage component with app branding and hero section
  - Add "Explore Destinations" button with navigation to destinations page
  - Add "Create Travel Photo" button with navigation to AI photo page
  - Add link to "How It Works" page
  - Implement responsive layout for mobile devices
  - _Requirements: 7.1, 7.2, 6.1_

- [ ] 3.1 Write unit tests for HomePage navigation
  - Test that navigation buttons route to correct pages
  - Test that How It Works link is present
  - _Requirements: 7.1, 7.2, 7.3, 7.4, 6.1_

- [ ] 4. Implement DestinationCard component
  - Create DestinationCard component that accepts destination prop
  - Display destination image, name, and tagline
  - Implement click handler to trigger detail view
  - Add hover effects and animations for visual appeal
  - _Requirements: 1.2_

- [ ] 4.1 Write property test for destination card rendering
  - **Property 2: Destination card completeness**
  - **Validates: Requirements 1.2**

- [ ] 5. Implement DestinationsPage component
  - Create DestinationsPage component with state management for destinations and selected destination
  - Load destination data from static JSON file
  - Render grid of DestinationCard components
  - Implement click handler to show destination details
  - Add responsive grid layout for mobile devices
  - _Requirements: 1.1, 1.3, 1.4, 2.1_

- [ ] 5.1 Write unit tests for DestinationsPage
  - Test that destination cards are rendered in grid
  - Test that clicking a card triggers detail view
  - _Requirements: 1.1, 2.1_

- [ ] 6. Implement DestinationDetails component
  - Create DestinationDetails component that accepts destination prop
  - Display places to visit list (3-5 items)
  - Display shows/activities list (2-4 items)
  - Display quick facts (2-3 lines)
  - Display flight price information if available
  - Add close/back button to return to destinations list
  - Implement modal or slide-in panel UI
  - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 10.1_

- [ ] 6.1 Write property test for flight price display
  - **Property 12: Flight price display**
  - **Validates: Requirements 10.1**

- [ ] 6.2 Write unit tests for DestinationDetails
  - Test that all sections render correctly
  - Test that back button closes the detail view
  - Test that missing flight price data is handled gracefully
  - _Requirements: 2.1, 2.5, 10.3_

- [ ] 7. Implement ImageUpload component
  - Create ImageUpload component with file input
  - Implement file validation to accept only JPG and PNG formats
  - Display error message for invalid file types
  - Show preview of uploaded image
  - Emit uploaded file to parent component via callback
  - _Requirements: 3.1, 3.2, 3.3, 3.4_

- [ ] 7.1 Write property test for image format validation
  - **Property 4: Image format validation**
  - **Validates: Requirements 3.2, 3.3, 3.4**

- [ ] 7.2 Write unit tests for ImageUpload
  - Test that valid files are accepted
  - Test that invalid files show error message
  - Test that preview displays after upload
  - _Requirements: 3.2, 3.3, 3.4_

- [ ] 8. Implement LandmarkSelector component
  - Create LandmarkSelector component that displays available landmarks
  - Load landmark data from static JSON file
  - Implement selection UI (dropdown or grid of options)
  - Emit selected landmark to parent component via callback
  - Add visual indication of selected landmark
  - _Requirements: 4.1, 4.2, 4.3_

- [ ] 8.1 Write property test for landmark selection state
  - **Property 7: Landmark selection state update**
  - **Validates: Requirements 4.3**

- [ ] 8.2 Write unit tests for LandmarkSelector
  - Test that landmarks are displayed
  - Test that selection updates state
  - _Requirements: 4.1, 4.2, 4.3_

- [ ] 9. Implement AIPhotoPage component with state management
  - Create AIPhotoPage component with state for uploaded image, selected landmark, loading, and generated image
  - Integrate ImageUpload component
  - Integrate LandmarkSelector component
  - Implement generate button that is enabled only when both image and landmark are selected
  - Add loading indicator during AI generation
  - Display generated image when available
  - Display playful text with landmark reference (e.g., "You're now in Paris!")
  - Implement error handling and display error messages
  - _Requirements: 4.4, 5.1, 5.3, 12.4_

- [ ] 9.1 Write property test for generate button enablement
  - **Property 8: Generate button enablement**
  - **Validates: Requirements 5.1, 4.4**

- [ ] 9.2 Write property test for playful text display
  - **Property 14: Playful text with generated photos**
  - **Validates: Requirements 12.4**

- [ ] 9.3 Write unit tests for AIPhotoPage
  - Test that generate button is disabled initially
  - Test that generate button enables when prerequisites met
  - Test that loading indicator shows during generation
  - Test that error messages display on failure
  - _Requirements: 4.4, 5.1, 5.3_

- [ ] 10. Implement backend API for AI photo generation
  - Create serverless function at /api/generate-photo
  - Accept POST request with user image (base64) and landmark ID
  - Integrate with Replicate API or Stability AI for image generation
  - Use image-to-image model with background replacement
  - Return generated image URL in response
  - Implement error handling for API failures
  - Set function timeout to 30 seconds
  - _Requirements: 5.2, 5.4_

- [ ] 10.1 Write property test for API invocation
  - **Property 9: AI service invocation**
  - **Validates: Requirements 5.2**

- [ ] 10.2 Write property test for image storage
  - **Property 5: Image storage after upload**
  - **Validates: Requirements 3.5**

- [ ] 10.3 Write unit tests for API endpoint
  - Test that endpoint accepts valid requests
  - Test that endpoint rejects invalid requests
  - Test error handling for AI service failures
  - _Requirements: 5.2_

- [ ] 11. Connect AIPhotoPage to backend API
  - Implement API service function to call /api/generate-photo
  - Convert uploaded image to base64 for API request
  - Handle API response and update state with generated image URL
  - Implement timeout handling (20 seconds)
  - Display error messages for API failures
  - _Requirements: 5.2, 5.4, 5.5_

- [ ] 11.1 Write integration tests for photo generation flow
  - Test complete flow from upload to display with mock API
  - Test error handling with failed API responses
  - _Requirements: 5.2, 5.4_

- [ ] 12. Implement HowItWorksPage component
  - Create HowItWorksPage component with static content
  - Display 4-6 bullet points explaining app features
  - Include instructions on how to upload a picture
  - Include instructions on how to explore destinations
  - Use clear and concise language
  - Implement responsive layout
  - _Requirements: 6.2, 6.3, 6.4, 6.5_

- [ ] 12.1 Write property test for instruction count
  - **Property 10: Instruction count constraint**
  - **Validates: Requirements 6.2**

- [ ] 12.2 Write unit tests for HowItWorksPage
  - Test that instruction points are displayed
  - Test that upload instructions are present
  - Test that explore instructions are present
  - _Requirements: 6.2, 6.3, 6.4_

- [ ] 13. Implement routing and navigation
  - Set up React Router with routes for home, destinations, AI photo, and how-it-works pages
  - Implement navigation component with links to home page from all pages
  - Add browser history support for back/forward navigation
  - Implement 404 page for invalid routes
  - _Requirements: 7.3, 7.4, 7.5_

- [ ] 13.1 Write property test for home navigation
  - **Property 11: Home navigation availability**
  - **Validates: Requirements 7.5**

- [ ] 13.2 Write unit tests for routing
  - Test that all routes render correct components
  - Test that navigation links work correctly
  - _Requirements: 7.3, 7.4, 7.5_

- [ ] 14. Implement flight price information feature
  - Create API endpoint or static data for flight prices
  - Integrate flight price data into destination details
  - Handle missing flight price data gracefully with fallback message
  - Display prices in appropriate currency format
  - _Requirements: 10.1, 10.2, 10.3_

- [ ] 14.1 Write unit tests for flight price handling
  - Test that flight prices display when available
  - Test that fallback message shows when unavailable
  - _Requirements: 10.1, 10.3_

- [ ] 15. Implement location-based recommendations feature
  - Create function to get user's location (browser geolocation API)
  - Implement location-based recommendation logic
  - Handle location permission denied with fallback to manual input or general recommendations
  - Display location-based places to visit
  - _Requirements: 11.1, 11.2, 11.3_

- [ ] 15.1 Write property test for location-based recommendations
  - **Property 13: Location-based recommendations**
  - **Validates: Requirements 11.1**

- [ ] 15.2 Write unit tests for location handling
  - Test that location data generates recommendations
  - Test that missing location triggers fallback
  - _Requirements: 11.1, 11.2_

- [ ] 16. Implement responsive design and styling with Material Design 3
  - Apply Material Design 3 principles using MUI components
  - Configure custom Material-UI theme with dynamic color system
  - Implement responsive grid layouts using MUI Grid for destination cards
  - Style all components following Material Design 3 guidelines (elevation, surface tints, state layers)
  - Add colorful and visually appealing designs for destination cards using Material color tokens
  - Implement Material Motion animations and micro-interactions for user feedback
  - Use Material Design breakpoints for responsive behavior
  - Ensure all pages are mobile-responsive following Material Design adaptive layouts
  - Test on various screen sizes
  - _Requirements: 1.4, 9.1, 9.2, 9.3, 12.1, 12.2, 12.3, 12.5_

- [ ] 16.1 Write unit tests for responsive components
  - Test that components render correctly at different viewport sizes
  - _Requirements: 1.4, 9.1_

- [ ] 17. Implement error handling and loading states
  - Add error boundaries to catch React errors
  - Implement error messages for file upload failures
  - Implement error messages for API failures
  - Add loading indicators for all async operations
  - Implement retry mechanisms for failed operations
  - Add offline detection and messaging
  - _Requirements: 3.4, 5.3, 10.3, 11.2_

- [ ] 17.1 Write unit tests for error handling
  - Test that error messages display correctly
  - Test that retry mechanisms work
  - Test that loading states show during async operations
  - _Requirements: 3.4, 5.3_

- [ ] 18. Optimize performance
  - Implement lazy loading for images
  - Code-split routes for faster initial load
  - Optimize bundle size by removing unused dependencies
  - Implement caching for destination data
  - Compress images and assets
  - Test page load times to ensure under 3 seconds
  - _Requirements: 8.1, 8.2, 8.3_

- [ ] 18.1 Write performance tests
  - Test that page load times meet requirements
  - Test that images are lazy-loaded
  - _Requirements: 8.1_

- [ ] 19. Configure deployment
  - Set up Vercel or Netlify project
  - Configure build settings and environment variables
  - Set up serverless functions for API endpoints
  - Configure CORS for API endpoints
  - Set up CDN for static assets
  - Configure caching headers
  - Test deployment in staging environment
  - _Requirements: All requirements depend on successful deployment_

- [ ] 20. Create documentation
  - Write README with project description, setup instructions, features list, tech stack, and usage guide
  - Document environment variables needed
  - Document API endpoints and their usage
  - Add code comments for complex logic
  - _Requirements: Documentation requirement from PRD_

- [ ] 21. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.
