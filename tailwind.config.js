/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      colors: {
        surface: '#F5F5F5',
        border: { DEFAULT: '#E8E8E8', strong: '#D0D0D0' },
        ink: { DEFAULT: '#0A0A0A', secondary: '#6B6B6B', tertiary: '#9B9B9B' },
        accent: { DEFAULT: '#0066FF', bg: '#EBF2FF' },
        success: { DEFAULT: '#00875A', bg: '#E3F5EE' },
        error: { DEFAULT: '#D93025', bg: '#FDECEA' },
        warning: { DEFAULT: '#B54708', bg: '#FEF3E2' },
      },
      fontSize: {
        display: ['32px', { lineHeight: '1.15', fontWeight: '600' }],
        h1: ['24px', { lineHeight: '1.25', fontWeight: '600' }],
        h2: ['18px', { lineHeight: '1.35', fontWeight: '600' }],
        h3: ['15px', { lineHeight: '1.4', fontWeight: '500' }],
        body: ['15px', { lineHeight: '1.65', fontWeight: '400' }],
        small: ['13px', { lineHeight: '1.55', fontWeight: '400' }],
        label: ['11px', { lineHeight: '1', fontWeight: '500', letterSpacing: '0.07em' }],
      },
      borderRadius: {
        card: '16px',
        btn: '12px',
        input: '10px',
        pill: '20px',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      keyframes: {
        pageIn: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          from: { opacity: '0', transform: 'translateY(16px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        unlockPop: {
          '0%': { transform: 'scale(0.92)', opacity: '0' },
          '60%': { transform: 'scale(1.03)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        toastIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        pageIn: 'pageIn 220ms cubic-bezier(0.16, 1, 0.3, 1) both',
        slideUp: 'slideUp 220ms cubic-bezier(0.16, 1, 0.3, 1) both',
        unlockPop: 'unlockPop 400ms cubic-bezier(0.16, 1, 0.3, 1) both',
        toastIn: 'toastIn 180ms cubic-bezier(0.16, 1, 0.3, 1) both',
      },
    },
  },
  plugins: [],
};
