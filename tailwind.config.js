/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./pages/**/*.{ts,tsx}',
		'./components/**/*.{ts,tsx}',
		'./app/**/*.{ts,tsx}',
		'./src/**/*.{ts,tsx}',
	],
	theme: {
		container: {
			center: true,
			padding: {
				DEFAULT: '1rem',
				sm: '2rem',
				lg: '2rem',
				xl: '2rem',
				'2xl': '2rem',
			},
			screens: {
				'2xl': '1400px',
			},
		},
		screens: {
			'sm': '640px',
			'md': '768px',
			'lg': '1024px',
			'xl': '1280px',
			'2xl': '1536px',
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#2563eb',
					50: '#eff6ff',
					100: '#dbeafe',
					200: '#bfdbfe',
					300: '#93c5fd',
					400: '#60a5fa',
					500: '#3b82f6',
					600: '#2563eb',
					700: '#1d4ed8',
					800: '#1e40af',
					900: '#1e3a8a',
					foreground: 'hsl(var(--primary-foreground))',
				},
				secondary: {
					DEFAULT: '#6366f1',
					foreground: 'hsl(var(--secondary-foreground))',
				},
				accent: {
					DEFAULT: '#f59e0b',
					foreground: 'hsl(var(--accent-foreground))',
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))',
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
			keyframes: {
				'accordion-down': {
					from: { height: 0 },
					to: { height: 'var(--radix-accordion-content-height)' },
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: 0 },
				},
				blob: {
					'0%': {
						transform: 'translate(0px, 0px) scale(1)',
					},
					'33%': {
						transform: 'translate(30px, -50px) scale(1.1)',
					},
					'66%': {
						transform: 'translate(-20px, 20px) scale(0.9)',
					},
					'100%': {
						transform: 'translate(0px, 0px) scale(1)',
					},
				},
				'fade-in-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(30px)',
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)',
					},
				},
				'slide-in-right': {
					'0%': {
						opacity: '0',
						transform: 'translateX(30px)',
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)',
					},
				},
				'slide-in-left': {
					'0%': {
						opacity: '0',
						transform: 'translateX(-30px)',
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)',
					},
				},
				'scale-in': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.9)',
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)',
					},
				},
				pulse: {
					'0%, 100%': {
						opacity: '1',
					},
					'50%': {
						opacity: '0.5',
					},
				},
				'bounce-in': {
					'0%': {
						transform: 'scale(0.3)',
						opacity: '0',
					},
					'50%': {
						transform: 'scale(1.05)',
					},
					'70%': {
						transform: 'scale(0.9)',
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1',
					},
				},
				'gradient-shift': {
					'0%, 100%': {
						backgroundPosition: '0% center',
					},
					'50%': {
						backgroundPosition: '100% center',
					},
				},
				'fade-scale': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.95)',
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1)',
					},
				},
				'fade-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(20px)',
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)',
					},
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				blob: 'blob 7s infinite',
				'fade-in-up': 'fade-in-up 0.6s ease-out',
				'slide-in-right': 'slide-in-right 0.6s ease-out',
				'slide-in-left': 'slide-in-left 0.6s ease-out',
				'scale-in': 'scale-in 0.6s ease-out',
				'bounce-in': 'bounce-in 0.6s ease-out',
				pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				'gradient-shift': 'gradient-shift 4s ease-in-out infinite',
				'fade-scale': 'fade-scale 0.8s cubic-bezier(0.4, 0.0, 0.2, 1) forwards',
				'fade-up': 'fade-up 0.6s cubic-bezier(0.4, 0.0, 0.2, 1) forwards',
			},
			boxShadow: {
				'glow': '0 0 20px rgba(59, 130, 246, 0.3)',
				'glow-lg': '0 0 40px rgba(59, 130, 246, 0.4)',
				'electric': '0 0 30px rgba(37, 99, 235, 0.3)',
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'hero-pattern': 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #e0e7ff 100%)',
			},
		},
	},
	plugins: [require('tailwindcss-animate')],
}