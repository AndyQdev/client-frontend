import { Store, Product, Category, Brand, User } from './types'
import { THEMES } from './themes'

// 📊 Datos fake realistas para el MVP
export const FAKE_USERS: User[] = [
  {
    id: '1',
    name: 'Juan Pérez',
    email: 'juan@electronics.com',
    phone: '+1234567890',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-09-20'),
  },
  {
    id: '2',
    name: 'María García',
    email: 'maria@fashion.com',
    phone: '+1234567891',
    avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=150&h=150&fit=crop&crop=face',
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-09-18'),
  },
  {
    id: '3',
    name: 'Carlos Rodríguez',
    email: 'carlos@organico.com',
    phone: '+1234567892',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-09-15'),
  },
  {
    id: '4',
    name: 'Ana López',
    email: 'ana@belleza.com',
    phone: '+1234567893',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    createdAt: new Date('2024-04-12'),
    updatedAt: new Date('2024-09-12'),
  },
  {
    id: '5',
    name: 'Roberto Silva',
    email: 'roberto@deportes.com',
    phone: '+1234567894',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    createdAt: new Date('2024-05-20'),
    updatedAt: new Date('2024-09-10'),
  },
]

export const FAKE_BRANDS: Brand[] = [
  { id: '1', name: 'Samsung', slug: 'samsung', logo: 'https://logo.clearbit.com/samsung.com', isActive: true },
  { id: '2', name: 'Apple', slug: 'apple', logo: 'https://logo.clearbit.com/apple.com', isActive: true },
  { id: '3', name: 'Nike', slug: 'nike', logo: 'https://logo.clearbit.com/nike.com', isActive: true },
  { id: '4', name: 'Adidas', slug: 'adidas', logo: 'https://logo.clearbit.com/adidas.com', isActive: true },
  { id: '5', name: 'Zara', slug: 'zara', logo: 'https://logo.clearbit.com/zara.com', isActive: true },
]

export const FAKE_STORES: Store[] = [
  {
    id: '1',
    slug: 'juan-electronics',
    name: 'Juan Electronics',
    description: 'Los mejores dispositivos electrónicos y gadgets tecnológicos al mejor precio',
    logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop',
    banner: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop',
    theme: THEMES.corporativo, // Legacy support
    professionalTheme: {
      themeId: 'modern',
      customColors: {
        primary: '#3B82F6',
        secondary: '#1E40AF'
      }
    },
    isActive: true,
    user: FAKE_USERS[0],
    contact: {
      phone: '+1234567890',
      email: 'juan@electronics.com',
      address: 'Av. Tecnología 123, Ciudad Tech',
      whatsapp: '+1234567890',
    },
    stats: {
      totalProducts: 45,
      totalOrders: 156,
      totalViews: 2340,
    },
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-09-20'),
  },
  {
    id: '2',
    slug: 'maria-fashion',
    name: 'María Fashion',
    description: 'Moda femenina elegante y tendencias actuales para mujeres modernas',
    logo: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=200&h=200&fit=crop',
    banner: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=400&fit=crop',
    theme: THEMES.femenino, // Legacy support
    professionalTheme: {
      themeId: 'elegante',
      customColors: {
        primary: '#EC4899',
        secondary: '#F59E0B'
      }
    },
    isActive: true,
    user: FAKE_USERS[1],
    contact: {
      phone: '+1234567891',
      email: 'maria@fashion.com',
      address: 'Calle Moda 456, Centro Fashion',
      whatsapp: '+1234567891',
    },
    stats: {
      totalProducts: 78,
      totalOrders: 234,
      totalViews: 3650,
    },
    createdAt: new Date('2024-02-10'),
    updatedAt: new Date('2024-09-18'),
  },
  {
    id: '3',
    slug: 'carlos-organico',
    name: 'Carlos Orgánico',
    description: 'Productos orgánicos y naturales para una vida saludable y sostenible',
    logo: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=200&h=200&fit=crop',
    banner: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200&h=400&fit=crop',
    theme: THEMES.natural, // Legacy support
    professionalTheme: {
      themeId: 'minimal',
      customColors: {
        primary: '#10B981',
        secondary: '#059669'
      }
    },
    isActive: true,
    user: FAKE_USERS[2],
    contact: {
      phone: '+1234567892',
      email: 'carlos@organico.com',
      address: 'Eco Plaza 789, Verde Ville',
      whatsapp: '+1234567892',
    },
    stats: {
      totalProducts: 32,
      totalOrders: 89,
      totalViews: 1450,
    },
    createdAt: new Date('2024-03-05'),
    updatedAt: new Date('2024-09-15'),
  },
  {
    id: '4',
    slug: 'ana-belleza',
    name: 'Ana Belleza',
    description: 'Productos de belleza y cuidado personal de las mejores marcas',
    logo: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop',
    banner: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=1200&h=400&fit=crop',
    theme: THEMES.elegante, // Legacy support
    professionalTheme: {
      themeId: 'classic',
      customColors: {
        primary: '#8B5CF6',
        secondary: '#A855F7'
      }
    },
    isActive: true,
    user: FAKE_USERS[3],
    contact: {
      phone: '+1234567893',
      email: 'ana@belleza.com',
      address: 'Beauty Center 321, Glamour City',
      whatsapp: '+1234567893',
    },
    stats: {
      totalProducts: 56,
      totalOrders: 178,
      totalViews: 2890,
    },
    createdAt: new Date('2024-04-12'),
    updatedAt: new Date('2024-09-12'),
  },
  {
    id: '5',
    slug: 'roberto-deportes',
    name: 'Roberto Deportes',
    description: 'Equipamiento deportivo y ropa atlética para todos los deportes',
    logo: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop',
    banner: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=400&fit=crop',
    theme: THEMES.moderno, // Legacy support
    professionalTheme: {
      themeId: 'editorial',
      customColors: {
        primary: '#EF4444',
        secondary: '#F97316'
      }
    },
    isActive: true,
    user: FAKE_USERS[4],
    contact: {
      phone: '+1234567894',
      email: 'roberto@deportes.com',
      address: 'Sports Arena 654, Athletic District',
      whatsapp: '+1234567894',
    },
    stats: {
      totalProducts: 67,
      totalOrders: 203,
      totalViews: 3120,
    },
    createdAt: new Date('2024-05-20'),
    updatedAt: new Date('2024-09-10'),
  },
  {
    id: '6',
    slug: 'creative-studio',
    name: 'Creative Studio',
    description: 'Arte, diseño y productos creativos únicos para inspirar tu imaginación',
    logo: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=200&h=200&fit=crop',
    banner: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=1200&h=400&fit=crop',
    theme: THEMES.creativo, // Legacy support
    professionalTheme: {
      themeId: 'creative',
      customColors: {
        primary: '#7C3AED',
        secondary: '#F59E0B'
      }
    },
    isActive: true,
    user: {
      id: '6',
      name: 'Sofia Artista',
      email: 'sofia@creative.com',
      phone: '+1234567895',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b647?w=150&h=150&fit=crop&crop=face',
      createdAt: new Date('2024-06-01'),
      updatedAt: new Date('2024-09-01'),
    },
    contact: {
      phone: '+1234567895',
      email: 'sofia@creative.com',
      address: 'Art District 123, Creative Quarter',
      whatsapp: '+1234567895',
    },
    stats: {
      totalProducts: 24,
      totalOrders: 67,
      totalViews: 1890,
    },
    createdAt: new Date('2024-06-01'),
    updatedAt: new Date('2024-09-01'),
  },
]

export const FAKE_CATEGORIES: Category[] = [
  // Juan Electronics
  { id: '1', name: 'Smartphones', slug: 'smartphones', productCount: 15, isActive: true, storeId: '1' },
  { id: '2', name: 'Laptops', slug: 'laptops', productCount: 12, isActive: true, storeId: '1' },
  { id: '3', name: 'Accesorios', slug: 'accesorios', productCount: 18, isActive: true, storeId: '1' },

  // María Fashion
  { id: '4', name: 'Vestidos', slug: 'vestidos', productCount: 25, isActive: true, storeId: '2' },
  { id: '5', name: 'Blusas', slug: 'blusas', productCount: 20, isActive: true, storeId: '2' },
  { id: '6', name: 'Pantalones', slug: 'pantalones', productCount: 15, isActive: true, storeId: '2' },
  { id: '7', name: 'Accesorios', slug: 'accesorios-moda', productCount: 18, isActive: true, storeId: '2' },

  // Carlos Orgánico
  { id: '8', name: 'Frutas', slug: 'frutas', productCount: 12, isActive: true, storeId: '3' },
  { id: '9', name: 'Verduras', slug: 'verduras', productCount: 15, isActive: true, storeId: '3' },
  { id: '10', name: 'Granos', slug: 'granos', productCount: 5, isActive: true, storeId: '3' },

  // Ana Belleza
  { id: '11', name: 'Maquillaje', slug: 'maquillaje', productCount: 22, isActive: true, storeId: '4' },
  { id: '12', name: 'Cuidado Facial', slug: 'cuidado-facial', productCount: 18, isActive: true, storeId: '4' },
  { id: '13', name: 'Perfumes', slug: 'perfumes', productCount: 16, isActive: true, storeId: '4' },

  // Roberto Deportes
  { id: '14', name: 'Fútbol', slug: 'futbol', productCount: 20, isActive: true, storeId: '5' },
  { id: '15', name: 'Running', slug: 'running', productCount: 25, isActive: true, storeId: '5' },
  { id: '16', name: 'Gimnasio', slug: 'gimnasio', productCount: 22, isActive: true, storeId: '5' },
]

export const FAKE_PRODUCTS: Product[] = [
  // Juan Electronics - Smartphones
  {
    id: '1',
    name: 'iPhone 15 Pro',
    slug: 'iphone-15-pro',
    description: 'El último iPhone con chip A17 Pro, cámara profesional y titanio',
    price: 1199,
    originalPrice: 1299,
    stock: 5,
    sku: 'IP15P-128',
    images: [
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop',
    ],
    category: FAKE_CATEGORIES[0],
    brand: FAKE_BRANDS[1],
    isActive: true,
    isFeatured: true,
    tags: ['smartphone', 'apple', 'premium'],
    specifications: {
      'Pantalla': '6.1 pulgadas',
      'Almacenamiento': '128GB',
      'Cámara': '48MP',
      'Batería': '3274mAh',
    },
    storeId: '1',
    createdAt: new Date('2024-09-01'),
    updatedAt: new Date('2024-09-20'),
  },
  {
    id: '2',
    name: 'Samsung Galaxy S24',
    slug: 'samsung-galaxy-s24',
    description: 'Samsung Galaxy S24 con IA integrada y cámara profesional',
    price: 999,
    stock: 8,
    sku: 'SGS24-256',
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=600&h=600&fit=crop',
    ],
    category: FAKE_CATEGORIES[0],
    brand: FAKE_BRANDS[0],
    isActive: true,
    isFeatured: true,
    tags: ['smartphone', 'samsung', 'android'],
    specifications: {
      'Pantalla': '6.2 pulgadas',
      'Almacenamiento': '256GB',
      'Cámara': '50MP',
      'Batería': '4000mAh',
    },
    storeId: '1',
    createdAt: new Date('2024-08-15'),
    updatedAt: new Date('2024-09-18'),
  },

  // Juan Electronics - Laptops
  {
    id: '3',
    name: 'MacBook Pro 14"',
    slug: 'macbook-pro-14',
    description: 'MacBook Pro 14" con chip M3 Pro, perfecto para profesionales',
    price: 2499,
    stock: 3,
    sku: 'MBP14-M3',
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&h=600&fit=crop',
    ],
    category: FAKE_CATEGORIES[1],
    brand: FAKE_BRANDS[1],
    isActive: true,
    isFeatured: true,
    tags: ['laptop', 'apple', 'professional'],
    specifications: {
      'Procesador': 'M3 Pro',
      'RAM': '18GB',
      'Almacenamiento': '512GB SSD',
      'Pantalla': '14.2 pulgadas',
    },
    storeId: '1',
    createdAt: new Date('2024-08-20'),
    updatedAt: new Date('2024-09-15'),
  },

  // María Fashion - Vestidos
  {
    id: '4',
    name: 'Vestido Elegante Rosa',
    slug: 'vestido-elegante-rosa',
    description: 'Hermoso vestido rosa perfecto para ocasiones especiales',
    price: 89,
    originalPrice: 120,
    stock: 12,
    sku: 'VER-001',
    images: [
      'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1566479179817-c9a0e1a7b58e?w=600&h=600&fit=crop',
    ],
    category: FAKE_CATEGORIES[3],
    brand: FAKE_BRANDS[4],
    isActive: true,
    isFeatured: true,
    tags: ['vestido', 'elegante', 'fiesta'],
    specifications: {
      'Talla': 'S, M, L, XL',
      'Material': 'Poliéster',
      'Color': 'Rosa',
      'Cuidado': 'Lavado en seco',
    },
    storeId: '2',
    createdAt: new Date('2024-09-05'),
    updatedAt: new Date('2024-09-20'),
  },

  {
    id: '5',
    name: 'Blusa Casual Blanca',
    slug: 'blusa-casual-blanca',
    description: 'Blusa casual blanca perfecta para el día a día',
    price: 45,
    stock: 20,
    sku: 'BLU-002',
    images: [
      'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&h=600&fit=crop',
    ],
    category: FAKE_CATEGORIES[4],
    isActive: true,
    isFeatured: false,
    tags: ['blusa', 'casual', 'blanco'],
    specifications: {
      'Talla': 'XS, S, M, L',
      'Material': 'Algodón',
      'Color': 'Blanco',
      'Estilo': 'Casual',
    },
    storeId: '2',
    createdAt: new Date('2024-09-10'),
    updatedAt: new Date('2024-09-18'),
  },

  // Carlos Orgánico - Frutas
  {
    id: '6',
    name: 'Manzanas Orgánicas',
    slug: 'manzanas-organicas',
    description: 'Manzanas orgánicas frescas, cultivadas sin pesticidas',
    price: 8,
    stock: 50,
    sku: 'FRU-001',
    images: [
      'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=600&h=600&fit=crop',
    ],
    category: FAKE_CATEGORIES[7],
    isActive: true,
    isFeatured: true,
    tags: ['fruta', 'orgánico', 'fresco'],
    specifications: {
      'Origen': 'Local',
      'Peso': '1kg',
      'Certificación': 'Orgánico',
      'Conservación': 'Refrigerar',
    },
    storeId: '3',
    createdAt: new Date('2024-09-12'),
    updatedAt: new Date('2024-09-20'),
  },

  // Ana Belleza - Maquillaje
  {
    id: '7',
    name: 'Base Líquida Premium',
    slug: 'base-liquida-premium',
    description: 'Base líquida de cobertura completa con acabado natural',
    price: 35,
    stock: 15,
    sku: 'MAQ-001',
    images: [
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=600&fit=crop',
    ],
    category: FAKE_CATEGORIES[10],
    isActive: true,
    isFeatured: true,
    tags: ['maquillaje', 'base', 'premium'],
    specifications: {
      'Cobertura': 'Completa',
      'Acabado': 'Natural',
      'SPF': '30',
      'Duración': '24 horas',
    },
    storeId: '4',
    createdAt: new Date('2024-09-08'),
    updatedAt: new Date('2024-09-19'),
  },

  // Roberto Deportes - Fútbol
  {
    id: '8',
    name: 'Balón de Fútbol Profesional',
    slug: 'balon-futbol-profesional',
    description: 'Balón oficial FIFA para entrenamientos y partidos profesionales',
    price: 65,
    stock: 25,
    sku: 'DEP-001',
    images: [
      'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=600&h=600&fit=crop',
    ],
    category: FAKE_CATEGORIES[13],
    brand: FAKE_BRANDS[2],
    isActive: true,
    isFeatured: true,
    tags: ['fútbol', 'balón', 'profesional'],
    specifications: {
      'Tamaño': '5',
      'Certificación': 'FIFA',
      'Material': 'Cuero sintético',
      'Peso': '410-450g',
    },
    storeId: '5',
    createdAt: new Date('2024-09-03'),
    updatedAt: new Date('2024-09-17'),
  },
]

// Funciones helper para obtener datos
export function getStoreBySlug(slug: string): Store | null {
  return FAKE_STORES.find(store => store.slug === slug) || null
}

// Función helper para obtener el tema profesional de una tienda
export function getStoreProfessionalTheme(store: Store) {
  if (!store.professionalTheme) return null

  // Import themes dynamically to avoid circular dependencies
  const { PROFESSIONAL_THEMES } = require('./themes/index')

  if (!PROFESSIONAL_THEMES) {
    console.error('PROFESSIONAL_THEMES is undefined')
    return null
  }

  const theme = PROFESSIONAL_THEMES.find((t: any) => t.id === store.professionalTheme!.themeId)
  return theme ? { theme, customColors: store.professionalTheme.customColors } : null
}

// Función helper para obtener solo los colores generados (sin funciones) para componentes cliente
export function getStoreProfessionalThemeColors(store: Store) {
  if (!store.professionalTheme) return null

  // Import themes dynamically to avoid circular dependencies
  const { PROFESSIONAL_THEMES } = require('./themes/index')

  if (!PROFESSIONAL_THEMES) {
    console.error('PROFESSIONAL_THEMES is undefined')
    return null
  }

  const theme = PROFESSIONAL_THEMES.find((t: any) => t.id === store.professionalTheme!.themeId)
  if (!theme) return null

  // Generate colors on server side and return only the colors + theme name
  const generatedColors = theme.generateColors(store.professionalTheme.customColors)
  return {
    colors: generatedColors,
    themeName: theme.name
  }
}

// Función helper para obtener el tema profesional serializable (sin funciones) para componentes cliente
export function getStoreProfessionalThemeSerializable(store: Store) {
  if (!store.professionalTheme) return null

  // Import themes dynamically to avoid circular dependencies
  const { PROFESSIONAL_THEMES } = require('./themes/index')

  if (!PROFESSIONAL_THEMES) {
    console.error('PROFESSIONAL_THEMES is undefined')
    return null
  }

  const theme = PROFESSIONAL_THEMES.find((t: any) => t.id === store.professionalTheme!.themeId)
  if (!theme) return null

  // Generate colors on server side and create serializable theme
  const generatedColors = theme.generateColors(store.professionalTheme.customColors)

  return {
    id: theme.id,
    name: theme.name,
    description: theme.description,
    category: theme.category,
    preview: theme.preview,
    typography: theme.typography,
    layout: theme.layout,
    styling: theme.styling,
    customCSS: theme.customCSS,
    colors: generatedColors,
    customColors: store.professionalTheme.customColors
  }
}

export function getStoreProducts(storeId: string): Product[] {
  return FAKE_PRODUCTS.filter(product => product.storeId === storeId)
}

export function getProductById(id: string): Product | null {
  return FAKE_PRODUCTS.find(product => product.id === id) || null
}

export function getStoreCategories(storeId: string): Category[] {
  return FAKE_CATEGORIES.filter(category => category.storeId === storeId)
}

export function getAllStores(): Store[] {
  return FAKE_STORES.filter(store => store.isActive)
}

export function searchProducts(storeId: string, query: string): Product[] {
  const products = getStoreProducts(storeId)
  if (!query) return products

  const lowerQuery = query.toLowerCase()
  return products.filter(product =>
    product.name.toLowerCase().includes(lowerQuery) ||
    product.description?.toLowerCase().includes(lowerQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  )
}

export function filterProductsByCategory(storeId: string, categorySlug: string): Product[] {
  const products = getStoreProducts(storeId)
  return products.filter(product => product.category.slug === categorySlug)
}