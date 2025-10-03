# 🚀 Quick Start - SnapStore Web Client

## ⚡ Inicio Rápido

### **1. Setup del Proyecto**
```bash
# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local

# Ejecutar en desarrollo
npm run dev
```

### **2. Variables de Entorno Necesarias**
```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3001  # URL del ventas-service
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=+1234567890
```

## 🎯 Flujo de Desarrollo

### **Agregar una nueva tienda**
1. Usuario se registra en `ventas-frontend`
2. Crea productos en el panel admin
3. Su tienda aparece automáticamente en `midominio.com/su-slug`

### **Probar localmente**
```bash
# Con datos de prueba
curl http://localhost:3001/api/stores/tienda-prueba
curl http://localhost:3001/api/stores/tienda-prueba/products
```

## 📁 Estructura Clave

```
web-client/
├── app/
│   ├── page.tsx                    # 🏠 Marketplace
│   └── (stores)/[slug]/            # 🏪 Tiendas individuales
│       ├── page.tsx               # Página principal de tienda
│       ├── productos/             # Catálogo
│       └── carrito/               # Carrito
├── components/
│   ├── StoreHeader.tsx            # Header de tienda
│   ├── ProductGrid.tsx            # Grid de productos
│   └── WhatsAppButton.tsx         # Integración WhatsApp
├── lib/
│   ├── api.ts                     # Cliente API
│   └── theming.ts                 # Sistema de temas
└── docs/                          # 📚 Documentación
```

## 🛠️ Tareas Comunes

### **Agregar nuevo componente**
```typescript
// components/NuevoComponente.tsx
interface Props {
  // Definir props
}

export default function NuevoComponente({ }: Props) {
  return <div>Nuevo componente</div>
}
```

### **Crear nueva página**
```typescript
// app/(stores)/[slug]/nueva-pagina/page.tsx
export default async function NuevaPagina({
  params
}: {
  params: { slug: string }
}) {
  const store = await getStoreBySlug(params.slug)
  return <div>Nueva página para {store.name}</div>
}
```

### **Agregar nuevo endpoint**
```typescript
// lib/api.ts
async nuevaFuncionAPI(slug: string): Promise<Datos> {
  return this.request<Datos>(`/api/stores/${slug}/nueva-ruta`)
}
```

## 🎨 Trabajar con Temas

### **Aplicar tema a componente**
```typescript
// Usar clases de Tailwind que usan CSS variables
<button className="bg-primary hover:bg-primary-hover text-white">
  Botón con tema
</button>
```

### **Agregar nuevo tema**
```typescript
// lib/themes.ts
export const NUEVO_TEMA: Theme = {
  id: 'nuevo-tema',
  name: 'Nuevo Tema',
  colors: {
    primary: '#...',
    // resto de colores
  }
}
```

## 🔧 Scripts Útiles

```bash
# Desarrollo
npm run dev              # Servidor de desarrollo
npm run build           # Build de producción
npm run start           # Servidor de producción
npm run lint            # Linter

# Debugging
npm run type-check      # Verificar tipos TypeScript
```

## 🐛 Debugging Común

### **Tienda no aparece**
1. ✅ Verificar que existe en ventas-service
2. ✅ Verificar que `isActive: true`
3. ✅ Verificar conexión con API

### **Productos no cargan**
1. ✅ Verificar endpoint `/api/stores/:slug/products`
2. ✅ Verificar que los productos están activos
3. ✅ Revisar consola de errores

### **Tema no se aplica**
1. ✅ Verificar que el tema está en la base de datos
2. ✅ Verificar CSS variables en DevTools
3. ✅ Verificar que ThemeProvider está funcionando

## 📱 Testing

### **URLs para probar**
```bash
# Marketplace
http://localhost:3000/

# Tienda específica
http://localhost:3000/tienda-prueba

# Productos de tienda
http://localhost:3000/tienda-prueba/productos

# Producto específico
http://localhost:3000/tienda-prueba/productos/123
```

### **Casos de prueba**
- [ ] Marketplace lista todas las tiendas
- [ ] Tienda individual carga correctamente
- [ ] Productos se muestran en grid
- [ ] Búsqueda funciona
- [ ] Carrito agrega productos
- [ ] WhatsApp redirige correctamente
- [ ] Temas se aplican dinámicamente

## 🚀 Deploy

### **Build**
```bash
npm run build
npm run start
```

### **Variables de entorno en producción**
```bash
NEXT_PUBLIC_API_URL=https://api.midominio.com
NEXT_PUBLIC_SITE_URL=https://midominio.com
NEXT_PUBLIC_WHATSAPP_NUMBER=+1234567890
```

## 📞 Contacto y Soporte

- **Documentación completa**: `/docs/README.md`
- **API Integration**: `/docs/api-integration.md`
- **Sistema de temas**: `/docs/theming.md`
- **Ruteo**: `/docs/routing.md`

## ✅ Checklist para nuevos desarrolladores

- [ ] Proyecto corre en desarrollo
- [ ] Puede ver el marketplace en `/`
- [ ] Puede ver una tienda individual
- [ ] Puede agregar productos al carrito
- [ ] Entiende la estructura de carpetas
- [ ] Ha leído la documentación principal
- [ ] Puede hacer cambios a un tema
- [ ] Puede agregar un nuevo componente

¡Listo para empezar a desarrollar! 🎉