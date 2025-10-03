# 🎨 Sistema de Temas - SnapStore

## 🌟 Visión General

El sistema de temas permite que cada tienda tenga su identidad visual única, diferenciándose de la competencia mientras mantiene una experiencia de usuario consistente.

## 🎯 Objetivos del Sistema de Temas

1. **Personalización**: Cada tienda única visualmente
2. **Consistencia**: Misma UX, diferente branding
3. **Facilidad**: Sin conocimientos de CSS
4. **Performance**: Cambios dinámicos sin recarga
5. **Escalabilidad**: Fácil agregar nuevos temas

## 🎨 Estructura de un Tema

```typescript
interface Theme {
  id: string
  name: string
  preview: string // URL de imagen preview
  colors: {
    primary: string       // Color principal (botones, links)
    primaryHover: string  // Hover del color principal
    secondary: string     // Color secundario (destacados)
    accent: string        // Color de acento (badges, ofertas)
    background: string    // Fondo principal
    surface: string       // Fondo de tarjetas/modales
    text: string          // Texto principal
    textMuted: string     // Texto secundario
    border: string        // Bordes y separadores
    success: string       // Mensajes de éxito
    warning: string       // Advertencias
    error: string         // Errores
  }
  typography: {
    fontFamily: string    // Familia tipográfica
    headingWeight: string // Peso de títulos
    bodyWeight: string    // Peso del texto
  }
  styling: {
    borderRadius: string  // Radio de bordes (redondeado)
    shadowStyle: 'none' | 'light' | 'medium' | 'heavy'
    buttonStyle: 'rounded' | 'sharp' | 'pill'
  }
}
```

## 🌈 Temas Predefinidos

### **1. 🌟 Elegante (Premium)**
```scss
--primary: #1E293B          // Slate oscuro
--primary-hover: #0F172A
--secondary: #EAB308        // Dorado
--accent: #F59E0B
--background: #FFFFFF
--surface: #F8FAFC
--text: #1E293B
--text-muted: #64748B
```
**Ideal para**: Joyerías, productos premium, servicios profesionales

### **2. 🌿 Natural (Eco-friendly)**
```scss
--primary: #16A34A          // Verde natural
--primary-hover: #15803D
--secondary: #A3A3A3        // Gris neutro
--accent: #EAB308          // Amarillo tierra
--background: #FEFEFE
--surface: #F9FDF9
--text: #1F2937
--text-muted: #6B7280
```
**Ideal para**: Productos orgánicos, plantas, comida saludable

### **3. 🔵 Corporativo (Profesional)**
```scss
--primary: #2563EB          // Azul corporativo
--primary-hover: #1D4ED8
--secondary: #64748B        // Gris azulado
--accent: #F59E0B          // Naranja energético
--background: #FFFFFF
--surface: #F1F5F9
--text: #1E293B
--text-muted: #475569
```
**Ideal para**: Tecnología, servicios, B2B

### **4. 🌸 Femenino (Delicado)**
```scss
--primary: #EC4899          // Rosa vibrante
--primary-hover: #DB2777
--secondary: #A855F7        // Violeta suave
--accent: #F472B6          // Rosa claro
--background: #FFFBFF
--surface: #FDF2F8
--text: #1F2937
--text-muted: #6B7280
```
**Ideal para**: Moda femenina, belleza, accesorios

### **5. ⚡ Moderno (Tech)**
```scss
--primary: #7C3AED          // Violeta tech
--primary-hover: #6D28D9
--secondary: #1F2937        // Gris oscuro
--accent: #10B981          // Verde eléctrico
--background: #FFFFFF
--surface: #F9FAFB
--text: #111827
--text-muted: #6B7280
```
**Ideal para**: Electrónicos, gadgets, gaming

### **6. 🏪 Clásico (Tradicional)**
```scss
--primary: #DC2626          // Rojo clásico
--primary-hover: #B91C1C
--secondary: #1F2937        // Gris carbón
--accent: #F59E0B          // Dorado suave
--background: #FFFFFE
--surface: #F9FAFB
--text: #1F2937
--text-muted: #4B5563
```
**Ideal para**: Tiendas tradicionales, comida, servicios locales

## 💻 Implementación Técnica

### **CSS Variables Dinámicas**
```typescript
// lib/theming.ts
export function generateThemeCSS(theme: Theme): Record<string, string> {
  return {
    '--color-primary': theme.colors.primary,
    '--color-primary-hover': theme.colors.primaryHover,
    '--color-secondary': theme.colors.secondary,
    '--color-accent': theme.colors.accent,
    '--color-background': theme.colors.background,
    '--color-surface': theme.colors.surface,
    '--color-text': theme.colors.text,
    '--color-text-muted': theme.colors.textMuted,
    '--color-border': theme.colors.border,
    '--font-family': theme.typography.fontFamily,
    '--border-radius': theme.styling.borderRadius,
  }
}

export function applyTheme(theme: Theme) {
  const cssVars = generateThemeCSS(theme)

  Object.entries(cssVars).forEach(([property, value]) => {
    document.documentElement.style.setProperty(property, value)
  })
}
```

### **Componente de Tema**
```typescript
// components/ThemeProvider.tsx
'use client'
import { useEffect } from 'react'

interface ThemeProviderProps {
  theme: Theme
  children: React.ReactNode
}

export default function ThemeProvider({ theme, children }: ThemeProviderProps) {
  useEffect(() => {
    applyTheme(theme)
  }, [theme])

  const themeStyles = generateThemeCSS(theme)

  return (
    <div style={themeStyles} className="theme-wrapper">
      {children}
    </div>
  )
}
```

### **Layout con Tema**
```typescript
// app/(stores)/[slug]/layout.tsx
import ThemeProvider from '@/components/ThemeProvider'
import { getStoreBySlug } from '@/lib/api'

export default async function StoreLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { slug: string }
}) {
  const store = await getStoreBySlug(params.slug)

  return (
    <ThemeProvider theme={store.theme}>
      <div className="store-layout">
        <StoreHeader store={store} />
        <main>{children}</main>
        <StoreFooter store={store} />
      </div>
    </ThemeProvider>
  )
}
```

## 🎨 Tailwind CSS Integration

### **Configuración Dinámica**
```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        // Variables CSS que se actualizan dinámicamente
        primary: 'var(--color-primary)',
        'primary-hover': 'var(--color-primary-hover)',
        secondary: 'var(--color-secondary)',
        accent: 'var(--color-accent)',
        background: 'var(--color-background)',
        surface: 'var(--color-surface)',
        text: 'var(--color-text)',
        'text-muted': 'var(--color-text-muted)',
        border: 'var(--color-border)',
      },
      fontFamily: {
        sans: ['var(--font-family)', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        theme: 'var(--border-radius)',
      }
    }
  }
}
```

### **Clases de Utilidad**
```scss
/* styles/theme-utilities.css */
.btn-primary {
  @apply bg-primary hover:bg-primary-hover text-white font-medium py-2 px-4 rounded-theme transition-colors;
}

.card {
  @apply bg-surface border border-border rounded-theme p-4 shadow-sm;
}

.text-theme {
  @apply text-text;
}

.text-theme-muted {
  @apply text-text-muted;
}
```

## 🖼️ Previews de Temas

### **Generador de Previews**
```typescript
// lib/theme-preview.ts
export function generateThemePreview(theme: Theme): string {
  return `
    <div style="background: ${theme.colors.background}; padding: 20px; border-radius: 8px;">
      <div style="color: ${theme.colors.text}; font-weight: bold; margin-bottom: 10px;">
        ${theme.name}
      </div>
      <button style="
        background: ${theme.colors.primary};
        color: white;
        padding: 8px 16px;
        border: none;
        border-radius: ${theme.styling.borderRadius};
        margin-right: 8px;
      ">
        Botón Principal
      </button>
      <div style="
        background: ${theme.colors.surface};
        border: 1px solid ${theme.colors.border};
        padding: 12px;
        margin-top: 10px;
        border-radius: ${theme.styling.borderRadius};
      ">
        <div style="color: ${theme.colors.text};">Título del producto</div>
        <div style="color: ${theme.colors.textMuted}; font-size: 14px;">Descripción</div>
        <div style="color: ${theme.colors.accent}; font-weight: bold;">$99.99</div>
      </div>
    </div>
  `
}
```

## 🛠️ Panel de Administración

### **Selector de Temas**
```typescript
// components/admin/ThemeSelector.tsx
export default function ThemeSelector({
  currentTheme,
  onThemeChange
}: {
  currentTheme: Theme
  onThemeChange: (theme: Theme) => void
}) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {PREDEFINED_THEMES.map((theme) => (
        <div
          key={theme.id}
          className={`
            cursor-pointer border-2 rounded-lg p-4 transition-all
            ${currentTheme.id === theme.id ? 'border-primary' : 'border-border'}
          `}
          onClick={() => onThemeChange(theme)}
        >
          <div
            className="w-full h-32 rounded mb-2"
            dangerouslySetInnerHTML={{
              __html: generateThemePreview(theme)
            }}
          />
          <div className="font-medium">{theme.name}</div>
        </div>
      ))}
    </div>
  )
}
```

## 🚀 Funcionalidades Avanzadas

### **Personalización de Colores**
```typescript
// Permitir al usuario ajustar colores del tema seleccionado
export function customizeThemeColors(
  baseTheme: Theme,
  colorOverrides: Partial<Theme['colors']>
): Theme {
  return {
    ...baseTheme,
    id: `${baseTheme.id}-custom`,
    name: `${baseTheme.name} (Personalizado)`,
    colors: {
      ...baseTheme.colors,
      ...colorOverrides
    }
  }
}
```

### **Modo Oscuro**
```typescript
// Generar versión oscura de cualquier tema
export function generateDarkMode(theme: Theme): Theme {
  return {
    ...theme,
    id: `${theme.id}-dark`,
    name: `${theme.name} Oscuro`,
    colors: {
      ...theme.colors,
      background: '#111827',
      surface: '#1F2937',
      text: '#F9FAFB',
      textMuted: '#9CA3AF',
      border: '#374151',
    }
  }
}
```

### **Validación de Contraste**
```typescript
// Asegurar accesibilidad (AA/AAA)
export function validateThemeContrast(theme: Theme): {
  isValid: boolean
  warnings: string[]
} {
  // Implementar validación WCAG
  // Retornar warnings si el contraste es insuficiente
}
```

Esta implementación te da:
1. **Flexibilidad** total para personalizar tiendas
2. **Performance** con CSS variables nativas
3. **Accesibilidad** con validación de contraste
4. **UX excelente** con previews en tiempo real
5. **Escalabilidad** para agregar más temas fácilmente