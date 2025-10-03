import { ProfessionalTheme, CustomColors } from './types'
import { generateThemeColors } from './color-generator'

export const CREATIVE_THEME: ProfessionalTheme = {
  id: 'creative',
  name: 'Creative',
  description: 'Diseño experimental con tipografía expresiva y layouts únicos',
  category: 'creative',
  preview: '/themes/creative-preview.png',

  generateColors: (customColors: CustomColors) => {
    const generated = generateThemeColors(customColors)

    return {
      ...generated,
      // Override para estética creativa
      background: '#FFFEF9',
      surface: '#FFFFFF',
      border: '#E0E7FF',
      borderLight: '#F0F4FF',
      textMuted: '#64748B',
      text: '#0F172A',
    }
  },

  typography: {
    primary: {
      family: 'Fraunces, Georgia, serif',
      weights: ['400', '500', '700', '900'],
      style: 'display',
      className: 'font-fraunces'
    },
    secondary: {
      family: 'JetBrains Mono, Consolas, monospace',
      weights: ['300', '400', '500', '600'],
      style: 'sans-serif',
      className: 'font-jetbrains'
    },
    body: {
      family: 'IBM Plex Sans, Helvetica, sans-serif',
      weights: ['300', '400', '500'],
      style: 'sans-serif',
      className: 'font-ibm-plex'
    }
  },

  layout: {
    productCard: {
      style: 'creative',
      imageRatio: 'landscape',
      textAlignment: 'left',
      spacing: 'loose',
      borderRadius: '16px',
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
      gap: 'xl'
    },
    header: {
      style: 'creative',
      logoPosition: 'left',
      navStyle: 'minimal'
    }
  },

  styling: {
    borderRadius: '16px',
    shadowStyle: 'dramatic',
    animationStyle: 'playful'
  },

  customCSS: `
    /* Creative Theme Custom Styles */
    .theme-creative {
      font-feature-settings: "ss01" 1, "ss02" 1, "cv01" 1;
      -webkit-font-smoothing: antialiased;
    }

    .theme-creative .product-card {
      background: white;
      border: 2px solid transparent;
      border-radius: 16px;
      overflow: hidden;
      transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
      position: relative;
      transform-origin: center;
    }

    .theme-creative .product-card::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(45deg, var(--color-primary), var(--color-secondary), var(--color-accent));
      border-radius: 18px;
      z-index: -1;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .theme-creative .product-card:hover::before {
      opacity: 1;
    }

    .theme-creative .product-card:hover {
      transform: rotate(-1deg) scale(1.02);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
    }

    .theme-creative .product-card:nth-child(2n):hover {
      transform: rotate(1deg) scale(1.02);
    }

    .theme-creative .product-image {
      width: 100%;
      height: 250px;
      object-fit: cover;
      transition: all 0.4s ease;
      filter: saturate(0.8) contrast(1.1);
    }

    .theme-creative .product-card:hover .product-image {
      filter: saturate(1.2) contrast(1.2);
      transform: scale(1.1);
    }

    .theme-creative .product-info {
      padding: 24px;
      background: white;
      position: relative;
    }

    .theme-creative .product-category {
      font-family: 'JetBrains Mono', monospace;
      font-size: 10px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: white;
      background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
      padding: 6px 12px;
      border-radius: 12px;
      display: inline-block;
      margin-bottom: 12px;
      transform: rotate(-2deg);
    }

    .theme-creative .product-title {
      font-family: 'Fraunces', serif;
      font-weight: 700;
      font-size: 20px;
      line-height: 1.3;
      margin-bottom: 8px;
      color: #0F172A;
      font-variation-settings: "SOFT" 100, "WONK" 1;
    }

    .theme-creative .product-brand {
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 13px;
      font-weight: 400;
      color: #64748B;
      margin-bottom: 16px;
      position: relative;
    }

    .theme-creative .product-brand::before {
      content: '◆';
      color: var(--color-accent);
      margin-right: 8px;
      font-size: 8px;
    }

    .theme-creative .product-price {
      font-family: 'JetBrains Mono', monospace;
      font-weight: 600;
      font-size: 18px;
      color: var(--color-primary);
      background: rgba(var(--color-primary-rgb), 0.1);
      padding: 8px 16px;
      border-radius: 20px;
      display: inline-block;
      border: 2px dashed var(--color-primary);
      transform: rotate(1deg);
    }

    .theme-creative .store-header {
      background: linear-gradient(135deg, #FFFEF9 0%, #F0F4FF 100%);
      border-bottom: 3px solid var(--color-primary);
      padding: 32px 0;
      position: relative;
      overflow: hidden;
    }

    .theme-creative .store-header::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23E0E7FF' fill-opacity='0.3'%3E%3Ccircle cx='30' cy='30' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
      opacity: 0.5;
    }

    .theme-creative .store-name {
      font-family: 'Fraunces', serif;
      font-weight: 900;
      font-size: 36px;
      letter-spacing: -1px;
      color: #0F172A;
      position: relative;
      z-index: 1;
      font-variation-settings: "SOFT" 0, "WONK" 1;
      transform: rotate(-1deg);
      display: inline-block;
    }

    .theme-creative .store-description {
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 16px;
      font-weight: 400;
      color: #64748B;
      margin-top: 16px;
      position: relative;
      z-index: 1;
    }

    .theme-creative .btn-primary {
      background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
      color: white;
      border: none;
      padding: 16px 32px;
      font-family: 'IBM Plex Sans', sans-serif;
      font-weight: 500;
      font-size: 14px;
      text-transform: uppercase;
      letter-spacing: 1px;
      border-radius: 25px;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      position: relative;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(var(--color-primary-rgb), 0.3);
    }

    .theme-creative .btn-primary::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      background: rgba(255, 255, 255, 0.3);
      transition: all 0.3s ease;
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }

    .theme-creative .btn-primary:hover::before {
      width: 300px;
      height: 300px;
    }

    .theme-creative .btn-primary:hover {
      transform: translateY(-3px) rotate(2deg);
      box-shadow: 0 8px 25px rgba(var(--color-primary-rgb), 0.4);
    }

    .theme-creative .category-filter {
      display: flex;
      gap: 16px;
      justify-content: center;
      margin: 48px 0;
      flex-wrap: wrap;
    }

    .theme-creative .category-filter button {
      background: white;
      border: 2px solid var(--color-border);
      padding: 12px 24px;
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px;
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 1px;
      color: #64748B;
      border-radius: 20px;
      transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
      position: relative;
    }

    .theme-creative .category-filter button:hover {
      transform: rotate(-2deg) scale(1.05);
    }

    .theme-creative .category-filter button:nth-child(even):hover {
      transform: rotate(2deg) scale(1.05);
    }

    .theme-creative .category-filter button.active {
      background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
      border-color: transparent;
      color: white;
      transform: rotate(-1deg);
    }

    .theme-creative .product-grid {
      gap: 32px;
      margin-top: 56px;
    }

    .theme-creative .section-title {
      font-family: 'Fraunces', serif;
      font-weight: 900;
      font-size: 48px;
      letter-spacing: -2px;
      text-align: center;
      margin-bottom: 16px;
      color: #0F172A;
      font-variation-settings: "SOFT" 0, "WONK" 1;
      position: relative;
      transform: rotate(-1deg);
      display: inline-block;
      width: 100%;
    }

    .theme-creative .section-title::after {
      content: '';
      position: absolute;
      bottom: -8px;
      left: 50%;
      transform: translateX(-50%) rotate(2deg);
      width: 60%;
      height: 8px;
      background: linear-gradient(90deg, var(--color-primary), var(--color-secondary));
      border-radius: 4px;
      opacity: 0.7;
    }

    .theme-creative .section-subtitle {
      font-family: 'IBM Plex Sans', sans-serif;
      font-size: 18px;
      font-weight: 400;
      text-align: center;
      color: #64748B;
      margin-bottom: 56px;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    /* Playful animations */
    .theme-creative section {
      margin-bottom: 96px;
    }

    .theme-creative .floating-element {
      animation: float 6s ease-in-out infinite;
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      33% { transform: translateY(-10px) rotate(1deg); }
      66% { transform: translateY(-5px) rotate(-1deg); }
    }

    /* Masonry-like grid on larger screens */
    @media (min-width: 1024px) {
      .theme-creative .product-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 32px;
        align-items: start;
      }

      .theme-creative .product-card:nth-child(3n+1) {
        margin-top: 40px;
      }

      .theme-creative .product-card:nth-child(3n+3) {
        margin-top: 20px;
      }
    }

    /* Interactive elements */
    .theme-creative .interactive:hover {
      cursor: pointer;
      animation: wiggle 0.5s ease-in-out;
    }

    @keyframes wiggle {
      0%, 100% { transform: rotate(0deg); }
      25% { transform: rotate(-2deg); }
      75% { transform: rotate(2deg); }
    }
  `
}