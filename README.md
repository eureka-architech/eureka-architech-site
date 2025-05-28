# EurekaArchiTech - Sitio Web Oficial

**Transformación Digital Empresarial | AI-First Consulting**

Sitio web oficial de EurekaArchiTech, empresa líder en transformación digital y arquitectura empresarial, especializada en soluciones AI-First para PyMEs mexicanas.

[![Lighthouse Score](https://img.shields.io/badge/Lighthouse-98%2B-green.svg)](https://pagespeed.web.dev/)
[![Performance](https://img.shields.io/badge/Performance-95%2B-brightgreen.svg)](https://web.dev/vitals/)
[![Accessibility](https://img.shields.io/badge/Accessibility-AA-blue.svg)](https://www.w3.org/WAI/WCAG21/quickref/)
[![Uptime](https://img.shields.io/badge/Uptime-99.9%25-green.svg)](https://vercel.com)

## 🌟 Acerca de EurekaArchiTech

EurekaArchiTech es una consultora especializada en transformación digital que empodera a las organizaciones mediante soluciones innovadoras, liderazgo estratégico y excelencia operacional, garantizando resultados medibles y sostenibles.

### 🎯 Servicios Principales

- **🏗️ Arquitectura Tecnológica Empresarial**: Infraestructura cloud, aplicaciones de negocio e IA
- **👥 Mentoría Ejecutiva y Técnica**: Desarrollo de capacidades con mentores C-Level
- **📈 Liderazgo Estratégico como Servicio**: Ejecutivos experimentados para acelerar transformación
- **🤖 Metodología EUREKA**: Proceso estructurado de transformación digital (E.U.R.E.K.A.)

### 📊 Resultados Comprobados

- **95%** Tasa de éxito en proyectos
- **40%** Reducción promedio de costos operativos
- **48h** Tiempo de activación de servicios
- **ROI 2-3x** Garantizado en implementaciones

## 🛠️ Stack Tecnológico

### Frontend
- **Astro 4.16+** - Framework moderno con arquitectura Islands
- **TypeScript** - Tipado estático y desarrollo robusto
- **Tailwind CSS** - Sistema de diseño utilitario
- **React Islands** - Componentes interactivos selectivos

### Backend & Infrastructure
- **Supabase** - Backend-as-a-Service completo
- **PostgreSQL** - Base de datos relacional con pgvector
- **Vercel Edge** - Deploy y CDN global
- **OpenAI GPT-4** - Integración de IA conversacional

### Performance & SEO
- **98+ Lighthouse Score** - Optimización web excellence
- **Core Web Vitals** - Métricas optimizadas
- **Schema.org** - Datos estructurados
- **WCAG 2.1 AA** - Accesibilidad estándar

## 📁 Estructura del Proyecto

```
proyecto/
├── src/
│   ├── layouts/
│   │   ├── Layout.astro              # Layout base
│   │   └── OptimizedLayout.astro     # Layout optimizado principal
│   ├── pages/
│   │   ├── index.astro               # Homepage principal
│   │   ├── servicios.astro           # Catálogo de servicios
│   │   ├── nosotros.astro            # About & team
│   │   ├── contacto.astro            # Formulario de contacto
│   │   └── legal/                    # Páginas legales
│   ├── components/
│   │   ├── TripleGuaranteeSection.astro
│   │   ├── OptimizedFooter.astro
│   │   ├── ModernButton.astro
│   │   └── [otros componentes]
│   └── styles/
│       ├── globals.css               # Estilos base
│       ├── design-system.css         # Sistema de diseño
│       └── design-system-optimized.css
├── docs/                             # Documentación técnica
├── public/                           # Assets estáticos
└── [archivos de configuración]
```

## 🚀 Comandos de Desarrollo

```bash
# Instalación de dependencias
npm install

# Desarrollo local (http://localhost:4321)
npm run dev

# Build para producción
npm run build

# Preview del build localmente
npm run preview

# Verificación de código
npm run check        # Astro check
npm run typecheck    # TypeScript check

# Code quality
npm run lint         # ESLint
npm run lint:fix     # ESLint con auto-fix
npm run format       # Prettier
```

## ⚡ Optimizaciones y Características

### 🚀 Performance
- **<5KB JavaScript** - Bundle mínimo optimizado
- **98+ Lighthouse Score** - Excellence en todas las métricas
- **<300ms TTI** - Time to Interactive ultrarrápido
- **Edge Deploy** - CDN global con Vercel
- **Critical CSS** - Estilos críticos inline
- **Lazy Loading** - Carga diferida inteligente

### 🔍 SEO & Discoverability
- **Schema.org markup** - Datos estructurados completos
- **Open Graph** - Social media optimizado
- **Meta tags** - SEO técnico avanzado
- **Canonical URLs** - URLs canónicas
- **Sitemap XML** - Indexación optimizada
- **Robots.txt** - Directrices para crawlers

### ♿ Accesibilidad (WCAG 2.1 AA)
- **Skip navigation** - Navegación accesible
- **ARIA labels** - Etiquetas semánticas
- **Keyboard navigation** - Navegación por teclado
- **Color contrast** - Contraste AA compliant
- **Screen reader** - Compatibilidad total
- **Focus management** - Gestión de foco

### 🎨 UX/UI Excellence
- **Design System** - Sistema unificado de componentes
- **Responsive Design** - Mobile-first approach
- **Micro-interactions** - Detalles que importan
- **Progressive Enhancement** - Experiencia robusta
- **Dark Mode Ready** - Preparado para tema oscuro

## 🎨 Sistema de Diseño

### Paleta de Colores
```css
:root {
  /* Colores Principales */
  --primary-900: #0D0D0D;    /* Negro profundo */
  --primary-800: #1A1A1A;    /* Gris oscuro */
  --primary-700: #2A2A2A;    /* Gris medio */
  
  /* Colores de Marca */
  --accent-500: #00E5A0;     /* Verde tecnológico */
  --secondary-500: #0080FF;  /* Azul corporativo */
  
  /* Colores Semánticos */
  --success-500: #10B981;    /* Verde éxito */
  --warning-500: #F59E0B;    /* Amarillo advertencia */
  --error-500: #EF4444;      /* Rojo error */
}
```

### Tipografía
- **Font Family**: Inter (Google Fonts)
- **Font Weights**: 300, 400, 500, 600, 700
- **Scale**: Modular scale con clamp() responsivo
- **Line Heights**: Optimizados para legibilidad

### Componentes
- **Buttons**: Variantes primary, secondary, ghost
- **Cards**: Componentes modulares con hover states
- **Forms**: Inputs, textareas, selects unificados
- **Navigation**: Desktop y mobile responsive

## 📊 Métricas de Performance

### Core Web Vitals
- **LCP**: <1.2s (Largest Contentful Paint)
- **FID**: <100ms (First Input Delay)
- **CLS**: <0.1 (Cumulative Layout Shift)

### Lighthouse Scores (Target)
- **Performance**: 98+/100
- **Accessibility**: 100/100
- **Best Practices**: 100/100
- **SEO**: 100/100

### Bundle Analysis
- **JavaScript**: <5KB (critical path)
- **CSS**: <15KB (critical + non-critical)
- **Images**: Optimizadas con next-gen formats
- **Fonts**: Subset y preload optimizado

## 🚀 Deployment & Infrastructure

### Vercel Configuration
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "astro"
}
```

### Environment Variables
```bash
# Required for production
SITE_URL=https://eureka-architech.com
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_key
OPENAI_API_KEY=your_openai_key
```

### Performance Monitoring
- **Vercel Analytics** - Real User Monitoring
- **Sentry** - Error tracking y performance
- **Web Vitals** - Core metrics monitoring
- **Lighthouse CI** - Automated performance testing

## 📧 Contacto EurekaArchiTech

### Información Corporativa
- **Website**: [eureka-architech.com](https://eureka-architech.com)
- **Email**: hi@eureka-architech.com
- **LinkedIn**: [EurekaArchiTech](https://linkedin.com/company/eureka-architech)
- **Ubicación**: México

### Servicios
- **Consultoría Digital**: Diagnóstico y estrategia
- **Arquitectura Empresarial**: Diseño e implementación
- **Transformación AI-First**: Soluciones inteligentes
- **Mentoría Ejecutiva**: Desarrollo de liderazgo

## 🤝 Contribución y Desarrollo

### Para el Equipo EurekaArchiTech
1. **Clone** el repositorio
2. **Install** dependencias: `npm install`
3. **Develop** localmente: `npm run dev`
4. **Test** cambios: `npm run build && npm run preview`
5. **Commit** con conventional commits
6. **Deploy** automático via Vercel

### Estructura de Commits
```bash
# Ejemplos de commits
git commit -m "feat: add new service page"
git commit -m "fix: resolve mobile navigation issue"
git commit -m "docs: update README with deployment info"
git commit -m "style: improve button hover animations"
```

---

**🚀 Transformando el futuro digital de las empresas mexicanas**

*Hecho con ❤️ y tecnología de vanguardia por el equipo EurekaArchiTech*

[![Built with Astro](https://img.shields.io/badge/Built%20with-Astro-FF5D01.svg)](https://astro.build)
[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000.svg)](https://vercel.com)
[![Powered by Supabase](https://img.shields.io/badge/Powered%20by-Supabase-3ECF8E.svg)](https://supabase.com)