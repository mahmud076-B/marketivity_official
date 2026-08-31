/**
 * Marketivity Design Tokens
 * Centralized design system for consistent visual language & motion orchestration
 */

// === MOTION TOKENS (seconds for Framer Motion) ===
export const motion = {
  // Durations (in seconds)
  duration: {
    instant: 0.1,
    fast: 0.18,       // Micro interactions, buttons, hovers
    normal: 0.4,      // Standard transitions, reveals
    slow: 0.8,        // Complex sequences, hero animations
    slower: 1.2,      // Ambient flows, subtle loops
  },
  
  // Easing curves (cubic-bezier)
  ease: {
    default: [0.25, 0.1, 0.25, 1.0],
    out: [0.16, 1, 0.3, 1],          // Premium smooth deceleration
    in: [0.7, 0, 0.84, 0],
    inOut: [0.65, 0, 0.35, 1],       // Smooth bidirectional easing
    bounce: [0.34, 1.56, 0.64, 1],   // Subtle lively bounce
  },
  
  // Spring configurations
  spring: {
    gentle: { damping: 25, stiffness: 200 },
    snappy: { damping: 20, stiffness: 350 },
    bouncy: { damping: 15, stiffness: 400 },
    magnetic: { damping: 18, stiffness: 180 },
  },
  
  // Stagger delays (in seconds)
  stagger: {
    fast: 0.05,
    normal: 0.1,
    slow: 0.15,
  },
} as const;

// === COLOR TOKENS ===
export const colors = {
  // Brand identity
  brand: {
    orange: '#F7931E',
    orangeLight: '#FFAA4D',
    orangeDark: '#E07D0F',
    purple: '#6F42C1',
    purpleLight: '#8B5FC4',
    purpleDark: '#5A35A0',
  },
  
  // Opacity variants for subtle glows & glass surfaces
  alpha: {
    orange: {
      5: 'rgba(247, 147, 30, 0.05)',
      10: 'rgba(247, 147, 30, 0.1)',
      20: 'rgba(247, 147, 30, 0.2)',
      30: 'rgba(247, 147, 30, 0.3)',
      50: 'rgba(247, 147, 30, 0.5)',
    },
    purple: {
      5: 'rgba(111, 66, 193, 0.05)',
      10: 'rgba(111, 66, 193, 0.1)',
      20: 'rgba(111, 66, 193, 0.2)',
      30: 'rgba(111, 66, 193, 0.3)',
      50: 'rgba(111, 66, 193, 0.5)',
    },
  },
  
  // Gradients
  gradients: {
    brand: 'linear-gradient(135deg, #F7931E 0%, #6F42C1 100%)',
    brandSubtle: 'linear-gradient(135deg, rgba(247, 147, 30, 0.08) 0%, rgba(111, 66, 193, 0.08) 100%)',
    hero: 'radial-gradient(ellipse at top, rgba(247, 147, 30, 0.08), transparent 70%), radial-gradient(ellipse at bottom, rgba(111, 66, 193, 0.06), transparent 70%)',
    dark: 'linear-gradient(135deg, #1C1C1E 0%, #0D0D0F 100%)',
    mesh: 'radial-gradient(at 40% 20%, rgba(247, 147, 30, 0.08) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(111, 66, 193, 0.08) 0px, transparent 50%)',
  },
  
  // Surfaces
  surface: {
    white: '#FFFFFF',
    offwhite: '#F7F7F5',
    light: '#FAFAF9',
    neutral: '#F5F5F4',
    dark: '#1C1C1E',
    darker: '#0D0D0F',
  },
  
  // Text
  text: {
    primary: '#2D2D2D',
    secondary: '#6B7280',
    tertiary: '#9CA3AF',
    inverse: '#FFFFFF',
  },
} as const;

// === SHADOW & GLOW TOKENS ===
export const shadows = {
  soft: {
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.04), 0 1px 2px -1px rgba(0, 0, 0, 0.04)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -2px rgba(0, 0, 0, 0.04)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.06), 0 4px 6px -4px rgba(0, 0, 0, 0.04)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.07), 0 8px 10px -6px rgba(0, 0, 0, 0.04)',
  },
  glow: {
    orange: '0 0 25px rgba(247, 147, 30, 0.25)',
    purple: '0 0 25px rgba(111, 66, 193, 0.25)',
    brand: '0 0 35px rgba(247, 147, 30, 0.2), 0 0 60px rgba(111, 66, 193, 0.1)',
  },
  glass: '0 8px 32px 0 rgba(0, 0, 0, 0.05)',
} as const;

// === EXPORT ALL TOKENS ===
export const tokens = {
  motion,
  colors,
  shadows,
} as const;