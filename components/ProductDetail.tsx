// 'use client'

// import Image from 'next/image'
// import Link from 'next/link'
// import { useState } from 'react'
// import { ArrowLeft, Share, Heart, Star, Shield, Truck, RotateCcw, Tag, MessageCircle } from 'lucide-react'
// import { Product, Store } from '@/lib/types'
// import AddToCartButton from './AddToCartButton'

// interface ProductDetailProps {
//   product: Product
//   store: Store
// }

// export default function ProductDetail({ product, store }: ProductDetailProps) {
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0)

//   const hasDiscount = product.originalPrice && product.originalPrice > product.price
//   const discountPercentage = hasDiscount
//     ? Math.round(((product.originalPrice! - product.price) / product.originalPrice!) * 100)
//     : 0

//   const whatsappMessage = encodeURIComponent(
//     `Hola! Me interesa este producto:\n\n` +
//     `${product.name}\n` +
//     `Precio: $${product.price.toLocaleString()}\n\n` +
//     `¿Podrías darme más información?`
//   )

//   return (
//     <div className="space-y-8">
//       {/* Breadcrumb */}
//       <nav className="flex items-center space-x-2 text-sm text-text-secondary">
//         <Link href="/" className="hover:text-text-primary transition-colors">
//           Inicio
//         </Link>
//         <span>/</span>
//         <Link href={`/${store.slug}`} className="hover:text-text-primary transition-colors">
//           {store.name}
//         </Link>
//         <span>/</span>
//         <Link
//           href={`/${store.slug}?category=${product.category.slug}`}
//           className="hover:text-text-primary transition-colors"
//         >
//           {product.category.name}
//         </Link>
//         <span>/</span>
//         <span className="text-text-primary">{product.name}</span>
//       </nav>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//         {/* Product Images */}
//         <div className="space-y-4">
//           {/* Main Image */}
//           <div className="aspect-square bg-surface rounded-lg overflow-hidden">
//             {product.images[selectedImageIndex] ? (
//               <Image
//                 src={product.images[selectedImageIndex]}
//                 alt={product.name}
//                 width={600}
//                 height={600}
//                 className="w-full h-full object-cover"
//                 priority
//               />
//             ) : (
//               <div className="w-full h-full bg-gradient-to-br from-primary-light to-accent flex items-center justify-center">
//                 <Tag className="w-24 h-24 text-white/50" />
//               </div>
//             )}

//             {/* Badges */}
//             <div className="absolute top-4 left-4 flex flex-col gap-2">
//               {product.isFeatured && (
//                 <span className="bg-accent text-white text-sm font-medium px-3 py-1 rounded-full">
//                   Destacado
//                 </span>
//               )}
//               {hasDiscount && (
//                 <span className="bg-error text-white text-sm font-medium px-3 py-1 rounded-full">
//                   -{discountPercentage}% OFF
//                 </span>
//               )}
//               {product.stock <= 5 && product.stock > 0 && (
//                 <span className="bg-warning text-white text-sm font-medium px-3 py-1 rounded-full">
//                   ¡Últimas {product.stock}!
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* Thumbnail Images */}
//           {product.images.length > 1 && (
//             <div className="flex space-x-2 overflow-x-auto">
//               {product.images.map((image, index) => (
//                 <button
//                   key={index}
//                   onClick={() => setSelectedImageIndex(index)}
//                   className={`flex-shrink-0 w-20 h-20 bg-surface rounded-lg overflow-hidden border-2 transition-colors ${
//                     selectedImageIndex === index
//                       ? 'border-primary'
//                       : 'border-border-default hover:border-primary-light'
//                   }`}
//                 >
//                   <Image
//                     src={image}
//                     alt={`${product.name} ${index + 1}`}
//                     width={80}
//                     height={80}
//                     className="w-full h-full object-cover"
//                   />
//                 </button>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Product Info */}
//         <div className="space-y-6">
//           {/* Header */}
//           <div>
//             <div className="flex items-center justify-between mb-2">
//               <div className="flex items-center space-x-2">
//                 {product.brand && (
//                   <span className="text-sm text-text-secondary">
//                     {product.brand.name}
//                   </span>
//                 )}
//                 <span className="text-sm text-text-secondary">•</span>
//                 <span className="text-sm text-accent font-medium">
//                   {product.category.name}
//                 </span>
//               </div>

//               <div className="flex items-center space-x-2">
//                 <button className="p-2 text-text-secondary hover:text-error transition-colors">
//                   <Heart className="w-5 h-5" />
//                 </button>
//                 <button className="p-2 text-text-secondary hover:text-text-primary transition-colors">
//                   <Share className="w-5 h-5" />
//                 </button>
//               </div>
//             </div>

//             <h1 className="text-3xl font-bold text-text-primary mb-3">
//               {product.name}
//             </h1>

//             {/* Rating */}
//             <div className="flex items-center space-x-2 mb-4">
//               <div className="flex items-center">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     className={`w-4 h-4 ${
//                       i < 4 ? 'text-accent fill-current' : 'text-text-muted'
//                     }`}
//                   />
//                 ))}
//               </div>
//               <span className="text-sm text-text-secondary">(4.5 • 24 reseñas)</span>
//             </div>
//           </div>

//           {/* Price */}
//           <div className="space-y-2">
//             <div className="flex items-center space-x-4">
//               <span className="text-3xl font-bold text-text-primary">
//                 ${product.price.toLocaleString()}
//               </span>
//               {hasDiscount && (
//                 <span className="text-xl text-text-muted line-through">
//                   ${product.originalPrice!.toLocaleString()}
//                 </span>
//               )}
//             </div>
//             {hasDiscount && (
//               <div className="text-success font-medium">
//                 Ahorras ${(product.originalPrice! - product.price).toLocaleString()}
//               </div>
//             )}
//           </div>

//           {/* Stock Status */}
//           <div className="space-y-2">
//             {product.stock > 0 ? (
//               <div className="flex items-center space-x-2">
//                 <div className="w-2 h-2 bg-success rounded-full"></div>
//                 <span className="text-success font-medium">
//                   En stock ({product.stock} disponibles)
//                 </span>
//               </div>
//             ) : (
//               <div className="flex items-center space-x-2">
//                 <div className="w-2 h-2 bg-error rounded-full"></div>
//                 <span className="text-error font-medium">Sin stock</span>
//               </div>
//             )}
//           </div>

//           {/* Description */}
//           {product.description && (
//             <div className="space-y-2">
//               <h3 className="font-semibold text-text-primary">Descripción</h3>
//               <p className="text-text-secondary leading-relaxed">
//                 {product.description}
//               </p>
//             </div>
//           )}

//           {/* Specifications */}
//           {product.specifications && Object.keys(product.specifications).length > 0 && (
//             <div className="space-y-3">
//               <h3 className="font-semibold text-text-primary">Especificaciones</h3>
//               <div className="grid grid-cols-1 gap-2">
//                 {Object.entries(product.specifications).map(([key, value]) => (
//                   <div key={key} className="flex justify-between py-2 border-b border-border-default">
//                     <span className="text-text-secondary">{key}:</span>
//                     <span className="text-text-primary font-medium">{value}</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Add to Cart */}
//           <div className="space-y-4 pt-4 border-t border-border-default">
//             <AddToCartButton
//               product={product}
//               disabled={product.stock === 0}
//               variant="full"
//               showQuantity={true}
//             />

//             {/* WhatsApp Contact */}
//             {store.contact.whatsapp && (
//               <Link
//                 href={`https://wa.me/${store.contact.whatsapp.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`}
//                 target="_blank"
//                 className="w-full flex items-center justify-center space-x-2 py-3 px-4 border-2 border-green-500 text-green-600 rounded-lg hover:bg-green-50 transition-colors font-medium"
//               >
//                 <MessageCircle className="w-5 h-5" />
//                 <span>Consultar por WhatsApp</span>
//               </Link>
//             )}
//           </div>

//           {/* Features */}
//           <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border-default">
//             <div className="text-center space-y-2">
//               <Shield className="w-6 h-6 text-primary mx-auto" />
//               <div className="text-sm text-text-secondary">Compra segura</div>
//             </div>
//             <div className="text-center space-y-2">
//               <Truck className="w-6 h-6 text-primary mx-auto" />
//               <div className="text-sm text-text-secondary">Envío disponible</div>
//             </div>
//             <div className="text-center space-y-2">
//               <RotateCcw className="w-6 h-6 text-primary mx-auto" />
//               <div className="text-sm text-text-secondary">Devoluciones</div>
//             </div>
//           </div>

//           {/* Tags */}
//           {product.tags && product.tags.length > 0 && (
//             <div className="space-y-2">
//               <h3 className="font-semibold text-text-primary">Etiquetas</h3>
//               <div className="flex flex-wrap gap-2">
//                 {product.tags.map((tag) => (
//                   <span
//                     key={tag}
//                     className="px-3 py-1 bg-surface text-text-secondary text-sm rounded-full border border-border-default"
//                   >
//                     #{tag}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }