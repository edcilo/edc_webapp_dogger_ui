module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        red: {
          light: '#FCA5A5',
          DEFAULT: '#F87171',
          dark: '#DC2626',
        },
        blue: {
          light: '#93C5FD',
          DEFAULT: '#60A5FA',
          dark: '#3B82F6',
        },
        green: {
          light: '#6EE7B7',
          DEFAULT: '#34D399',
          dark: '#059669',
        },
        yellow: {
          light: '#FCD34D',
          DEFAULT: '#FBBF24',
          dark: '#F59E0B',
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
