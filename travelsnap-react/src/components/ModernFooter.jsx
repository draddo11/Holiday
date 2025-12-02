import { Link } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  IconButton,
  Link as MuiLink,
} from '@mui/material';
import {
  Twitter,
  Instagram,
  Facebook,
  LinkedIn,
  GitHub,
} from '@mui/icons-material';
import { colors, spacing, borderRadius, transitions } from '../theme/tokens';
import { usePrefersReducedMotion } from '../hooks/useScrollAnimation';

function ModernFooter() {
  const prefersReducedMotion = usePrefersReducedMotion();
  
  const footerSections = [
    {
      title: 'Product',
      links: [
        { label: 'Destinations', path: '/destinations' },
        { label: 'AI Photos', path: '/ai-photo' },
        { label: 'Search', path: '/custom-destination' },
        { label: 'How It Works', path: '/how-it-works' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Us', path: '/about' },
        { label: 'Blog', path: '/blog' },
        { label: 'Careers', path: '/careers' },
        { label: 'Contact', path: '/contact' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Help Center', path: '/help' },
        { label: 'Community', path: '/community' },
        { label: 'Guides', path: '/guides' },
        { label: 'API Docs', path: '/api' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', path: '/privacy' },
        { label: 'Terms of Service', path: '/terms' },
        { label: 'Cookie Policy', path: '/cookies' },
        { label: 'Licenses', path: '/licenses' },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Twitter />, label: 'Twitter', url: 'https://twitter.com' },
    { icon: <Instagram />, label: 'Instagram', url: 'https://instagram.com' },
    { icon: <Facebook />, label: 'Facebook', url: 'https://facebook.com' },
    { icon: <LinkedIn />, label: 'LinkedIn', url: 'https://linkedin.com' },
    { icon: <GitHub />, label: 'GitHub', url: 'https://github.com' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: colors.neutral[950],
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        pt: { xs: spacing[8], md: spacing[12] },
        pb: spacing[6],
        mt: 'auto',
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: spacing[4], md: spacing[6] }}>
          {/* Brand Column */}
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: spacing[3] }}>
              {/* Logo */}
              <Box
                component={Link}
                to="/"
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: spacing[2],
                  textDecoration: 'none',
                  mb: spacing[3],
                  transition: prefersReducedMotion ? 'none' : `all ${transitions.duration.base} ${transitions.timing.ease}`,
                  '&:hover': {
                    '& .footer-logo-icon': {
                      transform: prefersReducedMotion ? 'none' : 'rotate(360deg)',
                    },
                  },
                }}
              >
                <Box
                  className="footer-logo-icon"
                  aria-label="TravelSnap Logo"
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: borderRadius.md,
                    background: `linear-gradient(135deg, ${colors.primary[500]} 0%, ${colors.primary[600]} 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: prefersReducedMotion ? 'none' : `transform ${transitions.duration.slower} ${transitions.timing.ease}`,
                    boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
                  }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" fill="white"/>
                  </svg>
                </Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 800,
                    color: 'white',
                  }}
                >
                  TravelSnap
                </Typography>
              </Box>

              {/* Description */}
              <Typography
                variant="body2"
                sx={{
                  color: colors.neutral[400],
                  mb: spacing[3],
                  lineHeight: 1.7,
                  maxWidth: '400px',
                }}
              >
                Create stunning travel memories with AI-powered photo generation.
                Transform your journey into professional postcards.
              </Typography>

              {/* Social Media Icons */}
              <Box 
                sx={{ display: 'flex', gap: spacing[2], flexWrap: 'wrap' }}
                role="list"
                aria-label="Social media links"
              >
                {socialLinks.map((social) => (
                  <IconButton
                    key={social.label}
                    component="a"
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit our ${social.label} page`}
                    sx={{
                      width: 44,
                      height: 44,
                      backgroundColor: 'rgba(255, 255, 255, 0.05)',
                      color: colors.neutral[400],
                      transition: prefersReducedMotion ? 'none' : `all ${transitions.duration.base} ${transitions.timing.ease}`,
                      '&:hover': {
                        backgroundColor: 'rgba(59, 130, 246, 0.2)',
                        color: colors.primary[400],
                        transform: prefersReducedMotion ? 'none' : 'translateY(-2px)',
                      },
                    }}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
            </Box>
          </Grid>

          {/* Links Columns */}
          {footerSections.map((section) => (
            <Grid item xs={6} sm={6} md={2} key={section.title}>
              <Typography
                variant="subtitle2"
                component="h3"
                sx={{
                  color: 'white',
                  fontWeight: 700,
                  mb: spacing[3],
                  textTransform: 'uppercase',
                  letterSpacing: '0.1em',
                  fontSize: '0.75rem',
                }}
              >
                {section.title}
              </Typography>
              <Box 
                component="nav"
                sx={{ display: 'flex', flexDirection: 'column', gap: spacing[2] }}
                aria-label={`${section.title} links`}
              >
                {section.links.map((link) => (
                  <MuiLink
                    key={link.label}
                    component={Link}
                    to={link.path}
                    aria-label={`Navigate to ${link.label}`}
                    sx={{
                      color: colors.neutral[400],
                      textDecoration: 'none',
                      fontSize: '0.875rem',
                      transition: prefersReducedMotion ? 'none' : `color ${transitions.duration.base} ${transitions.timing.ease}`,
                      '&:hover': {
                        color: colors.primary[400],
                      },
                    }}
                  >
                    {link.label}
                  </MuiLink>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* Bottom Bar */}
        <Box
          sx={{
            mt: { xs: spacing[8], md: spacing[12] },
            pt: spacing[6],
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexDirection: { xs: 'column', sm: 'row' },
            gap: spacing[3],
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: colors.neutral[400], // WCAG AA compliant
              textAlign: { xs: 'center', sm: 'left' },
            }}
          >
            © {new Date().getFullYear()} TravelSnap. All rights reserved.
          </Typography>
          <Box
            component="nav"
            aria-label="Legal links"
            sx={{
              display: 'flex',
              gap: spacing[4],
              flexWrap: 'wrap',
              justifyContent: { xs: 'center', sm: 'flex-end' },
            }}
          >
            <MuiLink
              component={Link}
              to="/privacy"
              aria-label="View privacy policy"
              sx={{
                color: colors.neutral[400], // WCAG AA compliant
                fontSize: '0.875rem',
                textDecoration: 'none',
                transition: prefersReducedMotion ? 'none' : `color ${transitions.duration.base} ${transitions.timing.ease}`,
                '&:hover': {
                  color: colors.primary[400],
                },
              }}
            >
              Privacy Policy
            </MuiLink>
            <MuiLink
              component={Link}
              to="/terms"
              aria-label="View terms of service"
              sx={{
                color: colors.neutral[400], // WCAG AA compliant
                fontSize: '0.875rem',
                textDecoration: 'none',
                transition: prefersReducedMotion ? 'none' : `color ${transitions.duration.base} ${transitions.timing.ease}`,
                '&:hover': {
                  color: colors.primary[400],
                },
              }}
            >
              Terms of Service
            </MuiLink>
            <MuiLink
              component={Link}
              to="/cookies"
              aria-label="View cookie policy"
              sx={{
                color: colors.neutral[400], // WCAG AA compliant
                fontSize: '0.875rem',
                textDecoration: 'none',
                transition: prefersReducedMotion ? 'none' : `color ${transitions.duration.base} ${transitions.timing.ease}`,
                '&:hover': {
                  color: colors.primary[400],
                },
              }}
            >
              Cookie Policy
            </MuiLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default ModernFooter;
