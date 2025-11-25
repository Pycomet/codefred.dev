/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#0A0A0B',
          secondary: '#131316',
          accent: '#1A1A1F',
        },
        text: {
          primary: '#FFFFFF',
          secondary: '#A1A1AA',
          muted: '#71717A',
        },
        brand: {
          primary: '#0EA5E9',
          secondary: '#8B5CF6',
          success: '#10B981',
          warning: '#F59E0B',
          danger: '#EF4444',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Clash Display', 'Inter', 'sans-serif'],
      },
      fontSize: {
        xs: ['clamp(0.75rem, 2vw, 0.875rem)', { lineHeight: '1.5' }],
        sm: ['clamp(0.875rem, 2.5vw, 1rem)', { lineHeight: '1.5' }],
        base: ['clamp(1rem, 3vw, 1.125rem)', { lineHeight: '1.6' }],
        lg: ['clamp(1.125rem, 3.5vw, 1.25rem)', { lineHeight: '1.6' }],
        xl: ['clamp(1.25rem, 4vw, 1.5rem)', { lineHeight: '1.4' }],
        '2xl': ['clamp(1.5rem, 5vw, 2rem)', { lineHeight: '1.3' }],
        '3xl': ['clamp(2rem, 6vw, 3rem)', { lineHeight: '1.2' }],
        '4xl': ['clamp(2.5rem, 8vw, 4rem)', { lineHeight: '1.1' }],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          lg: '3rem',
          xl: '4rem',
          '2xl': '6rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1536px',
        },
      },
      screens: {
        '3xl': '1920px',
        '4k': '2560px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-in-out',
        'slide-up': 'slideUp 0.8s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(14, 165, 233, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(14, 165, 233, 0.8)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

