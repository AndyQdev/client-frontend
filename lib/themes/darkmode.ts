import { ProfessionalTheme, CustomColors } from './types'
import { generateThemeColors } from './color-generator'

export const DARKMODE_THEME: ProfessionalTheme = {
  id: 'darkmode',
  name: 'Dark Mode',
  description: 'Tema oscuro elegante y sofisticado con acentos dorados',
  category: 'luxury',
  preview: '/themes/darkmode-preview.png',

  generateColors: (customColors: CustomColors) => {
    const generated = generateThemeColors(customColors)

    return {
      ...generated,
      // Dark mode palette inspired by Shade theme
      background: '#171717', // zinc-900
      surface: '#27272A', // zinc-800
      border: '#3F3F46', // zinc-700
      borderLight: '#52525B', // zinc-600
      textMuted: '#71717A', // zinc-500
      text: '#D4D4D8', // zinc-300
      textStrong: '#F4F4F5', // zinc-100
      primary: customColors.primary || '#EAB308', // yellow-500 (golden)
      primaryDark: '#CA8A04', // yellow-600
      primaryLight: '#FDE047', // yellow-300
    }
  },

  typography: {
    primary: {
      family: 'Inter, system-ui, sans-serif',
      weights: ['400', '500', '600', '700'],
      style: 'sans-serif',
      className: 'font-sans'
    },
    secondary: {
      family: 'Inter, system-ui, sans-serif',
      weights: ['300', '400', '500', '600'],
      style: 'sans-serif',
      className: 'font-sans'
    },
    body: {
      family: 'Inter, system-ui, sans-serif',
      weights: ['400', '500'],
      style: 'sans-serif',
      className: 'font-sans'
    }
  },

  layout: {
    productCard: {
      style: 'minimal',
      imageRatio: 'portrait',
      textAlignment: 'left',
      spacing: 'relaxed',
      borderRadius: '8px',
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
      style: 'modern',
      logoPosition: 'left',
      navStyle: 'horizontal'
    }
  },

  styling: {
    borderRadius: '8px',
    shadowStyle: 'medium',
    animationStyle: 'smooth'
  },

  customCSS: `
    /* Dark Mode Theme Custom Styles */
    .theme-darkmode {
      background-color: #171717;
      color: #D4D4D8;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    .theme-darkmode .product-card {
      background: rgba(39, 39, 42, 0.5);
      backdrop-filter: blur(8px);
      border: 1px solid rgba(63, 63, 70, 0.5);
      border-radius: 8px;
      transition: all 0.3s ease;
      overflow: hidden;
    }

    .theme-darkmode .product-card:hover {
      transform: scale(1.05);
      border-color: rgba(234, 179, 8, 0.5);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3), 0 0 30px rgba(234, 179, 8, 0.1);
    }

    .theme-darkmode .product-image {
      width: 100%;
      aspect-ratio: 4/5;
      object-fit: cover;
      transition: all 0.3s ease;
    }

    .theme-darkmode .product-card:hover .product-image {
      filter: brightness(1.1);
    }

    .theme-darkmode .product-info {
      padding: 16px;
      background: transparent;
    }

    .theme-darkmode .product-category {
      font-size: 11px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #71717A;
      margin-bottom: 8px;
    }

    .theme-darkmode .product-title {
      font-weight: 600;
      font-size: 18px;
      line-height: 1.4;
      margin-bottom: 8px;
      color: #F4F4F5;
      transition: color 0.3s ease;
    }

    .theme-darkmode .product-card:hover .product-title {
      color: #EAB308;
    }

    .theme-darkmode .product-brand {
      font-size: 13px;
      font-weight: 400;
      color: #71717A;
      margin-bottom: 12px;
    }

    .theme-darkmode .product-price {
      font-weight: 700;
      font-size: 24px;
      color: #EAB308;
    }

    .theme-darkmode .product-price-original {
      font-size: 14px;
      color: #52525B;
      text-decoration: line-through;
      margin-left: 8px;
    }

    .theme-darkmode .store-header {
      background: #000000;
      border-bottom: 1px solid #27272A;
      padding: 16px 0;
      position: sticky;
      top: 0;
      z-index: 50;
      backdrop-filter: blur(10px);
    }

    .theme-darkmode .store-name {
      font-weight: 700;
      font-size: 24px;
      letter-spacing: -0.5px;
      color: #F4F4F5;
    }

    .theme-darkmode .btn-primary {
      background: #EAB308;
      color: #000000;
      border: none;
      padding: 12px 28px;
      font-weight: 600;
      font-size: 14px;
      border-radius: 8px;
      letter-spacing: 0.5px;
      transition: all 0.3s ease;
    }

    .theme-darkmode .btn-primary:hover {
      background: #FDE047;
      transform: translateY(-2px);
      box-shadow: 0 10px 30px rgba(234, 179, 8, 0.3);
    }

    .theme-darkmode .btn-secondary {
      background: transparent;
      color: #D4D4D8;
      border: 1px solid #3F3F46;
      padding: 12px 28px;
      font-weight: 500;
      font-size: 14px;
      border-radius: 8px;
      transition: all 0.3s ease;
    }

    .theme-darkmode .btn-secondary:hover {
      border-color: #EAB308;
      color: #EAB308;
      background: rgba(234, 179, 8, 0.1);
    }

    .theme-darkmode .category-filter button {
      background: rgba(39, 39, 42, 0.7);
      border: 1px solid #3F3F46;
      padding: 10px 20px;
      margin: 0 6px 8px 6px;
      font-size: 13px;
      font-weight: 600;
      color: #A1A1AA;
      border-radius: 999px;
      transition: all 0.3s ease;
    }

    .theme-darkmode .category-filter button:hover {
      border-color: #EAB308;
      color: #EAB308;
      transform: scale(1.05);
    }

    .theme-darkmode .category-filter button.active {
      background: #EAB308;
      border-color: #EAB308;
      color: #000000;
      transform: scale(1.1);
    }

    .theme-darkmode .section-title {
      font-weight: 700;
      font-size: 36px;
      letter-spacing: -1px;
      color: #F4F4F5;
      margin-bottom: 16px;
    }

    .theme-darkmode .section-subtitle {
      font-size: 16px;
      font-weight: 400;
      color: #71717A;
      margin-bottom: 32px;
    }

    .theme-darkmode input,
    .theme-darkmode textarea,
    .theme-darkmode select {
      background: #27272A;
      border: 1px solid #3F3F46;
      color: #D4D4D8;
      border-radius: 8px;
      padding: 12px 16px;
      transition: all 0.3s ease;
    }

    .theme-darkmode input:focus,
    .theme-darkmode textarea:focus,
    .theme-darkmode select:focus {
      outline: none;
      border-color: #EAB308;
      box-shadow: 0 0 0 3px rgba(234, 179, 8, 0.1);
    }

    .theme-darkmode input::placeholder,
    .theme-darkmode textarea::placeholder {
      color: #52525B;
    }

    .theme-darkmode .badge {
      background: #EAB308;
      color: #000000;
      padding: 4px 12px;
      border-radius: 6px;
      font-size: 12px;
      font-weight: 600;
      letter-spacing: 0.5px;
    }

    .theme-darkmode .badge-secondary {
      background: #27272A;
      color: #D4D4D8;
      border: 1px solid #3F3F46;
    }

    /* Scrollbar styling */
    .theme-darkmode ::-webkit-scrollbar {
      width: 8px;
      height: 8px;
    }

    .theme-darkmode ::-webkit-scrollbar-track {
      background: #27272A;
    }

    .theme-darkmode ::-webkit-scrollbar-thumb {
      background: #3F3F46;
      border-radius: 4px;
    }

    .theme-darkmode ::-webkit-scrollbar-thumb:hover {
      background: #52525B;
    }

    /* Glow effects */
    .theme-darkmode .glow-golden {
      box-shadow: 0 0 20px rgba(234, 179, 8, 0.2);
    }

    .theme-darkmode .glow-golden:hover {
      box-shadow: 0 0 30px rgba(234, 179, 8, 0.4);
    }

    /* Smooth transitions */
    .theme-darkmode * {
      transition-property: background-color, border-color, color, fill, stroke, opacity, box-shadow, transform;
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
      transition-duration: 300ms;
    }
  `
}
