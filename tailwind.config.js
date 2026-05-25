/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', '"Fira Code"', 'monospace'],
      },
      colors: {
        glass: {
          white: 'rgba(255,255,255,0.06)',
          border: 'rgba(255,255,255,0.12)',
          hover: 'rgba(255,255,255,0.10)',
          active: 'rgba(255,255,255,0.16)',
        },
        taskbar: 'rgba(10,10,18,0.72)',
        accent: {
          DEFAULT: '#6C8EFF',
          soft: 'rgba(108,142,255,0.35)',
          glow: 'rgba(108,142,255,0.18)',
        },
      },
      backdropBlur: {
        xs: '4px',
        glass: '20px',
        heavy: '40px',
      },
      boxShadow: {
        glass: '0 4px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)',
        'icon-active': '0 0 0 1.5px rgba(108,142,255,0.75), 0 4px 20px rgba(108,142,255,0.25)',
        taskbar: '0 -1px 0 rgba(255,255,255,0.06), 0 -8px 32px rgba(0,0,0,0.5)',
        'icon-hover': '0 8px 32px rgba(0,0,0,0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.18s ease-out',
        'scale-in': 'scaleIn 0.15s cubic-bezier(0.34,1.56,0.64,1)',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.88)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
