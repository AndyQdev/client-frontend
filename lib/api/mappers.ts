import { StoreEntity, ProductEntity, CategoryEntity } from './types'
import { Store, Product, Category } from '../types'

/**
 * Mapeo de categorías a temas por defecto
 */
const CATEGORY_TO_THEME: Record<string, string> = {
  'tecnologia': 'modern',
  'electronica': 'modern',
  'technology': 'modern',
  'moda': 'elegante',
  'fashion': 'elegante',
  'ropa': 'elegante',
  'hogar': 'minimal',
  'home': 'minimal',
  'casa': 'minimal',
  'abarrotes': 'minimal',
  'grocery': 'minimal',
  'belleza': 'classic',
  'beauty': 'classic',
  'cosmeticos': 'classic',
  'deportes': 'darkmode',
  'sports': 'darkmode',
  'arte': 'creative',
  'art': 'creative',
  'artesania': 'creative',
}

/**
 * Obtiene el tema por defecto basado en la categoría de la tienda
 */
function getDefaultTheme(category?: string): string {
  if (!category) return 'minimal' // Tema por defecto global
  
  const normalizedCategory = category.toLowerCase().trim()
  return CATEGORY_TO_THEME[normalizedCategory] || 'minimal'
}

/**
 * Convert backend StoreEntity to frontend Store type
 */
export function mapStoreEntityToStore(entity: StoreEntity): Store {
  const config = entity.config || {} as any
  const branding = config.branding || {}
  const contact = config.contact || {}
  const socialMedia = config.socialMedia || {}

  // Obtener themeId: usa el configurado o asigna uno por defecto basado en categoría
  const themeId = config.themeId || getDefaultTheme(config.category)

  return {
    id: entity.id,
    slug: entity.slug,
    name: entity.name,
    description: entity.description,

    // Branding - con valores por defecto para evitar placeholders externos
    logoUrl: branding.logoUrl || undefined,
    bannerUrl: branding.bannerUrl || undefined,
    faviconUrl: branding.faviconUrl || undefined,
    
    // Alias para compatibilidad (sin placeholders)
    logo: branding.logoUrl || undefined,
    banner: branding.bannerUrl || undefined,

    // Content
    aboutUs: config.aboutUs,
    heroTitle: branding.heroTitle,

    // Contact
    phone: contact.phone,
    email: contact.email,
    address: contact.address,
    city: contact.city,

    // Social Media
    facebookUrl: socialMedia.facebookUrl,
    instagramUrl: socialMedia.instagramUrl,
    whatsappNumber: contact.phone,

    // Features
    features: config.features as any,

    // Config
    category: config.category,
    themeId: themeId, // Siempre tendrá un valor (configurado o por defecto)
    currency: config.currency,
    isActive: entity.enabled, // Map enabled from backend to isActive for frontend

    // Stats - default values
    stats: {
      totalProducts: 0,
      totalOrders: 0,
      totalViews: 0,
      rating: 5.0,
    },

    // Legacy contact for compatibility
    contact: {
      email: contact.email || '',
      phone: contact.phone || '',
      address: contact.address || '',
    },

    // IMPORTANT: Include the full config object for delivery and other configurations
    config: entity.config,
  } as Store
}

/**
 * Convert backend ProductEntity to frontend Product type
 */
export function mapProductEntityToProduct(entity: ProductEntity, categories?: CategoryEntity[]): Product {
  // Parse specifications if it's a string
  let specifications: Record<string, string> = {}
  if (entity.specifications) {
    try {
      specifications = typeof entity.specifications === 'string'
        ? JSON.parse(entity.specifications)
        : entity.specifications
    } catch (e) {
      console.error('Error parsing specifications:', e)
    }
  }

  // Parse tags - handle both string and array formats
  let tags: string[] = []
  if (entity.tags) {
    if (typeof entity.tags === 'string') {
      tags = entity.tags.split(',').map(t => t.trim())
    } else if (Array.isArray(entity.tags)) {
      tags = entity.tags
    }
  }

  // Parse image URLs - handle both camelCase and snake_case, string and array formats
  const imageUrlsSource = entity.imageUrls || entity.image_urls
  let imageUrls: string[] = []
  if (imageUrlsSource) {
    if (typeof imageUrlsSource === 'string') {
      imageUrls = imageUrlsSource.split(',').map(url => url.trim()).filter(url => url)
    } else if (Array.isArray(imageUrlsSource)) {
      imageUrls = imageUrlsSource
    }
  }

  // Get category - either from entity.category object or find in categories array
  const categoryObj = entity.category || categories?.find(c => c.id === (entity.category_id || ''))

  // Handle price - can be string, number, or undefined (with fallback to 0)
  let price = 0
  if (entity.price !== undefined && entity.price !== null) {
    price = typeof entity.price === 'string' ? parseFloat(entity.price) : entity.price
  }

  // Get stock quantity - support both camelCase and snake_case
  const stockQuantity = entity.stockQuantity ?? entity.stock_quantity ?? 0

  // Get isFeatured - support both camelCase and snake_case
  const isFeatured = entity.isFeatured ?? entity.is_featured ?? false

  return {
    id: entity.id,
    storeProductId: (entity as any).storeProductId || entity.id, // ID del StoreProduct, fallback a product.id
    name: entity.name,
    slug: entity.name.toLowerCase().replace(/\s+/g, '-'), // Generate slug from name
    description: entity.description || '',
    price: price,
    images: imageUrls, // All images
    category: categoryObj ? {
      id: categoryObj.id,
      name: categoryObj.name,
      slug: categoryObj.name.toLowerCase().replace(/\s+/g, '-'),
      description: categoryObj.description,
      icon: categoryObj.icon,
      productCount: categoryObj.productCount || 0,
    } : {
      id: entity.category_id || '',
      name: 'Sin categoría',
      slug: 'sin-categoria',
      description: '',
      icon: '',
      productCount: 0,
    },
    stock: stockQuantity,
    sku: entity.sku,
    isFeatured: isFeatured,
    isActive: true, // Assume active if retrieved from backend
    tags,
    specifications,
    storeId: entity.store_id || '',
    createdAt: new Date(entity.createdAt),
    updatedAt: new Date(entity.updatedAt),
  }
}

/**
 * Convert backend CategoryEntity to frontend Category type
 */
export function mapCategoryEntityToCategory(entity: CategoryEntity): Category {
  return {
    id: entity.id,
    name: entity.name,
    slug: entity.name.toLowerCase().replace(/\s+/g, '-'),
    description: entity.description,
    icon: entity.icon,
    productCount: entity.productCount || 0,
  }
}
