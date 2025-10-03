// 'use client'

// import React, { useState } from 'react'
// import { CustomColors } from '@/lib/themes'
// import ThemeProvider from '@/components/ThemeProvider'
// import ThemeCustomizer from '@/components/ThemeCustomizer'
// import ProductCard from '@/components/ProductCard'
// import { Product } from '@/lib/types'

// interface DemoThemesClientProps {
//   sampleProducts: Product[]
//   initialTheme: any
//   initialColors: CustomColors
// }

// export default function DemoThemesClient({
//   sampleProducts,
//   initialTheme,
//   initialColors
// }: DemoThemesClientProps) {
//   const [selectedTheme, setSelectedTheme] = useState(initialTheme)
//   const [customColors, setCustomColors] = useState<CustomColors>(initialColors)

//   const handleThemeChange = (theme: any, colors: CustomColors) => {
//     setSelectedTheme(theme)
//     setCustomColors(colors)
//   }

//   return (
//     <ThemeProvider
//       professionalTheme={selectedTheme}
//       customColors={customColors}
//     >
//       <div className="min-h-screen bg-gray-50">
//         {/* Header */}
//         <header className="bg-white shadow-sm border-b">
//           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//             <div className="text-center">
//               <h1 className="text-3xl font-bold text-gray-900">
//                 Demo del Sistema de Temas Profesionales
//               </h1>
//               <p className="mt-2 text-lg text-gray-600">
//                 Explora los 6 temas únicos con personalización de colores
//               </p>
//             </div>
//           </div>
//         </header>

//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//             {/* Theme Customizer */}
//             <div className="lg:col-span-1">
//               <div className="sticky top-8">
//                 <ThemeCustomizer
//                   onThemeChange={handleThemeChange}
//                   defaultTheme={selectedTheme}
//                   defaultColors={customColors}
//                 />
//               </div>
//             </div>

//             {/* Preview Area */}
//             <div className="lg:col-span-2">
//               <div className="bg-white rounded-lg shadow-lg overflow-hidden">
//                 {/* Store Header Demo */}
//                 <div className="store-header p-8 text-center">
//                   <h1 className="store-name text-4xl mb-4">
//                     Mi Tienda Demo
//                   </h1>
//                   <p className="store-description text-lg max-w-2xl mx-auto">
//                     Una tienda de ejemplo que demuestra las capacidades del tema {selectedTheme.name}.
//                     Cada tema tiene su propia personalidad y estilo único.
//                   </p>
//                   <div className="mt-6">
//                     <button className="btn-primary">
//                       Explorar Productos
//                     </button>
//                   </div>
//                 </div>

//                 {/* Products Section */}
//                 <div className="p-8">
//                   <div className="text-center mb-8">
//                     <h2 className="section-title">
//                       Productos Destacados
//                     </h2>
//                     <p className="section-subtitle">
//                       Descubre nuestra selección curada de productos únicos
//                     </p>
//                   </div>

//                   {/* Category Filter Demo */}
//                   <div className="category-filter mb-8">
//                     <button className="active">Todo</button>
//                     <button>Ropa</button>
//                     <button>Electrónicos</button>
//                     <button>Hogar</button>
//                     <button>Accesorios</button>
//                   </div>

//                   {/* Product Grid */}
//                   <div className="product-grid grid gap-6">
//                     {sampleProducts.map((product) => (
//                       <ProductCard
//                         key={product.id}
//                         product={product}
//                         themeId={selectedTheme.id}
//                         showBrand={selectedTheme.layout.productCard.showBrand}
//                         showCategory={selectedTheme.layout.productCard.showCategory}
//                         priceStyle={selectedTheme.layout.productCard.priceStyle}
//                         imageRatio={selectedTheme.layout.productCard.imageRatio}
//                       />
//                     ))}
//                   </div>
//                 </div>
//               </div>

//               {/* Theme Info */}
//               <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
//                 <h3 className="text-xl font-semibold text-gray-900 mb-4">
//                   Información del Tema Actual
//                 </h3>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <h4 className="font-semibold text-gray-700 mb-2">Tipografía</h4>
//                     <div className="space-y-2 text-sm text-gray-600">
//                       <div>
//                         <span className="font-medium">Principal:</span>
//                         <span className="ml-2">{selectedTheme.typography.primary.family.split(',')[0]}</span>
//                       </div>
//                       <div>
//                         <span className="font-medium">Secundaria:</span>
//                         <span className="ml-2">{selectedTheme.typography.secondary.family.split(',')[0]}</span>
//                       </div>
//                       <div>
//                         <span className="font-medium">Cuerpo:</span>
//                         <span className="ml-2">{selectedTheme.typography.body.family.split(',')[0]}</span>
//                       </div>
//                     </div>
//                   </div>

//                   <div>
//                     <h4 className="font-semibold text-gray-700 mb-2">Configuración</h4>
//                     <div className="space-y-2 text-sm text-gray-600">
//                       <div>
//                         <span className="font-medium">Categoría:</span>
//                         <span className="ml-2 capitalize">{selectedTheme.category}</span>
//                       </div>
//                       <div>
//                         <span className="font-medium">Ratio de imagen:</span>
//                         <span className="ml-2 capitalize">{selectedTheme.layout.productCard.imageRatio}</span>
//                       </div>
//                       <div>
//                         <span className="font-medium">Radio de borde:</span>
//                         <span className="ml-2">{selectedTheme.styling.borderRadius}</span>
//                       </div>
//                       <div>
//                         <span className="font-medium">Estilo de sombra:</span>
//                         <span className="ml-2 capitalize">{selectedTheme.styling.shadowStyle}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-4 pt-4 border-t border-gray-200">
//                   <h4 className="font-semibold text-gray-700 mb-2">Colores Personalizados</h4>
//                   <div className="flex items-center space-x-4">
//                     <div className="flex items-center space-x-2">
//                       <div
//                         className="w-6 h-6 rounded border border-gray-300"
//                         style={{ backgroundColor: customColors.primary }}
//                       />
//                       <span className="text-sm text-gray-600 font-mono">{customColors.primary}</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <div
//                         className="w-6 h-6 rounded border border-gray-300"
//                         style={{ backgroundColor: customColors.secondary }}
//                       />
//                       <span className="text-sm text-gray-600 font-mono">{customColors.secondary}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </ThemeProvider>
//   )
// }