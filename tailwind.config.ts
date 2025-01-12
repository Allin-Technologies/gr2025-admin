import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	extend: {
  		colors: {
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
  			primary: {
  				'100': 'var(--primary-100)',
  				'110': 'var(--primary-110)',
  				'150': 'var(--primary-150)',
  				DEFAULT: 'var(--primary)',
  				foreground: 'hsl(var(--primary-foreground))'
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
  			},
  			black: 'var(--black)',
  			success: 'var(--primary)',
  			transparent: 'var(--transparent)',
  			'pitch-black': 'var(--pitch-black)',
  			danger: {
  				'50': 'var(--danger-50)',
  				DEFAULT: 'var(--danger)'
  			},
  			white: {
  				DEFAULT: 'var(--white)',
  				'05': 'var(--white-05)'
  			},
  			gray: {
  				'5': 'var(--gray-5)',
  				'10': 'var(--gray-10)',
  				'20': 'var(--gray-20)',
  				'30': 'var(--gray-30)',
  				'40': 'var(--gray-40)',
  				'50': 'var(--gray-50)',
  				'60': 'var(--gray-60)',
  				'70': 'var(--gray-70)',
  				'80': 'var(--gray-80)',
  				'90': 'var(--gray-90)'
  			},
  			warning: {
  				'40': 'var(--warning-40)',
  				'50': 'var(--warning-50)'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		screens: {
  			xxl: '1728px',
  			xl: '1440px',
  			mxl: '1130px',
  			lg: '976px',
  			md: '768px',
  			sm: '565px',
  			xs: '380px'
  		},
  		spacing: {
  			container: 'var(--container-margin)'
  		},
  		backgroundImage: {
  			'gradient-0': 'linear-gradient(0deg, #000 -63.69%, rgba(0, 0, 0, 0.80) 54.89%, rgba(0, 0, 0, 0.00) 195.12%)',
  			'gradient-180': 'linear-gradient(180deg, rgba(18, 19, 20, 0.45) 34.94%, #121314 100.22%)',
  			'gradient-165': 'linear-gradient(165deg, rgba(255, 255, 255, 0.01) 2.25%, rgba(255, 255, 255, 0.07) 81.52%)',
  			'gradient-91': 'linear-gradient(91deg, rgba(32, 32, 37, 0.60) 0%, rgba(57, 57, 70, 0.20) 100%)',
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		borderRadius: {
  			default: '0.625rem',
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("@tailwindcss/forms"), require("tailwindcss-animate")],
} satisfies Config;
