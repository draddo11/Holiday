# Design Document

## Overview

TravelSnap is a client-side focused web application built with modern web technologies. The system consists of a React-based frontend for the user interface, a lightweight backend API for AI image processing, and integration with third-party services for AI photo placement. The architecture prioritizes simplicity, fast load times, and mobile responsiveness while delivering an engaging user experience.

The application follows a component-based architecture where the UI is broken into reusable React components, destination data is stored as static JSON, and AI processing is handled through serverless functions that interface with image generation APIs.

## Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        Frontend (React)                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Home Page   │  │ Destinations │  │  AI Photo    │      │
│  │  Component   │  │    Page      │  │    Page      │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│         │                  │                  │              │
│         └──────────────────┴──────────────────┘              │
│                            │                                 │
│                   ┌────────▼────────┐                        │
│                   │  State Manager  │                        │
│                   │   (React State) │                        │
│                   └────────┬────────┘                        │
└────────────────────────────┼──────────────────────────────────┘
                             │
                    ┌────────▼────────┐
                    │   API Layer     │
                    └────────┬────────┘
                             │
        ┌────────────────────┼────────────────────┐
        │                    │                    │
┌───────▼────────┐  ┌────────▼────────┐  ┌───────▼────────┐
│  Static Data   │  │  Serverless     │  │   AI Service   │
│  (Destinations)│  │  Functions      │  │  (Replicate/   │
│                │  │  (Image API)    │  │   Stability)   │
└────────────────┘  └─────────────────┘  └────────────────┘
```

### Technology Stack

**Frontend:**
- React 18+ with functional components and hooks
- React Router for navigation
- Material Design 3 (Material You) with MUI (Material-UI v5+) for styling
- Material Icons for iconography
- Axios for HTTP requests

**Design System:**
- Material Design 3 principles (dynamic color, elevation, motion)
- MUI components: Card, Button, AppBar, Dialog, TextField, CircularProgress, Grid
- Custom theme with primary, secondary, and tertiary color schemes
- Responsive breakpoints following Material Design guidelines

**Backend:**
- Serverless functions (Vercel Functions or Netlify Functions)
- Node.js runtime
- Integration with AI image generation API

**AI Service:**
- Replicate API (recommended for ease of use)
- Alternative: Stability AI API
- Image processing: background removal + composition

**Deployment:**
- Vercel or Netlify for hosting
- CDN for static assets
- Environment variables for API keys

## Components and Interfaces

### Frontend Components

#### 1. HomePage Component
- Displays app branding and hero section
- Renders navigation buttons (Explore Destinations, Create Travel Photo)
- Shows introductory text and hero image
- Links to How It Works page

**Props:** None (root component)

**State:** None

#### 2. DestinationsPage Component
- Fetches and displays destination data
- Renders grid of DestinationCard components
- Handles card click events to show details

**Props:** None

**State:**
```typescript
{
  destinations: Destination[],
  selectedDestination: Destination | null,
  showDetails: boolean
}
```

#### 3. DestinationCard Component
- Displays destination image, name, and tagline
- Handles click events to trigger detail view

**Props:**
```typescript
{
  destination: Destination,
  onClick: (destination: Destination) => void
}
```

#### 4. DestinationDetails Component
- Shows places to visit, activities, and quick facts
- Displays flight price information
- Provides close/back button

**Props:**
```typescript
{
  destination: Destination,
  onClose: () => void
}
```

#### 5. AIPhotoPage Component
- Manages photo upload flow
- Handles landmark selection
- Triggers AI generation
- Displays loading state and results

**Props:** None

**State:**
```typescript
{
  uploadedImage: File | null,
  selectedLandmark: string | null,
  isGenerating: boolean,
  generatedImage: string | null,
  error: string | null
}
```

#### 6. ImageUpload Component
- File input for JPG/PNG images
- Preview of uploaded image
- Validation and error handling

**Props:**
```typescript
{
  onImageSelect: (file: File) => void,
  acceptedFormats: string[]
}
```

#### 7. LandmarkSelector Component
- Dropdown or grid of landmark options
- Visual representation of each landmark

**Props:**
```typescript
{
  landmarks: Landmark[],
  selectedLandmark: string | null,
  onSelect: (landmarkId: string) => void
}
```

#### 8. HowItWorksPage Component
- Static content explaining app usage
- Bullet points with instructions
- Simple, readable layout

**Props:** None

### Backend API Interfaces

#### POST /api/generate-photo

**Request:**
```typescript
{
  userImage: string,        // Base64 encoded image
  landmark: string,         // Landmark identifier
  poseStyle?: string        // Optional: "funny" | "cinematic" | "casual"
}
```

**Response:**
```typescript
{
  success: boolean,
  imageUrl: string,         // URL of generated image
  message?: string,
  error?: string
}
```

#### GET /api/destinations

**Response:**
```typescript
{
  destinations: Destination[]
}
```

#### GET /api/flight-prices/:destinationId

**Response:**
```typescript
{
  destinationId: string,
  prices: {
    economy: number,
    business: number,
    currency: string
  },
  lastUpdated: string
}
```

## Data Models

### Destination

```typescript
interface Destination {
  id: string,
  name: string,
  tagline: string,
  imageUrl: string,
  placesToVisit: string[],      // 3-5 items
  showsActivities: string[],    // 2-4 items
  quickFacts: string[],         // 2-3 items
  flightPriceInfo?: FlightPrice
}
```

### Landmark

```typescript
interface Landmark {
  id: string,
  name: string,
  location: string,
  imageUrl: string,
  backgroundPrompt: string      // For AI generation
}
```

### FlightPrice

```typescript
interface FlightPrice {
  destinationId: string,
  averagePrice: number,
  currency: string,
  fromLocation: string
}
```

### AIGenerationRequest

```typescript
interface AIGenerationRequest {
  userImageBase64: string,
  landmarkId: string,
  poseStyle: "funny" | "cinematic" | "casual"
}
```

### AIGenerationResponse

```typescript
interface AIGenerationResponse {
  success: boolean,
  generatedImageUrl: string,
  processingTime: number,
  error?: string
}
```


## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system—essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

### Property 1: Destination count constraint
*For any* destination dataset loaded by the system, the number of destination cards displayed should be between 5 and 10 inclusive.
**Validates: Requirements 1.1**

### Property 2: Destination card completeness
*For any* destination object, when rendered as a card, the output should contain the destination image URL, destination name, and tagline.
**Validates: Requirements 1.2**

### Property 3: Destination details data constraints
*For any* destination object, it should contain between 3 and 5 places to visit, between 2 and 4 shows or activities, and between 2 and 3 quick facts.
**Validates: Requirements 2.2, 2.3, 2.4**

### Property 4: Image format validation
*For any* file with JPG or PNG extension, the upload validation function should accept it, and for any file with a different extension, the validation function should reject it.
**Validates: Requirements 3.2, 3.3, 3.4**

### Property 5: Image storage after upload
*For any* valid image file that is successfully uploaded, the system state should contain the image data accessible for processing.
**Validates: Requirements 3.5**

### Property 6: Landmark selection minimum
*For any* landmark dataset in the system, the number of available landmarks should be at least 3.
**Validates: Requirements 4.2**

### Property 7: Landmark selection state update
*For any* landmark from the available set, when selected by the user, the system state should reflect that landmark as the currently selected one.
**Validates: Requirements 4.3**

### Property 8: Generate button enablement
*For any* system state where both a user image is uploaded and a landmark is selected, the generate button should be enabled, and for any state missing either prerequisite, the button should be disabled.
**Validates: Requirements 5.1, 4.4**

### Property 9: AI service invocation
*For any* valid user image and landmark selection, when the generate button is clicked, an API request should be sent containing both the image data and landmark identifier.
**Validates: Requirements 5.2**

### Property 10: Instruction count constraint
*For any* how-it-works page content, the number of instruction bullet points displayed should be between 4 and 6 inclusive.
**Validates: Requirements 6.2**

### Property 11: Home navigation availability
*For any* page in the application, there should exist a navigation element that routes back to the home page.
**Validates: Requirements 7.5**

### Property 12: Flight price display
*For any* destination with available flight price data, when the destination details are displayed, the flight price information should be included in the rendered output.
**Validates: Requirements 10.1**

### Property 13: Location-based recommendations
*For any* valid user location data, when location-based recommendations are requested, the system should generate places to visit information that references the provided location.
**Validates: Requirements 11.1**

### Property 14: Playful text with generated photos
*For any* generated travel photo displayed to the user, the UI should include entertaining text that references the landmark location.
**Validates: Requirements 12.4**

## Error Handling

### File Upload Errors

**Invalid File Format:**
- Detect non-JPG/PNG files before upload
- Display clear error message: "Please upload a JPG or PNG image"
- Prevent form submission until valid file is selected

**File Size Errors:**
- Set maximum file size limit (e.g., 10MB)
- Display error if exceeded: "Image file is too large. Please upload an image under 10MB"
- Compress or resize on client-side if possible

**Upload Failure:**
- Catch network errors during upload
- Display retry option
- Preserve user's file selection for retry

### AI Generation Errors

**API Timeout:**
- Set 20-second timeout for AI generation
- Display message: "Generation is taking longer than expected. Please try again"
- Log timeout for monitoring

**API Error Response:**
- Handle 4xx and 5xx errors from AI service
- Display user-friendly message: "Unable to generate your travel photo. Please try again"
- Log detailed error for debugging

**Invalid Response:**
- Validate AI service response structure
- Handle missing or malformed image URLs
- Display fallback error message

### Data Loading Errors

**Destination Data Unavailable:**
- Catch errors when loading destination JSON
- Display message: "Unable to load destinations. Please refresh the page"
- Provide retry button

**Flight Price Data Unavailable:**
- Handle missing flight price gracefully
- Display: "Flight prices currently unavailable"
- Don't block destination details display

**Location Services Denied:**
- Handle user denying location permission
- Prompt user to enter location manually
- Provide general recommendations as fallback

### Network Errors

**Offline Detection:**
- Detect when user goes offline
- Display banner: "You appear to be offline. Some features may not work"
- Queue actions for when connection restored

**Slow Connection:**
- Show loading indicators for all async operations
- Set reasonable timeouts (3-5 seconds for data, 20 seconds for AI)
- Provide feedback on progress when possible

### State Management Errors

**Invalid State Transitions:**
- Validate state before transitions
- Prevent impossible states (e.g., generating without image)
- Log unexpected state transitions

**Component Mount Errors:**
- Use error boundaries to catch React errors
- Display fallback UI: "Something went wrong. Please refresh the page"
- Log errors for debugging

## Testing Strategy

### Unit Testing

The application will use Jest and React Testing Library for unit tests. Unit tests will focus on:

**Component Rendering:**
- Test that components render without crashing
- Verify correct props are passed to child components
- Test conditional rendering based on state

**User Interactions:**
- Test button clicks trigger correct handlers
- Test form submissions with valid/invalid data
- Test navigation between pages

**Data Validation:**
- Test file format validation logic
- Test destination data structure validation
- Test API request payload construction

**Error Handling:**
- Test error states display correct messages
- Test retry mechanisms work correctly
- Test fallback UI renders when needed

**Example Unit Tests:**
- DestinationCard renders with provided destination data
- ImageUpload rejects non-JPG/PNG files
- Generate button is disabled when prerequisites not met
- Navigation buttons route to correct pages
- Error messages display when API calls fail

### Property-Based Testing

The application will use fast-check (JavaScript property-based testing library) for property tests. Each property-based test will run a minimum of 100 iterations to ensure robust validation.

**Configuration:**
- Library: fast-check
- Minimum iterations per property: 100
- Each test must reference its corresponding correctness property using the format: **Feature: travelsnap, Property {number}: {property_text}**

**Property Test Coverage:**

Each correctness property listed in the Correctness Properties section will be implemented as a property-based test. The tests will generate random valid inputs and verify that the specified properties hold across all generated cases.

**Test Data Generators:**
- Destination generator: creates random destination objects with varying counts of places, activities, and facts
- Image file generator: creates mock file objects with different extensions and sizes
- Landmark generator: creates random landmark selections
- Location generator: creates random geographic coordinates and location names

**Property Test Examples:**
- Generate random destination datasets and verify count is always 5-10
- Generate random destination objects and verify rendered cards contain all required fields
- Generate random file objects and verify JPG/PNG are accepted, others rejected
- Generate random combinations of upload/landmark states and verify button enablement logic
- Generate random locations and verify recommendations reference the location

### Integration Testing

Integration tests will verify that components work together correctly:

**Page Flow Testing:**
- Test complete user journey from home to destination details
- Test complete photo generation flow from upload to display
- Test navigation between all pages

**API Integration:**
- Test serverless functions with mock AI service
- Test error handling when AI service fails
- Test data flow from frontend to backend and back

**State Management:**
- Test state updates propagate correctly across components
- Test state persistence during navigation
- Test state reset when appropriate

### End-to-End Testing

E2E tests will use Playwright or Cypress to test the complete application:

**Critical User Paths:**
- User browses destinations and views details
- User uploads photo, selects landmark, and generates travel photo
- User navigates through how-it-works page

**Cross-Browser Testing:**
- Test on Chrome, Firefox, Safari
- Test on mobile browsers (iOS Safari, Chrome Mobile)

**Performance Testing:**
- Verify page load times under 3 seconds
- Verify AI generation completes within timeout
- Test with slow network conditions

## Deployment Strategy

### Build Process

**Frontend Build:**
- Run `npm run build` to create production bundle
- Optimize images and assets
- Generate static HTML for each route
- Minify JavaScript and CSS

**Environment Variables:**
- `REACT_APP_API_URL`: Backend API endpoint
- `AI_API_KEY`: API key for AI service (backend only)
- `AI_API_URL`: AI service endpoint (backend only)

### Hosting Configuration

**Vercel Deployment (Recommended):**
- Connect GitHub repository
- Configure build command: `npm run build`
- Configure output directory: `build`
- Set environment variables in Vercel dashboard
- Enable automatic deployments on push to main branch

**Serverless Functions:**
- Place functions in `/api` directory
- Configure function timeout to 30 seconds (for AI processing)
- Set memory limit to 1024MB
- Configure CORS for frontend domain

### CDN and Caching

**Static Assets:**
- Serve images, CSS, JS through Vercel CDN
- Set cache headers for immutable assets (1 year)
- Use content hashing for cache busting

**API Responses:**
- Cache destination data (1 hour)
- Don't cache AI generation responses
- Cache flight price data (6 hours)

### Monitoring and Logging

**Error Tracking:**
- Integrate Sentry or similar for error tracking
- Log all API errors with context
- Track AI generation success/failure rates

**Performance Monitoring:**
- Track page load times
- Monitor AI generation duration
- Track API response times

**Analytics:**
- Track page views
- Track feature usage (destinations viewed, photos generated)
- Track error rates

### Security Considerations

**API Key Protection:**
- Never expose AI API keys in frontend code
- Store keys in environment variables
- Access keys only in serverless functions

**File Upload Security:**
- Validate file types on both client and server
- Limit file sizes to prevent abuse
- Scan uploaded files for malicious content if possible

**Rate Limiting:**
- Implement rate limiting on AI generation endpoint
- Limit requests per IP address (e.g., 10 per hour)
- Display friendly message when limit exceeded

**CORS Configuration:**
- Configure CORS to allow only frontend domain
- Don't use wildcard (*) in production
- Validate origin on all API requests

### Rollback Strategy

**Deployment Rollback:**
- Use Vercel's instant rollback feature
- Keep previous 10 deployments available
- Test rollback process in staging

**Database/Data Rollback:**
- Since using static data, rollback is automatic with code
- If using external data source, maintain backup

**Monitoring After Deployment:**
- Monitor error rates for 1 hour after deployment
- Check AI generation success rate
- Verify all pages load correctly
- Test critical user flows manually
