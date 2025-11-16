/** @type {import('tailwindcss').Config} */
const config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  darkMode: 'class',
  theme: {
    extend: {
      animation: {
        'fade-up': 'fade-up 2.5s both',
      },
      keyframes: {
        'fade-up': {
          '0%': {
            opacity: '1',
            transform: 'translateY(0)',
          },
          '10%': {
            transform: 'translateY(10px)',
          },
          '50%': {
            opacity: '1',
          },
          '100%': {
            opacity: '0',
            transform: 'translateY(-50px)',
          },
        },
      },
    },
  },
}

export default config
