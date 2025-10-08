import { StoreEntity, ProductEntity, CategoryEntity } from './types'
import { Store, Product, Category } from '../types'

/**
 * Convert backend StoreEntity to frontend Store type
 */
export function mapStoreEntityToStore(entity: StoreEntity): Store {
  return {
    id: entity.id,
    slug: entity.slug,
    name: entity.name,
    description: entity.description,

    // Branding
    logoUrl: entity.logoUrl,
    bannerUrl: entity.bannerUrl,
    faviconUrl: entity.faviconUrl,

    // Content
    aboutUs: entity.aboutUs,
    heroTitle: entity.heroTitle,

    // Contact
    phone: entity.phone,
    email: entity.email,
    address: entity.address,
    city: entity.city,

    // Social Media
    facebookUrl: entity.facebookUrl,
    instagramUrl: entity.instagramUrl,
    whatsappNumber: entity.whatsappNumber,

    // Features
    features: entity.features,

    // Config
    category: entity.category,
    themeId: entity.themeId,
    currency: entity.currency,
    isActive: entity.isActive,

    // Stats - default values (can be updated later with real analytics)
    stats: {
      totalProducts: 0, // Will be updated when products are loaded
      totalOrders: 0,
      totalViews: 0,
      rating: 5.0,
    },

    // Legacy fields for compatibility
    logo: entity.logoUrl,
    contact: {
      email: entity.email || '',
      phone: entity.phone || '',
      address: entity.address || '',
    },
  }
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

  // Handle price - can be string or number
  const price = typeof entity.price === 'string' ? parseFloat(entity.price) : entity.price

  // Get stock quantity - support both camelCase and snake_case
  const stockQuantity = entity.stockQuantity ?? entity.stock_quantity ?? 0

  // Get isFeatured - support both camelCase and snake_case
  const isFeatured = entity.isFeatured ?? entity.is_featured ?? false

  return {
    id: entity.id,
    name: entity.name,
    description: entity.description || '',
    price: price,
    image: imageUrls[0] || '', // First image or empty string
    images: imageUrls, // All images
    category: categoryObj ? {
      id: categoryObj.id,
      name: categoryObj.name,
      slug: categoryObj.name.toLowerCase().replace(/\s+/g, '-'),
    } : {
      id: entity.category_id || '',
      name: 'Sin categoría',
      slug: 'sin-categoria',
    },
    inStock: stockQuantity > 0,
    stock: stockQuantity,
    sku: entity.sku,
    isFeatured: isFeatured,
    tags,
    specifications,
    rating: 5, // Default rating
    reviews: 0, // Default reviews
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
  }
}
