import { Link } from '@mui/material';
import { colors, borderRadius, spacing } from '../theme/tokens';

/**
 * SkipLink - Accessibility component for keyboard navigation
 * Allows keyboard users to skip directly to main content
 * 
 * Features:
 * - Hidden until focused via keyboard
 * - High contrast for visibility
 * - Positioned at top of page
 * - Smooth scroll to main content
 */
function SkipLink() {
  const handleSkipToMain = (e) => {
    e.preventDefault();
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
      mainContent.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Link
      href="#main-content"
      onClick={handleSkipToMain}
      sx={{
        position: 'absolute',
        left: '-9999px',
        top: spacing[2],
        zIndex: 9999,
        padding: `${spacing[2]} ${spacing[4]}`,
        backgroundColor: colors.primary[600],
        color: 'white',
        textDecoration: 'none',
        borderRadius: borderRadius.md,
        fontWeight: 600,
        fontSize: '1rem',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
        '&:focus': {
          left: spacing[2],
          outline: `3px solid ${colors.primary[400]}`,
          outlineOffset: '2px',
        },
      }}
    >
      Skip to main content
    </Link>
  );
}

export default SkipLink;
