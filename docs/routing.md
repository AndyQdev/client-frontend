# 🛣️ Sistema de Ruteo y URLs

## 🌐 Estructura de URLs

### **Marketplace Central**
```
🏠 midominio.com/
├── Lista todas las tiendas disponibles
├── Búsqueda de tiendas
├── Categorías de tiendas
└── Tiendas destacadas
```

### **Tiendas Individuales**
```
🏪 midominio.com/{slug}/
├── 📦 midominio.com/{slug}/productos
│   ├── midominio.com/{slug}/productos/categoria/{categoria}
│   └── midominio.com/{slug}/productos/{producto-id}
├── 🛒 midominio.com/{slug}/carrito
├── 📞 midominio.com/{slug}/contacto
└── ℹ️ midominio.com/{slug}/acerca-de
```

## 📁 Estructura de App Router

```
app/
├── page.tsx                    # 🏠 Marketplace (/)
├── layout.tsx                  # Layout global
├── loading.tsx                 # Loading del marketplace
├── not-found.tsx              # 404 global
│
├── (stores)/                   # 🏪 Grupo de rutas para tiendas
│   └── [slug]/                # Ruta dinámica por usuario
│       ├── page.tsx           # Tienda principal
│       ├── layout.tsx         # Layout de tienda (header, footer)
│       ├── loading.tsx        # Loading de tienda
│       ├── not-found.tsx      # 404 de tienda
│       │
│       ├── productos/         # 📦 Sección de productos
│       │   ├── page.tsx       # Lista de productos
│       │   ├── [id]/          # Producto individual
│       │   │   └── page.tsx   # Detalle del producto
│       │   └── categoria/     # Filtros por categoría
│       │       └── [categoria]/
│       │           └── page.tsx
│       │
│       ├── carrito/           # 🛒 Carrito de compras
│       │   └── page.tsx
│       │
│       ├── contacto/          # 📞 Información de contacto
│       │   └── page.tsx
│       │
│       └── acerca-de/         # ℹ️ Sobre la tienda
│           └── page.tsx
│
├── buscar/                    # 🔍 Búsqueda global
│   └── page.tsx
│
└── categoria-tiendas/         # 🏬 Categorías de tiendas
    └── [categoria]/
        └── page.tsx
```

## 🔄 Parámetros de Ruta

### **Parámetros Dinámicos**
```typescript
// app/(stores)/[slug]/page.tsx
export default async function StorePage({
  params
}: {
  params: { slug: string }
}) {
  const store = await getStoreBySlug(params.slug)
  // ...
}

// app/(stores)/[slug]/productos/[id]/page.tsx
export default async function ProductPage({
  params
}: {
  params: { slug: string; id: string }
}) {
  const product = await getProduct(params.slug, params.id)
  // ...
}
```

### **Search Params**
```typescript
// URLs como: /user1/productos?categoria=ropa&precio=0-100
export default function ProductsPage({
  params,
  searchParams
}: {
  params: { slug: string }
  searchParams: { categoria?: string; precio?: string; buscar?: string }
}) {
  // Filtrar productos basado en searchParams
}
```

## 🎯 Ejemplos de URLs Reales

### **Marketplace**
- `midominio.com/` → Lista de tiendas
- `midominio.com/buscar?q=ropa` → Buscar tiendas que vendan ropa
- `midominio.com/categoria-tiendas/moda` → Tiendas de moda

### **Tienda: "juan-electronics"**
- `midominio.com/juan-electronics` → Tienda principal
- `midominio.com/juan-electronics/productos` → Todos los productos
- `midominio.com/juan-electronics/productos/categoria/computadoras` → Solo computadoras
- `midominio.com/juan-electronics/productos/laptop-dell-123` → Producto específico
- `midominio.com/juan-electronics/carrito` → Carrito de compras
- `midominio.com/juan-electronics/contacto` → Info de contacto

### **Tienda: "maria-fashion"**
- `midominio.com/maria-fashion` → Tienda principal
- `midominio.com/maria-fashion/productos?categoria=vestidos&precio=0-50` → Vestidos baratos
- `midominio.com/maria-fashion/productos/vestido-azul-456` → Vestido específico

## 🛡️ Validaciones de Ruta

### **Middleware de Validación**
```typescript
// middleware.ts
export function middleware(request: NextRequest) {
  const slug = request.nextUrl.pathname.split('/')[1]

  if (slug && !isValidStoreSlug(slug)) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}
```

### **Validación en Componentes**
```typescript
// app/(stores)/[slug]/page.tsx
export default async function StorePage({ params }: { params: { slug: string } }) {
  const store = await getStoreBySlug(params.slug)

  if (!store || !store.isActive) {
    notFound() // Redirige a not-found.tsx
  }

  // Renderizar tienda...
}
```

## 🔗 Navegación Interna

### **Links entre páginas**
```typescript
import Link from 'next/link'

// Desde marketplace a tienda
<Link href="/juan-electronics">Ver tienda de Juan</Link>

// Dentro de una tienda
<Link href="/juan-electronics/productos">Ver productos</Link>
<Link href="/juan-electronics/productos/laptop-123">Ver laptop</Link>

// Volver al marketplace
<Link href="/">Ver todas las tiendas</Link>
```

### **Navegación programática**
```typescript
import { useRouter } from 'next/navigation'

function ProductCard({ product, storeSlug }) {
  const router = useRouter()

  const viewProduct = () => {
    router.push(`/${storeSlug}/productos/${product.id}`)
  }

  return <button onClick={viewProduct}>Ver producto</button>
}
```

## 📱 URLs amigables para móvil

### **URLs cortas y claras**
✅ **Bien**: `/juan/productos/laptop-123`
❌ **Mal**: `/stores/juan-electronics/products/laptop-dell-inspiron-123-abc`

### **Slug generation**
```typescript
// Generar slugs amigables
function generateSlug(storeName: string): string {
  return storeName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// "Juan's Electronics" → "juans-electronics"
// "María Modas" → "maria-modas"
```

## 🚀 SEO y Meta Tags

### **Meta tags por tienda**
```typescript
// app/(stores)/[slug]/layout.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const store = await getStoreBySlug(params.slug)

  return {
    title: `${store.name} - Tienda Online`,
    description: store.description,
    openGraph: {
      title: store.name,
      description: store.description,
      images: [store.logo],
    },
  }
}
```

### **Sitemap dinámico**
```typescript
// app/sitemap.ts
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const stores = await getAllActiveStores()

  return [
    { url: 'https://midominio.com', lastModified: new Date() },
    ...stores.map((store) => ({
      url: `https://midominio.com/${store.slug}`,
      lastModified: store.updatedAt,
    })),
  ]
}
```

Esta estructura de ruteo te permite:
1. **Escalabilidad** - Fácil agregar nuevas rutas
2. **SEO optimizado** - URLs amigables y meta tags dinámicos
3. **UX consistente** - Navegación intuitiva
4. **Performance** - Lazy loading automático con App Router