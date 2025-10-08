import { Store } from './types'
import { MODERN_THEME } from './themes/modern'
import { INTERIOR_THEME } from './themes/interior'

// Mock stores con datos completos según StoreEntity del backend
export const MOCK_STORES: Store[] = [
  // TIENDA 1: TechVision (Tecnología - Tema Modern)
  {
    id: '1',
    slug: 'techvision',
    name: 'TechVision',
    description: 'Tu destino para la tecnología más innovadora y de vanguardia',

    // Branding
    logoUrl: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400',
    bannerUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200',
    faviconUrl: undefined,

    // Contenido de secciones
    aboutUs: 'En TechVision, nos dedicamos a ofrecer productos de tecnología de la más alta calidad. Con más de 5 años de experiencia en el mercado, hemos construido relaciones sólidas con las mejores marcas del mundo tech. Nuestra misión es democratizar el acceso a la tecnología premium, ofreciendo productos innovadores con precios competitivos y un servicio al cliente excepcional.',
    heroTitle: 'Explora el Futuro de la Tecnología',

    // Información de contacto
    phone: '+57 300 123 4567',
    email: 'contacto@techvision.com',
    address: 'Calle 100 #15-30, Centro Comercial Andino',
    city: 'Bogotá',

    // Redes sociales
    facebookUrl: 'https://facebook.com/techvision',
    instagramUrl: 'https://instagram.com/techvision',
    whatsappNumber: '573001234567',

    // Features/Beneficios
    features: [
      {
        icon: 'Zap',
        title: 'Envío Express',
        description: '24-48 horas'
      },
      {
        icon: 'Shield',
        title: 'Garantía Total',
        description: '2 años de cobertura'
      },
      {
        icon: 'Truck',
        title: 'Envío Gratis',
        description: 'Pedidos desde $100.000'
      },
      {
        icon: 'HeadphonesIcon',
        title: 'Soporte 24/7',
        description: 'Siempre disponibles'
      }
    ],

    // Configuración
    category: 'tecnologia',
    themeId: 'modern',
    currency: 'COP',
    isActive: true,

    // Legacy fields
    theme: MODERN_THEME.generateTheme({ primary: '#D4AF37', secondary: '#6B7280' }),
    user: {
      id: 'user-1',
      name: 'Juan Pérez',
      email: 'juan@techvision.com',
      createdAt: new Date('2023-01-15'),
      updatedAt: new Date()
    },
    contact: {
      phone: '+57 300 123 4567',
      email: 'contacto@techvision.com',
      address: 'Calle 100 #15-30, Centro Comercial Andino',
      whatsapp: '573001234567'
    },
    stats: {
      totalProducts: 150,
      totalOrders: 1250,
      totalViews: 45000
    },
    createdAt: new Date('2023-01-15'),
    updatedAt: new Date(),
    professionalTheme: {
      themeId: 'modern',
      customColors: {
        primary: '#D4AF37',
        secondary: '#6B7280'
      }
    }
  },

  // TIENDA 2: Hogar Elegante (Hogar - Tema Interior)
  {
    id: '2',
    slug: 'hogar-elegante',
    name: 'Hogar Elegante',
    description: 'Transforma tu espacio con muebles y decoración de alta calidad',

    // Branding
    logoUrl: 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=400',
    bannerUrl: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200',
    faviconUrl: undefined,

    // Contenido de secciones
    aboutUs: 'Hogar Elegante nace de la pasión por crear espacios únicos y acogedores. Cada pieza de nuestra colección ha sido cuidadosamente seleccionada para combinar funcionalidad, estética y durabilidad. Trabajamos con artesanos locales y fabricantes internacionales para ofrecerte muebles que transformarán tu hogar en un refugio de estilo y confort.',
    heroTitle: 'Diseña el Hogar de tus Sueños',

    // Información de contacto
    phone: '+57 310 987 6543',
    email: 'info@hogarelegante.com',
    address: 'Carrera 15 #85-40, Local 205',
    city: 'Medellín',

    // Redes sociales
    facebookUrl: 'https://facebook.com/hogarelegante',
    instagramUrl: 'https://instagram.com/hogarelegante',
    whatsappNumber: '573109876543',

    // Features/Beneficios
    features: [
      {
        icon: 'Home',
        title: 'Diseño Personalizado',
        description: 'Adaptamos cada pieza a tu estilo'
      },
      {
        icon: 'Truck',
        title: 'Instalación Gratis',
        description: 'En toda la ciudad'
      },
      {
        icon: 'Award',
        title: 'Calidad Premium',
        description: 'Materiales de primera'
      },
      {
        icon: 'Clock',
        title: 'Entrega Rápida',
        description: '5-7 días hábiles'
      }
    ],

    // Configuración
    category: 'hogar',
    themeId: 'interior',
    currency: 'COP',
    isActive: true,

    // Legacy fields
    theme: INTERIOR_THEME.generateTheme({ primary: '#8B7355', secondary: '#F5F5DC' }),
    user: {
      id: 'user-2',
      name: 'María González',
      email: 'maria@hogarelegante.com',
      createdAt: new Date('2023-03-20'),
      updatedAt: new Date()
    },
    contact: {
      phone: '+57 310 987 6543',
      email: 'info@hogarelegante.com',
      address: 'Carrera 15 #85-40, Local 205',
      whatsapp: '573109876543'
    },
    stats: {
      totalProducts: 85,
      totalOrders: 680,
      totalViews: 28000
    },
    createdAt: new Date('2023-03-20'),
    updatedAt: new Date(),
    professionalTheme: {
      themeId: 'interior',
      customColors: {
        primary: '#8B7355',
        secondary: '#F5F5DC'
      }
    }
  },

  // TIENDA 3: StyleHub (Moda - Tema Modern adaptado)
  {
    id: '3',
    slug: 'stylehub',
    name: 'StyleHub',
    description: 'Moda urbana y tendencias que definen tu estilo',

    // Branding
    logoUrl: 'https://images.unsplash.com/photo-1558769132-cb1aea41f39e?w=400',
    bannerUrl: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200',
    faviconUrl: undefined,

    // Contenido de secciones
    aboutUs: 'StyleHub es más que una tienda de ropa, es un movimiento que celebra la individualidad y la expresión personal. Curamos las últimas tendencias internacionales y las mezclamos con diseño local para crear colecciones únicas. Nuestro compromiso es con la moda sostenible y la calidad que perdura más allá de las temporadas.',
    heroTitle: 'Define Tu Estilo, Expresa Tu Esencia',

    // Información de contacto
    phone: '+57 320 555 7890',
    email: 'hola@stylehub.co',
    address: 'Zona Rosa, Calle 81 #11-45',
    city: 'Bogotá',

    // Redes sociales
    facebookUrl: 'https://facebook.com/stylehub',
    instagramUrl: 'https://instagram.com/stylehub',
    whatsappNumber: '573205557890',

    // Features/Beneficios
    features: [
      {
        icon: 'Sparkles',
        title: 'Nuevas Colecciones',
        description: 'Cada semana'
      },
      {
        icon: 'RefreshCw',
        title: 'Cambios Fáciles',
        description: '30 días de garantía'
      },
      {
        icon: 'CreditCard',
        title: 'Pago Flexible',
        description: 'Hasta en 6 cuotas'
      },
      {
        icon: 'Star',
        title: 'Programa VIP',
        description: 'Beneficios exclusivos'
      }
    ],

    // Configuración
    category: 'moda',
    themeId: 'modern',
    currency: 'COP',
    isActive: true,

    // Legacy fields
    theme: MODERN_THEME.generateTheme({ primary: '#E85D75', secondary: '#2C3E50' }),
    user: {
      id: 'user-3',
      name: 'Carolina Restrepo',
      email: 'carolina@stylehub.co',
      createdAt: new Date('2023-05-10'),
      updatedAt: new Date()
    },
    contact: {
      phone: '+57 320 555 7890',
      email: 'hola@stylehub.co',
      address: 'Zona Rosa, Calle 81 #11-45',
      whatsapp: '573205557890'
    },
    stats: {
      totalProducts: 320,
      totalOrders: 2100,
      totalViews: 78000
    },
    createdAt: new Date('2023-05-10'),
    updatedAt: new Date(),
    professionalTheme: {
      themeId: 'modern',
      customColors: {
        primary: '#E85D75',
        secondary: '#2C3E50'
      }
    }
  },

  // TIENDA 4: FitZone (Deportes - Tema Modern)
  {
    id: '4',
    slug: 'fitzone',
    name: 'FitZone',
    description: 'Equipamiento deportivo profesional para alcanzar tus metas',

    // Branding
    logoUrl: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f?w=400',
    bannerUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=1200',
    faviconUrl: undefined,

    // Contenido de secciones
    aboutUs: 'FitZone es el aliado perfecto para tu transformación física. Ofrecemos equipamiento deportivo de marcas reconocidas mundialmente, junto con asesoría personalizada para que encuentres exactamente lo que necesitas. Desde principiantes hasta atletas profesionales, tenemos todo lo necesario para que superes tus límites.',
    heroTitle: 'Supera Tus Límites, Alcanza Tus Metas',

    // Información de contacto
    phone: '+57 315 444 8899',
    email: 'info@fitzone.co',
    address: 'Av. El Poblado #10-90, Piso 2',
    city: 'Medellín',

    // Redes sociales
    facebookUrl: 'https://facebook.com/fitzone',
    instagramUrl: 'https://instagram.com/fitzone',
    whatsappNumber: '573154448899',

    // Features/Beneficios
    features: [
      {
        icon: 'Dumbbell',
        title: 'Equipo Profesional',
        description: 'Marcas de elite'
      },
      {
        icon: 'Users',
        title: 'Asesoría Gratis',
        description: 'Expertos a tu servicio'
      },
      {
        icon: 'TrendingUp',
        title: 'Plan de Entrenamiento',
        description: 'Incluido en compras +$200k'
      },
      {
        icon: 'Percent',
        title: 'Descuentos',
        description: 'Hasta 40% en temporadas'
      }
    ],

    // Configuración
    category: 'deportes',
    themeId: 'modern',
    currency: 'COP',
    isActive: true,

    // Legacy fields
    theme: MODERN_THEME.generateTheme({ primary: '#FF6B35', secondary: '#004E89' }),
    user: {
      id: 'user-4',
      name: 'Carlos Martínez',
      email: 'carlos@fitzone.co',
      createdAt: new Date('2023-04-01'),
      updatedAt: new Date()
    },
    contact: {
      phone: '+57 315 444 8899',
      email: 'info@fitzone.co',
      address: 'Av. El Poblado #10-90, Piso 2',
      whatsapp: '573154448899'
    },
    stats: {
      totalProducts: 210,
      totalOrders: 1560,
      totalViews: 52000
    },
    createdAt: new Date('2023-04-01'),
    updatedAt: new Date(),
    professionalTheme: {
      themeId: 'modern',
      customColors: {
        primary: '#FF6B35',
        secondary: '#004E89'
      }
    }
  }
]

// Helper para obtener una tienda por slug
export function getStoreBySlug(slug: string): Store | undefined {
  return MOCK_STORES.find(store => store.slug === slug)
}

// Helper para obtener tiendas por categoría
export function getStoresByCategory(category: string): Store[] {
  return MOCK_STORES.filter(store => store.category === category)
}
