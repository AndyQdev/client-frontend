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

// Store from backend
export interface StoreEntity {
  id: string
  createdAt: string
  updatedAt: string
  name: string
  slug: string
  logoUrl?: string
  description?: string
  colorTheme?: string
  bannerUrl?: string
  faviconUrl?: string
  aboutUs?: string
  heroTitle?: string
  phone?: string
  currentCountry?: string
  email?: string
  address?: string
  city?: string
  facebookUrl?: string
  instagramUrl?: string
  whatsappNumber?: string
  features?: {
    icon: string
    title: string
    description: string
  }[]
  category?: string
  themeId?: string
  isActive: boolean
  currency?: string
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
  name: string
  description?: string
}

// Brand from backend
export interface BrandEntity {
  id: string
  createdAt: string
  updatedAt: string
  name: string
  description?: string
}

// Product from backend
export interface ProductEntity {
  id: string
  createdAt: string
  updatedAt: string
  name: string
  description?: string
  price: number | string // Can be string from backend
  stockQuantity: number
  imageUrls: string | string[] // Can be comma-separated string or array
  sku?: string
  isFeatured: boolean
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
}
