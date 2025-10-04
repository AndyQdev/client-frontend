import * as React from 'react'
import { Theme } from './types'
import type { ProfessionalTheme, CustomColors } from './themes/types'
import { generateThemeColors } from './themes/color-generator'
import { DEFAULT_CUSTOM_COLORS } from './themes/index'

// Helper function to convert legacy Theme to CSS variables
function legacyThemeToCSS(theme: Theme): Record<string, string> {
  return {
    '--color-primary': theme.colors.primary,
    '--color-secondary': theme.colors.secondary,
    '--color-accent': theme.colors.accent,
    '--color-background': theme.colors.background,
    '--color-surface': theme.colors.surface,
    '--color-text': theme.colors.text,
    '--color-text-muted': theme.colors.textMuted,
    '--color-border': theme.colors.border,
  }
}

// Server-side function (can be used in Server Components)
export function themeStyleVars(theme: Theme): React.CSSProperties {
  const cssVars = legacyThemeToCSS(theme)
  return cssVars as React.CSSProperties
}

// New professional theme style vars
export function professionalThemeStyleVars(theme: ProfessionalTheme, customColors: CustomColors = DEFAULT_CUSTOM_COLORS): React.CSSProperties {
  // Use standalone function instead of theme method
  const colors = generateThemeColors(customColors)

  const cssVars: Record<string, string> = {}
  Object.entries(colors).forEach(([key, value]) => {
    const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
    cssVars[`--color-${cssKey}`] = value
  })

  // RGB versions for opacity usage
  cssVars['--color-primary-rgb'] = hexToRgb(colors.primary)
  cssVars['--color-secondary-rgb'] = hexToRgb(colors.secondary)
  cssVars['--color-accent-rgb'] = hexToRgb(colors.accent)

  return cssVars as React.CSSProperties
}

export function applyThemeToElement(element: HTMLElement, theme: Theme) {
  const cssVars = legacyThemeToCSS(theme)

  Object.entries(cssVars).forEach(([property, value]) => {
    element.style.setProperty(property, value)
  })
}

// New professional theme application
export function applyProfessionalThemeToElement(element: HTMLElement, theme: ProfessionalTheme, customColors: CustomColors = DEFAULT_CUSTOM_COLORS) {
  // Use standalone function instead of theme method
  const colors = generateThemeColors(customColors)

  Object.entries(colors).forEach(([key, value]) => {
    const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
    element.style.setProperty(`--color-${cssKey}`, value)
  })

  // RGB versions
  element.style.setProperty('--color-primary-rgb', hexToRgb(colors.primary))
  element.style.setProperty('--color-secondary-rgb', hexToRgb(colors.secondary))
  element.style.setProperty('--color-accent-rgb', hexToRgb(colors.accent))

  // Apply theme class
  element.className = element.className.replace(/theme-\w+/g, '') + ` theme-${theme.id}`
}

// Client-side hook (use client)
export function useApplyTheme(theme?: Theme) {
  React.useEffect(() => {
    if (!theme) return

    const root = document.documentElement
    const cssVars = legacyThemeToCSS(theme)

    Object.entries(cssVars).forEach(([property, value]) => {
      root.style.setProperty(property, value)
    })
  }, [theme])
}

// New professional theme hook
export function useApplyProfessionalTheme(theme?: ProfessionalTheme, customColors: CustomColors = DEFAULT_CUSTOM_COLORS) {
  React.useEffect(() => {
    if (!theme) return

    const root = document.documentElement
    applyProfessionalThemeToElement(root, theme, customColors)
  }, [theme, customColors])
}

// Helper function to convert hex to RGB
function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r}, ${g}, ${b}`
}

// Legacy function para compatibilidad
export { useApplyTheme as useApplyStoreTheme }
