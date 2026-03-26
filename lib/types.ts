// Tipos principales del sistema
export interface Theme {
  id: string
  name: string
  preview: string
  colors: {
    primary: string
    primaryHover: string
    primaryLight: string
    secondary: string
    secondaryLight: string
    secondaryDark: string
    accent: string
    accentLight: string
    accentDark: string
    background: string
    surface: string
    text: string
    textMuted: string
    border: string
    success: string
    successBg: string
    error: string
    errorBg: string
    warning: string
    warningBg: string
    info: string
    infoBg: string
  }
  typography: {
    fontFamily: string
    headingWeight: string
    bodyWeight: string
  }
  styling: {
    borderRadius: string
    shadowStyle: 'none' | 'light' | 'medium' | 'heavy'
    buttonStyle: 'rounded' | 'sharp' | 'pill'
  }
}

export interface User {
  id: string
  name: string
  email: string
  phone?: string
  avatar?: string
  createdAt: Date
  updatedAt: Date
}

export interface Store {
  id: string
  slug: string
  name: string
  description?: string

  // Branding (nombres consistentes)
  logoUrl?: string
  bannerUrl?: string
  faviconUrl?: string
  
  // Alias para compatibilidad
  logo?: string // Alias de logoUrl
  banner?: string // Alias de bannerUrl

  // Contenido de secciones
  aboutUs?: string
  heroTitle?: string

  // Información de contacto
  phone?: string
  email?: string
  address?: string
  city?: string

  // Redes sociales
  facebookUrl?: string
  instagramUrl?: string
  whatsappNumber?: string

  // Features/Beneficios
  features?: {
    icon: string
    title: string
    description: string
  }[]

  // Configuración de tienda
  category?: string
  themeId?: string
  currency?: string
  isActive?: boolean

  // Full config object from backend (includes delivery, coordinates, etc.)
  config?: {
    branding?: any
    contact?: {
      phone?: string
      email?: string
      address?: string
      city?: string
      currentCountry?: string
      coordinates?: {
        latitude: number
        longitude: number
      }
    }
    socialMedia?: any
    delivery?: {
      type: 'pending' | 'free' | 'fixed' | 'calculated'
      value: number
    }
    aboutUs?: string
    features?: any
    category?: string
    themeId?: string
    currency?: string
  }

  // Legacy fields para compatibilidad
  theme?: Theme
  user?: User
  contact?: {
    phone?: string
    email?: string
    address?: string
    whatsapp?: string
  }
  stats?: {
    totalProducts: number
    totalOrders: number
    totalViews: number
    rating?: number
  }
  createdAt?: Date
  updatedAt?: Date

  // Professional theme system
  professionalTheme?: {
    themeId: string
    customColors: {
      primary: string
      secondary: string
    }
  }
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  icon?: string
  productCount: number
  isActive?: boolean
  storeId?: string
}

export interface Brand {
  id: string
  name: string
  slug: string
  logo?: string
  description?: string
  website?: string
  isActive: boolean
}

export interface Product {
  id: string
  storeProductId: string // ID del StoreProduct en inventory
  name: string
  slug: string
  description?: string
  price: number
  originalPrice?: number
  stock: number
  sku?: string
  images: string[]
  category: Category
  brand?: Brand
  isActive: boolean
  isFeatured: boolean
  tags: string[]
  specifications?: Record<string, string>
  storeId: string
  createdAt: Date
  updatedAt: Date
}

export interface CartItem {
  id: string
  product: Product
  quantity: number
  price: number
  notes?: string
}

export interface Cart {
  items: CartItem[]
  total: number
  itemCount: number
  storeId: string
}

export interface Order {
  id: string
  customerName: string
  customerPhone: string
  customerEmail?: string
  items: CartItem[]
  total: number
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'delivered' | 'cancelled'
  deliveryMethod: 'pickup' | 'delivery'
  deliveryAddress?: string
  notes?: string
  storeId: string
  createdAt: Date
  updatedAt: Date
}

export interface ProductFilters {
  search?: string
  category?: string
  brand?: string
  minPrice?: number
  maxPrice?: number
  inStock?: boolean
  sortBy?: 'name' | 'price' | 'newest' | 'popular'
  sortOrder?: 'asc' | 'desc'
}

export interface StoreFilters {
  search?: string
  category?: string
  isActive?: boolean
}

// Legacy types para compatibilidad
export type StoreTheme = Theme
export type { Store as StoreType, Product as ProductType }
