/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        // Colores EurekaArchiTech siguiendo guía de diseño
        'eureka-black': '#0D0D0D',
        'eureka-dark': '#1A1A1A',
        'eureka-green': '#00E5A0',
        'eureka-green-dark': '#00D690',
        'eureka-blue': '#0080FF',
        'eureka-blue-dark': '#0070E0',
        'eureka-gray': '#4A4A4A',
        'eureka-gray-light': '#6B6B6B',
        'eureka-light': '#E0E0E0',
        'eureka-white': '#FFFFFF',
        'eureka-off-white': '#F5F5F5',
        
        // Colores tradicionales simplificados
        blue: {
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
        },
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        green: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
      },
      // Espaciado siguiendo múltiplos de 8px de la guía
      spacing: {
        '8': '0.5rem',
        '16': '1rem',
        '24': '1.5rem',
        '32': '2rem',
        '48': '3rem',
        '64': '4rem',
        '80': '5rem',
        '96': '6rem',
      },
      // Animaciones siguiendo la guía
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          from: { 
            opacity: '0',
            transform: 'translateY(2rem)'
          },
          to: { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        slideUp: {
          from: { 
            transform: 'translateY(3rem)', 
            opacity: '0' 
          },
          to: { 
            transform: 'translateY(0)', 
            opacity: '1' 
          },
        },
        glow: {
          from: {
            boxShadow: '0 0 20px rgba(0, 229, 160, 0.2)'
          },
          to: {
            boxShadow: '0 0 30px rgba(0, 229, 160, 0.4)'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      // Tipografía siguiendo la guía
      fontSize: {
        'eureka-h1': ['clamp(3rem, 8vw, 4rem)', { lineHeight: '1.25', letterSpacing: '0.05em' }],
        'eureka-h2': ['clamp(1.5rem, 4vw, 2rem)', { lineHeight: '1.25', letterSpacing: '-0.025em' }],
        'eureka-body': ['clamp(1rem, 2vw, 1.125rem)', { lineHeight: '1.6' }],
      },
      // Degradados de la guía
      backgroundImage: {
        'gradient-eureka': 'linear-gradient(135deg, #0080FF 0%, #00E5A0 100%)',
        'gradient-eureka-reverse': 'linear-gradient(135deg, #00E5A0 0%, #0080FF 100%)',
      },
      // Border radius siguiendo diseño
      borderRadius: {
        'eureka': '8px',
        'eureka-large': '12px',
        'eureka-xl': '16px',
      },
      // Sombras profesionales
      boxShadow: {
        'eureka': '0 4px 20px rgba(0, 0, 0, 0.1)',
        'eureka-lg': '0 8px 40px rgba(0, 0, 0, 0.15)',
        'eureka-green': '0 8px 25px rgba(0, 229, 160, 0.3)',
        'eureka-blue': '0 8px 25px rgba(0, 128, 255, 0.3)',
      },
      // Backdrop blur para efectos modernos
      backdropBlur: {
        'eureka': '10px',
      },
    },
  },
  plugins: [],
}