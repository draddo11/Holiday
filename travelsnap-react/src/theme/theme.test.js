import { describe, it, expect } from 'vitest';
import theme from './theme';
import { colors, typography } from './tokens';

describe('MUI Theme Configuration', () => {
  it('should have correct breakpoints configured', () => {
    expect(theme.breakpoints.values).toEqual({
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    });
  });

  it('should have primary color palette configured', () => {
    expect(theme.palette.primary.main).toBe(colors.primary[500]);
    expect(theme.palette.primary.light).toBe(colors.primary[400]);
    expect(theme.palette.primary.dark).toBe(colors.primary[600]);
  });

  it('should have secondary color palette configured', () => {
    expect(theme.palette.secondary.main).toBe(colors.secondary[500]);
    expect(theme.palette.secondary.light).toBe(colors.secondary[400]);
    expect(theme.palette.secondary.dark).toBe(colors.secondary[600]);
  });

  it('should have dark mode enabled', () => {
    expect(theme.palette.mode).toBe('dark');
  });

  it('should have correct typography font family', () => {
    expect(theme.typography.fontFamily).toBe(typography.fontFamily.primary);
  });

  it('should have typography variants configured', () => {
    expect(theme.typography.h1.fontWeight).toBe(typography.fontWeight.extrabold);
    expect(theme.typography.button.textTransform).toBe('none');
  });

  it('should use 8px spacing base unit', () => {
    expect(theme.spacing(1)).toBe('8px');
    expect(theme.spacing(2)).toBe('16px');
    expect(theme.spacing(4)).toBe('32px');
  });

  it('should have component default props configured', () => {
    expect(theme.components.MuiButton.defaultProps.disableElevation).toBe(false);
    expect(theme.components.MuiCard.defaultProps.elevation).toBe(0);
    expect(theme.components.MuiTextField.defaultProps.variant).toBe('outlined');
  });

  it('should have semantic colors configured', () => {
    expect(theme.palette.success.main).toBe(colors.success);
    expect(theme.palette.warning.main).toBe(colors.warning);
    expect(theme.palette.error.main).toBe(colors.error);
    expect(theme.palette.info.main).toBe(colors.info);
  });

  it('should have background colors configured for dark mode', () => {
    expect(theme.palette.background.default).toBe(colors.neutral[950]);
    expect(theme.palette.background.paper).toBe(colors.neutral[900]);
  });
});
