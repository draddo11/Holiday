import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon, ArrowForward } from '@mui/icons-material';
import { colors, shadows, borderRadius, transitions, spacing } from '../theme/tokens';
import { usePrefersReducedMotion } from '../hooks/useScrollAnimation';

function ModernNavigation() {
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/destinations', label: 'Destinations' },
    { path: '/custom-destination', label: 'Search' },
    { path: '/ai-trip-planner', label: 'AI Planner' },
    // { path: '/ai-photo', label: 'AI Photos' }, // Temporarily disabled - focusing on trip planning
    { path: '/how-it-works', label: 'About' },
  ];

  const handleMobileMenuToggle = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        component="nav"
        role="navigation"
        aria-label="Main navigation"
        sx={{
          backgroundColor: 'rgba(3, 7, 18, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          transition: prefersReducedMotion ? 'none' : `all ${transitions.duration.slow} ${transitions.timing.ease}`,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ py: spacing[2], justifyContent: 'space-between', px: { xs: 0, sm: spacing[2] } }}>
            {/* Logo */}
            <Box
              component={Link}
              to="/"
              aria-label="TravelSnap home"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: spacing[2],
                textDecoration: 'none',
                transition: prefersReducedMotion ? 'none' : `all ${transitions.duration.base} ${transitions.timing.ease}`,
                '&:hover': {
                  '& .logo-icon': {
                    transform: prefersReducedMotion ? 'none' : 'rotate(360deg)',
                  },
                },
              }}
            >
              <Box
                className="logo-icon"
                aria-label="TravelSnap Logo"
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: borderRadius.md,
                  background: `linear-gradient(135deg, ${colors.primary[500]} 0%, ${colors.primary[600]} 100%)`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: prefersReducedMotion ? 'none' : `transform ${transitions.duration.slower} ${transitions.timing.ease}`,
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                  '&:hover': {
                    transform: prefersReducedMotion ? 'none' : 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(37, 99, 235, 0.4)',
                  }
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="white"/>
                </svg>
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  fontSize: '1.5rem',
                  color: 'white',
                }}
              >
                TravelSnap
              </Typography>
            </Box>

            {/* Desktop Navigation Links */}
            {!isMobile && (
              <Box sx={{ display: 'flex', gap: spacing[1] }} role="list">
                {navItems.map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Button
                      key={item.path}
                      component={Link}
                      to={item.path}
                      className={isActive ? 'active' : ''}
                      aria-current={isActive ? 'page' : undefined}
                      aria-label={`Navigate to ${item.label}`}
                      sx={{
                        color: 'white',
                        px: spacing[3],
                        py: spacing[2],
                        fontSize: '0.9375rem',
                        fontWeight: 500,
                        position: 'relative',
                        textTransform: 'none',
                        transition: prefersReducedMotion ? 'none' : `all ${transitions.duration.base} ${transitions.timing.ease}`,
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          bottom: 0,
                          left: '50%',
                          transform: isActive
                            ? 'translateX(-50%) scaleX(1)'
                            : 'translateX(-50%) scaleX(0)',
                          width: '80%',
                          height: '2px',
                          backgroundColor: colors.primary[600],
                          transition: prefersReducedMotion ? 'none' : `transform ${transitions.duration.slow} ${transitions.timing.ease}`,
                        },
                        '&:hover::after': {
                          transform: 'translateX(-50%) scaleX(1)',
                        },
                        '&.active': {
                          color: colors.primary[500],
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  );
                })}
              </Box>
            )}

            {/* CTA Button (Desktop) */}
            {!isMobile && (
              <Button
                variant="contained"
                component={Link}
                to="/ai-trip-planner"
                endIcon={<ArrowForward />}
                aria-label="Get started with AI trip planning"
                sx={{
                  backgroundColor: colors.primary[600],
                  px: spacing[4],
                  py: spacing[2],
                  borderRadius: borderRadius.md,
                  fontWeight: 600,
                  textTransform: 'none',
                  transition: prefersReducedMotion ? 'none' : `all ${transitions.duration.slow} ${transitions.timing.spring}`,
                  '&:hover': {
                    backgroundColor: colors.primary[700],
                    transform: prefersReducedMotion ? 'none' : 'translateY(-2px)',
                  },
                }}
              >
                Get Started
              </Button>
            )}

            {/* Mobile Menu Button */}
            {isMobile && (
              <IconButton
                onClick={handleMobileMenuToggle}
                sx={{
                  color: 'white',
                  width: 44,
                  height: 44,
                  transition: prefersReducedMotion ? 'none' : `all ${transitions.duration.base} ${transitions.timing.ease}`,
                  '&:hover': {
                    backgroundColor: 'rgba(59, 130, 246, 0.1)',
                  },
                }}
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation-menu"
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer Menu */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={handleMobileMenuClose}
        id="mobile-navigation-menu"
        aria-label="Mobile navigation menu"
        sx={{
          '& .MuiDrawer-paper': {
            width: '80%',
            maxWidth: '320px',
            backgroundColor: colors.neutral[950],
            backgroundImage: 'none',
            borderLeft: '1px solid rgba(255, 255, 255, 0.1)',
          },
        }}
        transitionDuration={prefersReducedMotion ? 0 : {
          enter: transitions.duration.slow,
          exit: transitions.duration.slow,
        }}
      >
        <Box
          sx={{
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            p: spacing[3],
          }}
        >
          {/* Mobile Menu Header */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              mb: spacing[4],
            }}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: 'white',
              }}
            >
              Menu
            </Typography>
            <IconButton
              onClick={handleMobileMenuClose}
              sx={{
                color: 'white',
                width: 44,
                height: 44,
                '&:hover': {
                  backgroundColor: 'rgba(255, 90, 31, 0.1)',
                },
              }}
              aria-label="Close navigation menu"
            >
              <CloseIcon />
            </IconButton>
          </Box>

          {/* Mobile Navigation Links */}
          <List sx={{ flex: 1 }} role="navigation" aria-label="Mobile navigation links">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <ListItem key={item.path} disablePadding sx={{ mb: spacing[1] }}>
                  <ListItemButton
                    component={Link}
                    to={item.path}
                    onClick={handleMobileMenuClose}
                    aria-current={isActive ? 'page' : undefined}
                    aria-label={`Navigate to ${item.label}`}
                    sx={{
                      borderRadius: borderRadius.md,
                      py: spacing[2],
                      px: spacing[3],
                      backgroundColor: isActive
                        ? 'rgba(59, 130, 246, 0.1)'
                        : 'transparent',
                      border: isActive
                        ? '1px solid rgba(59, 130, 246, 0.3)'
                        : '1px solid transparent',
                      transition: prefersReducedMotion ? 'none' : `all ${transitions.duration.base} ${transitions.timing.ease}`,
                      '&:hover': {
                        backgroundColor: 'rgba(59, 130, 246, 0.1)',
                        border: '1px solid rgba(59, 130, 246, 0.2)',
                      },
                    }}
                  >
                    <ListItemText
                      primary={item.label}
                      primaryTypographyProps={{
                        fontWeight: isActive ? 600 : 500,
                        color: isActive ? colors.primary[500] : 'white',
                        fontSize: '1.125rem',
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>

          {/* Mobile CTA Button */}
          <Button
            variant="contained"
            component={Link}
            to="/ai-trip-planner"
            onClick={handleMobileMenuClose}
            fullWidth
            endIcon={<ArrowForward />}
            aria-label="Get started with AI trip planning"
            sx={{
              backgroundColor: colors.primary[600],
              py: spacing[2],
              borderRadius: borderRadius.md,
              fontWeight: 600,
              fontSize: '1.125rem',
              textTransform: 'none',
              transition: prefersReducedMotion ? 'none' : `all ${transitions.duration.slow} ${transitions.timing.spring}`,
              '&:hover': {
                backgroundColor: colors.primary[700],
                transform: prefersReducedMotion ? 'none' : 'translateY(-2px)',
              },
            }}
          >
            Get Started
          </Button>
        </Box>
      </Drawer>
    </>
  );
}

export default ModernNavigation;
