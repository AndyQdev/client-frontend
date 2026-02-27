// Backend response wrapper
export interface ResponseMessage<T = any> {
  statusCode: number
  data: T
  message?: string
  countData?: number
}

// Query params for listing
export interface QueryDto {
  limit?: number
  offset?: number
  order?: 'ASC' | 'DESC'
  attr?: string
  value?: string
}

// Store branding configuration
export interface StoreBrandingConfig {
  logoUrl?: string
  bannerUrl?: string
  faviconUrl?: string
  colorTheme?: string
  heroTitle?: string
}

// Store contact information
export interface StoreContactInfo {
  phone?: string
  currentCountry?: string
  email?: string
  address?: string
  city?: string
  coordinates?: {
    latitude: number
    longitude: number
  }
}

// Store social media
export interface StoreSocialMedia {
  facebookUrl?: string
  instagramUrl?: string
}

// Store delivery configuration
export interface StoreDeliveryConfig {
  type: 'pending' | 'free' | 'fixed' | 'calculated'
  value: number
}

// Store complete configuration
export interface StoreConfig {
  branding: StoreBrandingConfig
  contact: StoreContactInfo
  socialMedia: StoreSocialMedia
  delivery?: StoreDeliveryConfig
  aboutUs?: string
  features?: object
  category?: string
  themeId?: string
  currency?: string
}

// Store from backend
export interface StoreEntity {
  id: string
  createdAt: string
  updatedAt: string
  enabled: boolean
  name: string
  slug: string
  description?: string
  config: StoreConfig
  userId: string
  user?: {
    id: string
    name: string
    email: string
  }
  categories?: CategoryEntity[]
  brands?: BrandEntity[]
}

// Category from backend
export interface CategoryEntity {
  id: string
  createdAt: string
  updatedAt: string
  enabled: boolean
  name: string
  description?: string
  icon?: string
  productCount?: number
}

// Brand from backend
export interface BrandEntity {
  id: string
  createdAt: string
  updatedAt: string
  enabled: boolean
  name: string
  description?: string
}

// Inventory item from backend (usado en findByStore)
export interface InventoryEntity {
  id: string
  createdAt: string
  updatedAt: string
  stockQuantity: number
  reservedQuantity?: number
  status?: string
  storeProductId: string // ID del StoreProduct
  product: ProductEntity // Producto anidado
  store?: StoreEntity
}

// Product from backend
export interface ProductEntity {
  id: string
  createdAt: string
  updatedAt: string
  enabled: boolean
  name: string
  description?: string
  price?: number | string // Optional - can be string from backend
  stockQuantity?: number
  imageUrls?: string | string[] // Can be comma-separated string or array
  sku?: string
  isFeatured?: boolean
  tags?: string | string[] | null // Can be string, array, or null
  specifications?: string | Record<string, string> | null
  category?: CategoryEntity // Category object if included
  brand?: BrandEntity // Brand object if included
  // Legacy snake_case support
  stock_quantity?: number
  image_urls?: string | string[]
  is_featured?: boolean
  category_id?: string
  brand_id?: string
  store_id?: string
  // Additional fields from store products
  stock?: number
  inStock?: boolean
  storeProducts?: Array<{
    id: string
    price: number
  }>
}
