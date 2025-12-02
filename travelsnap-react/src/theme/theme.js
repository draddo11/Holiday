import { createTheme } from '@mui/material/styles';
import { colors, typography, spacing, shadows, borderRadius, transitions } from './tokens';

// Create MUI theme configuration with design tokens
const theme = createTheme({
  // Breakpoints
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },

  // Palette configuration
  palette: {
    mode: 'dark',
    primary: {
      main: colors.primary[500],
      light: colors.primary[400],
      dark: colors.primary[600],
      contrastText: colors.neutral[0],
      50: colors.primary[50],
      100: colors.primary[100],
      200: colors.primary[200],
      300: colors.primary[300],
      400: colors.primary[400],
      500: colors.primary[500],
      600: colors.primary[600],
      700: colors.primary[700],
      800: colors.primary[800],
      900: colors.primary[900],
    },
    secondary: {
      main: colors.secondary[500],
      light: colors.secondary[400],
      dark: colors.secondary[600],
      contrastText: colors.neutral[0],
      50: colors.secondary[50],
      100: colors.secondary[100],
      200: colors.secondary[200],
      300: colors.secondary[300],
      400: colors.secondary[400],
      500: colors.secondary[500],
      600: colors.secondary[600],
      700: colors.secondary[700],
      800: colors.secondary[800],
      900: colors.secondary[900],
    },
    neutral: {
      0: colors.neutral[0],
      50: colors.neutral[50],
      100: colors.neutral[100],
      200: colors.neutral[200],
      300: colors.neutral[300],
      400: colors.neutral[400],
      500: colors.neutral[500],
      600: colors.neutral[600],
      700: colors.neutral[700],
      800: colors.neutral[800],
      900: colors.neutral[900],
      950: colors.neutral[950],
    },
    success: {
      main: colors.success,
      contrastText: colors.neutral[0],
    },
    warning: {
      main: colors.warning,
      contrastText: colors.neutral[0],
    },
    error: {
      main: colors.error,
      contrastText: colors.neutral[0],
    },
    info: {
      main: colors.info,
      contrastText: colors.neutral[0],
    },
    background: {
      default: colors.neutral[950],
      paper: colors.neutral[900],
    },
    text: {
      primary: colors.neutral[0],
      secondary: colors.neutral[400],
      disabled: colors.neutral[600],
    },
    divider: 'rgba(255, 255, 255, 0.1)',
  },

  // Typography configuration
  typography: {
    fontFamily: typography.fontFamily.primary,
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: typography.fontWeight.normal,
    fontWeightMedium: typography.fontWeight.medium,
    fontWeightBold: typography.fontWeight.bold,
    
    // Typography variants
    h1: {
      fontFamily: typography.fontFamily.display,
      fontSize: typography.fontSize['6xl'],
      fontWeight: typography.fontWeight.extrabold,
      lineHeight: typography.lineHeight.tight,
      letterSpacing: typography.letterSpacing.tight,
    },
    h2: {
      fontFamily: typography.fontFamily.display,
      fontSize: typography.fontSize['5xl'],
      fontWeight: typography.fontWeight.extrabold,
      lineHeight: typography.lineHeight.tight,
      letterSpacing: typography.letterSpacing.tight,
    },
    h3: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.fontSize['4xl'],
      fontWeight: typography.fontWeight.bold,
      lineHeight: typography.lineHeight.tight,
    },
    h4: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.fontSize['3xl'],
      fontWeight: typography.fontWeight.bold,
      lineHeight: typography.lineHeight.tight,
    },
    h5: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.fontSize['2xl'],
      fontWeight: typography.fontWeight.semibold,
      lineHeight: typography.lineHeight.normal,
    },
    h6: {
      fontFamily: typography.fontFamily.primary,
      fontSize: typography.fontSize.xl,
      fontWeight: typography.fontWeight.semibold,
      lineHeight: typography.lineHeight.normal,
    },
    subtitle1: {
      fontSize: typography.fontSize.lg,
      fontWeight: typography.fontWeight.medium,
      lineHeight: typography.lineHeight.normal,
    },
    subtitle2: {
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.medium,
      lineHeight: typography.lineHeight.normal,
    },
    body1: {
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.normal,
      lineHeight: typography.lineHeight.relaxed,
    },
    body2: {
      fontSize: typography.fontSize.sm,
      fontWeight: typography.fontWeight.normal,
      lineHeight: typography.lineHeight.normal,
    },
    button: {
      fontSize: typography.fontSize.base,
      fontWeight: typography.fontWeight.semibold,
      textTransform: 'none',
      letterSpacing: typography.letterSpacing.normal,
    },
    caption: {
      fontSize: typography.fontSize.xs,
      fontWeight: typography.fontWeight.normal,
      lineHeight: typography.lineHeight.normal,
    },
    overline: {
      fontSize: typography.fontSize.xs,
      fontWeight: typography.fontWeight.semibold,
      textTransform: 'uppercase',
      letterSpacing: typography.letterSpacing.wide,
      lineHeight: typography.lineHeight.normal,
    },
  },

  // Spacing configuration (8px base unit)
  spacing: 8,

  // Shape configuration
  shape: {
    borderRadius: parseInt(borderRadius.md),
  },

  // Shadows configuration
  shadows: [
    'none',
    shadows.sm,
    shadows.base,
    shadows.md,
    shadows.md,
    shadows.lg,
    shadows.lg,
    shadows.xl,
    shadows.xl,
    shadows['2xl'],
    shadows['2xl'],
    shadows['2xl'],
    shadows['2xl'],
    shadows['2xl'],
    shadows['2xl'],
    shadows['2xl'],
    shadows['2xl'],
    shadows['2xl'],
    shadows['2xl'],
    shadows['2xl'],
    shadows['2xl'],
    shadows['2xl'],
    shadows['2xl'],
    shadows['2xl'],
    shadows['2xl'],
  ],

  // Transitions configuration
  transitions: {
    duration: {
      shortest: 150,
      shorter: 200,
      short: 250,
      standard: 300,
      complex: 375,
      enteringScreen: 225,
      leavingScreen: 195,
    },
    easing: {
      easeInOut: transitions.timing.easeInOut,
      easeOut: transitions.timing.easeOut,
      easeIn: transitions.timing.easeIn,
      sharp: transitions.timing.ease,
    },
  },

  // Component default props and styles
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: false,
        disableRipple: false,
      },
      styleOverrides: {
        root: {
          borderRadius: borderRadius.md,
          padding: `${spacing[3]} ${spacing[6]}`,
          fontSize: typography.fontSize.base,
          fontWeight: typography.fontWeight.semibold,
          textTransform: 'none',
          transition: `all ${transitions.duration.base} ${transitions.timing.ease}`,
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
        contained: {
          boxShadow: shadows.md,
          '&:hover': {
            boxShadow: shadows.lg,
          },
        },
        containedPrimary: {
          background: colors.gradients.primary,
          '&:hover': {
            background: colors.gradients.primary,
            boxShadow: shadows.glow,
          },
        },
        outlined: {
          borderWidth: '1px',
          borderColor: 'rgba(255, 255, 255, 0.2)',
          '&:hover': {
            borderColor: colors.primary[500],
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
          },
        },
        sizeLarge: {
          padding: `${spacing[4]} ${spacing[8]}`,
          fontSize: typography.fontSize.lg,
        },
        sizeSmall: {
          padding: `${spacing[2]} ${spacing[4]}`,
          fontSize: typography.fontSize.sm,
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: borderRadius.xl,
          background: colors.gradients.glass,
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          transition: `all ${transitions.duration.slow} ${transitions.timing.spring}`,
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: spacing[6],
          '&:last-child': {
            paddingBottom: spacing[6],
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: borderRadius.base,
          fontWeight: typography.fontWeight.medium,
        },
        filled: {
          backgroundColor: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: 'outlined',
      },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: borderRadius.lg,
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            transition: `all ${transitions.duration.base} ${transitions.timing.ease}`,
            '& fieldset': {
              borderColor: 'rgba(255, 255, 255, 0.1)',
            },
            '&:hover fieldset': {
              borderColor: 'rgba(59, 130, 246, 0.3)',
            },
            '&.Mui-focused fieldset': {
              borderColor: colors.primary[500],
              borderWidth: '2px',
            },
          },
          '& .MuiInputBase-input': {
            padding: spacing[4],
          },
          '& .MuiInputBase-input::placeholder': {
            color: colors.neutral[400], // WCAG AA compliant
            opacity: 1,
          },
        },
      },
    },
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(3, 7, 18, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiToolbar: {
      styleOverrides: {
        root: {
          padding: `${spacing[4]} ${spacing[6]}`,
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          transition: `all ${transitions.duration.base} ${transitions.timing.ease}`,
          '&:hover': {
            transform: 'translateY(-2px)',
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
          transition: `color ${transitions.duration.base} ${transitions.timing.ease}`,
          '&:hover': {
            color: colors.primary[400],
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: spacing[4],
          paddingRight: spacing[4],
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: 'rgba(255, 255, 255, 0.1)',
        },
      },
    },
  },
});

export default theme;
