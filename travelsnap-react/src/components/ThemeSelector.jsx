import { Box, IconButton, Tooltip, Menu, MenuItem, Typography, Chip } from '@mui/material';
import { Palette } from '@mui/icons-material';
import { useState } from 'react';
import { getAllThemes } from '../theme/seasonalThemes';
import { colors, borderRadius, spacing } from '../theme/tokens';

function ThemeSelector({ currentTheme, onThemeChange }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const themes = getAllThemes();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleThemeSelect = (themeId) => {
    onThemeChange(themeId);
    handleClose();
  };

  return (
    <>
      <Tooltip title="Change Theme" arrow>
        <IconButton
          onClick={handleClick}
          sx={{
            color: 'white',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)',
            },
          }}
        >
          <Palette />
        </IconButton>
      </Tooltip>

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: {
            backgroundColor: colors.neutral[900],
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: borderRadius.lg,
            minWidth: 280,
            mt: 1,
          },
        }}
      >
        <Box sx={{ p: 2, pb: 1 }}>
          <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 700, mb: 0.5 }}>
            Choose Your Theme
          </Typography>
          <Typography variant="caption" sx={{ color: colors.neutral[400] }}>
            Seasonal themes for year-round fun
          </Typography>
        </Box>

        {themes.map((theme) => (
          <MenuItem
            key={theme.id}
            onClick={() => handleThemeSelect(theme.id)}
            selected={currentTheme === theme.id}
            sx={{
              py: 1.5,
              px: 2,
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
              },
              '&.Mui-selected': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.15)',
                },
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%' }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: borderRadius.md,
                  background: theme.gradient,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.25rem',
                  flexShrink: 0,
                }}
              >
                {theme.icon}
              </Box>
              <Box sx={{ flex: 1 }}>
                <Typography variant="body2" sx={{ color: 'white', fontWeight: 600 }}>
                  {theme.name}
                </Typography>
                <Typography variant="caption" sx={{ color: colors.neutral[400] }}>
                  {theme.description}
                </Typography>
              </Box>
              {currentTheme === theme.id && (
                <Chip
                  label="Active"
                  size="small"
                  sx={{
                    backgroundColor: theme.accentColor,
                    color: 'white',
                    fontWeight: 600,
                    fontSize: '0.7rem',
                  }}
                />
              )}
            </Box>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

export default ThemeSelector;
