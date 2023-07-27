/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        tahiti: {
          '100': 'rgba(254,255,255,0.8)',
          '101': 'rgb(4,4,4,0.8)',
          'color-w': '#040404',
          'color-d': '#666666',
          'border-w': '#edecf3',
          'border-d': '#262626',
          'button-border-w': '#0e76fd',
          'button-border-d': '#696969',
          'button-bg-w': '#0e76fd',
          'button-bg-d': '#404040',

        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      animation: {
        fadeOut: 'fadeOut 3s ease-in-out',
        fadeIn: 'fadeIn 3s ease-in-out',
      },

      // that is actual animation
      keyframes: theme => ({
        fadeOut: {
          '0%': { marginRight: '0%' },
          '100%': { marginRight: '-100%' },
        },
        fadeIn: {
          '0%': { marginRight: '-100%' },
          '100%': { marginRight: '0%' },
        },
      }),
    },

  },

  plugins: [],
}
