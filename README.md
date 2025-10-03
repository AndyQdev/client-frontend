# 🏪 SnapStore - Web Client MVP

Un **marketplace multi-tienda** profesional construido con Next.js 14, diseñado para que cada usuario tenga su propia tienda online con temas personalizables y carrito funcional.

## ✨ Características Implementadas

### 🏠 **Marketplace Central**
- Lista de todas las tiendas disponibles
- Tarjetas de tienda con información y estadísticas
- Búsqueda y navegación intuitiva
- Stats del marketplace en tiempo real

### 🏪 **Tiendas Individuales**
- URL única por tienda: `midominio.com/juan-electronics`
- Temas visuales personalizables (6 temas predefinidos)
- Header con información de contacto y WhatsApp
- Banner personalizable con estadísticas
- Integración completa con el sistema de temas

### 🛒 **Sistema de Carrito Completo**
- Persistencia en localStorage con Zustand
- Drawer lateral animado
- Gestión de cantidades y productos
- Integración con WhatsApp para pedidos
- Botones de agregar al carrito con variantes

### 🔍 **Búsqueda y Filtros**
- Búsqueda en tiempo real por nombre
- Filtros por categoría con contadores
- Ordenamiento por nombre, precio, fecha
- UI responsiva y accesible

### 📱 **Páginas de Producto**
- Galería de imágenes con thumbnails
- Información detallada con especificaciones
- Reviews y ratings (mock)
- Badges de promociones y stock
- Integración con WhatsApp para consultas
- Breadcrumb navigation

### 🎨 **Sistema de Temas Dinámicos**
- 6 temas predefinidos profesionales:
  - **Elegante** (Premium - Negro/Dorado)
  - **Natural** (Eco-friendly - Verde/Marrón)
  - **Corporativo** (Profesional - Azul/Gris)
  - **Femenino** (Delicado - Rosa/Violeta)
  - **Moderno** (Tech - Violeta/Negro)
  - **Clásico** (Tradicional - Rojo/Blanco)
- CSS Variables dinámicas
- Cambio de tema instantáneo sin recarga

### ⚡ **Performance y UX**
- Next.js 14 con App Router
- Server-Side Rendering (SSR)
- Animaciones suaves y micro-interacciones
- Responsive design completo
- Estados de loading y error

## 🚀 Cómo Ejecutar

### Prerequisitos
```bash
Node.js 18+
npm o yarn
```

### Instalación
```bash
# Clonar e instalar dependencias
cd web-client
npm install

# Ejecutar en desarrollo
npm run dev
```

### Variables de Entorno
```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001  # URL del ventas-service
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=+1234567890
```

## 🌐 URLs Disponibles

### Marketplace
- `http://localhost:3000/` - Lista de todas las tiendas

### Tiendas de Ejemplo
- `http://localhost:3000/juan-electronics` - Tienda de electrónicos (Tema Corporativo)
- `http://localhost:3000/maria-fashion` - Tienda de moda (Tema Femenino)
- `http://localhost:3000/carlos-organico` - Productos orgánicos (Tema Natural)
- `http://localhost:3000/ana-belleza` - Productos de belleza (Tema Elegante)
- `http://localhost:3000/roberto-deportes` - Deportes (Tema Moderno)

### Productos de Ejemplo
- `http://localhost:3000/juan-electronics/productos/1` - iPhone 15 Pro
- `http://localhost:3000/maria-fashion/productos/4` - Vestido Elegante Rosa
- `http://localhost:3000/carlos-organico/productos/6` - Manzanas Orgánicas

## 📁 Estructura del Proyecto

```
web-client/
├── app/                          # App Router de Next.js
│   ├── page.tsx                 # Marketplace central
│   ├── layout.tsx               # Layout global
│   └── (stores)/                # Grupo de rutas para tiendas
│       └── [slug]/              # Ruta dinámica por tienda
│           ├── page.tsx         # Página principal de tienda
│           ├── not-found.tsx    # 404 personalizado
│           └── productos/       # Subrutas de productos
│               └── [id]/
│                   └── page.tsx # Detalle de producto
├── components/                   # Componentes reutilizables
│   ├── MarketplaceHeader.tsx    # Header del marketplace
│   ├── StoreGrid.tsx           # Grid de tiendas
│   ├── StoreCard.tsx           # Tarjeta de tienda
│   ├── StoreHeader.tsx         # Header de tienda individual
│   ├── ProductGrid.tsx         # Grid de productos
│   ├── ProductCard.tsx         # Tarjeta de producto
│   ├── ProductDetail.tsx       # Detalle de producto
│   ├── CartDrawer.tsx          # Drawer del carrito
│   ├── CartButton.tsx          # Botón del carrito
│   ├── AddToCartButton.tsx     # Botón agregar al carrito
│   ├── ProductSearch.tsx       # Búsqueda de productos
│   └── CategoryFilter.tsx      # Filtro por categorías
├── lib/                        # Utilidades y lógica
│   ├── types.ts               # Tipos TypeScript
│   ├── themes.ts              # Definición de temas
│   ├── theming.ts             # Utilidades de temas
│   ├── store.ts               # Store de Zustand
│   └── fake-data.ts           # Datos de prueba
├── styles/
│   └── globals.css            # Estilos globales y animaciones
└── docs/                      # Documentación completa
    ├── README.md              # Visión general
    ├── store-features.md      # Funcionalidades y roadmap
    ├── theming.md             # Sistema de temas
    ├── routing.md             # Sistema de ruteo
    └── api-integration.md     # Integración con backend
```

## 🎯 Datos de Prueba

### Tiendas Incluidas
- **Juan Electronics** - 45 productos, tema corporativo
- **María Fashion** - 78 productos, tema femenino
- **Carlos Orgánico** - 32 productos, tema natural
- **Ana Belleza** - 56 productos, tema elegante
- **Roberto Deportes** - 67 productos, tema moderno

### Productos de Ejemplo
- Electrónicos: iPhone, Samsung Galaxy, MacBook Pro
- Moda: Vestidos, blusas, pantalones
- Orgánicos: Frutas, verduras, granos
- Belleza: Maquillaje, cuidado facial, perfumes
- Deportes: Fútbol, running, gimnasio

## 🛠️ Tecnologías Utilizadas

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + CSS Variables dinámicas
- **State Management**: Zustand con persistencia
- **Icons**: Lucide React
- **Language**: TypeScript
- **Performance**: SSR + Optimización automática

## 🔄 Integración con Backend

El proyecto está preparado para conectar con `ventas-service`. Solo necesitas:

1. Cambiar las importaciones de `@/lib/fake-data` por `@/lib/api`
2. Configurar las variables de entorno correctas
3. Los tipos TypeScript ya están listos para la API real

## 📚 Documentación Completa

Consulta la carpeta `docs/` para información detallada sobre:
- Funcionalidades implementadas y roadmap
- Sistema de temas personalizable
- Estructura de ruteo y URLs
- Integración con backend
- Guía de desarrollo

## ✅ MVP Completado

Este MVP incluye todo lo esencial para un marketplace multi-tienda profesional:

✅ Marketplace central con lista de tiendas
✅ Tiendas individuales con temas personalizables
✅ Sistema de carrito completo y funcional
✅ Páginas de producto detalladas
✅ Búsqueda y filtros avanzados
✅ Integración WhatsApp para contacto
✅ Responsive design y animaciones
✅ 6 temas predefinidos profesionales
✅ Datos de prueba realistas

**¡Listo para mostrar a clientes y empezar a vender!** 🚀
