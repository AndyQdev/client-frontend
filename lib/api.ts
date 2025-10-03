// TEMPORALMENTE USANDO FAKE DATA PARA EL MVP
// Cambiar por API real cuando esté listo el backend

import { Store, Product, Category } from '@/lib/types'
import {
  getStoreBySlug as getFakeStoreBySlug,
  getStoreProducts as getFakeStoreProducts,
  getStoreCategories as getFakeStoreCategories,
  getProductById as getFakeProductById,
  getAllStores as getFakeAllStores
} from './fake-data'

export async function getStoreBySlug(slug: string): Promise<Store | null> {
  // Simular async para mantener compatibilidad
  return Promise.resolve(getFakeStoreBySlug(slug))
}

export async function getStoreProducts(storeId: string): Promise<Product[]> {
  return Promise.resolve(getFakeStoreProducts(storeId))
}

export async function getStoreCategories(storeId: string): Promise<Category[]> {
  return Promise.resolve(getFakeStoreCategories(storeId))
}

export async function getProductById(id: string): Promise<Product | null> {
  return Promise.resolve(getFakeProductById(id))
}

export async function getAllStores(): Promise<Store[]> {
  return Promise.resolve(getFakeAllStores())
}

// API REAL COMENTADA - DESCOMENTA CUANDO TENGAS EL BACKEND LISTO
/*
import 'server-only'

const API_URL = process.env.API_URL || 'http://localhost:3001'

export async function getStoreBySlug(slug: string): Promise<Store | null> {
  try {
    const res = await fetch(`${API_URL}/stores/${slug}`, {
      next: { revalidate: 300, tags: [`store:${slug}`] },
    })
    if (!res.ok) return null
    return res.json()
  } catch {
    return null
  }
}

export async function getStoreProducts(storeId: string): Promise<Product[]> {
  try {
    const res = await fetch(`${API_URL}/stores/${storeId}/products`, {
      next: { revalidate: 300, tags: [`products:${storeId}`] },
    })
    if (!res.ok) return []
    return res.json()
  } catch {
    return []
  }
}
*/
