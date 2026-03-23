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
        coffee: {
          // Primary espresso tones
          50: '#f5f0eb',
          100: '#e8ddd3',
          200: '#d4c4b5',
          300: '#bfa992',
          400: '#a8886d',
          500: '#8f6b4e', // Medium espresso
          600: '#6f5240',
          700: '#524032',
          800: '#3d2e24',
          900: '#2d211a', // Deep espresso
          950: '#1a1310',
        },
        cream: {
          50: '#fefcf9',
          100: '#fdf7ef',
          200: '#faecd8',
          300: '#f5ddbd',
          400: '#edc99a',
          500: '#e3b273', // Latte
          600: '#d99a56',
          700: '#c47d3f',
          800: '#a26333',
          900: '#824d2c',
        },
        espresso: {
          DEFAULT: '#2d211a',
          dark: '#1a1310',
          light: '#3d2e24',
        },
        charcoal: {
          DEFAULT: '#2a2a2a',
          light: '#3a3a3a',
          dark: '#1a1a1a',
        },
        // Coffee cherry red / burnt sienna accent
        cherry: {
          50: '#fdf2f0',
          100: '#fbe0db',
          200: '#f6c4b8',
          300: '#ef9e8a',
          400: '#e67059',
          500: '#d94a34', // Coffee cherry red
          600: '#c43a26',
          700: '#a32e20',
          800: '#85271d',
          900: '#6d231b',
        },
        sienna: {
          DEFAULT: '#a0522d',
          light: '#b86b3d',
          dark: '#8b4513',
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
