# Integración con Backend API

## 📋 Resumen

El frontend ahora está conectado con el backend real (`ventas-service`) para cargar datos dinámicamente.

## 🔌 Configuración

### Variables de Entorno

Crear archivo `.env.local` en la raíz del proyecto:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001/api
```

## 🏗️ Arquitectura

### Estructura de Archivos API

```
lib/api/
├── client.ts              # Cliente Axios configurado
├── types.ts              # Tipos del backend (StoreEntity, ProductEntity, etc.)
├── mappers.ts            # Conversores backend → frontend
├── index.ts              # Exports centralizados
└── services/
    ├── store.service.ts   # Servicio de tiendas
    └── product.service.ts # Servicio de productos
```

## 📡 Endpoints Utilizados

### 1. Listar Todas las Tiendas
**Endpoint:** `GET /store`
**Uso:** Página principal (marketplace)
**Params:**
- `limit` (opcional): Número de resultados
- `offset` (opcional): Para paginación

```typescript
const { data } = await storeService.findAll({ limit: 100 })
```

### 2. Obtener Tienda por Slug
**Endpoint:** `GET /store/slug/:slug`
**Uso:** Página de tienda individual
**Params:**
- `slug`: Identificador único de la tienda

```typescript
const store = await storeService.findBySlug('techstore-pro')
```

### 3. Obtener Productos de una Tienda
**Endpoint:** `GET /product/store/:storeId`
**Uso:** Cargar productos en página de tienda
**Params:**
- `storeId`: UUID de la tienda

```typescript
const products = await productService.findByStore(storeId)
```

## 🔄 Flujo de Datos

### Página Principal (`/`)
1. Server Component hace fetch a `/store`
2. Filtra tiendas activas (`isActive: true`)
3. Convierte `StoreEntity[]` → `Store[]` usando `mapStoreEntityToStore`
4. Renderiza grid de tiendas

### Página de Tienda (`/[slug]`)
1. Server Component hace fetch a `/store/slug/:slug`
2. Valida que la tienda existe y está activa
3. Extrae categorías desde `store.categories`
4. Hace fetch a `/product/store/:storeId` para obtener productos
5. Convierte datos usando mappers
6. Renderiza tema según `store.themeId`

## 🗺️ Mappers (Conversores)

### StoreEntity → Store
Convierte datos del backend al formato esperado por los componentes:

```typescript
mapStoreEntityToStore(entity: StoreEntity): Store
```

**Mapeo de campos:**
- `logoUrl` → `logo` (legacy)
- `phone`, `email`, `address` → `contact.*` (legacy)
- `features[]` → se mantiene igual
- `categories[]` → se extrae y mapea

### ProductEntity → Product
Convierte productos del backend:

```typescript
mapProductEntityToProduct(entity: ProductEntity, categories?: CategoryEntity[]): Product
```

**Transformaciones:**
- `image_urls` (string) → `image` y `images[]`
- `specifications` (JSON string) → objeto parseado
- `tags` (string CSV) → array
- `category_id` → busca en `categories[]` para objeto completo
- `stock_quantity` → `inStock` (boolean) + `stock` (number)

### CategoryEntity → Category
Convierte categorías:

```typescript
mapCategoryEntityToCategory(entity: CategoryEntity): Category
```

**Transformaciones:**
- Genera `slug` desde `name`
- Mantiene `id`, `name`, `description`

## 📦 Tipos de Datos

### StoreEntity (Backend)
```typescript
{
  id: string
  name: string
  slug: string
  logoUrl?: string
  bannerUrl?: string
  aboutUs?: string
  heroTitle?: string
  phone?: string
  email?: string
  address?: string
  city?: string
  facebookUrl?: string
  instagramUrl?: string
  whatsappNumber?: string
  features?: Feature[]
  category?: string
  themeId?: string
  isActive: boolean
  categories?: CategoryEntity[]
  // ...
}
```

### ProductEntity (Backend)
```typescript
{
  id: string
  name: string
  description?: string
  price: number
  stock_quantity: number
  image_urls: string
  sku?: string
  is_featured: boolean
  tags?: string
  specifications?: string // JSON string
  category_id: string
  brand_id: string
  store_id: string
  // ...
}
```

## ⚠️ Manejo de Errores

### En Página Principal
Si falla la carga de tiendas:
- Se muestra array vacío
- Mensaje: "No hay tiendas disponibles"
- Error se loguea en consola

### En Página de Tienda
Si falla la carga:
- Se ejecuta `notFound()` de Next.js
- Usuario ve página 404
- Error se loguea en consola

## 🔧 Axios Client

Cliente configurado con:
- Base URL desde env variable
- Headers por defecto: `Content-Type: application/json`
- Interceptor de errores para logging

```typescript
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
```

## 🚀 Próximos Pasos

- [ ] Agregar caché con Next.js `revalidate`
- [ ] Implementar páginas de error personalizadas
- [ ] Agregar loading states
- [ ] Implementar paginación en listado de tiendas
- [ ] Agregar filtros y búsqueda
