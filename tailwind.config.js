/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
  './app/**/*.{js,ts,jsx,tsx,mdx}',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        cream: '#FAF7F2',
        forest: {
          DEFAULT: '#2D4A3E',
          light: '#3E6354',
          dark: '#1F352C',
        },
        terracotta: {
          DEFAULT: '#B87333',
          hover: '#A06228',
        },
        stone: {
          DEFAULT: '#8B8680',
          light: '#E5E2DE',
          dark: '#4A4845',
        },
        dark: '#1A1A1A',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        serif: ['Montserrat', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
