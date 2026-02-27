// API REAL CONECTADA AL BACKEND
import 'server-only'

import { Store, Product, Category } from '@/lib/types'
import { storeService } from './api/services/store.service'
import { productService, ProductFilters } from './api/services/product.service'
import { categoryService } from './api/services/category.service'
import { mapStoreEntityToStore, mapProductEntityToProduct, mapCategoryEntityToCategory } from './api/mappers'

export async function getStoreBySlug(slug: string): Promise<Store | null> {
  try {
    const storeEntity = await storeService.findBySlug(slug)
    console.log('STORE ENTITY:', storeEntity)
    return mapStoreEntityToStore(storeEntity)
  } catch (error) {
    console.error('Error fetching store by slug:', error)
    return null
  }
}

export async function getStoreProducts(storeId: string, filters?: ProductFilters): Promise<Product[]> {
  try {
    const { data: inventoryData } = await productService.findByStore(storeId, filters)
    console.log('📦 Products from API:', inventoryData?.length || 0)
    
    // Get store to access categories (productos ya vienen con category incluida del backend)
    const store = await storeService.findById(storeId)
    
    // El endpoint ahora devuelve inventarios con product anidado, similar a Caja.tsx
    return inventoryData.map(inventory => {
      console.log('📦 Inventory recibido:', inventory)
      console.log('📦 storeProductId:', inventory.storeProductId)
      
      // Extraer el producto del inventario
      const productEntity = {
        ...inventory.product,
        // Agregar campos adicionales desde el inventario
        storeProductId: inventory.storeProductId, // ID del StoreProduct para orders
        price: inventory.product.price || 0,
        stock: inventory.stockQuantity || 0,
        inStock: inventory.stockQuantity > 0,
        stockQuantity: inventory.stockQuantity,
      }
      
      console.log('📦 ProductEntity con storeProductId:', productEntity)
      
      const mappedProduct = mapProductEntityToProduct(productEntity, store.categories)
      console.log('📦 Producto mapeado:', mappedProduct)
      console.log('📦 storeProductId en producto mapeado:', mappedProduct.storeProductId)
      
      return mappedProduct
    })
  } catch (error) {
    console.error('Error fetching store products:', error)
    return []
  }
}

// Export ProductFilters type for use in components
export type { ProductFilters }

export async function getStoreCategories(storeId: string): Promise<Category[]> {
  try {
    const { data: categoryEntities } = await categoryService.findByStore(storeId)
    console.log('📦 Categories from API:', categoryEntities?.length || 0)
    return categoryEntities?.map(mapCategoryEntityToCategory) || []
  } catch (error) {
    console.error('Error fetching store categories:', error)
    return []
  }
}

export async function getProductById(id: string, storeId?: string): Promise<Product | null> {
  try {
    // Si tenemos storeId, usamos el endpoint público (no requiere auth)
    let productData: any
    if (storeId) {
      productData = await productService.findProductByStore(storeId, id)
    } else {
      // Fallback al endpoint privado (requiere auth)
      productData = await productService.findById(id)
    }
    
    // Mapear los datos al formato Product
    return {
      id: productData.id,
      name: productData.name,
      slug: productData.slug || productData.name.toLowerCase().replace(/\s+/g, '-'),
      description: productData.description || '',
      price: productData.price || 0,
      images: productData.imageUrls || [],
      category: {
        id: productData.category?.id || '',
        name: productData.category?.name || 'Sin categoría',
        slug: productData.category?.slug || 'sin-categoria',
        description: productData.category?.description,
        icon: productData.category?.icon,
        productCount: productData.category?.productCount || 0,
      },
      brand: productData.brand ? {
        id: productData.brand.id,
        name: productData.brand.name,
        slug: productData.brand.slug || productData.brand.name.toLowerCase().replace(/\s+/g, '-'),
        isActive: true,
      } : undefined,
      stock: productData.stockQuantity || 0,
      sku: productData.sku || '',
      isFeatured: productData.metadata?.isFeatured || false,
      isActive: true,
      tags: productData.tags || [],
      specifications: productData.specifications || {},
      storeId: storeId || '',
      createdAt: productData.createdAt || new Date(),
      updatedAt: productData.updatedAt || new Date(),
    }
  } catch (error) {
    console.error('Error fetching product by id:', error)
    return null
  }
}

export async function getAllStores(): Promise<Store[]> {
  try {
    const { data } = await storeService.findAll({ limit: 100 })
    console.log('📦 Stores from API:', data.length, 'stores')
    console.log('📦 First store:', data[0])
    
    const mappedStores = data.map(mapStoreEntityToStore)
    console.log('📦 Mapped stores:', mappedStores.length)
    console.log('📦 First mapped store:', mappedStores[0])
    
    return mappedStores
  } catch (error) {
    console.error('Error fetching all stores:', error)
    return []
  }
}
