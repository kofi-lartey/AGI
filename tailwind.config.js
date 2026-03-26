/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Black spectrum for depth and dimension
        black: {
          50: '#f0f0f0',
          100: '#e0e0e0',
          200: '#d0d0d0',
          300: '#c0c0c0',
          400: '#b0b0b0',
          500: '#a0a0a0',
          600: '#909090',
          700: '#808080',
          800: '#707070',
          900: '#606060',
          950: '#505050',
        },
        // Red spectrum for accent and interaction states
        red: {
          50: '#fef2f2',
          100: '#fee2e2',
          200: '#fecaca',
          300: '#fca5a5',
          400: '#f87171',
          500: '#ef4444',
          600: '#dc2626',
          700: '#b91c1c',
          800: '#991b1b',
          900: '#7f1d1d',
          950: '#450a0a',
        },
        // White spectrum for subtle backgrounds
        white: {
          50: '#fafafa',
          100: '#f5f5f5',
          200: '#e5e5e5',
          300: '#d4d4d4',
          400: '#a3a3a3',
          500: '#737373',
          600: '#525252',
          700: '#404040',
          800: '#262626',
          900: '#171717',
          950: '#0a0a0a',
        },
        // Brand colors with spectrum principles
        brand: {
          // Black spectrum - main background uses darkest, cards use lighter shades
          'black-main': '#000000',           // Main background
          'black-card': '#1a1a1a',            // Card backgrounds
          'black-panel': '#2d2d2d',           // Panel backgrounds
          'black-hover': '#262626',           // Hover states
          'black-active': '#1f1f1f',          // Active states
          
          // Red spectrum - accent with proper interaction states
          'red-primary': '#dc2626',           // Primary accent
          'red-hover': '#ef4444',             // Hover glow
          'red-active': '#b91c1c',            // Pressed/active
          'red-light': '#fef2f2',             // Light accents
          
          // White spectrum - subtle backgrounds, not pure white dominance
          'white-soft': '#fafafa',           // Soft backgrounds
          'white-muted': '#f5f5f5',          // Muted backgrounds
          'white-text': '#ffffff',           // Text and key highlights
          'white-off': '#f0f0f0',            // Off-white
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
