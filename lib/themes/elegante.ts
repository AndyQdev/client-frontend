import { ProfessionalTheme, CustomColors } from './types'
import { generateThemeColors } from './color-generator'

export const ELEGANTE_THEME: ProfessionalTheme = {
  id: 'elegante',
  name: 'Elegante',
  description: 'Diseño sofisticado con tipografía serif y estética minimalista de alta gama',
  category: 'luxury',
  preview: '/themes/elegante-preview.png',

  generateColors: (customColors: CustomColors) => {
    // Generar paleta basada en los colores del usuario, pero con override para mantener la estética elegante
    const generated = generateThemeColors(customColors)

    return {
      ...generated,
      // Override para background beige elegante como mencionaste
      background: '#FCFAF7', // Beige muy claro, casi marfil
      surface: '#F8F6F3',    // Beige un poco más oscuro para tarjetas
      border: '#E8E6E3',     // Bordes suaves en tono beige
      borderLight: '#F2F0ED',
    }
  },

  typography: {
    primary: {
      family: 'Playfair Display, serif',
      weights: ['400', '500', '600', '700'],
      style: 'serif',
      className: 'font-playfair'
    },
    secondary: {
      family: 'Helvetica Neue, Arial, sans-serif',
      weights: ['300', '400', '500'],
      style: 'sans-serif',
      className: 'font-helvetica'
    },
    body: {
      family: 'Helvetica Neue, Arial, sans-serif',
      weights: ['300', '400'],
      style: 'sans-serif',
      className: 'font-helvetica'
    }
  },

  layout: {
    productCard: {
      style: 'luxury',
      imageRatio: 'portrait',
      textAlignment: 'center',
      spacing: 'loose',
      borderRadius: '0px', // Sin bordes redondeados para look elegante
      showBrand: true,
      showCategory: false,
      priceStyle: 'prominent'
    },
    grid: {
      columns: {
        mobile: 2,
        tablet: 3,
        desktop: 4
      },
      gap: 'xl'
    },
    header: {
      style: 'minimal',
      logoPosition: 'center',
      navStyle: 'minimal'
    }
  },

  styling: {
    borderRadius: '0px',
    shadowStyle: 'subtle',
    animationStyle: 'smooth'
  },

  customCSS: `
    /* Elegante Theme Custom Styles */
    .theme-elegante {
      font-feature-settings: "liga" 1, "kern" 1;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .theme-elegante .product-card {
      transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
      border: 1px solid rgba(0, 0, 0, 0.05);
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(10px);
    }

    .theme-elegante .product-card:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }

    .theme-elegante .product-title {
      font-family: 'Playfair Display', serif;
      font-weight: 500;
      letter-spacing: 0.5px;
      line-height: 1.3;
    }

    .theme-elegante .product-price {
      font-family: 'Helvetica Neue', sans-serif;
      font-weight: 300;
      font-size: 1.1em;
      letter-spacing: 1px;
    }

    .theme-elegante .store-header {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      backdrop-filter: blur(20px);
      background: rgba(252, 250, 247, 0.95);
    }

    .theme-elegante .btn-primary {
      font-family: 'Helvetica Neue', sans-serif;
      font-weight: 400;
      letter-spacing: 2px;
      text-transform: uppercase;
      font-size: 0.85em;
      padding: 12px 32px;
      border: 2px solid var(--color-primary);
      background: transparent;
      color: var(--color-primary);
      transition: all 0.3s ease;
    }

    .theme-elegante .btn-primary:hover {
      background: var(--color-primary);
      color: white;
    }

    .theme-elegante .category-filter button {
      font-family: 'Helvetica Neue', sans-serif;
      font-weight: 300;
      letter-spacing: 1px;
      text-transform: uppercase;
      font-size: 0.8em;
      border: 1px solid rgba(0, 0, 0, 0.2);
      background: transparent;
      padding: 8px 20px;
    }

    .theme-elegante .product-grid {
      gap: 2rem;
    }

    /* Typography overrides */
    .theme-elegante h1, .theme-elegante h2, .theme-elegante h3 {
      font-family: 'Playfair Display', serif;
      font-weight: 500;
      letter-spacing: 0.5px;
    }

    .theme-elegante .store-name {
      font-family: 'Playfair Display', serif;
      font-weight: 400;
      letter-spacing: 2px;
      text-transform: uppercase;
    }
  `
}