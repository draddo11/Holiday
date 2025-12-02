import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { Flight } from '@mui/icons-material';

function Navigation() {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/destinations', label: 'Destinations' },
    { path: '/custom-destination', label: 'Search' },
    { path: '/ai-photo', label: 'AI Photos' },
    { path: '/how-it-works', label: 'About' },
  ];

  return (
    <AppBar 
      position="fixed" 
      elevation={0}
      sx={{ 
        background: 'rgba(10, 14, 39, 0.8)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
        boxShadow: 'none',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', py: 1 }}>
          <Box 
            component={Link}
            to="/"
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              textDecoration: 'none',
              transition: 'all 0.3s ease',
              '&:hover': {
                '& .logo-icon': {
                  transform: 'rotate(360deg)',
                },
              },
            }}
          >
            <Box
              className="logo-icon"
              sx={{
                backgroundColor: colors.primary[600],
                borderRadius: 2,
                p: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 20px rgba(0,245,255,0.3)',
                transition: 'transform 0.5s ease',
              }}
            >
              <Flight sx={{ color: 'white', fontSize: 24 }} />
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: 'white',
                fontSize: '1.5rem',
              }}
            >
              TravelSnap
            </Typography>
          </Box>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                sx={{
                  color: location.pathname === item.path ? colors.primary[400] : colors.neutral[400],
                  fontWeight: 600,
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  backgroundColor: location.pathname === item.path 
                    ? 'rgba(59, 130, 246, 0.1)' 
                    : 'transparent',
                  border: location.pathname === item.path 
                    ? '1px solid rgba(59, 130, 246, 0.3)' 
                    : '1px solid transparent',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: colors.primary[400],
                    backgroundColor: 'rgba(59, 130, 246, 0.05)',
                    border: '1px solid rgba(59, 130, 246, 0.2)',
                  },
                }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navigation;
