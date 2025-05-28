# Contributing to EurekaArchiTech

¡Gracias por tu interés en contribuir al sitio web oficial de EurekaArchiTech! Esta guía te ayudará a comenzar y asegurar que tu contribución se integre sin problemas.

## 📋 Tabla de Contenidos

- [Código de Conducta](#código-de-conducta)
- [Cómo Contribuir](#cómo-contribuir)
- [Configuración del Entorno](#configuración-del-entorno)
- [Estándares de Código](#estándares-de-código)
- [Proceso de Pull Request](#proceso-de-pull-request)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Testing](#testing)
- [Documentación](#documentación)

---

## 🤝 Código de Conducta

Este proyecto adhiere a los más altos estándares de profesionalismo y respeto. Al participar, esperamos que mantengas:

- **Respeto**: Trata a todos con cortesía y profesionalismo
- **Inclusividad**: Acepta diferentes perspectivas y experiencias
- **Constructividad**: Proporciona feedback útil y específico
- **Transparencia**: Comunica abiertamente sobre problemas y soluciones

---

## 🚀 Cómo Contribuir

### Tipos de Contribuciones

| Tipo | Descripción | Labels |
|------|-------------|--------|
| **🐛 Bug Reports** | Reportar errores o comportamiento inesperado | `bug` |
| **✨ Feature Requests** | Sugerir nuevas funcionalidades | `enhancement` |
| **📚 Documentation** | Mejoras en documentación | `documentation` |
| **🎨 Design** | Mejoras en UI/UX | `design` |
| **⚡ Performance** | Optimizaciones de rendimiento | `performance` |
| **🔒 Security** | Mejoras de seguridad | `security` |

### Antes de Contribuir

1. **Revisa issues existentes** para evitar duplicación
2. **Discute cambios grandes** creando un issue primero
3. **Verifica compatibilidad** con nuestro stack tecnológico
4. **Lee la documentación técnica** en `/docs/`

---

## ⚙️ Configuración del Entorno

### Prerequisites

```bash
# Node.js 18+ requerido
node --version  # v18.18.0+
npm --version   # 9.0.0+

# Git configurado
git --version  # 2.30+
```

### Setup Local

```bash
# 1. Fork y clona el repositorio
git clone https://github.com/tu-username/eureka-architech-site.git
cd eureka-architech-site

# 2. Instala dependencias
npm install

# 3. Copia variables de entorno
cp .env.example .env.local

# 4. Configura variables de entorno necesarias
# Ver docs/DEPLOYMENT_GUIDE.md para detalles

# 5. Inicia el servidor de desarrollo
npm run dev

# 6. Verifica que todo funcione
npm run build
npm run preview
```

### Variables de Entorno de Desarrollo

```bash
# .env.local - Configuración mínima para desarrollo
NODE_ENV=development
SITE_URL=http://localhost:4321

# Opcional para desarrollo local
SUPABASE_URL=your_local_supabase_url
SUPABASE_ANON_KEY=your_local_anon_key
OPENAI_API_KEY=your_openai_key  # Solo si trabajas con IA
```

---

## 📝 Estándares de Código

### TypeScript Configuration

```typescript
// Seguimos configuración estricta
{
  "compilerOptions": {
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "exactOptionalPropertyTypes": true
  }
}
```

### Naming Conventions

```typescript
// ✅ Good
const userName = 'john';
const API_BASE_URL = 'https://api.eureka-architech.com';
const UserProfile = () => <div>Profile</div>;

// ❌ Bad
const user_name = 'john';
const apibaseurl = 'https://api.eureka-architech.com';
const userprofile = () => <div>Profile</div>;
```

### File Structure

```
src/
├── components/
│   ├── ui/                 # Componentes básicos reutilizables
│   ├── sections/           # Secciones específicas de páginas
│   └── islands/            # Componentes React interactivos
├── layouts/
├── pages/
├── styles/
└── utils/
```

### Component Guidelines

```typescript
// ✅ Good Component Structure
export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'base' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ 
  variant = 'primary', 
  size = 'base', 
  children, 
  ...props 
}: ButtonProps) {
  return (
    <button 
      className={cn(
        'btn',
        `btn-${variant}`,
        `btn-${size}`
      )}
      {...props}
    >
      {children}
    </button>
  );
}
```

### CSS/Styling Guidelines

```css
/* ✅ Good - Utility-first con custom properties */
.btn {
  @apply px-4 py-2 rounded-lg font-medium transition-all;
  background: var(--accent-500);
  color: var(--text-inverse);
}

.btn:hover {
  background: var(--accent-600);
  transform: translateY(-1px);
}

/* ❌ Bad - Hardcoded values */
.btn {
  padding: 8px 16px;
  background: #00E5A0;
  color: white;
}
```

---

## 🔄 Proceso de Pull Request

### 1. Preparación

```bash
# Crea una nueva branch desde main
git checkout main
git pull origin main
git checkout -b feature/nueva-funcionalidad

# O para bug fixes
git checkout -b fix/descripcion-del-bug
```

### 2. Desarrollo

```bash
# Realiza tus cambios
# Asegúrate de seguir los estándares de código

# Ejecuta tests frecuentemente
npm run test

# Verifica linting
npm run lint
npm run typecheck

# Prueba el build
npm run build
```

### 3. Commit Guidelines

Seguimos [Conventional Commits](https://conventionalcommits.org/):

```bash
# Estructura
<type>[optional scope]: <description>

# Ejemplos
feat(ui): add new contact form component
fix(api): resolve authentication timeout issue
docs(readme): update installation instructions
style(components): format code with prettier
refactor(utils): simplify date formatting function
test(forms): add validation tests
chore(deps): update astro to v4.16
perf(images): optimize image loading strategy
```

### 4. Pre-commit Checklist

- [ ] Código sigue estándares de estilo
- [ ] Tests pasan (`npm run test`)
- [ ] Build exitoso (`npm run build`)
- [ ] Linting limpio (`npm run lint`)
- [ ] TypeScript sin errores (`npm run typecheck`)
- [ ] Commits siguen conventional commits
- [ ] Documentación actualizada si es necesario

### 5. Pull Request Template

```markdown
## Descripción
Describe brevemente los cambios realizados.

## Tipo de Cambio
- [ ] 🐛 Bug fix (cambio que corrige un issue)
- [ ] ✨ Nueva feature (cambio que añade funcionalidad)
- [ ] 💥 Breaking change (fix o feature que causa cambio en funcionalidad existente)
- [ ] 📚 Documentación (cambios solo en documentación)

## Testing
- [ ] Tests unitarios añadidos/actualizados
- [ ] Tests de integración añadidos/actualizados
- [ ] Probado manualmente en diferentes browsers
- [ ] Probado en dispositivos móviles

## Screenshots (si aplica)
<!-- Añade screenshots de UI changes -->

## Checklist
- [ ] Mi código sigue los estándares del proyecto
- [ ] He revisado mi propio código
- [ ] He actualizado la documentación
- [ ] Mis cambios no generan nuevos warnings
- [ ] He añadido tests que prueban mi fix/feature
- [ ] Tests nuevos y existentes pasan localmente
```

---

## 🧪 Testing

### Running Tests

```bash
# Ejecutar todos los tests
npm run test

# Tests en modo watch
npm run test:watch

# Tests con coverage
npm run test:coverage

# Tests específicos
npm run test -- --testNamePattern="Button"
```

### Writing Tests

```typescript
// components/__tests__/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../Button';

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    
    fireEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct variant class', () => {
    render(<Button variant="secondary">Click me</Button>);
    expect(screen.getByText('Click me')).toHaveClass('btn-secondary');
  });
});
```

### Test Guidelines

1. **Write descriptive test names** que expliquen qué se está probando
2. **Test both happy path and edge cases**
3. **Use data-testid for complex selectors** en lugar de texto
4. **Mock external dependencies** apropiadamente
5. **Keep tests isolated** - cada test debe poder ejecutarse independientemente

---

## 📚 Documentación

### Updating Documentation

- **README.md**: Información general y setup
- **docs/**: Documentación técnica detallada
- **CONTRIBUTING.md**: Esta guía de contribución
- **Code comments**: Para lógica compleja

### Documentation Standards

```typescript
/**
 * Generates a lead score based on multiple factors
 * @param leadData - The lead information to analyze
 * @param aiAnalysis - AI-generated insights about the lead
 * @returns Promise<LeadScore> - Score object with reasoning
 * 
 * @example
 * ```typescript
 * const score = await generateLeadScore(
 *   { email: 'client@company.com', company: 'Tech Corp' },
 *   { intent: 'high', urgency: 'medium' }
 * );
 * console.log(score.value); // 85
 * ```
 */
export async function generateLeadScore(
  leadData: LeadData,
  aiAnalysis: AIAnalysis
): Promise<LeadScore> {
  // Implementation...
}
```

---

## 🚨 Troubleshooting

### Common Issues

#### Build Errors

```bash
# Clear everything and reinstall
rm -rf node_modules .astro dist
npm install
npm run build
```

#### TypeScript Errors

```bash
# Check for type errors
npm run typecheck

# Update type definitions
npm update @types/node
```

#### Linting Issues

```bash
# Auto-fix what's possible
npm run lint:fix

# Format code
npm run format
```

### Getting Help

1. **Check existing issues** en GitHub
2. **Review documentation** en `/docs/`
3. **Ask in Discussions** para preguntas generales
4. **Create an issue** para bugs específicos

---

## 🏆 Recognition

Contribuidores destacados serán reconocidos en:

- **README.md** - Hall of Fame
- **Release Notes** - Menciones específicas
- **LinkedIn** - Posts de reconocimiento
- **Team Credits** - Página de nosotros

---

## 📞 Contacto

### Para Contribuidores

- **Technical Questions**: tech@eureka-architech.com
- **Design Questions**: design@eureka-architech.com
- **General**: hello@eureka-architech.com

### Maintainers

| Role | Person | GitHub | Email |
|------|--------|--------|-------|
| **Tech Lead** | Oscar Valois | @osvalois | oscar@eureka-architech.com |
| **Frontend Lead** | Jorge Virgen | @jorgevirgen | jorge@eureka-architech.com |
| **DevOps Lead** | Omar Tzompantzi | @omartzom | omar@eureka-architech.com |

---

## 📄 License

Al contribuir a este proyecto, aceptas que tus contribuciones sean licenciadas bajo la misma licencia que el proyecto.

---

¡Gracias por contribuir a EurekaArchiTech! 🚀

*Tu contribución nos ayuda a transformar el futuro digital de las empresas mexicanas.*