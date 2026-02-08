/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Libre Baskerville"', 'serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#0F172A',
          50: '#f8fafc',
          900: '#0f172a',
          950: '#020617',
        },
        accent: {
          DEFAULT: '#0EA5E9',
          500: '#0ea5e9',
          600: '#0284c7',
        },
        danger: {
          DEFAULT: '#F43F5E',
          500: '#f43f5e',
        }
      },
      screens: {
        'xs': '375px',
      }
    },
  },
  plugins: [],
}