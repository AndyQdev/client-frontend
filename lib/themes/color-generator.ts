import { CustomColors, ThemeColors } from './types'

// Función para convertir hex a HSL
function hexToHsl(hex: string): [number, number, number] {
  // Validate hex input
  if (!hex || typeof hex !== 'string') {
    console.error('Invalid hex color:', hex)
    return [0, 0, 0]
  }

  // Ensure hex starts with #
  if (!hex.startsWith('#')) {
    hex = '#' + hex
  }

  // Validate hex format
  if (hex.length !== 7) {
    console.error('Invalid hex color format:', hex)
    return [0, 0, 0]
  }

  const r = parseInt(hex.slice(1, 3), 16) / 255
  const g = parseInt(hex.slice(3, 5), 16) / 255
  const b = parseInt(hex.slice(5, 7), 16) / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h, s, l = (max + min) / 2

  if (max === min) {
    h = s = 0
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
      default: h = 0
    }
    h /= 6
  }

  return [h * 360, s * 100, l * 100]
}

// Función para convertir HSL a hex
function hslToHex(h: number, s: number, l: number): string {
  h = h % 360
  s = s / 100
  l = l / 100

  const c = (1 - Math.abs(2 * l - 1)) * s
  const x = c * (1 - Math.abs((h / 60) % 2 - 1))
  const m = l - c / 2
  let r = 0, g = 0, b = 0

  if (0 <= h && h < 60) {
    r = c; g = x; b = 0
  } else if (60 <= h && h < 120) {
    r = x; g = c; b = 0
  } else if (120 <= h && h < 180) {
    r = 0; g = c; b = x
  } else if (180 <= h && h < 240) {
    r = 0; g = x; b = c
  } else if (240 <= h && h < 300) {
    r = x; g = 0; b = c
  } else if (300 <= h && h < 360) {
    r = c; g = 0; b = x
  }

  r = Math.round((r + m) * 255)
  g = Math.round((g + m) * 255)
  b = Math.round((b + m) * 255)

  return "#" + r.toString(16).padStart(2, '0') +
              g.toString(16).padStart(2, '0') +
              b.toString(16).padStart(2, '0')
}

// Función para generar variaciones de un color
function generateColorVariations(baseColor: string) {
  const [h, s, l] = hexToHsl(baseColor)

  return {
    base: baseColor,
    hover: hslToHex(h, s, Math.max(l - 10, 0)),
    light: hslToHex(h, Math.max(s - 20, 0), Math.min(l + 20, 95)),
    dark: hslToHex(h, Math.min(s + 10, 100), Math.max(l - 20, 5)),
  }
}

// Función para determinar si un color es claro u oscuro
function isLightColor(hex: string): boolean {
  const [, , l] = hexToHsl(hex)
  return l > 50
}

// Función para generar colores de contraste
function generateContrastColors(primaryColor: string, secondaryColor: string) {
  const primaryIsLight = isLightColor(primaryColor)
  const secondaryIsLight = isLightColor(secondaryColor)

  // Determinar colores de fondo y texto basado en los colores principales
  let background, surface, text, textMuted, border

  if (primaryIsLight && secondaryIsLight) {
    // Ambos colores son claros - tema claro
    background = '#FFFFFF'
    surface = '#FAFAFA'
    text = '#1A1A1A'
    textMuted = '#666666'
    border = '#E5E5E5'
  } else if (!primaryIsLight && !secondaryIsLight) {
    // Ambos colores son oscuros - tema oscuro
    background = '#0F0F0F'
    surface = '#1A1A1A'
    text = '#FFFFFF'
    textMuted = '#CCCCCC'
    border = '#333333'
  } else {
    // Colores mixtos - tema balanceado
    background = '#FCFCFC'
    surface = '#F8F8F8'
    text = '#2A2A2A'
    textMuted = '#737373'
    border = '#D4D4D4'
  }

  return { background, surface, text, textMuted, border }
}

// Función para generar color de acento complementario
function generateAccentColor(primaryColor: string, secondaryColor: string): string {
  const [primaryH] = hexToHsl(primaryColor)
  const [secondaryH] = hexToHsl(secondaryColor)

  // Generar un color de acento que sea complementario
  const accentH = (primaryH + secondaryH + 180) / 2 % 360
  return hslToHex(accentH, 70, 55)
}

// Función principal para generar paleta completa
export function generateThemeColors(customColors: CustomColors): ThemeColors {
  const primary = generateColorVariations(customColors.primary)
  const secondary = generateColorVariations(customColors.secondary)
  const contrast = generateContrastColors(customColors.primary, customColors.secondary)
  const accentBase = generateAccentColor(customColors.primary, customColors.secondary)
  const accent = generateColorVariations(accentBase)

  return {
    // Colores primarios
    primary: primary.base,
    primaryHover: primary.hover,
    primaryLight: primary.light,
    primaryDark: primary.dark,

    // Colores secundarios
    secondary: secondary.base,
    secondaryHover: secondary.hover,
    secondaryLight: secondary.light,
    secondaryDark: secondary.dark,

    // Color de acento generado
    accent: accent.base,
    accentLight: accent.light,
    accentDark: accent.dark,

    // Colores de contraste
    background: contrast.background,
    surface: contrast.surface,
    text: contrast.text,
    textMuted: contrast.textMuted,
    textLight: hslToHex(0, 0, 70),
    border: contrast.border,
    borderLight: hslToHex(0, 0, 90),

    // Estados (colores fijos para consistencia)
    success: '#10B981',
    successBg: '#ECFDF5',
    error: '#EF4444',
    errorBg: '#FEF2F2',
    warning: '#F59E0B',
    warningBg: '#FFFBEB',
    info: '#3B82F6',
    infoBg: '#EFF6FF',
  }
}

// Función para validar contraste de colores
export function validateColorContrast(backgroundColor: string, textColor: string): {
  isValid: boolean
  ratio: number
  level: 'AA' | 'AAA' | 'FAIL'
} {
  // Implementación simplificada de contraste WCAG
  const bgLum = getLuminance(backgroundColor)
  const textLum = getLuminance(textColor)

  const ratio = (Math.max(bgLum, textLum) + 0.05) / (Math.min(bgLum, textLum) + 0.05)

  let level: 'AA' | 'AAA' | 'FAIL'
  if (ratio >= 7) level = 'AAA'
  else if (ratio >= 4.5) level = 'AA'
  else level = 'FAIL'

  return {
    isValid: ratio >= 4.5,
    ratio,
    level
  }
}

function getLuminance(hex: string): number {
  const [r, g, b] = [
    parseInt(hex.slice(1, 3), 16) / 255,
    parseInt(hex.slice(3, 5), 16) / 255,
    parseInt(hex.slice(5, 7), 16) / 255,
  ]

  const sRGB = (color: number) => {
    return color <= 0.03928 ? color / 12.92 : Math.pow((color + 0.055) / 1.055, 2.4)
  }

  return 0.2126 * sRGB(r) + 0.7152 * sRGB(g) + 0.0722 * sRGB(b)
}