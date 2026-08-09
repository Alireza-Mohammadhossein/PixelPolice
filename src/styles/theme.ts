export const theme = {
  colors: {
    bg: '#0f1115',
    bgElevated: '#161923',
    bgCard: '#1b1f2b',
    border: '#2a2f3d',
    text: '#e9ebf1',
    textMuted: '#9aa1b2',
    primary: '#7c5cff',
    primaryHover: '#9078ff',
    accent: '#38d9c9',
    danger: '#ff5c7c',
    warning: '#ffb84d',
    success: '#4ade80',
  },
  radii: {
    sm: '6px',
    md: '10px',
    lg: '16px',
    pill: '999px',
  },
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.4)',
    md: '0 8px 24px rgba(0,0,0,0.35)',
    lg: '0 16px 48px rgba(0,0,0,0.45)',
  },
  space: (n: number) => `${n * 4}px`,
  fonts: {
    body: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif`,
    mono: `'JetBrains Mono', ui-monospace, SFMono-Regular, monospace`,
  },
  breakpoints: {
    sm: '480px',
    md: '768px',
    lg: '1080px',
    xl: '1360px',
  },
} as const

export type Theme = typeof theme
