# 🔌 Integración con Backend (ventas-service)

## 🏗️ Arquitectura de Comunicación

```
┌─────────────────┐    HTTP/REST    ┌─────────────────┐
│   web-client    │◀─────────────────▶│  ventas-service │
│   (Next.js)     │    JSON APIs     │   (NestJS)      │
│                 │                  │                 │
│ • Server        │                  │ • Controllers   │
│   Components    │                  │ • Services      │
│ • API Routes    │                  │ • Database      │
│ • Client        │                  │ • WhatsApp Bot  │
│   Components    │                  │ • IA Integration│
└─────────────────┘                  └─────────────────┘
```

## 🛠️ Endpoints Necesarios

### **Tiendas (Stores)**
```typescript
// GET /api/stores - Lista todas las tiendas activas (marketplace)
interface Store {
  id: string
  slug: string
  name: string
  description?: string
  logo?: string
  theme: ThemeConfig
  isActive: boolean
  user: {
    id: string
    name: string
    email: string
  }
  createdAt: Date
  updatedAt: Date
}

// GET /api/stores/:slug - Obtener tienda por slug
// GET /api/stores/:slug/products - Productos de la tienda
// GET /api/stores/:slug/categories - Categorías de la tienda
```

### **Productos (Products)**
```typescript
// GET /api/stores/:slug/products
interface Product {
  id: string
  name: string
  description?: string
  price: number
  stock: number
  images: string[]
  category: {
    id: string
    name: string
    slug: string
  }
  brand?: {
    id: string
    name: string
    logo?: string
  }
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}

// GET /api/stores/:slug/products/:id - Producto específico
// GET /api/stores/:slug/products?category=:cat&search=:term - Filtros
```

### **Categorías (Categories)**
```typescript
// GET /api/stores/:slug/categories
interface Category {
  id: string
  name: string
  slug: string
  description?: string
  image?: string
  productCount: number
  isActive: boolean
}
```

### **Pedidos (Orders)**
```typescript
// POST /api/stores/:slug/orders - Crear pedido
interface CreateOrderRequest {
  customerName: string
  customerPhone: string
  customerEmail?: string
  items: {
    productId: string
    quantity: number
    price: number
  }[]
  notes?: string
  deliveryMethod: 'pickup' | 'delivery'
  deliveryAddress?: string
}

// GET /api/orders/:id - Obtener pedido (para confirmación)
```

### **WhatsApp Integration**
```typescript
// POST /api/whatsapp/send-order - Enviar pedido por WhatsApp
interface WhatsAppOrderRequest {
  storeId: string
  orderId: string
  customerPhone: string
  message: string
}
```

## 📁 Estructura de lib/api.ts

```typescript
// lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'

class ApiClient {
  private baseURL: string

  constructor(baseURL: string) {
    this.baseURL = baseURL
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`)
    }

    return response.json()
  }

  // Métodos para tiendas
  async getAllStores(): Promise<Store[]> {
    return this.request<Store[]>('/api/stores')
  }

  async getStoreBySlug(slug: string): Promise<Store | null> {
    try {
      return await this.request<Store>(`/api/stores/${slug}`)
    } catch {
      return null
    }
  }

  async getStoreProducts(
    slug: string,
    filters?: {
      category?: string
      search?: string
      minPrice?: number
      maxPrice?: number
    }
  ): Promise<Product[]> {
    const params = new URLSearchParams()
    if (filters?.category) params.append('category', filters.category)
    if (filters?.search) params.append('search', filters.search)
    if (filters?.minPrice) params.append('minPrice', filters.minPrice.toString())
    if (filters?.maxPrice) params.append('maxPrice', filters.maxPrice.toString())

    const query = params.toString() ? `?${params.toString()}` : ''
    return this.request<Product[]>(`/api/stores/${slug}/products${query}`)
  }

  // Métodos para productos
  async getProduct(slug: string, productId: string): Promise<Product | null> {
    try {
      return await this.request<Product>(`/api/stores/${slug}/products/${productId}`)
    } catch {
      return null
    }
  }

  // Métodos para categorías
  async getStoreCategories(slug: string): Promise<Category[]> {
    return this.request<Category[]>(`/api/stores/${slug}/categories`)
  }

  // Métodos para pedidos
  async createOrder(slug: string, orderData: CreateOrderRequest): Promise<Order> {
    return this.request<Order>(`/api/stores/${slug}/orders`, {
      method: 'POST',
      body: JSON.stringify(orderData),
    })
  }

  // WhatsApp integration
  async sendOrderToWhatsApp(orderData: WhatsAppOrderRequest): Promise<void> {
    await this.request('/api/whatsapp/send-order', {
      method: 'POST',
      body: JSON.stringify(orderData),
    })
  }
}

export const apiClient = new ApiClient(API_BASE_URL)

// Funciones helper para Server Components
export const getStoreBySlug = apiClient.getStoreBySlug.bind(apiClient)
export const getStoreProducts = apiClient.getStoreProducts.bind(apiClient)
export const getStoreCategories = apiClient.getStoreCategories.bind(apiClient)
export const getProduct = apiClient.getProduct.bind(apiClient)
```

## 🔄 Patrones de Uso

### **Server Components (SSR)**
```typescript
// app/(stores)/[slug]/page.tsx
export default async function StorePage({ params }: { params: { slug: string } }) {
  // Fetch en el servidor (mejor SEO y performance)
  const store = await getStoreBySlug(params.slug)
  const products = await getStoreProducts(params.slug)

  if (!store) {
    notFound()
  }

  return (
    <main>
      <StoreHeader {...store} />
      <ProductGrid products={products} />
    </main>
  )
}
```

### **Client Components (CSR)**
```typescript
// components/ProductSearch.tsx
'use client'
import { useState, useEffect } from 'react'
import { apiClient } from '@/lib/api'

export default function ProductSearch({ storeSlug }: { storeSlug: string }) {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [filters, setFilters] = useState({
    search: '',
    category: '',
  })

  useEffect(() => {
    async function searchProducts() {
      setLoading(true)
      try {
        const results = await apiClient.getStoreProducts(storeSlug, filters)
        setProducts(results)
      } catch (error) {
        console.error('Error searching products:', error)
      } finally {
        setLoading(false)
      }
    }

    searchProducts()
  }, [storeSlug, filters])

  return (
    <div>
      <input
        value={filters.search}
        onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
        placeholder="Buscar productos..."
      />
      {loading ? <div>Cargando...</div> : <ProductGrid products={products} />}
    </div>
  )
}
```

## 🌐 Variables de Entorno

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.midominio.com
NEXT_PUBLIC_WHATSAPP_NUMBER=+1234567890
NEXT_PUBLIC_SITE_URL=https://midominio.com
```

## 🔒 Manejo de Errores

```typescript
// lib/api-error.ts
export class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public code?: string
  ) {
    super(message)
    this.name = 'ApiError'
  }
}

// Uso en componentes
try {
  const store = await getStoreBySlug(slug)
} catch (error) {
  if (error instanceof ApiError) {
    if (error.status === 404) {
      // Tienda no encontrada
      notFound()
    } else if (error.status >= 500) {
      // Error del servidor
      return <ErrorMessage>Error del servidor</ErrorMessage>
    }
  }
}
```

## 📡 Optimizaciones

### **Caché de Respuestas**
```typescript
// Next.js automático con fetch
async function getStoreBySlug(slug: string) {
  const response = await fetch(`${API_URL}/stores/${slug}`, {
    next: { revalidate: 300 } // Cache por 5 minutos
  })
  return response.json()
}
```

### **React Query (Opcional)**
```typescript
// Para manejo avanzado de caché en client-side
import { useQuery } from '@tanstack/react-query'

function useStoreProducts(slug: string, filters: ProductFilters) {
  return useQuery({
    queryKey: ['store-products', slug, filters],
    queryFn: () => apiClient.getStoreProducts(slug, filters),
    staleTime: 5 * 60 * 1000, // 5 minutos
  })
}
```

## 🚀 Deployment y Configuración

### **URLs de API por Ambiente**
```typescript
const getApiUrl = () => {
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3001' // ventas-service local
  }
  if (process.env.NODE_ENV === 'staging') {
    return 'https://api-staging.midominio.com'
  }
  return 'https://api.midominio.com' // producción
}
```

Esta integración te permite:
1. **Separación clara** entre frontend y backend
2. **Flexibilidad** para cambiar el backend sin afectar el frontend
3. **Performance** con SSR y caché inteligente
4. **Escalabilidad** para agregar nuevos endpoints
5. **Type safety** con TypeScript