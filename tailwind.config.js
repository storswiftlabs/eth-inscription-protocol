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
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    colors: {
      'tahiti': {
        100: 'rgba(254,255,255,0.8)',
        101: 'rgb(4,4,4,0.8)',
        'color-w': '#040404',
        'color-d': '#666666',
        'border-w':'#edecf3',
        'border-d':'#262626',
        'button-border-w':"#0e76fd",
        'button-border-d':"#696969",
        'button-bg-w':"#0e76fd",
        'button-bg-d':"#404040",
        
      }
    },
  },

  plugins: [],
}
