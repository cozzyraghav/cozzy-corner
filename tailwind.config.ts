import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        size: 'size 1s ease-in-out infinite', // Create a pulse animation
      },
      keyframes: {
        size: {
          '0%, 100%': { transform: 'scale(1)' }, // Starting and ending state
          '50%': { transform: 'scale(1.10)' }, // Middle state
        },
      },
      // Custom Fonts
      fontFamily: {
        bangers: ['Bangers', 'cursive'],
        'press-start': ['"Press Start 2P"', 'cursive'],
        orbitron: ['Orbitron', 'sans-serif'],
        audiowide: ['Audiowide', 'cursive'],
        russo: ['Russo One', 'sans-serif'],
        exo: ['Exo 2', 'sans-serif'],
      },
      // Custom Colors
      colors: {
        // Vibrant Neon Colors (Great for Gaming)
        'neon-green': '#39FF14',
        'neon-pink': '#FF00FF',
        'neon-blue': '#1E90FF',
        'neon-orange': '#FF4500',
        'neon-yellow': '#FFFF00',

        // primary colors
        primary: '#0a0a0a',
        'p-blue': '#312e81',
        'p-green': '#22c55e',

        // Dark and Vibrant Combinations
        'dark-bg': '#121212', // Background color
        'dark-purple': '#2F2B47',
        'dark-gray': '#1C1C1C',
        'bright-red': '#FF004D',
        'bright-cyan': '#00FFFF',
        'bright-magenta': '#FF00FF',
      },
    },
  },
  plugins: [],
};
export default config;
