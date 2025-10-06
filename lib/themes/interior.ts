import { ProfessionalTheme, CustomColors } from './types'
import { generateThemeColors } from './color-generator'

export const INTERIOR_THEME: ProfessionalTheme = {
  id: 'interior',
  name: 'Interior',
  description: 'Diseño elegante para tiendas de hogar y decoración con animaciones profesionales',
  category: 'classic',
  preview: '/themes/interior-preview.png',

  generateColors: (customColors: CustomColors) => {
    const generated = generateThemeColors(customColors)

    return {
      ...generated,
      // Paleta de interiores cálida y elegante
      background: '#FDFAF6', // Beige muy claro cálido
      surface: '#FFFFFF',
      border: '#E8DFD6', // Beige suave
      borderLight: '#F5F0EA',
      textMuted: '#9B8B7E', // Marrón grisáceo
      text: '#3E3832', // Marrón oscuro cálido
      textStrong: '#2A2520', // Casi negro marrón
      primary: customColors.primary || '#8B7355', // Marrón cálido
      primaryDark: '#6B5840', // Marrón más oscuro
      primaryLight: '#A89885', // Marrón claro
      secondary: customColors.secondary || '#9CAF88', // Verde salvia
      accent: '#C9A66B', // Dorado suave
    }
  },

  typography: {
    primary: {
      family: 'Playfair Display, Georgia, serif',
      weights: ['400', '500', '600', '700'],
      style: 'serif',
      className: 'font-playfair'
    },
    secondary: {
      family: 'Lato, -apple-system, sans-serif',
      weights: ['300', '400', '500', '600'],
      style: 'sans-serif',
      className: 'font-lato'
    },
    body: {
      family: 'Lato, -apple-system, sans-serif',
      weights: ['300', '400'],
      style: 'sans-serif',
      className: 'font-lato'
    }
  },

  layout: {
    productCard: {
      style: 'classic',
      imageRatio: 'square',
      textAlignment: 'center',
      spacing: 'normal',
      borderRadius: '4px',
      showBrand: true,
      showCategory: false,
      priceStyle: 'prominent'
    },
    grid: {
      columns: {
        mobile: 1,
        tablet: 2,
        desktop: 4
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
    animationStyle: 'smooth'
  },

  customCSS: `
    /* Interior Theme Custom Styles */
    .theme-interior {
      font-feature-settings: "liga" 1, "kern" 1;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    /* Animaciones profesionales */
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }

    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes scaleIn {
      from {
        opacity: 0;
        transform: scale(0.95);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    .theme-interior .animate-fade-in-up {
      animation: fadeInUp 0.6s ease-out forwards;
    }

    .theme-interior .animate-fade-in {
      animation: fadeIn 0.8s ease-out forwards;
    }

    .theme-interior .animate-slide-in-left {
      animation: slideInLeft 0.6s ease-out forwards;
    }

    .theme-interior .animate-scale-in {
      animation: scaleIn 0.5s ease-out forwards;
    }

    /* Staggered animations */
    .theme-interior .stagger-1 { animation-delay: 0.1s; }
    .theme-interior .stagger-2 { animation-delay: 0.2s; }
    .theme-interior .stagger-3 { animation-delay: 0.3s; }
    .theme-interior .stagger-4 { animation-delay: 0.4s; }

    /* Product Card */
    .theme-interior .product-card {
      background: white;
      border: 1px solid #E8DFD6;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }

    .theme-interior .product-card:hover {
      border-color: #8B7355;
      box-shadow: 0 12px 24px rgba(62, 56, 50, 0.1);
      transform: translateY(-8px);
    }

    .theme-interior .product-image-wrapper {
      position: relative;
      overflow: hidden;
      background: #F5F0EA;
    }

    .theme-interior .product-image {
      transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
    }

    .theme-interior .product-card:hover .product-image {
      transform: scale(1.08);
    }

    /* Overlay suave */
    .theme-interior .product-overlay {
      position: absolute;
      inset: 0;
      background: linear-gradient(to top, rgba(42, 37, 32, 0.7), transparent);
      opacity: 0;
      transition: opacity 0.4s ease;
    }

    .theme-interior .product-card:hover .product-overlay {
      opacity: 1;
    }

    /* Header */
    .theme-interior .store-header {
      background: white;
      border-bottom: 1px solid #E8DFD6;
      padding: 24px 0;
      transition: all 0.3s ease;
    }

    .theme-interior .store-name {
      font-family: 'Playfair Display', serif;
      font-weight: 600;
      font-size: 32px;
      letter-spacing: 1px;
      color: #2A2520;
      text-transform: uppercase;
    }

    /* Buttons */
    .theme-interior .btn-primary {
      background: #8B7355;
      color: white;
      border: none;
      padding: 14px 32px;
      font-family: 'Lato', sans-serif;
      font-weight: 500;
      font-size: 14px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }

    .theme-interior .btn-primary::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s ease;
    }

    .theme-interior .btn-primary:hover::before {
      left: 100%;
    }

    .theme-interior .btn-primary:hover {
      background: #6B5840;
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(139, 115, 85, 0.3);
    }

    .theme-interior .btn-secondary {
      background: transparent;
      color: #8B7355;
      border: 2px solid #8B7355;
      padding: 12px 30px;
      font-family: 'Lato', sans-serif;
      font-weight: 500;
      font-size: 14px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      transition: all 0.3s ease;
    }

    .theme-interior .btn-secondary:hover {
      background: #8B7355;
      color: white;
      transform: translateY(-2px);
    }

    /* Typography */
    .theme-interior h1,
    .theme-interior h2,
    .theme-interior h3 {
      font-family: 'Playfair Display', serif;
      color: #2A2520;
      font-weight: 600;
    }

    .theme-interior .section-title {
      font-size: 42px;
      letter-spacing: 1px;
      margin-bottom: 16px;
      text-align: center;
      position: relative;
      padding-bottom: 20px;
    }

    .theme-interior .section-title::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 2px;
      background: #C9A66B;
    }

    .theme-interior .section-subtitle {
      font-family: 'Lato', sans-serif;
      font-size: 16px;
      color: #9B8B7E;
      text-align: center;
      margin-bottom: 48px;
      font-weight: 300;
    }

    /* Category filters */
    .theme-interior .category-filter button {
      background: transparent;
      border: none;
      padding: 10px 20px;
      font-family: 'Lato', sans-serif;
      font-size: 14px;
      font-weight: 500;
      color: #9B8B7E;
      text-transform: uppercase;
      letter-spacing: 1px;
      transition: all 0.3s ease;
      position: relative;
    }

    .theme-interior .category-filter button::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 0;
      height: 2px;
      background: #8B7355;
      transition: width 0.3s ease;
    }

    .theme-interior .category-filter button:hover::after,
    .theme-interior .category-filter button.active::after {
      width: 100%;
    }

    .theme-interior .category-filter button:hover,
    .theme-interior .category-filter button.active {
      color: #8B7355;
    }

    /* Inputs */
    .theme-interior input,
    .theme-interior textarea,
    .theme-interior select {
      background: white;
      border: 1px solid #E8DFD6;
      color: #3E3832;
      font-family: 'Lato', sans-serif;
      padding: 12px 16px;
      transition: all 0.3s ease;
    }

    .theme-interior input:focus,
    .theme-interior textarea:focus,
    .theme-interior select:focus {
      outline: none;
      border-color: #8B7355;
      box-shadow: 0 0 0 3px rgba(139, 115, 85, 0.1);
    }

    /* Smooth transitions */
    .theme-interior * {
      transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    }

    /* Spacing */
    .theme-interior section {
      margin-bottom: 96px;
    }

    /* Dividers */
    .theme-interior .divider {
      height: 1px;
      background: linear-gradient(to right, transparent, #E8DFD6, transparent);
      margin: 48px 0;
    }
  `
}
