// Nuevos tipos para temas profesionales y únicos

export interface CustomColors {
  primary: string
  secondary: string
}

export interface ThemeTypography {
  primary: {
    family: string
    weights: string[]
    style: 'serif' | 'sans-serif' | 'display'
    className: string
  }
  secondary: {
    family: string
    weights: string[]
    style: 'serif' | 'sans-serif' | 'display'
    className: string
  }
  body: {
    family: string
    weights: string[]
    style: 'serif' | 'sans-serif' | 'display'
    className: string
  }
}

export interface ThemeLayout {
  productCard: {
    style: 'minimal' | 'classic' | 'modern' | 'luxury' | 'darkmode' | 'magazine' | 'creative'
    imageRatio: 'square' | 'portrait' | 'landscape'
    textAlignment: 'left' | 'center' | 'right'
    spacing: 'tight' | 'normal' | 'relaxed' | 'loose'
    borderRadius: string
    showBrand: boolean
    showCategory: boolean
    priceStyle: 'prominent' | 'subtle' | 'badge'
  }
  grid: {
    columns: {
      mobile: number
      tablet: number
      desktop: number
    }
    gap: 'sm' | 'md' | 'lg' | 'xl'
  }
  header: {
    style: 'minimal' | 'classic' | 'bold' | 'darkmode' | 'creative' | 'modern'
    logoPosition: 'left' | 'center'
    navStyle: 'horizontal' | 'minimal' | 'none'
  }
}

export interface ThemeColors {
  // Colores base personalizables
  primary: string
  primaryHover: string
  primaryLight: string
  primaryDark: string
  secondary: string
  secondaryHover: string
  secondaryLight: string
  secondaryDark: string

  // Colores generados automáticamente
  accent: string
  accentLight: string
  accentDark: string
  background: string
  surface: string
  text: string
  textMuted: string
  textLight: string
  border: string
  borderLight: string

  // Estados
  success: string
  successBg: string
  error: string
  errorBg: string
  warning: string
  warningBg: string
  info: string
  infoBg: string
}

export interface ProfessionalTheme {
  id: string
  name: string
  description: string
  category: 'luxury' | 'minimal' | 'darkmode' | 'modern' | 'classic' | 'creative'
  preview: string

  // Función para generar colores basado en colores personalizados
  generateColors: (customColors: CustomColors) => ThemeColors

  // Tipografía única del tema
  typography: ThemeTypography

  // Layout y estilo único
  layout: ThemeLayout

  // Configuraciones especiales del tema
  styling: {
    borderRadius: string
    shadowStyle: 'none' | 'subtle' | 'medium' | 'dramatic'
    animationStyle: 'none' | 'subtle' | 'smooth' | 'playful'
  }

  // CSS personalizado del tema
  customCSS?: string
}

// Helper para generar paleta de colores automáticamente
export interface ColorPalette {
  primary: string
  secondary: string
  accent: string
  background: string
  surface: string
  text: string
  textMuted: string
  border: string
}

// Serializable theme data (without functions) for client components
export interface SerializableProfessionalTheme {
  id: string
  name: string
  description: string
  category: 'luxury' | 'minimal' | 'darkmode' | 'modern' | 'classic' | 'creative'
  preview: string
  typography: ThemeTypography
  layout: ThemeLayout
  styling: {
    borderRadius: string
    shadowStyle: 'none' | 'subtle' | 'medium' | 'dramatic'
    animationStyle: 'none' | 'subtle' | 'smooth' | 'playful'
  }
  customCSS?: string
  // Colors are pre-generated on server side
  colors: ThemeColors
}