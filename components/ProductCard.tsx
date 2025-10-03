// 'use client'

// import Image from 'next/image'
// import Link from 'next/link'
// import { ShoppingCart, Heart, Eye } from 'lucide-react'
// import { Product } from '@/lib/types'
// import AddToCartButton from './AddToCartButton'
// import ProductImageCarousel from './ProductImageCarousel'

// interface ProductCardProps {
//   product: Product
//   themeId?: string
//   showBrand?: boolean
//   showCategory?: boolean
//   priceStyle?: 'prominent' | 'subtle' | 'badge'
//   imageRatio?: 'square' | 'portrait' | 'landscape'
// }

// export default function ProductCard({
//   product,
//   themeId = 'minimal',
//   showBrand = true,
//   showCategory = false,
//   priceStyle = 'prominent',
//   imageRatio = 'square'
// }: ProductCardProps) {
//   const hasDiscount = product.originalPrice && product.originalPrice > product.price
//   const discountPercentage = hasDiscount
//     ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
//     : 0

//   const imageAspectClass = {
//     square: 'aspect-square',
//     portrait: 'aspect-[3/4]',
//     landscape: 'aspect-[4/3]'
//   }[imageRatio]

//   return (
//     <div className={`product-card group ${themeId ? `theme-${themeId}` : ''} relative`}>
//       {/* Product Image Container */}
//       <Link href={`/product/${product.slug}`} className="block relative">
//         <div className="product-image-container relative">
//           {product.images.length > 0 ? (
//             <ProductImageCarousel
//               images={product.images}
//               alt={product.name}
//               aspectRatio={imageRatio}
//               showDots={product.images.length > 1 && product.images.length <= 4}
//               autoPlay={false} // Disabled for card view to avoid distraction
//             />
//           ) : (
//             <div className={`w-full ${imageAspectClass} bg-gray-100 flex items-center justify-center`}>
//               <ShoppingCart className="w-8 h-8 text-gray-400" />
//             </div>
//           )}

//           {/* Minimal Badges - Only Essential Info */}
//           <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
//             {hasDiscount && (
//               <span className="bg-red-500 text-white text-xs font-medium px-2 py-1 rounded-lg">
//                 -{discountPercentage}%
//               </span>
//             )}
//             {product.stock === 0 && (
//               <span className="bg-gray-900 text-white text-xs font-medium px-2 py-1 rounded-lg">
//                 Agotado
//               </span>
//             )}
//           </div>

//           {/* Image Count Indicator */}
//           {product.images.length > 1 && (
//             <div className="absolute top-3 left-1/2 transform -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
//               {product.images.length} fotos
//             </div>
//           )}

//           {/* Hover Actions */}
//           <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0 z-10">
//             <button
//               className="p-2 bg-white/90 backdrop-blur-sm text-gray-700 rounded-full hover:bg-white hover:text-black transition-all duration-200 shadow-lg"
//               aria-label="Ver producto"
//               onClick={(e) => e.preventDefault()}
//             >
//               <Eye className="w-4 h-4" />
//             </button>
//             <button
//               className="p-2 bg-white/90 backdrop-blur-sm text-gray-700 rounded-full hover:bg-white hover:text-red-500 transition-all duration-200 shadow-lg"
//               aria-label="Agregar a favoritos"
//               onClick={(e) => e.preventDefault()}
//             >
//               <Heart className="w-4 h-4" />
//             </button>
//           </div>

//           {/* Quick Add to Cart on Hover */}
//           <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-10">
//             {product.stock > 0 && (
//               <AddToCartButton
//                 product={product}
//                 variant="icon"
//                 className="w-full bg-black/80 backdrop-blur-sm text-white hover:bg-black border-none rounded-lg py-2 text-sm font-medium"
//               />
//             )}
//           </div>
//         </div>
//       </Link>

//       {/* Product Info - Minimalist */}
//       <div className="product-info">
//         {/* Category */}
//         {showCategory && product.category && (
//           <div className="product-category">
//             {product.category.name}
//           </div>
//         )}

//         {/* Product Title */}
//         <Link href={`/product/${product.slug}`}>
//           <h3 className="product-title">
//             {product.name}
//           </h3>
//         </Link>

//         {/* Brand */}
//         {showBrand && product.brand && (
//           <div className="product-brand">
//             {product.brand.name}
//           </div>
//         )}

//         {/* Price */}
//         <div className={`product-price-container ${priceStyle}`}>
//           <div className={`product-price ${priceStyle}`}>
//             ${product.price.toLocaleString()}
//           </div>
//           {hasDiscount && (
//             <div className="product-price-original">
//               ${product.originalPrice!.toLocaleString()}
//             </div>
//           )}
//         </div>

//         {/* Stock Warning (Only for low stock) */}
//         {product.stock <= 3 && product.stock > 0 && (
//           <div className="text-xs text-orange-600 mt-1">
//             Solo {product.stock} disponibles
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
