import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { ThemeProvider, CssBaseline, Box, CircularProgress } from '@mui/material';
import { useEffect, useState, lazy, Suspense } from 'react';
import ModernNavigation from './components/ModernNavigation';
import ModernFooter from './components/ModernFooter';
import SkipLink from './components/SkipLink';
import theme from './theme/theme';
import { initPerformanceMonitoring } from './utils/performanceMonitor';
import './App.css';

// Lazy load page components for code splitting
const HomePage = lazy(() => import('./pages/HomePage'));
const DestinationsPage = lazy(() => import('./pages/DestinationsPage'));
// const AIPhotoPage = lazy(() => import('./pages/AIPhotoPage')); // Temporarily disabled
const HowItWorksPage = lazy(() => import('./pages/HowItWorksPage'));
const CustomDestinationPage = lazy(() => import('./pages/CustomDestinationPage'));
const ComponentShowcase = lazy(() => import('./pages/ComponentShowcase'));
const AITripPlannerPage = lazy(() => import('./pages/AITripPlannerPage'));

// Loading fallback component
function LoadingFallback() {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '60vh',
        background: 'linear-gradient(180deg, #030712 0%, #1F2937 50%, #374151 100%)',
      }}
    >
      <CircularProgress
        size={60}
        sx={{
          color: '#6366F1',
        }}
      />
    </Box>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('fadeIn');

  useEffect(() => {
    if (location.pathname !== displayLocation.pathname) {
      setTransitionStage('fadeOut');
    }
  }, [location, displayLocation]);

  return (
    <div
      style={{
        animation: transitionStage === 'fadeIn' 
          ? 'fadeIn 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards'
          : 'fadeOut 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards',
      }}
      onAnimationEnd={() => {
        if (transitionStage === 'fadeOut') {
          setDisplayLocation(location);
          setTransitionStage('fadeIn');
        }
      }}
    >
      <Suspense fallback={<LoadingFallback />}>
        <Routes location={displayLocation}>
          <Route path="/" element={<HomePage />} />
          <Route path="/destinations" element={<DestinationsPage />} />
          {/* <Route path="/ai-photo" element={<AIPhotoPage />} /> */}
          <Route path="/ai-trip-planner" element={<AITripPlannerPage />} />
          <Route path="/custom-destination" element={<CustomDestinationPage />} />
          <Route path="/how-it-works" element={<HowItWorksPage />} />
          <Route path="/showcase" element={<ComponentShowcase />} />
        </Routes>
      </Suspense>
    </div>
  );
}

function App() {
  // Initialize performance monitoring
  useEffect(() => {
    initPerformanceMonitoring();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <style>
          {`
            @keyframes fadeIn {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }
            @keyframes fadeOut {
              from {
                opacity: 1;
                transform: translateY(0);
              }
              to {
                opacity: 0;
                transform: translateY(-20px);
              }
            }
            
            /* Global focus indicator styles */
            *:focus-visible {
              outline: 3px solid #6366F1;
              outline-offset: 2px;
            }
            
            /* Ensure main content can receive focus */
            #main-content:focus {
              outline: none;
            }
          `}
        </style>
        <div className="app">
          <SkipLink />
          <ModernNavigation />
          <main 
            id="main-content" 
            className="main-content"
            tabIndex={-1}
            role="main"
            aria-label="Main content"
          >
            <AnimatedRoutes />
          </main>
          <ModernFooter />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
