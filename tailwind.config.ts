import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: ['class'],
    content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		animation: {
  			size: 'size 1s ease-in-out infinite'
  		},
  		keyframes: {
  			size: {
  				'0%, 100%': {
  					transform: 'scale(1)'
  				},
  				'50%': {
  					transform: 'scale(1.10)'
  				}
  			}
  		},
  		fontFamily: {
  			bangers: [
  				'Bangers',
  				'cursive'
  			],
  			'press-start': [
  				'Press Start 2P"',
  				'cursive'
  			],
  			orbitron: [
  				'Orbitron',
  				'sans-serif'
  			],
  			audiowide: [
  				'Audiowide',
  				'cursive'
  			],
  			russo: [
  				'Russo One',
  				'sans-serif'
  			],
  			exo: [
  				'Exo 2',
  				'sans-serif'
  			]
  		},
  		colors: {
  			'neon-green': '#39FF14',
  			'neon-pink': '#FF00FF',
  			'neon-blue': '#1E90FF',
  			'neon-orange': '#FF4500',
  			'neon-yellow': '#FFFF00',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			'p-blue': '#312e81',
  			'p-green': '#22c55e',
  			'dark-bg': '#121212',
  			'dark-purple': '#2F2B47',
  			'dark-gray': '#1C1C1C',
  			'bright-red': '#FF004D',
  			'bright-cyan': '#00FFFF',
  			'bright-magenta': '#FF00FF',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
