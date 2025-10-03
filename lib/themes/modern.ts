import { ProfessionalTheme, CustomColors } from './types'
import { generateThemeColors } from './color-generator'

export const MODERN_THEME: ProfessionalTheme = {
  id: 'modern',
  name: 'Modern',
  description: 'Diseño contemporáneo con tipografía geométrica y layouts dinámicos',
  category: 'modern',
  preview: '/themes/modern-preview.png',

  generateColors: (customColors: CustomColors) => {
    const generated = generateThemeColors(customColors)

    return {
      ...generated,
      // Override para estética moderna
      background: '#FAFBFC',
      surface: '#FFFFFF',
      border: '#E1E8ED',
      borderLight: '#F0F3F6',
      textMuted: '#6B7280',
      text: '#111827',
    }
  },

  typography: {
    primary: {
      family: 'Poppins, -apple-system, BlinkMacSystemFont, sans-serif',
      weights: ['300', '400', '500', '600', '700'],
      style: 'sans-serif',
      className: 'font-poppins'
    },
    secondary: {
      family: 'Space Grotesk, Helvetica, sans-serif',
      weights: ['300', '400', '500', '600'],
      style: 'sans-serif',
      className: 'font-space-grotesk'
    },
    body: {
      family: 'Space Grotesk, Helvetica, sans-serif',
      weights: ['300', '400'],
      style: 'sans-serif',
      className: 'font-space-grotesk'
    }
  },

  layout: {
    productCard: {
      style: 'modern',
      imageRatio: 'square',
      textAlignment: 'left',
      spacing: 'normal',
      borderRadius: '12px',
      showBrand: true,
      showCategory: true,
      priceStyle: 'prominent'
    },
    grid: {
      columns: {
        mobile: 2,
        tablet: 3,
        desktop: 4
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
    borderRadius: '12px',
    shadowStyle: 'medium',
    animationStyle: 'smooth'
  },

  customCSS: `
    /* Modern Theme Custom Styles */
    .theme-modern {
      font-feature-settings: "cv01" 1, "cv02" 1, "cv03" 1;
      -webkit-font-smoothing: antialiased;
    }

    .theme-modern .product-card {
      background: white;
      border: none;
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }

    .theme-modern .product-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
    }

    .theme-modern .product-image {
      width: 100%;
      height: 280px;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .theme-modern .product-card:hover .product-image {
      transform: scale(1.05);
    }

    .theme-modern .product-info {
      padding: 20px;
      position: relative;
    }

    .theme-modern .product-category {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 12px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: var(--color-primary);
      background: rgba(var(--color-primary-rgb), 0.1);
      padding: 4px 8px;
      border-radius: 6px;
      display: inline-block;
      margin-bottom: 12px;
    }

    .theme-modern .product-title {
      font-family: 'Poppins', sans-serif;
      font-weight: 500;
      font-size: 18px;
      line-height: 1.4;
      margin-bottom: 8px;
      color: #111827;
    }

    .theme-modern .product-brand {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 14px;
      font-weight: 400;
      color: #6B7280;
      margin-bottom: 12px;
    }

    .theme-modern .product-price {
      font-family: 'Poppins', sans-serif;
      font-weight: 600;
      font-size: 20px;
      color: #111827;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .theme-modern .product-price::before {
      content: '';
      width: 4px;
      height: 20px;
      background: var(--color-primary);
      border-radius: 2px;
    }

    .theme-modern .store-header {
      background: rgba(255, 255, 255, 0.95);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid #E1E8ED;
      padding: 20px 0;
    }

    .theme-modern .store-name {
      font-family: 'Poppins', sans-serif;
      font-weight: 600;
      font-size: 28px;
      letter-spacing: -0.5px;
      color: #111827;
    }

    .theme-modern .store-description {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 16px;
      font-weight: 400;
      color: #6B7280;
      margin-top: 8px;
    }

    .theme-modern .btn-primary {
      background: linear-gradient(135deg, var(--color-primary), var(--color-primary-dark));
      color: white;
      border: none;
      padding: 14px 28px;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 500;
      font-size: 14px;
      border-radius: 8px;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }

    .theme-modern .btn-primary::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s ease;
    }

    .theme-modern .btn-primary:hover::before {
      left: 100%;
    }

    .theme-modern .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(var(--color-primary-rgb), 0.4);
    }

    .theme-modern .category-filter {
      display: flex;
      gap: 12px;
      justify-content: center;
      margin: 40px 0;
      flex-wrap: wrap;
    }

    .theme-modern .category-filter button {
      background: white;
      border: 2px solid #E1E8ED;
      padding: 10px 20px;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 14px;
      font-weight: 500;
      color: #6B7280;
      border-radius: 25px;
      transition: all 0.3s ease;
    }

    .theme-modern .category-filter button:hover,
    .theme-modern .category-filter button.active {
      background: var(--color-primary);
      border-color: var(--color-primary);
      color: white;
      transform: scale(1.05);
    }

    .theme-modern .product-grid {
      gap: 24px;
      margin-top: 48px;
    }

    .theme-modern .section-title {
      font-family: 'Poppins', sans-serif;
      font-weight: 600;
      font-size: 36px;
      letter-spacing: -1px;
      text-align: center;
      margin-bottom: 16px;
      color: #111827;
      background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .theme-modern .section-subtitle {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 18px;
      font-weight: 400;
      text-align: center;
      color: #6B7280;
      margin-bottom: 48px;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    /* Geometric elements */
    .theme-modern section {
      margin-bottom: 80px;
      position: relative;
    }

    .theme-modern section::before {
      content: '';
      position: absolute;
      top: -20px;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 4px;
      background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
      border-radius: 2px;
    }

    /* Responsive grid enhancements */
    @media (min-width: 768px) {
      .theme-modern .product-grid {
        grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      }
    }

    /* Loading animation */
    .theme-modern .product-card.loading {
      animation: modernShimmer 1.5s infinite;
    }

    @keyframes modernShimmer {
      0% { opacity: 1; }
      50% { opacity: 0.7; }
      100% { opacity: 1; }
    }
  `
}