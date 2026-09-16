export const Theme = {
  colors: {
    // Dark luxury showroom background
    background: '#090A0F',
    backgroundElevated: '#0E1017',

    // Charcoal surfaces
    surface: '#12141C',
    surfaceElevated: '#181B26',
    surfacePressed: '#1D2130',
    surfaceInput: '#131620',

    // Subtle automotive borders
    border: '#1E2230',
    borderLight: '#2A3044',
    borderFocus: '#2563EB',

    // CarVault Electric Blue Accent
    accent: '#2563EB',
    accentLight: '#3B82F6',
    accentMuted: 'rgba(37, 99, 235, 0.15)',
    accentGlow: 'rgba(59, 130, 246, 0.3)',

    // Off-white & muted typography
    textPrimary: '#FFFFFF',
    textSecondary: '#94A3B8',
    textMuted: '#64748B',
    textDisabled: '#475569',

    // Actions & Badges
    heartRed: '#EF4444',
    heartRedMuted: 'rgba(239, 68, 68, 0.18)',
    successGreen: '#10B981',
    warningAmber: '#F59E0B',
  },

  typography: {
    hero: {
      fontSize: 30,
      fontWeight: '800' as const,
      color: '#FFFFFF',
      letterSpacing: -0.6,
      lineHeight: 36,
    },
    screenTitle: {
      fontSize: 22,
      fontWeight: '800' as const,
      color: '#FFFFFF',
      letterSpacing: -0.4,
    },
    carName: {
      fontSize: 19,
      fontWeight: '800' as const,
      color: '#FFFFFF',
      letterSpacing: -0.3,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: '700' as const,
      color: '#FFFFFF',
      letterSpacing: -0.2,
      textTransform: 'uppercase' as const,
    },
    body: {
      fontSize: 14,
      fontWeight: '400' as const,
      color: '#94A3B8',
      lineHeight: 20,
    },
    caption: {
      fontSize: 13,
      fontWeight: '500' as const,
      color: '#64748B',
    },
    metadata: {
      fontSize: 11,
      fontWeight: '700' as const,
      color: '#94A3B8',
      letterSpacing: 0.6,
      textTransform: 'uppercase' as const,
    },
    brandBadge: {
      fontSize: 11,
      fontWeight: '900' as const,
      color: '#3B82F6',
      letterSpacing: 1.5,
      textTransform: 'uppercase' as const,
    },
  },

  radius: {
    xs: 6,
    sm: 10,
    md: 14,
    lg: 18,
    xl: 22,
    full: 9999,
  },

  shadows: {
    card: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.45,
      shadowRadius: 10,
      elevation: 6,
    },
    floating: {
      shadowColor: '#000000',
      shadowOffset: { width: 0, height: 10 },
      shadowOpacity: 0.6,
      shadowRadius: 18,
      elevation: 12,
    },
    accentGlow: {
      shadowColor: '#2563EB',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 12,
      elevation: 8,
    },
  },
} as const;

export type AppTheme = typeof Theme;
