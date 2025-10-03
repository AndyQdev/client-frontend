# 📚 Documentación SnapStore Web Client

Bienvenido a la documentación completa del frontend de tiendas online de SnapStore.

## 🎯 ¿Qué es SnapStore Web Client?

SnapStore Web Client es la plataforma donde los **clientes finales** navegan y compran productos de las tiendas de nuestros usuarios. Es el "escaparate digital" que complementa al panel administrativo.

## 📖 Documentación Disponible

### **🚀 [Quick Start](./quick-start.md)**
*Inicio rápido para desarrolladores*
- Setup del proyecto
- Variables de entorno
- Scripts de desarrollo
- Casos de prueba
- **Ideal para**: Nuevos desarrolladores, setup inicial

### **🏗️ [README Principal](./README.md)**
*Visión general y arquitectura*
- Resumen del ecosistema ALORA
- Objetivo del web-client
- Estructura del proyecto
- Tecnologías utilizadas
- **Ideal para**: Entender el panorama general

### **🏪 [Funcionalidades de Tienda](./store-features.md)**
*Ideas y propuestas de features*
- Funcionalidades implementadas
- Propuestas por niveles (MVP, Avanzado, Premium)
- Marketplace central
- Sistema de temas
- Roadmap de implementación
- **Ideal para**: Product managers, planificación de features

### **🛣️ [Sistema de Ruteo](./routing.md)**
*URLs y navegación*
- Estructura de URLs
- App Router de Next.js
- Parámetros dinámicos
- SEO y meta tags
- Ejemplos prácticos
- **Ideal para**: Desarrolladores frontend, arquitectura

### **🔌 [Integración con Backend](./api-integration.md)**
*Comunicación con ventas-service*
- Endpoints necesarios
- Estructura del cliente API
- Patrones de uso (SSR vs CSR)
- Manejo de errores
- Optimizaciones
- **Ideal para**: Desarrolladores fullstack, integración API

### **🎨 [Sistema de Temas](./theming.md)**
*Personalización visual de tiendas*
- Temas predefinidos
- Implementación técnica
- CSS Variables dinámicas
- Panel de administración
- Funcionalidades avanzadas
- **Ideal para**: UI/UX designers, desarrolladores frontend

## 🗂️ Cómo usar esta documentación

### **Para desarrolladores nuevos:**
1. 📖 **[README](./README.md)** - Entiende el proyecto
2. 🚀 **[Quick Start](./quick-start.md)** - Setup y primera ejecución
3. 🛣️ **[Ruteo](./routing.md)** - Entiende la navegación
4. 🔌 **[API Integration](./api-integration.md)** - Conecta con backend

### **Para product managers:**
1. 📖 **[README](./README.md)** - Contexto del producto
2. 🏪 **[Store Features](./store-features.md)** - Roadmap y funcionalidades
3. 🎨 **[Theming](./theming.md)** - Diferenciación visual

### **Para diseñadores:**
1. 🎨 **[Theming](./theming.md)** - Sistema de diseño
2. 🏪 **[Store Features](./store-features.md)** - UX y componentes
3. 🛣️ **[Ruteo](./routing.md)** - Flujos de navegación

### **Para backend developers:**
1. 🔌 **[API Integration](./api-integration.md)** - Endpoints necesarios
2. 📖 **[README](./README.md)** - Arquitectura general

## 🔄 Flujo del Ecosistema

```
Usuario → ventas-frontend → ventas-service → web-client → Cliente final
   ↓           ↓               ↓              ↓            ↓
 Registro   Gestiona      Guarda datos   Muestra      Compra
          productos                      tienda      productos
```

## 📊 Métricas del Proyecto

| Componente | Tecnología | Estado |
|------------|------------|---------|
| **ventas-frontend** | React/Vite | ✅ Completo |
| **ventas-service** | NestJS/PostgreSQL | ✅ Completo |
| **web-client** | Next.js 14 | 🚧 En desarrollo |

## 🎯 Próximos Pasos

1. **Marketplace central** - Lista de todas las tiendas
2. **Sistema de carrito** - Funcionalidad completa de compras
3. **Temas predefinidos** - 6 temas listos para usar
4. **Optimización móvil** - Responsive design completo
5. **Integración WhatsApp** - Bot de IA para atención

## 🤝 Contribuir

Esta documentación está viva y debe actualizarse con cada cambio importante:

- **Nuevas funcionalidades** → Actualizar `store-features.md`
- **Nuevos endpoints** → Actualizar `api-integration.md`
- **Nuevas rutas** → Actualizar `routing.md`
- **Nuevos temas** → Actualizar `theming.md`

## 📞 Contacto

Para dudas sobre la documentación o el proyecto:
- Revisar primero esta documentación
- Consultar el código fuente
- Preguntar al equipo de desarrollo

---

*Documentación generada para SnapStore Web Client - Última actualización: $(date)*