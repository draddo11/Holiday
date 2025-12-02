import { Box, Card, CardContent } from '@mui/material';
import { colors, borderRadius, transitions } from '../theme/tokens';

/**
 * SkeletonCard - Loading placeholder component with shimmer animation
 * 
 * Features:
 * - Glassmorphism background matching design system
 * - Smooth shimmer animation effect
 * - Multiple variants for different card types
 * - Responsive sizing
 * - Accessible loading state
 * 
 * @example
 * // Destination card skeleton
 * <SkeletonCard variant="destination" />
 * 
 * @example
 * // Stats card skeleton
 * <SkeletonCard variant="stats" />
 * 
 * @example
 * // Custom height
 * <SkeletonCard variant="destination" height={400} />
 * 
 * @param {Object} props
 * @param {'destination'|'stats'|'compact'} props.variant - Card variant type
 * @param {number} props.height - Custom height in pixels
 * @param {Object} props.sx - Additional MUI sx props
 */
function SkeletonCard({ variant = 'destination', height, sx = {} }) {
  // Shimmer animation keyframes
  const shimmerAnimation = {
    '@keyframes shimmer': {
      '0%': { 
        transform: 'translateX(-100%)',
      },
      '100%': { 
        transform: 'translateX(100%)',
      },
    },
  };

  // Base skeleton box component
  const SkeletonBox = ({ width = '100%', height = '16px', borderRadius: br = '8px', sx: boxSx = {} }) => (
    <Box
      sx={{
        width,
        height,
        borderRadius: br,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        position: 'relative',
        overflow: 'hidden',
        ...boxSx,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(90deg, transparent 0%, rgba(255, 255, 255, 0.1) 50%, transparent 100%)',
          animation: 'shimmer 2s infinite',
          ...shimmerAnimation,
        }}
      />
    </Box>
  );

  // Destination card skeleton
  const DestinationSkeleton = () => (
    <Card
      elevation={0}
      sx={{
        borderRadius: borderRadius.xl,
        overflow: 'hidden',
        background: colors.gradients.glass,
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        height: height || 'auto',
        ...sx,
      }}
      role="status"
      aria-label="Loading destination card"
    >
      {/* Image Skeleton */}
      <Box sx={{ 
        position: 'relative', 
        paddingTop: '66.67%', // 3:2 aspect ratio
        overflow: 'hidden',
      }}>
        <SkeletonBox 
          width="100%" 
          height="100%" 
          borderRadius="0"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
      </Box>

      {/* Content Skeleton */}
      <CardContent sx={{ p: 4 }}>
        {/* Title */}
        <SkeletonBox width="70%" height="28px" borderRadius={borderRadius.base} sx={{ mb: 2 }} />
        
        {/* Description */}
        <SkeletonBox width="100%" height="16px" borderRadius={borderRadius.sm} sx={{ mb: 1 }} />
        <SkeletonBox width="85%" height="16px" borderRadius={borderRadius.sm} sx={{ mb: 3 }} />

        {/* Feature Chips */}
        <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
          <SkeletonBox width="80px" height="24px" borderRadius={borderRadius.full} />
          <SkeletonBox width="90px" height="24px" borderRadius={borderRadius.full} />
          <SkeletonBox width="75px" height="24px" borderRadius={borderRadius.full} />
        </Box>

        {/* Button */}
        <SkeletonBox width="100%" height="48px" borderRadius={borderRadius.md} />
      </CardContent>
    </Card>
  );

  // Stats card skeleton
  const StatsSkeleton = () => (
    <Card
      elevation={0}
      sx={{
        p: 4,
        borderRadius: borderRadius.xl,
        background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1) 0%, rgba(100, 116, 139, 0.1) 100%)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(59, 130, 246, 0.2)',
        position: 'relative',
        overflow: 'hidden',
        height: height || 'auto',
        ...sx,
      }}
      role="status"
      aria-label="Loading stats card"
    >
      {/* Decorative gradient overlay */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '150px',
        height: '150px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, transparent 70%)',
        borderRadius: '50%',
        transform: 'translate(30%, -30%)',
        pointerEvents: 'none',
      }} />

      {/* Icon Skeleton */}
      <SkeletonBox 
        width="56px" 
        height="56px" 
        borderRadius={borderRadius.lg} 
        sx={{ mb: 3, position: 'relative', zIndex: 1 }} 
      />

      {/* Label Skeleton */}
      <SkeletonBox 
        width="60px" 
        height="12px" 
        borderRadius={borderRadius.sm} 
        sx={{ mb: 2, position: 'relative', zIndex: 1 }} 
      />

      {/* Value Skeleton */}
      <SkeletonBox 
        width="120px" 
        height="48px" 
        borderRadius={borderRadius.base} 
        sx={{ mb: 1, position: 'relative', zIndex: 1 }} 
      />

      {/* Description Skeleton */}
      <SkeletonBox 
        width="140px" 
        height="16px" 
        borderRadius={borderRadius.sm} 
        sx={{ mb: 3, position: 'relative', zIndex: 1 }} 
      />

      {/* Additional Info Divider */}
      <Box sx={{ 
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        pt: 3,
        position: 'relative',
        zIndex: 1,
      }}>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box>
            <SkeletonBox width="50px" height="12px" borderRadius={borderRadius.sm} sx={{ mb: 1 }} />
            <SkeletonBox width="40px" height="20px" borderRadius={borderRadius.sm} />
          </Box>
          <Box>
            <SkeletonBox width="50px" height="12px" borderRadius={borderRadius.sm} sx={{ mb: 1 }} />
            <SkeletonBox width="40px" height="20px" borderRadius={borderRadius.sm} />
          </Box>
        </Box>
      </Box>
    </Card>
  );

  // Compact card skeleton (for smaller cards or list items)
  const CompactSkeleton = () => (
    <Card
      elevation={0}
      sx={{
        p: 3,
        borderRadius: borderRadius.lg,
        background: colors.gradients.glass,
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        height: height || 'auto',
        ...sx,
      }}
      role="status"
      aria-label="Loading card"
    >
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        {/* Icon/Avatar Skeleton */}
        <SkeletonBox width="48px" height="48px" borderRadius={borderRadius.md} />
        
        {/* Content */}
        <Box sx={{ flex: 1 }}>
          <SkeletonBox width="60%" height="20px" borderRadius={borderRadius.sm} sx={{ mb: 1 }} />
          <SkeletonBox width="40%" height="14px" borderRadius={borderRadius.sm} />
        </Box>
      </Box>
    </Card>
  );

  // Render appropriate variant
  switch (variant) {
    case 'destination':
      return <DestinationSkeleton />;
    case 'stats':
      return <StatsSkeleton />;
    case 'compact':
      return <CompactSkeleton />;
    default:
      return <DestinationSkeleton />;
  }
}

export default SkeletonCard;
