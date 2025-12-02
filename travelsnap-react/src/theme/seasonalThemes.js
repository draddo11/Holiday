/**
 * Seasonal Theme System
 * Scalable design for year-round engagement
 */

export const SEASONAL_THEMES = {
  default: {
    id: 'default',
    name: 'Classic',
    icon: '✈️',
    gradient: 'linear-gradient(135deg, #3B82F6 0%, #1E40AF 100%)',
    accentColor: '#3B82F6',
    secondaryColor: '#1E40AF',
    textColor: '#FFFFFF',
    chipBg: 'rgba(37, 99, 235, 0.1)',
    chipBorder: 'rgba(37, 99, 235, 0.3)',
    chipColor: '#93C5FD',
    emojis: ['✈️', '🌍', '🗺️', '🧳'],
    description: 'Professional travel planning',
  },
  
  halloween: {
    id: 'halloween',
    name: 'Halloween',
    icon: '🎃',
    gradient: 'linear-gradient(135deg, #FF6B00 0%, #7C2D12 100%)',
    accentColor: '#FF6B00',
    secondaryColor: '#7C2D12',
    textColor: '#FFFFFF',
    chipBg: 'rgba(255, 107, 0, 0.1)',
    chipBorder: 'rgba(255, 107, 0, 0.3)',
    chipColor: '#FDBA74',
    emojis: ['🎃', '👻', '🦇', '🕷️', '🕸️', '🧙'],
    description: 'Spooky adventures await',
    season: 'October - November',
  },
  
  christmas: {
    id: 'christmas',
    name: 'Christmas',
    icon: '🎄',
    gradient: 'linear-gradient(135deg, #DC2626 0%, #15803D 100%)',
    accentColor: '#DC2626',
    secondaryColor: '#15803D',
    textColor: '#FFFFFF',
    chipBg: 'rgba(220, 38, 38, 0.1)',
    chipBorder: 'rgba(220, 38, 38, 0.3)',
    chipColor: '#FCA5A5',
    emojis: ['🎄', '🎅', '❄️', '⛄', '🎁', '🔔'],
    description: 'Festive winter getaways',
    season: 'November - January',
  },
  
  summer: {
    id: 'summer',
    name: 'Summer',
    icon: '☀️',
    gradient: 'linear-gradient(135deg, #F59E0B 0%, #0EA5E9 100%)',
    accentColor: '#F59E0B',
    secondaryColor: '#0EA5E9',
    textColor: '#FFFFFF',
    chipBg: 'rgba(245, 158, 11, 0.1)',
    chipBorder: 'rgba(245, 158, 11, 0.3)',
    chipColor: '#FCD34D',
    emojis: ['☀️', '🏖️', '🌊', '🍹', '🏄', '🐚'],
    description: 'Beach vibes & sunshine',
    season: 'June - August',
  },
  
  spring: {
    id: 'spring',
    name: 'Spring',
    icon: '🌸',
    gradient: 'linear-gradient(135deg, #EC4899 0%, #10B981 100%)',
    accentColor: '#EC4899',
    secondaryColor: '#10B981',
    textColor: '#FFFFFF',
    chipBg: 'rgba(236, 72, 153, 0.1)',
    chipBorder: 'rgba(236, 72, 153, 0.3)',
    chipColor: '#F9A8D4',
    emojis: ['🌸', '🌷', '🦋', '🌈', '☘️', '🌺'],
    description: 'Bloom into adventure',
    season: 'March - May',
  },
};

/**
 * Get current season based on month
 */
export const getCurrentSeason = () => {
  const month = new Date().getMonth(); // 0-11
  
  if (month >= 9 && month <= 10) return 'halloween'; // Oct-Nov
  if (month === 11 || month <= 1) return 'christmas'; // Dec-Jan
  if (month >= 5 && month <= 7) return 'summer'; // Jun-Aug
  if (month >= 2 && month <= 4) return 'spring'; // Mar-May
  
  return 'default';
};

/**
 * Get theme by ID
 */
export const getTheme = (themeId) => {
  return SEASONAL_THEMES[themeId] || SEASONAL_THEMES.default;
};

/**
 * Get all available themes
 */
export const getAllThemes = () => {
  return Object.values(SEASONAL_THEMES);
};
