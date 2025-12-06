import type { Config } from 'tailwindcss'

export default {
  darkMode: ['class'],
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    container: {
      center: true,
      padding: '1rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Career Buddy brand colors
        mustard: {
          50: '#FCF7E8',
          100: '#F9EFD1',
          200: '#F3DFA3',
          300: '#EDCF75',
          400: '#E7BF47',
          500: '#E3B23C',
          600: '#C99A2F',
          700: '#967323',
          800: '#644C17',
          900: '#32260C',
        },
        blue: {
          50: '#E8F0F6',
          100: '#D1E1ED',
          200: '#A3C3DB',
          300: '#75A5C9',
          400: '#4787B7',
          500: '#2B5F8A',
          600: '#234C6E',
          700: '#1A3953',
          800: '#122637',
          900: '#09131C',
        },
        navy: {
          50: '#E6EBF0',
          100: '#CDD7E1',
          200: '#9BAFC3',
          300: '#6987A5',
          400: '#375F87',
          500: '#243950',
          600: '#1D2E40',
          700: '#162230',
          800: '#0E1720',
          900: '#070B10',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Plus Jakarta Sans', 'sans-serif'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config
