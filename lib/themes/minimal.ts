import { ProfessionalTheme, CustomColors } from './types'
import { generateThemeColors } from './color-generator'

export const MINIMAL_THEME: ProfessionalTheme = {
  id: 'minimal',
  name: 'Minimal',
  description: 'Diseño ultra limpio con tipografía sans-serif y espacios generosos',
  category: 'minimal',
  preview: '/themes/minimal-preview.png',

  generateColors: (customColors: CustomColors) => {
    const generated = generateThemeColors(customColors)

    return {
      ...generated,
      // Override para estética minimal
      background: '#FFFFFF',
      surface: '#FDFDFD',
      border: '#F0F0F0',
      borderLight: '#F8F8F8',
      textMuted: '#8E8E8E',
    }
  },

  typography: {
    primary: {
      family: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      weights: ['300', '400', '500', '600'],
      style: 'sans-serif',
      className: 'font-inter'
    },
    secondary: {
      family: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      weights: ['300', '400', '500'],
      style: 'sans-serif',
      className: 'font-inter'
    },
    body: {
      family: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      weights: ['300', '400'],
      style: 'sans-serif',
      className: 'font-inter'
    }
  },

  layout: {
    productCard: {
      style: 'minimal',
      imageRatio: 'square',
      textAlignment: 'left',
      spacing: 'normal',
      borderRadius: '8px',
      showBrand: false,
      showCategory: false,
      priceStyle: 'subtle'
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
      style: 'minimal',
      logoPosition: 'left',
      navStyle: 'minimal'
    }
  },

  styling: {
    borderRadius: '8px',
    shadowStyle: 'none',
    animationStyle: 'subtle'
  },

  customCSS: `
    /* Minimal Theme Custom Styles */
    .theme-minimal {
      font-feature-settings: "cv02" 1, "cv03" 1, "cv04" 1;
      -webkit-font-smoothing: antialiased;
    }

    .theme-minimal .product-card {
      background: white;
      border: 1px solid #F5F5F5;
      transition: border-color 0.2s ease, box-shadow 0.2s ease;
      padding: 0;
      overflow: hidden;
    }

    .theme-minimal .product-card:hover {
      border-color: #E0E0E0;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    }

    .theme-minimal .product-image {
      width: 100%;
      height: 300px;
      object-fit: cover;
      background: #FAFAFA;
    }

    .theme-minimal .product-info {
      padding: 20px;
    }

    .theme-minimal .product-title {
      font-weight: 400;
      font-size: 16px;
      line-height: 1.4;
      margin-bottom: 8px;
      color: #2A2A2A;
    }

    .theme-minimal .product-price {
      font-weight: 500;
      font-size: 18px;
      color: #1A1A1A;
      margin-top: 12px;
    }

    .theme-minimal .store-header {
      background: white;
      border-bottom: 1px solid #F0F0F0;
      padding: 24px 0;
    }

    .theme-minimal .store-name {
      font-weight: 500;
      font-size: 24px;
      letter-spacing: -0.5px;
      color: #1A1A1A;
    }

    .theme-minimal .btn-primary {
      background: var(--color-primary);
      color: white;
      border: none;
      padding: 12px 24px;
      font-weight: 500;
      font-size: 14px;
      border-radius: 6px;
      transition: opacity 0.2s ease;
    }

    .theme-minimal .btn-primary:hover {
      opacity: 0.9;
    }

    .theme-minimal .category-filter button {
      background: #F8F8F8;
      border: none;
      padding: 8px 16px;
      font-size: 14px;
      font-weight: 400;
      color: #666;
      border-radius: 20px;
      transition: all 0.2s ease;
    }

    .theme-minimal .category-filter button:hover,
    .theme-minimal .category-filter button.active {
      background: var(--color-primary);
      color: white;
    }

    .theme-minimal .product-grid {
      gap: 32px;
    }

    .theme-minimal .search-input {
      border: 1px solid #E0E0E0;
      border-radius: 8px;
      padding: 12px 16px;
      font-size: 16px;
      background: white;
      transition: border-color 0.2s ease;
    }

    .theme-minimal .search-input:focus {
      border-color: var(--color-primary);
      outline: none;
    }

    /* Ultra clean spacing */
    .theme-minimal section {
      margin-bottom: 64px;
    }

    .theme-minimal h2 {
      font-weight: 500;
      font-size: 32px;
      letter-spacing: -1px;
      margin-bottom: 24px;
    }
  `
}