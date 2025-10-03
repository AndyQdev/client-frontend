import { ProfessionalTheme, CustomColors } from './types'
import { generateThemeColors } from './color-generator'

export const EDITORIAL_THEME: ProfessionalTheme = {
  id: 'editorial',
  name: 'Editorial',
  description: 'Diseño de revista con tipografía mixta y layouts dinámicos',
  category: 'editorial',
  preview: '/themes/editorial-preview.png',

  generateColors: (customColors: CustomColors) => {
    const generated = generateThemeColors(customColors)

    return {
      ...generated,
      // Override para estética editorial
      background: '#FEFEFE',
      surface: '#FFFFFF',
      border: '#E6E6E6',
      borderLight: '#F2F2F2',
      textMuted: '#757575',
      text: '#1C1C1C',
    }
  },

  typography: {
    primary: {
      family: 'Crimson Text, Georgia, serif',
      weights: ['400', '600', '700'],
      style: 'serif',
      className: 'font-crimson'
    },
    secondary: {
      family: 'Work Sans, Helvetica, sans-serif',
      weights: ['300', '400', '500', '600'],
      style: 'sans-serif',
      className: 'font-work-sans'
    },
    body: {
      family: 'Work Sans, Helvetica, sans-serif',
      weights: ['300', '400'],
      style: 'sans-serif',
      className: 'font-work-sans'
    }
  },

  layout: {
    productCard: {
      style: 'editorial',
      imageRatio: 'portrait',
      textAlignment: 'left',
      spacing: 'normal',
      borderRadius: '0px',
      showBrand: true,
      showCategory: true,
      priceStyle: 'badge'
    },
    grid: {
      columns: {
        mobile: 1,
        tablet: 2,
        desktop: 3
      },
      gap: 'md'
    },
    header: {
      style: 'editorial',
      logoPosition: 'center',
      navStyle: 'horizontal'
    }
  },

  styling: {
    borderRadius: '0px',
    shadowStyle: 'none',
    animationStyle: 'smooth'
  },

  customCSS: `
    /* Editorial Theme Custom Styles */
    .theme-editorial {
      font-feature-settings: "liga" 1, "kern" 1, "swsh" 1;
      -webkit-font-smoothing: antialiased;
    }

    .theme-editorial .product-card {
      background: white;
      border: none;
      transition: transform 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .theme-editorial .product-card:hover {
      transform: scale(1.02);
    }

    .theme-editorial .product-card:nth-child(3n+1) {
      transform: translateY(20px);
    }

    .theme-editorial .product-card:nth-child(3n+2) {
      transform: translateY(-10px);
    }

    .theme-editorial .product-image {
      width: 100%;
      height: 400px;
      object-fit: cover;
      filter: grayscale(20%) contrast(1.1);
      transition: filter 0.3s ease;
    }

    .theme-editorial .product-card:hover .product-image {
      filter: grayscale(0%) contrast(1.2);
    }

    .theme-editorial .product-info {
      padding: 20px 16px;
      background: white;
    }

    .theme-editorial .product-category {
      font-family: 'Work Sans', sans-serif;
      font-size: 11px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #999;
      margin-bottom: 8px;
    }

    .theme-editorial .product-title {
      font-family: 'Crimson Text', serif;
      font-weight: 600;
      font-size: 22px;
      line-height: 1.3;
      margin-bottom: 12px;
      color: #1C1C1C;
    }

    .theme-editorial .product-brand {
      font-family: 'Work Sans', sans-serif;
      font-size: 13px;
      font-weight: 400;
      color: #666;
      margin-bottom: 8px;
    }

    .theme-editorial .product-price {
      font-family: 'Work Sans', sans-serif;
      font-weight: 600;
      font-size: 18px;
      color: var(--color-primary);
      background: rgba(var(--color-primary-rgb), 0.1);
      padding: 4px 12px;
      border-radius: 20px;
      display: inline-block;
    }

    .theme-editorial .store-header {
      background: white;
      border-bottom: 2px solid #E6E6E6;
      padding: 32px 0;
    }

    .theme-editorial .store-name {
      font-family: 'Crimson Text', serif;
      font-weight: 700;
      font-size: 36px;
      letter-spacing: -1px;
      color: #1C1C1C;
      text-align: center;
    }

    .theme-editorial .store-description {
      font-family: 'Work Sans', sans-serif;
      font-size: 16px;
      font-weight: 300;
      color: #666;
      text-align: center;
      max-width: 600px;
      margin: 16px auto 0;
      line-height: 1.6;
    }

    .theme-editorial .btn-primary {
      background: var(--color-primary);
      color: white;
      border: none;
      padding: 14px 32px;
      font-family: 'Work Sans', sans-serif;
      font-weight: 500;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 1px;
      transition: all 0.3s ease;
    }

    .theme-editorial .btn-primary:hover {
      background: var(--color-primary-dark);
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
    }

    .theme-editorial .category-filter {
      text-align: center;
      margin: 48px 0;
    }

    .theme-editorial .category-filter button {
      background: transparent;
      border: 1px solid #E6E6E6;
      padding: 12px 24px;
      margin: 0 8px;
      font-family: 'Work Sans', sans-serif;
      font-size: 13px;
      font-weight: 400;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #666;
      transition: all 0.3s ease;
    }

    .theme-editorial .category-filter button:hover,
    .theme-editorial .category-filter button.active {
      background: var(--color-primary);
      border-color: var(--color-primary);
      color: white;
    }

    .theme-editorial .product-grid {
      gap: 24px;
      margin-top: 48px;
    }

    .theme-editorial .section-title {
      font-family: 'Crimson Text', serif;
      font-weight: 700;
      font-size: 48px;
      letter-spacing: -2px;
      text-align: center;
      margin-bottom: 24px;
      color: #1C1C1C;
    }

    .theme-editorial .section-subtitle {
      font-family: 'Work Sans', sans-serif;
      font-size: 18px;
      font-weight: 300;
      text-align: center;
      color: #666;
      margin-bottom: 48px;
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;
    }

    /* Magazine-style spacing */
    .theme-editorial section {
      margin-bottom: 80px;
    }

    /* Asymmetric grid on larger screens */
    @media (min-width: 1024px) {
      .theme-editorial .product-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 32px;
      }

      .theme-editorial .product-card:nth-child(4n+1) {
        grid-column: span 2;
      }

      .theme-editorial .product-card:nth-child(4n+1) .product-image {
        height: 500px;
      }
    }
  `
}