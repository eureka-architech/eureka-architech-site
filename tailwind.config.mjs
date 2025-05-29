/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1.5rem",
        sm: "2rem",
        md: "2.5rem",
        lg: "3rem",
        xl: "3rem",
        "2xl": "4rem",
      },
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
        // Sistema de colores unificado EurekaArchiTech
        primary: {
          600: '#3A3A3A',
          700: '#2A2A2A',
          800: '#1A1A1A',
          900: '#0D0D0D',
        },
        
        'eureka-dark': '#1A1A1A',
        'eureka-green': '#00E5A0',
        
        accent: {
          300: '#33EDB3',
          400: '#1AE9A9',
          500: '#00E5A0',
          600: '#00D690',
        },
        
        secondary: {
          400: '#1A8AFF',
          500: '#0080FF',
          600: '#0070E0',
        },
        
        neutral: {
          50: '#FFFFFF',
          100: '#F8F9FA',
          200: '#E9ECEF',
          300: '#DEE2E6',
          400: '#CED4DA',
          500: '#ADB5BD',
          600: '#6C757D',
          700: '#495057',
          800: '#343A40',
          900: '#212529',
        },
        
        // Semantic colors
        success: {
          500: '#10B981',
          600: '#059669',
        },
        warning: {
          500: '#F59E0B',
          600: '#D97706',
        },
        error: {
          500: '#EF4444',
          600: '#DC2626',
        },
        info: {
          500: '#3B82F6',
          600: '#2563EB',
        },
        
        // Alias para mejor legibilidad
        'text-primary': '#FFFFFF',
        'text-secondary': '#DEE2E6',
        'text-muted': '#ADB5BD',
        'text-inverse': '#0D0D0D',
        'accent-color': '#00E5A0',
        'secondary-color': '#0080FF',
      },
      
      // Espaciado usando múltiplos de 4px
      spacing: {
        '18': '4.5rem',   // 72px
        '22': '5.5rem',   // 88px
        '26': '6.5rem',   // 104px
        '30': '7.5rem',   // 120px
        '34': '8.5rem',   // 136px
        '38': '9.5rem',   // 152px
        '42': '10.5rem',  // 168px
        '46': '11.5rem',  // 184px
        '50': '12.5rem',  // 200px
      },
      
      // Animaciones optimizadas
      animation: {
        'fade-in': 'fadeIn 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
        'scale-in': 'scaleIn 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'hover-lift': 'hoverLift 0.3s ease',
      },
      
      keyframes: {
        fadeIn: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        slideUp: {
          '0%': { 
            opacity: '0',
            transform: 'translateY(30px)' 
          },
          '100%': { 
            opacity: '1',
            transform: 'translateY(0)' 
          },
        },
        scaleIn: {
          '0%': { 
            opacity: '0',
            transform: 'scale(0.9)' 
          },
          '100%': { 
            opacity: '1',
            transform: 'scale(1)' 
          },
        },
        pulseGlow: {
          '0%, 100%': { 
            boxShadow: '0 0 20px rgba(0, 229, 160, 0.3)',
            transform: 'scale(1)'
          },
          '50%': { 
            boxShadow: '0 0 40px rgba(0, 229, 160, 0.6)',
            transform: 'scale(1.02)'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '25%': { transform: 'translateY(-10px) rotate(1deg)' },
          '50%': { transform: 'translateY(-20px) rotate(0deg)' },
          '75%': { transform: 'translateY(-10px) rotate(-1deg)' },
        },
        hoverLift: {
          '0%': { transform: 'translateY(0px)' },
          '100%': { transform: 'translateY(-4px)' },
        },
      },
      
      // Tipografía escalable
      fontSize: {
        'display': ['clamp(3rem, 5vw, 5rem)', { lineHeight: '1.1', letterSpacing: '-0.025em', fontWeight: '700' }],
        'headline': ['clamp(1.5rem, 3vw, 2.5rem)', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '600' }],
        'title': ['clamp(1.25rem, 2vw, 1.5rem)', { lineHeight: '1.3', fontWeight: '500' }],
        'body-large': ['1.125rem', { lineHeight: '1.7', fontWeight: '400' }],
        'body': ['1rem', { lineHeight: '1.6', fontWeight: '400' }],
        'body-small': ['0.875rem', { lineHeight: '1.5', fontWeight: '400' }],
        'caption': ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.05em', fontWeight: '500', textTransform: 'uppercase' }],
      },
      
      // Degradados de marca
      backgroundImage: {
        'gradient-eureka': 'linear-gradient(135deg, #0080FF 0%, #00E5A0 100%)',
        'gradient-eureka-reverse': 'linear-gradient(135deg, #00E5A0 0%, #0080FF 100%)',
        'gradient-hero': 'linear-gradient(135deg, #0D0D0D 0%, #1A1A1A 100%)',
        'gradient-card': 'linear-gradient(135deg, #1A1A1A 0%, #2A2A2A 100%)',
        'gradient-premium': 'linear-gradient(135deg, rgba(0, 229, 160, 0.1) 0%, rgba(0, 229, 160, 0.05) 100%)',
      },
      
      // Border radius consistente
      borderRadius: {
        'eureka': '8px',
        'eureka-lg': '12px',
        'eureka-xl': '16px',
        'eureka-2xl': '24px',
      },
      
      // Sombras optimizadas
      boxShadow: {
        'eureka-sm': '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        'eureka': '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        'eureka-md': '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        'eureka-lg': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        'eureka-xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'eureka-accent': '0 8px 25px rgba(0, 229, 160, 0.25)',
        'eureka-accent-lg': '0 15px 35px rgba(0, 229, 160, 0.3)',
        'eureka-secondary': '0 8px 25px rgba(0, 128, 255, 0.25)',
        'eureka-inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      },
      
      // Backdrop blur para efectos modernos
      backdropBlur: {
        'eureka': '10px',
        'eureka-lg': '20px',
      },
      
      // Transiciones suaves
      transitionDuration: {
        '250': '250ms',
        '350': '350ms',
      },
      
      transitionTimingFunction: {
        'eureka': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'eureka-bounce': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'eureka-smooth': 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
      
      // Grid auto-fit responsive
      gridTemplateColumns: {
        'auto-fit': 'repeat(auto-fit, minmax(280px, 1fr))',
        'auto-fit-lg': 'repeat(auto-fit, minmax(320px, 1fr))',
        'auto-fill': 'repeat(auto-fill, minmax(250px, 1fr))',
      },
      
      // Aspect ratios útiles
      aspectRatio: {
        '4/3': '4 / 3',
        '3/2': '3 / 2',
        '5/4': '5 / 4',
        '16/10': '16 / 10',
      },
      
      // Z-index organizados
      zIndex: {
        '1': '1',
        '2': '2',
        '3': '3',
        '4': '4',
        '5': '5',
        'dropdown': '1000',
        'sticky': '1020',
        'fixed': '1030',
        'modal-backdrop': '1040',
        'modal': '1050',
        'popover': '1060',
        'tooltip': '1070',
        'toast': '1080',
      },
    },
  },
  plugins: [
    // Plugin para utilidades personalizadas
    function({ addUtilities, theme }) {
      const newUtilities = {
        // Text utilities
        '.text-balance': {
          'text-wrap': 'balance',
        },
        
        // Layout utilities
        '.center-absolute': {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        },
        
        // Smooth scrolling
        '.scroll-smooth': {
          'scroll-behavior': 'smooth',
        },
        
        // GPU acceleration
        '.gpu': {
          transform: 'translateZ(0)',
          'will-change': 'transform',
        },
        
        // Glass morphism
        '.glass': {
          'backdrop-filter': 'blur(20px)',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
        
        // Focus ring
        '.focus-ring': {
          '&:focus-visible': {
            outline: '2px solid #00E5A0',
            'outline-offset': '2px',
          },
        },
      }
      
      addUtilities(newUtilities)
    }
  ],
  
  // Dark mode por defecto
  darkMode: 'class',
}