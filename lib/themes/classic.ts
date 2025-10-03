import { ProfessionalTheme, CustomColors } from './types'
import { generateThemeColors } from './color-generator'

export const CLASSIC_THEME: ProfessionalTheme = {
  id: 'classic',
  name: 'Classic',
  description: 'Diseño tradicional con tipografía serif elegante y layouts atemporales',
  category: 'classic',
  preview: '/themes/classic-preview.png',

  generateColors: (customColors: CustomColors) => {
    const generated = generateThemeColors(customColors)

    return {
      ...generated,
      // Override para estética clásica
      background: '#F7F5F3',
      surface: '#FFFFFF',
      border: '#D4C5B9',
      borderLight: '#E8DDD4',
      textMuted: '#8B7355',
      text: '#2D1B0E',
    }
  },

  typography: {
    primary: {
      family: 'Libre Baskerville, Georgia, serif',
      weights: ['400', '700'],
      style: 'serif',
      className: 'font-libre-baskerville'
    },
    secondary: {
      family: 'Source Sans Pro, Helvetica, sans-serif',
      weights: ['300', '400', '600'],
      style: 'sans-serif',
      className: 'font-source-sans'
    },
    body: {
      family: 'Source Sans Pro, Helvetica, sans-serif',
      weights: ['300', '400'],
      style: 'sans-serif',
      className: 'font-source-sans'
    }
  },

  layout: {
    productCard: {
      style: 'classic',
      imageRatio: 'portrait',
      textAlignment: 'center',
      spacing: 'relaxed',
      borderRadius: '4px',
      showBrand: true,
      showCategory: true,
      priceStyle: 'prominent'
    },
    grid: {
      columns: {
        mobile: 1,
        tablet: 2,
        desktop: 3
      },
      gap: 'lg'
    },
    header: {
      style: 'classic',
      logoPosition: 'center',
      navStyle: 'horizontal'
    }
  },

  styling: {
    borderRadius: '4px',
    shadowStyle: 'subtle',
    animationStyle: 'subtle'
  },

  customCSS: `
    /* Classic Theme Custom Styles */
    .theme-classic {
      font-feature-settings: "liga" 1, "kern" 1, "onum" 1;
      -webkit-font-smoothing: antialiased;
    }

    .theme-classic .product-card {
      background: white;
      border: 1px solid #D4C5B9;
      border-radius: 4px;
      overflow: hidden;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    }

    .theme-classic .product-card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
      border-color: var(--color-primary);
    }

    .theme-classic .product-image {
      width: 100%;
      height: 320px;
      object-fit: cover;
      transition: opacity 0.3s ease;
    }

    .theme-classic .product-card:hover .product-image {
      opacity: 0.9;
    }

    .theme-classic .product-info {
      padding: 24px 20px;
      text-align: center;
      background: white;
    }

    .theme-classic .product-category {
      font-family: 'Source Sans Pro', sans-serif;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #8B7355;
      margin-bottom: 12px;
      position: relative;
    }

    .theme-classic .product-category::before,
    .theme-classic .product-category::after {
      content: '';
      position: absolute;
      top: 50%;
      width: 20px;
      height: 1px;
      background: #D4C5B9;
    }

    .theme-classic .product-category::before {
      left: -30px;
    }

    .theme-classic .product-category::after {
      right: -30px;
    }

    .theme-classic .product-title {
      font-family: 'Libre Baskerville', serif;
      font-weight: 400;
      font-size: 20px;
      line-height: 1.4;
      margin-bottom: 12px;
      color: #2D1B0E;
    }

    .theme-classic .product-brand {
      font-family: 'Source Sans Pro', sans-serif;
      font-size: 14px;
      font-weight: 400;
      font-style: italic;
      color: #8B7355;
      margin-bottom: 16px;
    }

    .theme-classic .product-price {
      font-family: 'Libre Baskerville', serif;
      font-weight: 700;
      font-size: 22px;
      color: var(--color-primary);
      margin-top: 8px;
      position: relative;
    }

    .theme-classic .product-price::before {
      content: '';
      position: absolute;
      top: -8px;
      left: 50%;
      transform: translateX(-50%);
      width: 40px;
      height: 1px;
      background: #D4C5B9;
    }

    .theme-classic .store-header {
      background: linear-gradient(180deg, #F7F5F3 0%, #FFFFFF 100%);
      border-bottom: 2px solid #D4C5B9;
      padding: 40px 0;
      text-align: center;
    }

    .theme-classic .store-name {
      font-family: 'Libre Baskerville', serif;
      font-weight: 700;
      font-size: 42px;
      letter-spacing: 1px;
      color: #2D1B0E;
      margin-bottom: 8px;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    .theme-classic .store-description {
      font-family: 'Source Sans Pro', sans-serif;
      font-size: 18px;
      font-weight: 300;
      font-style: italic;
      color: #8B7355;
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }

    .theme-classic .btn-primary {
      background: transparent;
      color: var(--color-primary);
      border: 2px solid var(--color-primary);
      padding: 12px 32px;
      font-family: 'Source Sans Pro', sans-serif;
      font-weight: 600;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 1px;
      border-radius: 0;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .theme-classic .btn-primary::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: var(--color-primary);
      transition: left 0.3s ease;
      z-index: -1;
    }

    .theme-classic .btn-primary:hover::before {
      left: 0;
    }

    .theme-classic .btn-primary:hover {
      color: white;
    }

    .theme-classic .category-filter {
      text-align: center;
      margin: 56px 0;
      padding: 0 20px;
    }

    .theme-classic .category-filter button {
      background: transparent;
      border: 1px solid #D4C5B9;
      padding: 10px 24px;
      margin: 0 8px 8px 0;
      font-family: 'Source Sans Pro', sans-serif;
      font-size: 13px;
      font-weight: 400;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #8B7355;
      border-radius: 0;
      transition: all 0.3s ease;
    }

    .theme-classic .category-filter button:hover,
    .theme-classic .category-filter button.active {
      background: var(--color-primary);
      border-color: var(--color-primary);
      color: white;
    }

    .theme-classic .product-grid {
      gap: 32px;
      margin-top: 48px;
    }

    .theme-classic .section-title {
      font-family: 'Libre Baskerville', serif;
      font-weight: 700;
      font-size: 38px;
      letter-spacing: 1px;
      text-align: center;
      margin-bottom: 20px;
      color: #2D1B0E;
      position: relative;
    }

    .theme-classic .section-title::after {
      content: '';
      position: absolute;
      bottom: -12px;
      left: 50%;
      transform: translateX(-50%);
      width: 80px;
      height: 2px;
      background: var(--color-primary);
    }

    .theme-classic .section-subtitle {
      font-family: 'Source Sans Pro', sans-serif;
      font-size: 18px;
      font-weight: 300;
      font-style: italic;
      text-align: center;
      color: #8B7355;
      margin-bottom: 48px;
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;
    }

    /* Ornamental elements */
    .theme-classic section {
      margin-bottom: 80px;
      position: relative;
    }

    .theme-classic .ornament {
      text-align: center;
      font-size: 24px;
      color: #D4C5B9;
      margin: 40px 0;
    }

    .theme-classic .ornament::before {
      content: '❦';
    }

    /* Traditional spacing */
    .theme-classic .container {
      padding-left: 20px;
      padding-right: 20px;
    }

    @media (min-width: 768px) {
      .theme-classic .container {
        padding-left: 40px;
        padding-right: 40px;
      }
    }

    /* Elegant hover effects */
    .theme-classic a {
      transition: color 0.3s ease;
    }

    .theme-classic a:hover {
      color: var(--color-primary);
    }

    /* Print-inspired layout */
    .theme-classic .text-content {
      max-width: 65ch;
      margin: 0 auto;
      line-height: 1.7;
    }
  `
}