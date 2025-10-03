// Professional Theme System
export { type ProfessionalTheme, type CustomColors, type ThemeColors, type ThemeTypography, type ThemeLayout, type SerializableProfessionalTheme } from './types'
export { generateThemeColors, validateColorContrast } from './color-generator'

// Theme Imports
import { ELEGANTE_THEME } from './elegante'
import { MINIMAL_THEME } from './minimal'
import { EDITORIAL_THEME } from './editorial'
import { MODERN_THEME } from './modern'
import { CLASSIC_THEME } from './classic'
import { CREATIVE_THEME } from './creative'

// Re-export individual themes
export { ELEGANTE_THEME, MINIMAL_THEME, EDITORIAL_THEME, MODERN_THEME, CLASSIC_THEME, CREATIVE_THEME }

// Professional Themes Collection
export const PROFESSIONAL_THEMES = [
  ELEGANTE_THEME,
  MINIMAL_THEME,
  EDITORIAL_THEME,
  MODERN_THEME,
  CLASSIC_THEME,
  CREATIVE_THEME,
] as const

// Utility functions for theme management
export function getThemeById(id: string) {
  return PROFESSIONAL_THEMES.find(theme => theme.id === id)
}

export function getThemesByCategory(category: string) {
  return PROFESSIONAL_THEMES.filter(theme => theme.category === category)
}

export function getAvailableCategories() {
  return Array.from(new Set(PROFESSIONAL_THEMES.map(theme => theme.category)))
}

// Default theme configuration
export const DEFAULT_CUSTOM_COLORS = {
  primary: '#3B82F6',
  secondary: '#8B5CF6'
} as const

// Theme preview information
export const THEME_PREVIEWS = {
  elegante: {
    description: 'Sofisticación y lujo con tipografía serif elegante',
    colors: ['#2C1810', '#D4AF37'],
    features: ['Tipografía serif', 'Fondo beige', 'Estilo minimalista de alta gama']
  },
  minimal: {
    description: 'Limpieza absoluta con espacios generosos',
    colors: ['#1A1A1A', '#3B82F6'],
    features: ['Ultra limpio', 'Tipografía Inter', 'Espacios generosos']
  },
  editorial: {
    description: 'Estilo revista con layouts dinámicos',
    colors: ['#1C1C1C', '#E63946'],
    features: ['Tipografía mixta', 'Layouts asimétricos', 'Estilo revista']
  },
  modern: {
    description: 'Contemporáneo con gradientes y animaciones',
    colors: ['#111827', '#6366F1'],
    features: ['Gradientes', 'Animaciones suaves', 'Tipografía geométrica']
  },
  classic: {
    description: 'Tradicional y atemporal con elegancia clásica',
    colors: ['#2D1B0E', '#8B7355'],
    features: ['Tipografía serif tradicional', 'Ornamentos clásicos', 'Diseño atemporal']
  },
  creative: {
    description: 'Experimental con efectos únicos y tipografía expresiva',
    colors: ['#0F172A', '#F59E0B'],
    features: ['Efectos experimentales', 'Rotaciones playful', 'Tipografía variable']
  }
} as const

// CSS Variables helper for theme integration
export function generateThemeCSS(theme: ProfessionalTheme, customColors: CustomColors): string {
  const colors = theme.generateColors(customColors)

  const cssVariables = Object.entries(colors)
    .map(([key, value]) => {
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
      return `  --color-${cssKey}: ${value};`
    })
    .join('\n')

  return `
:root {
${cssVariables}

  /* RGB versions for opacity usage */
  --color-primary-rgb: ${hexToRgb(colors.primary)};
  --color-secondary-rgb: ${hexToRgb(colors.secondary)};
  --color-accent-rgb: ${hexToRgb(colors.accent)};
}

${theme.customCSS || ''}
`
}

// Helper function to convert hex to RGB
function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r}, ${g}, ${b}`
}

// Font loading helper
export function loadThemeFonts(theme: ProfessionalTheme): Promise<void> {
  const fontsToLoad = [
    theme.typography.primary.family,
    theme.typography.secondary.family,
    theme.typography.body.family
  ]

  // Remove duplicates
  const uniqueFonts = Array.from(new Set(fontsToLoad))

  // Google Fonts API URLs
  const fontUrls = uniqueFonts.map(font => {
    const fontName = font.split(',')[0].replace(/'/g, '').trim()
    const weights = theme.typography.primary.weights.join(',')
    return `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, '+')}:wght@${weights}&display=swap`
  })

  // Load fonts
  const loadPromises = fontUrls.map(url => {
    return new Promise<void>((resolve, reject) => {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = url
      link.onload = () => resolve()
      link.onerror = () => reject(new Error(`Failed to load font: ${url}`))
      document.head.appendChild(link)
    })
  })

  return Promise.all(loadPromises).then(() => void 0)
}