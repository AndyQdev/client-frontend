'use client'

import { useEffect } from 'react'
import { Theme } from '@/lib/types'
import type { SerializableProfessionalTheme, CustomColors } from '@/lib/themes/types'
import { useApplyTheme } from '@/lib/theming'

interface LegacyThemeProviderProps {
  theme: Theme
  children: React.ReactNode
  serializableTheme?: never
}

interface ProfessionalThemeProviderProps {
  theme?: never
  serializableTheme: SerializableProfessionalTheme & { customColors: CustomColors }
  children: React.ReactNode
}

type ThemeProviderProps = LegacyThemeProviderProps | ProfessionalThemeProviderProps

export default function ThemeProvider({
  theme,
  serializableTheme,
  children
}: ThemeProviderProps) {
  // Apply legacy theme
  useApplyTheme(theme)

  // Apply professional theme CSS and styles
  useEffect(() => {
    if (serializableTheme) {
      // Apply CSS variables for colors
      const root = document.documentElement
      Object.entries(serializableTheme.colors).forEach(([key, value]) => {
        const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase()
        root.style.setProperty(`--color-${cssKey}`, value)
      })

      // RGB versions for opacity usage
      root.style.setProperty('--color-primary-rgb', hexToRgb(serializableTheme.colors.primary))
      root.style.setProperty('--color-secondary-rgb', hexToRgb(serializableTheme.colors.secondary))
      root.style.setProperty('--color-accent-rgb', hexToRgb(serializableTheme.colors.accent))

      // Generate and inject custom CSS
      const customCSS = serializableTheme.customCSS
      if (customCSS) {
        // Remove previous theme CSS
        const existingStyle = document.getElementById('professional-theme-css')
        if (existingStyle) {
          existingStyle.remove()
        }

        // Add new theme CSS
        const style = document.createElement('style')
        style.id = 'professional-theme-css'
        style.textContent = customCSS
        document.head.appendChild(style)
      }

      // Apply theme class to body
      document.body.className = document.body.className.replace(/theme-\w+/g, '')
      document.body.classList.add(`theme-${serializableTheme.id}`)

      // Load theme fonts
      loadThemeFonts(serializableTheme)
    }
  }, [serializableTheme])

  return <>{children}</>
}

// Helper function to convert hex to RGB
function hexToRgb(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `${r}, ${g}, ${b}`
}

// Font loading helper
async function loadThemeFonts(theme: SerializableProfessionalTheme): Promise<void> {
  const fontsToLoad = [
    theme.typography.primary.family,
    theme.typography.secondary.family,
    theme.typography.body.family
  ]

  // Remove duplicates and get unique font families
  const uniqueFonts = Array.from(new Set(
    fontsToLoad.map(font => font.split(',')[0].replace(/'/g, '').trim())
  ))

  // Load fonts from Google Fonts
  for (const fontName of uniqueFonts) {
    // Skip system fonts
    if (fontName.includes('system') || fontName.includes('apple') || fontName.includes('helvetica')) {
      continue
    }

    const weights = theme.typography.primary.weights.join(',')
    const fontUrl = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, '+')}:wght@${weights}&display=swap`

    // Check if font is already loaded
    const existingLink = document.querySelector(`link[href="${fontUrl}"]`)
    if (!existingLink) {
      const link = document.createElement('link')
      link.rel = 'stylesheet'
      link.href = fontUrl
      document.head.appendChild(link)
    }
  }
}