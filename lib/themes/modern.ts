import { ProfessionalTheme, CustomColors } from './types'
import { generateThemeColors } from './color-generator'

export const MODERN_THEME: ProfessionalTheme = {
  id: 'modern',
  name: 'Modern',
  description: 'Diseño contemporáneo con tipografía geométrica y layouts dinámicos',
  category: 'modern',
  preview: '/themes/modern-preview.png',

  generateColors: (customColors: CustomColors) => {
    return {
      // Paleta profesional elegante - Gris oscuro con dorado sutil
      background: '#0F0F0F', // Negro suave profesional
      surface: '#1A1A1A', // Superficie gris oscuro
      border: '#2A2A2A', // Bordes sutiles
      borderLight: '#1F1F1F',

      primary: customColors.primary || '#D4AF37', // Dorado elegante
      primaryHover: '#E5C158',
      primaryDark: '#B8941F',
      primaryLight: '#F0D97D',

      secondary: customColors.secondary || '#6B7280', // Gris medio
      secondaryHover: '#9CA3AF',
      secondaryDark: '#4B5563',
      secondaryLight: '#D1D5DB',

      accent: '#D4AF37', // Dorado para CTAs
      accentLight: '#E5C158',
      accentDark: '#B8941F',

      text: '#F5F5F5', // Texto casi blanco
      textMuted: '#A3A3A3', // Texto gris medio
      textLight: '#E5E5E5',

      success: '#10B981',
      successBg: 'rgba(16, 185, 129, 0.1)',
      warning: '#F59E0B',
      warningBg: 'rgba(245, 158, 11, 0.1)',
      error: '#EF4444',
      errorBg: 'rgba(239, 68, 68, 0.1)',
      info: '#D4AF37',
      infoBg: 'rgba(212, 175, 55, 0.1)',
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
    /* Modern Tech Theme - Elegante con Dorado */
    .theme-modern {
      font-feature-settings: "cv01" 1, "cv02" 1, "cv03" 1;
      -webkit-font-smoothing: antialiased;
      background: #0F0F0F;
      color: #F5F5F5;
    }

    /* Animaciones sutiles */
    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(12px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    .theme-modern .animate-fade-in-up {
      animation: fadeInUp 0.4s ease-out forwards;
      opacity: 0;
    }

    .theme-modern .animate-fade-in {
      animation: fadeIn 0.3s ease-out forwards;
      opacity: 0;
    }

    .theme-modern .stagger-1 { animation-delay: 0.05s; }
    .theme-modern .stagger-2 { animation-delay: 0.1s; }
    .theme-modern .stagger-3 { animation-delay: 0.15s; }
    .theme-modern .stagger-4 { animation-delay: 0.2s; }

    .theme-modern .product-card {
      background: #1A1A1A;
      border: 1px solid #2A2A2A;
      border-radius: 12px;
      overflow: hidden;
      transition: all 0.3s ease;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.4);
      position: relative;
    }

    .theme-modern .product-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5), 0 0 20px rgba(212, 175, 55, 0.1);
      border-color: #D4AF37;
    }

    .theme-modern .product-image {
      width: 100%;
      height: 280px;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .theme-modern .product-card:hover .product-image {
      transform: scale(1.03);
    }

    .theme-modern .product-info {
      padding: 20px;
      position: relative;
    }

    .theme-modern .product-category {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      color: #D4AF37;
      background: rgba(212, 175, 55, 0.1);
      border: 1px solid rgba(212, 175, 55, 0.2);
      padding: 5px 10px;
      border-radius: 6px;
      display: inline-block;
      margin-bottom: 12px;
      transition: all 0.2s ease;
    }

    .theme-modern .product-card:hover .product-category {
      background: rgba(212, 175, 55, 0.15);
      border-color: rgba(212, 175, 55, 0.3);
    }

    .theme-modern .product-title {
      font-family: 'Poppins', sans-serif;
      font-weight: 600;
      font-size: 17px;
      line-height: 1.4;
      margin-bottom: 8px;
      color: #F5F5F5;
      transition: color 0.2s ease;
    }

    .theme-modern .product-card:hover .product-title {
      color: #E5C158;
    }

    .theme-modern .product-brand {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 13px;
      font-weight: 400;
      color: #A3A3A3;
      margin-bottom: 14px;
    }

    .theme-modern .product-price {
      font-family: 'Poppins', sans-serif;
      font-weight: 700;
      font-size: 20px;
      color: #F5F5F5;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .theme-modern .product-price::before {
      content: '';
      width: 3px;
      height: 20px;
      background: #D4AF37;
      border-radius: 2px;
    }

    .theme-modern .store-header {
      background: rgba(15, 15, 15, 0.98);
      backdrop-filter: blur(12px);
      border-bottom: 1px solid #2A2A2A;
      padding: 18px 0;
      box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
    }

    .theme-modern .store-name {
      font-family: 'Poppins', sans-serif;
      font-weight: 700;
      font-size: 26px;
      letter-spacing: -0.3px;
      color: #F5F5F5;
    }

    .theme-modern .store-description {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 15px;
      font-weight: 400;
      color: #A3A3A3;
      margin-top: 6px;
    }

    .theme-modern .btn-primary {
      background: #D4AF37;
      color: #0F0F0F;
      border: none;
      padding: 12px 28px;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 600;
      font-size: 14px;
      border-radius: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      transition: all 0.2s ease;
      box-shadow: 0 2px 8px rgba(212, 175, 55, 0.3);
    }

    .theme-modern .btn-primary:hover {
      background: #E5C158;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(212, 175, 55, 0.4);
    }

    .theme-modern .btn-secondary {
      background: transparent;
      color: #D4AF37;
      border: 1px solid #D4AF37;
      padding: 12px 28px;
      font-family: 'Space Grotesk', sans-serif;
      font-weight: 600;
      font-size: 14px;
      border-radius: 8px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      transition: all 0.2s ease;
    }

    .theme-modern .btn-secondary:hover {
      background: rgba(212, 175, 55, 0.1);
      border-color: #E5C158;
      color: #E5C158;
    }

    .theme-modern .category-filter {
      display: flex;
      gap: 10px;
      justify-content: center;
      margin: 32px 0;
      flex-wrap: wrap;
    }

    .theme-modern .category-filter button {
      background: #1A1A1A;
      border: 1px solid #2A2A2A;
      padding: 10px 20px;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 13px;
      font-weight: 600;
      color: #A3A3A3;
      border-radius: 20px;
      text-transform: uppercase;
      letter-spacing: 0.3px;
      transition: all 0.2s ease;
    }

    .theme-modern .category-filter button:hover {
      background: #242424;
      border-color: #D4AF37;
      color: #E5C158;
    }

    .theme-modern .category-filter button.active {
      background: #D4AF37;
      border-color: #D4AF37;
      color: #0F0F0F;
    }

    .theme-modern .product-grid {
      gap: 24px;
      margin-top: 48px;
    }

    .theme-modern .section-title {
      font-family: 'Poppins', sans-serif;
      font-weight: 700;
      font-size: 36px;
      letter-spacing: -1px;
      text-align: center;
      margin-bottom: 12px;
      color: #F5F5F5;
    }

    .theme-modern .section-subtitle {
      font-family: 'Space Grotesk', sans-serif;
      font-size: 16px;
      font-weight: 400;
      text-align: center;
      color: #A3A3A3;
      margin-bottom: 40px;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
      line-height: 1.6;
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