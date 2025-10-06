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
      themeId: 'darkmode',
      customColors: {
        primary: '#EAB308',
        secondary: '#CA8A04'
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
  {
    id: '7',
    slug: 'casa-elegante',
    name: 'Casa Elegante',
    description: 'Muebles y decoración de alta calidad para transformar tu hogar en un espacio único',
    logo: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=200&h=200&fit=crop',
    banner: 'https://images.unsplash.com/photo-1556912167-f556f1f39faa?w=1200&h=400&fit=crop',
    theme: THEMES.clasico,
    professionalTheme: {
      themeId: 'interior',
      customColors: {
        primary: '#8B7355',
        secondary: '#9CAF88'
      }
    },
    isActive: true,
    user: {
      id: '7',
      name: 'Laura Martínez',
      email: 'laura@casaelegante.com',
      phone: '+1234567896',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
      createdAt: new Date('2024-07-01'),
      updatedAt: new Date('2024-09-25'),
    },
    contact: {
      phone: '+1234567896',
      email: 'laura@casaelegante.com',
      address: 'Boulevard Hogar 555, Zona Residencial',
      whatsapp: '+1234567896',
    },
    stats: {
      totalProducts: 48,
      totalOrders: 145,
      totalViews: 2890,
    },
    createdAt: new Date('2024-07-01'),
    updatedAt: new Date('2024-09-25'),
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

  // Creative Studio
  { id: '17', name: 'Arte Digital', slug: 'arte-digital', productCount: 12, isActive: true, storeId: '6' },
  { id: '18', name: 'Ilustración', slug: 'ilustracion', productCount: 15, isActive: true, storeId: '6' },
  { id: '19', name: 'Diseño Gráfico', slug: 'diseno-grafico', productCount: 10, isActive: true, storeId: '6' },
  { id: '20', name: 'Fotografía', slug: 'fotografia', productCount: 8, isActive: true, storeId: '6' },

  // Casa Elegante
  { id: '21', name: 'Muebles', slug: 'muebles', productCount: 15, isActive: true, storeId: '7' },
  { id: '22', name: 'Decoración', slug: 'decoracion', productCount: 18, isActive: true, storeId: '7' },
  { id: '23', name: 'Iluminación', slug: 'iluminacion', productCount: 10, isActive: true, storeId: '7' },
  { id: '24', name: 'Textiles', slug: 'textiles', productCount: 12, isActive: true, storeId: '7' },
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

  // Creative Studio - Arte Digital
  {
    id: '101',
    name: 'Colección NFT Galaxias',
    slug: 'nft-galaxias',
    description: 'Colección exclusiva de 10 obras de arte digital únicas inspiradas en el cosmos',
    price: 299,
    originalPrice: 499,
    stock: 3,
    sku: 'NFT-GAL-001',
    images: [
      'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=600&h=600&fit=crop',
    ],
    category: FAKE_CATEGORIES[16],
    isActive: true,
    isFeatured: true,
    tags: ['arte-digital', 'nft', 'cosmos', 'exclusivo'],
    specifications: {
      'Formato': 'NFT (ERC-721)',
      'Resolución': '4K (3840x2160)',
      'Edición': 'Limitada a 10 piezas',
      'Blockchain': 'Ethereum',
    },
    storeId: '6',
    createdAt: new Date('2024-09-15'),
    updatedAt: new Date('2024-09-20'),
  },
  {
    id: '102',
    name: 'Arte Generativo "Fractales"',
    slug: 'arte-generativo-fractales',
    description: 'Pieza de arte generativo única creada con algoritmos matemáticos',
    price: 450,
    stock: 5,
    sku: 'ART-FRAC-002',
    images: [
      'https://images.unsplash.com/photo-1550859492-d5da9d8e45f3?w=600&h=600&fit=crop',
    ],
    category: FAKE_CATEGORIES[16],
    isActive: true,
    isFeatured: true,
    tags: ['arte-generativo', 'fractales', 'matemáticas'],
    specifications: {
      'Tipo': 'Arte Generativo',
      'Algoritmo': 'Mandelbrot Set',
      'Formato': 'PNG de alta resolución',
      'Tamaño': '6000x6000px',
    },
    storeId: '6',
    createdAt: new Date('2024-09-10'),
    updatedAt: new Date('2024-09-18'),
  },

  // Creative Studio - Ilustración
  {
    id: '103',
    name: 'Ilustración Personalizada Retrato',
    slug: 'ilustracion-retrato',
    description: 'Retrato personalizado en estilo acuarela digital hecho a mano',
    price: 180,
    originalPrice: 250,
    stock: 15,
    sku: 'ILL-RET-001',
    images: [
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1579762715459-5a068c289fda?w=600&h=600&fit=crop',
    ],
    category: FAKE_CATEGORIES[17],
    isActive: true,
    isFeatured: true,
    tags: ['ilustración', 'retrato', 'acuarela', 'personalizado'],
    specifications: {
      'Estilo': 'Acuarela Digital',
      'Tiempo de entrega': '7-10 días',
      'Formato final': 'JPEG de alta resolución',
      'Revisiones': '2 rondas incluidas',
    },
    storeId: '6',
    createdAt: new Date('2024-09-08'),
    updatedAt: new Date('2024-09-19'),
  },
  {
    id: '104',
    name: 'Pack Stickers Animales Kawaii',
    slug: 'stickers-animales-kawaii',
    description: 'Set de 50 stickers digitales de animales en estilo kawaii para redes sociales',
    price: 25,
    stock: 100,
    sku: 'STK-KAW-001',
    images: [
      'https://images.unsplash.com/photo-1618412960209-274e6d70e14e?w=600&h=600&fit=crop',
    ],
    category: FAKE_CATEGORIES[17],
    isActive: true,
    isFeatured: false,
    tags: ['stickers', 'kawaii', 'animales', 'digital'],
    specifications: {
      'Cantidad': '50 stickers únicos',
      'Formato': 'PNG con transparencia',
      'Tamaño': '512x512px cada uno',
      'Uso': 'Comercial permitido',
    },
    storeId: '6',
    createdAt: new Date('2024-08-25'),
    updatedAt: new Date('2024-09-15'),
  },

  // Creative Studio - Diseño Gráfico
  {
    id: '105',
    name: 'Pack Identidad Visual Completa',
    slug: 'identidad-visual-completa',
    description: 'Identidad visual profesional: logo, paleta de colores, tipografía y guía de marca',
    price: 850,
    originalPrice: 1200,
    stock: 8,
    sku: 'DIS-ID-001',
    images: [
      'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=600&h=600&fit=crop',
    ],
    category: FAKE_CATEGORIES[18],
    isActive: true,
    isFeatured: true,
    tags: ['diseño', 'branding', 'identidad', 'profesional'],
    specifications: {
      'Incluye': 'Logo + Paleta + Tipografía + Manual',
      'Formatos': 'AI, PNG, SVG, PDF',
      'Revisiones': '3 rondas incluidas',
      'Tiempo': '10-14 días',
    },
    storeId: '6',
    createdAt: new Date('2024-09-12'),
    updatedAt: new Date('2024-09-20'),
  },
  {
    id: '106',
    name: 'Plantillas Instagram Feed Aesthetic',
    slug: 'plantillas-instagram-aesthetic',
    description: 'Pack de 30 plantillas editables para Instagram con estilo minimalista',
    price: 45,
    stock: 50,
    sku: 'PLA-IG-001',
    images: [
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=600&fit=crop',
    ],
    category: FAKE_CATEGORIES[18],
    isActive: true,
    isFeatured: false,
    tags: ['plantillas', 'instagram', 'social-media', 'minimalista'],
    specifications: {
      'Cantidad': '30 plantillas únicas',
      'Formato': 'PSD + Canva',
      'Tamaño': '1080x1080px',
      'Personalizable': 'Totalmente editable',
    },
    storeId: '6',
    createdAt: new Date('2024-08-30'),
    updatedAt: new Date('2024-09-16'),
  },

  // Creative Studio - Fotografía
  {
    id: '107',
    name: 'Preset Pack Pro Lightroom',
    slug: 'preset-pack-lightroom',
    description: 'Colección de 25 presets profesionales para Adobe Lightroom estilo cinematográfico',
    price: 65,
    originalPrice: 95,
    stock: 200,
    sku: 'PRE-LR-001',
    images: [
      'https://images.unsplash.com/photo-1542038784456-1ea8e935640e?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1601758063541-d2f50b4aafb2?w=600&h=600&fit=crop',
    ],
    category: FAKE_CATEGORIES[19],
    isActive: true,
    isFeatured: true,
    tags: ['presets', 'lightroom', 'fotografía', 'cinematográfico'],
    specifications: {
      'Cantidad': '25 presets profesionales',
      'Compatible': 'Lightroom CC y Classic',
      'Formatos': 'XMP + DNG',
      'Incluye': 'Tutorial de instalación',
    },
    storeId: '6',
    createdAt: new Date('2024-09-05'),
    updatedAt: new Date('2024-09-19'),
  },
  {
    id: '108',
    name: 'Stock Photos Abstracto',
    slug: 'stock-photos-abstracto',
    description: 'Pack de 100 fotografías abstractas en alta resolución para diseño',
    price: 120,
    stock: 30,
    sku: 'PHO-ABS-001',
    images: [
      'https://images.unsplash.com/photo-1557672172-298e090bd0f1?w=600&h=600&fit=crop',
    ],
    category: FAKE_CATEGORIES[19],
    isActive: true,
    isFeatured: false,
    tags: ['fotografía', 'stock', 'abstracto', 'texturas'],
    specifications: {
      'Cantidad': '100 imágenes únicas',
      'Resolución': '6K (6000x4000px)',
      'Formato': 'JPEG de alta calidad',
      'Licencia': 'Uso comercial incluido',
    },
    storeId: '6',
    createdAt: new Date('2024-08-20'),
    updatedAt: new Date('2024-09-14'),
  },

  // Casa Elegante - Muebles
  {
    id: '109',
    name: 'Sofá Escandinavo 3 Puestos',
    slug: 'sofa-escandinavo-3-puestos',
    description: 'Elegante sofá de 3 puestos con diseño escandinavo, tapizado en tela premium y patas de madera de roble',
    price: 1299000,
    originalPrice: 1599000,
    stock: 8,
    sku: 'MUE-SOF-001',
    images: [
      'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop',
      'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=600&h=600&fit=crop',
    ],
    category: FAKE_CATEGORIES[20],
    isActive: true,
    isFeatured: true,
    tags: ['sofá', 'escandinavo', 'sala', 'moderno'],
    specifications: {
      'Dimensiones': '210cm x 85cm x 90cm',
      'Material': 'Tela premium y madera de roble',
      'Color': 'Gris claro',
      'Capacidad': '3 personas',
    },
    storeId: '7',
    createdAt: new Date('2024-07-05'),
    updatedAt: new Date('2024-09-20'),
  },
  {
    id: '110',
    name: 'Mesa de Centro Mármol',
    slug: 'mesa-centro-marmol',
    description: 'Mesa de centro con tapa de mármol blanco y base de metal dorado, perfecta para salas modernas',
    price: 459000,
    stock: 12,
    sku: 'MUE-MES-002',
    images: [
      'https://images.unsplash.com/photo-1551298370-9d3d53740c72?w=600&h=600&fit=crop',
    ],
    category: FAKE_CATEGORIES[20],
    isActive: true,
    isFeatured: true,
    tags: ['mesa', 'mármol', 'sala', 'lujo'],
    specifications: {
      'Dimensiones': '120cm x 60cm x 45cm',
      'Material': 'Mármol blanco y metal',
      'Acabado': 'Metal dorado',
      'Peso': '28kg',
    },
    storeId: '7',
    createdAt: new Date('2024-07-10'),
    updatedAt: new Date('2024-09-18'),
  },
  {
    id: '111',
    name: 'Comedor 6 Puestos Roble',
    slug: 'comedor-6-puestos-roble',
    description: 'Set de comedor elegante con mesa extensible de roble y 6 sillas tapizadas en cuero sintético',
    price: 2199000,
    originalPrice: 2799000,
    stock: 5,
    sku: 'MUE-COM-003',
    images: [
      'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&h=600&fit=crop',
    ],
    category: FAKE_CATEGORIES[20],
    isActive: true,
    isFeatured: false,
    tags: ['comedor', 'mesa', 'sillas', 'roble'],
    specifications: {
      'Mesa': '180cm (extensible a 240cm)',
      'Material': 'Madera de roble maciza',
      'Sillas': '6 unidades tapizadas',
      'Capacidad': '6-8 personas',
    },
    storeId: '7',
    createdAt: new Date('2024-07-12'),
    updatedAt: new Date('2024-09-15'),
  },
  {
    id: '112',
    name: 'Cama King Size Lino',
    slug: 'cama-king-lino',
    description: 'Cama king size con cabecero tapizado en lino natural, incluye base y somier de madera',
    price: 1899000,
    stock: 6,
    sku: 'MUE-CAM-004',
    images: [
      'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600&h=600&fit=crop',
    ],
    category: FAKE_CATEGORIES[20],
    isActive: true,
    isFeatured: true,
    tags: ['cama', 'king', 'lino', 'dormitorio'],
    specifications: {
      'Tamaño': 'King Size (200cm x 200cm)',
      'Material': 'Lino natural y madera',
      'Cabecero': '140cm de altura',
      'Incluye': 'Base y somier',
    },
    storeId: '7',
    createdAt: new Date('2024-07-15'),
    updatedAt: new Date('2024-09-12'),
  },

  // Casa Elegante - Decoración
  {
    id: '113',
    name: 'Set 3 Espejos Decorativos',
    slug: 'set-espejos-decorativos',
    description: 'Conjunto de 3 espejos redondos con marcos dorados en diferentes tamaños para decoración de pared',
    price: 189000,
    stock: 20,
    sku: 'DEC-ESP-001',
    images: [
      'https://images.unsplash.com/photo-1618220179428-22790b461013?w=600&h=600&fit=crop',
    ],
    category: FAKE_CATEGORIES[21],
    isActive: true,
    isFeatured: false,
    tags: ['espejos', 'decoración', 'pared', 'dorado'],
    specifications: {
      'Cantidad': '3 espejos',
      'Tamaños': '50cm, 40cm, 30cm diámetro',
      'Material': 'Cristal y metal dorado',
      'Instalación': 'Fácil montaje en pared',
    },
    storeId: '7',
    createdAt: new Date('2024-07-18'),
    updatedAt: new Date('2024-09-10'),
  },
  {
    id: '114',
    name: 'Cuadro Abstracto XL',
    slug: 'cuadro-abstracto-xl',
    description: 'Cuadro grande abstracto moderno con tonos tierra y dorados, impresión en canvas premium',
    price: 329000,
    stock: 15,
    sku: 'DEC-CUA-002',
    images: [
      'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=600&h=600&fit=crop',
    ],
    category: FAKE_CATEGORIES[21],
    isActive: true,
    isFeatured: true,
    tags: ['cuadro', 'arte', 'abstracto', 'canvas'],
    specifications: {
      'Dimensiones': '150cm x 100cm',
      'Material': 'Canvas premium con bastidor',
      'Técnica': 'Impresión de alta calidad',
      'Marco': 'Incluido (negro mate)',
    },
    storeId: '7',
    createdAt: new Date('2024-07-20'),
    updatedAt: new Date('2024-09-08'),
  },
  {
    id: '115',
    name: 'Jarrones Cerámicos Set 3',
    slug: 'jarrones-ceramicos-set',
    description: 'Set de 3 jarrones de cerámica artesanal en tonos beige y terracota con diseños únicos',
    price: 159000,
    stock: 18,
    sku: 'DEC-JAR-003',
    images: [
      'https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=600&h=600&fit=crop',
    ],
    category: FAKE_CATEGORIES[21],
    isActive: true,
    isFeatured: false,
    tags: ['jarrones', 'cerámica', 'decoración', 'artesanal'],
    specifications: {
      'Cantidad': '3 piezas',
      'Alturas': '35cm, 28cm, 20cm',
      'Material': 'Cerámica artesanal',
      'Colores': 'Beige y terracota',
    },
    storeId: '7',
    createdAt: new Date('2024-07-22'),
    updatedAt: new Date('2024-09-06'),
  },
  {
    id: '116',
    name: 'Cojines Decorativos Set 4',
    slug: 'cojines-decorativos-set',
    description: 'Set de 4 cojines decorativos en tonos neutros con texturas variadas y fundas removibles',
    price: 129000,
    stock: 25,
    sku: 'DEC-COJ-004',
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=600&h=600&fit=crop',
    ],
    category: FAKE_CATEGORIES[21],
    isActive: true,
    isFeatured: false,
    tags: ['cojines', 'textiles', 'decoración', 'sofá'],
    specifications: {
      'Cantidad': '4 cojines',
      'Tamaño': '45cm x 45cm',
      'Material': 'Algodón y lino',
      'Fundas': 'Removibles y lavables',
    },
    storeId: '7',
    createdAt: new Date('2024-07-25'),
    updatedAt: new Date('2024-09-04'),
  },

  // Casa Elegante - Iluminación
  {
    id: '117',
    name: 'Lámpara de Techo Moderna',
    slug: 'lampara-techo-moderna',
    description: 'Lámpara colgante moderna con pantalla de metal en acabado negro mate y detalles dorados',
    price: 389000,
    stock: 10,
    sku: 'ILU-TEC-001',
    images: [
      'https://images.unsplash.com/photo-1534105615159-13e21b0c9c12?w=600&h=600&fit=crop',
    ],
    category: FAKE_CATEGORIES[22],
    isActive: true,
    isFeatured: true,
    tags: ['lámpara', 'iluminación', 'techo', 'moderna'],
    specifications: {
      'Diámetro': '45cm',
      'Material': 'Metal negro mate',
      'Bombilla': 'E27 (no incluida)',
      'Cable': 'Ajustable hasta 150cm',
    },
    storeId: '7',
    createdAt: new Date('2024-08-01'),
    updatedAt: new Date('2024-09-02'),
  },
  {
    id: '118',
    name: 'Lámpara de Mesa Mármol',
    slug: 'lampara-mesa-marmol',
    description: 'Elegante lámpara de mesa con base de mármol blanco y pantalla de lino en tono crema',
    price: 259000,
    stock: 14,
    sku: 'ILU-MES-002',
    images: [
      'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=600&h=600&fit=crop',
    ],
    category: FAKE_CATEGORIES[22],
    isActive: true,
    isFeatured: false,
    tags: ['lámpara', 'mesa', 'mármol', 'elegante'],
    specifications: {
      'Altura': '58cm',
      'Base': 'Mármol blanco natural',
      'Pantalla': 'Lino crema',
      'Bombilla': 'E14 (no incluida)',
    },
    storeId: '7',
    createdAt: new Date('2024-08-03'),
    updatedAt: new Date('2024-08-30'),
  },
  {
    id: '119',
    name: 'Lámpara de Piso Arco',
    slug: 'lampara-piso-arco',
    description: 'Lámpara de piso tipo arco con base de mármol y brazo ajustable en metal dorado',
    price: 679000,
    originalPrice: 849000,
    stock: 7,
    sku: 'ILU-PIS-003',
    images: [
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=600&h=600&fit=crop',
    ],
    category: FAKE_CATEGORIES[22],
    isActive: true,
    isFeatured: true,
    tags: ['lámpara', 'piso', 'arco', 'dorado'],
    specifications: {
      'Altura': '210cm',
      'Alcance': '180cm ajustable',
      'Base': 'Mármol 30kg',
      'Acabado': 'Metal dorado',
    },
    storeId: '7',
    createdAt: new Date('2024-08-05'),
    updatedAt: new Date('2024-08-28'),
  },

  // Casa Elegante - Textiles
  {
    id: '120',
    name: 'Juego Sábanas King Premium',
    slug: 'sabanas-king-premium',
    description: 'Juego completo de sábanas king en algodón egipcio 600 hilos, ultra suaves y duraderas',
    price: 299000,
    stock: 16,
    sku: 'TEX-SAB-001',
    images: [
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&h=600&fit=crop',
    ],
    category: FAKE_CATEGORIES[23],
    isActive: true,
    isFeatured: false,
    tags: ['sábanas', 'king', 'algodón', 'premium'],
    specifications: {
      'Tamaño': 'King (200x200cm)',
      'Material': 'Algodón egipcio 600 hilos',
      'Incluye': 'Sábana, funda y 2 fundas almohada',
      'Colores': 'Blanco, beige, gris',
    },
    storeId: '7',
    createdAt: new Date('2024-08-08'),
    updatedAt: new Date('2024-08-26'),
  },
  {
    id: '121',
    name: 'Manta Tejida Artesanal',
    slug: 'manta-tejida-artesanal',
    description: 'Manta de algodón tejida a mano en tonos naturales, perfecta para sofás y camas',
    price: 179000,
    stock: 22,
    sku: 'TEX-MAN-002',
    images: [
      'https://images.unsplash.com/photo-1579656381226-5fc0f0100c3b?w=600&h=600&fit=crop',
    ],
    category: FAKE_CATEGORIES[23],
    isActive: true,
    isFeatured: true,
    tags: ['manta', 'tejida', 'algodón', 'artesanal'],
    specifications: {
      'Dimensiones': '180cm x 130cm',
      'Material': '100% algodón tejido',
      'Peso': '1.2kg',
      'Cuidado': 'Lavable a máquina',
    },
    storeId: '7',
    createdAt: new Date('2024-08-10'),
    updatedAt: new Date('2024-08-24'),
  },
  {
    id: '122',
    name: 'Cortinas Lino Natural Set',
    slug: 'cortinas-lino-natural',
    description: 'Par de cortinas en lino 100% natural con sistema de argollas, filtran luz suavemente',
    price: 249000,
    stock: 13,
    sku: 'TEX-COR-003',
    images: [
      'https://images.unsplash.com/photo-1504198266287-1659872e6590?w=600&h=600&fit=crop',
    ],
    category: FAKE_CATEGORIES[23],
    isActive: true,
    isFeatured: false,
    tags: ['cortinas', 'lino', 'natural', 'ventana'],
    specifications: {
      'Dimensiones': '280cm x 140cm (cada paño)',
      'Material': '100% lino natural',
      'Sistema': 'Argollas incluidas',
      'Colores': 'Beige, blanco, gris',
    },
    storeId: '7',
    createdAt: new Date('2024-08-12'),
    updatedAt: new Date('2024-08-22'),
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

export function getProductBySlug(slug: string): Product | null {
  return FAKE_PRODUCTS.find(product => product.slug === slug) || null
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