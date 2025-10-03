# ALORA - Web Client (Tiendas Online)

## 🏪 Resumen del Proyecto

**ALORA Web Client** es el frontend de tiendas online para el ecosistema ALORA. Permite a los clientes finales navegar y comprar productos de las tiendas de nuestros usuarios.

## 🏗️ Arquitectura del Ecosistema SnapStore

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   ventas-frontend│    │  ventas-service │    │   web-client    │
│   (Panel Admin)  │────▶│   (Backend)     │◀───│ (Tiendas Online)│
│                 │    │                 │    │                 │
│ • Gestión Productos  │ • APIs REST      │    │ • Storefront    │
│ • Categorías     │    │ • Base de datos │    │ • Catálogo      │
│ • Marcas        │    │ • Autenticación │    │ • Carrito       │
│ • Pedidos       │    │ • WhatsApp Bot  │    │ • Checkout      │
│ • Estadísticas  │    │ • IA Integration│    │ • Multi-tenant  │
│ • Configuración │    │                 │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

## 🎯 Objetivo de Web-Client

Proporcionar a cada usuario registrado su propia **tienda online** donde sus clientes pueden:
- Ver el catálogo de productos
- Filtrar y buscar productos
- Agregar al carrito
- Realizar pedidos
- Contactar vía WhatsApp

## 🌐 Estructura de URLs

- **`midominio.com/`** → Marketplace: Lista todas las tiendas disponibles
- **`midominio.com/user1`** → Tienda específica del usuario "user1"
- **`midominio.com/user1/products/categoria`** → Productos por categoría
- **`midominio.com/user1/products/[id]`** → Detalle de producto

## 🚀 Tecnologías

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS + Sistema de temas dinámicos
- **State Management**: Zustand
- **Rendering**: Server-Side Rendering (SSR)
- **Optimización**: Automática con Next.js

## 📁 Estructura del Proyecto

```
web-client/
├── app/                    # App Router de Next.js
│   ├── page.tsx           # Marketplace (lista de tiendas)
│   ├── layout.tsx         # Layout global
│   └── (stores)/          # Grupo de rutas para tiendas
│       └── [slug]/        # Ruta dinámica para cada tienda
│           ├── page.tsx   # Página principal de la tienda
│           ├── layout.tsx # Layout específico de tienda
│           ├── loading.tsx# Loading state
│           ├── not-found.tsx # 404 personalizado
│           └── products/  # Subrutas de productos
├── components/            # Componentes reutilizables
│   ├── StoreHeader.tsx   # Cabecera de tienda
│   ├── ProductGrid.tsx   # Grid de productos
│   ├── ProductCard.tsx   # Tarjeta de producto
│   ├── WhatsAppButton.tsx# Botón de WhatsApp
│   └── AddToCart.tsx     # Funcionalidad de carrito
├── lib/                  # Utilidades y APIs
│   ├── api.ts           # Conexión con backend
│   └── theming.ts       # Sistema de temas
├── hooks/               # Custom hooks
├── styles/              # Estilos globales
└── docs/                # Documentación
```

## 🔄 Flujo de Datos

1. **Usuario administra** productos en `ventas-frontend`
2. **Datos se guardan** en `ventas-service` (PostgreSQL)
3. **Web-client consulta** datos vía API
4. **Renderiza tienda** personalizada para cada usuario
5. **Clientes navegan** y realizan pedidos
6. **Pedidos se procesan** en `ventas-service`

## 🎨 Sistema de Temas

Cada tienda puede tener su propio tema visual:
- Colores primarios, secundarios y de acento
- Logo personalizado
- Tipografía
- Estilos de botones y componentes

## 📚 Documentación Adicional

- [Arquitectura de Componentes](./components.md)
- [Sistema de Ruteo](./routing.md)
- [Funcionalidades de Tienda](./store-features.md)
- [Integración con Backend](./api-integration.md)
- [Guía de Temas](./theming.md)