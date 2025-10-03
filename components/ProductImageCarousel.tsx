// 'use client'

// import React, { useState, useEffect } from 'react'
// import Image from 'next/image'
// import { ChevronLeft, ChevronRight } from 'lucide-react'

// interface ProductImageCarouselProps {
//   images: string[]
//   alt: string
//   className?: string
//   aspectRatio?: 'square' | 'portrait' | 'landscape'
//   showDots?: boolean
//   autoPlay?: boolean
//   autoPlayInterval?: number
// }

// export default function ProductImageCarousel({
//   images,
//   alt,
//   className = '',
//   aspectRatio = 'square',
//   showDots = true,
//   autoPlay = false,
//   autoPlayInterval = 3000
// }: ProductImageCarouselProps) {
//   const [currentIndex, setCurrentIndex] = useState(0)
//   const [isHovered, setIsHovered] = useState(false)

//   const hasMultipleImages = images.length > 1

//   const aspectClass = {
//     square: 'aspect-square',
//     portrait: 'aspect-[3/4]',
//     landscape: 'aspect-[4/3]'
//   }[aspectRatio]

//   // Auto-play functionality
//   useEffect(() => {
//     if (!autoPlay || !hasMultipleImages || isHovered) return

//     const interval = setInterval(() => {
//       setCurrentIndex((prev) => (prev + 1) % images.length)
//     }, autoPlayInterval)

//     return () => clearInterval(interval)
//   }, [autoPlay, hasMultipleImages, isHovered, images.length, autoPlayInterval])

//   const goToNext = () => {
//     setCurrentIndex((prev) => (prev + 1) % images.length)
//   }

//   const goToPrevious = () => {
//     setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
//   }

//   const goToSlide = (index: number) => {
//     setCurrentIndex(index)
//   }

//   if (!hasMultipleImages) {
//     // Single image fallback
//     return (
//       <div className={`relative overflow-hidden ${aspectClass} ${className}`}>
//         <Image
//           src={images[0]}
//           alt={alt}
//           fill
//           className="product-image object-cover"
//           sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
//         />
//       </div>
//     )
//   }

//   return (
//     <div
//       className={`product-carousel relative overflow-hidden ${aspectClass} ${className}`}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Main Image */}
//       <div className="relative w-full h-full">
//         <Image
//           src={images[currentIndex]}
//           alt={`${alt} - Imagen ${currentIndex + 1}`}
//           fill
//           className="product-image object-cover transition-opacity duration-300"
//           sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
//         />
//       </div>

//       {/* Navigation Arrows - Only show on hover */}
//       {hasMultipleImages && (
//         <>
//           <button
//             onClick={goToPrevious}
//             className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/20 backdrop-blur-sm text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/40"
//             aria-label="Imagen anterior"
//           >
//             <ChevronLeft className="w-4 h-4" />
//           </button>

//           <button
//             onClick={goToNext}
//             className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/20 backdrop-blur-sm text-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-black/40"
//             aria-label="Siguiente imagen"
//           >
//             <ChevronRight className="w-4 h-4" />
//           </button>
//         </>
//       )}

//       {/* Dots Indicator */}
//       {showDots && hasMultipleImages && images.length <= 5 && (
//         <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex space-x-2">
//           {images.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => goToSlide(index)}
//               className={`w-2 h-2 rounded-full transition-all duration-200 ${
//                 index === currentIndex
//                   ? 'bg-white scale-125'
//                   : 'bg-white/50 hover:bg-white/75'
//               }`}
//               aria-label={`Ver imagen ${index + 1}`}
//             />
//           ))}
//         </div>
//       )}

//       {/* Image Counter for many images */}
//       {hasMultipleImages && images.length > 5 && (
//         <div className="absolute bottom-3 right-3 bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
//           {currentIndex + 1} / {images.length}
//         </div>
//       )}

//       {/* Thumbnail Strip - Only for hover on desktop */}
//       {hasMultipleImages && images.length <= 6 && (
//         <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3">
//           <div className="flex space-x-2 justify-center">
//             {images.map((image, index) => (
//               <button
//                 key={index}
//                 onClick={() => goToSlide(index)}
//                 className={`relative w-8 h-8 rounded overflow-hidden border-2 transition-all duration-200 ${
//                   index === currentIndex
//                     ? 'border-white scale-110'
//                     : 'border-white/50 hover:border-white'
//                 }`}
//               >
//                 <Image
//                   src={image}
//                   alt={`Miniatura ${index + 1}`}
//                   fill
//                   className="object-cover"
//                   sizes="32px"
//                 />
//               </button>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Progress Bar for auto-play */}
//       {autoPlay && hasMultipleImages && !isHovered && (
//         <div className="absolute bottom-0 left-0 right-0 h-1 bg-black/20">
//           <div
//             className="h-full bg-white transition-all duration-100 ease-linear"
//             style={{
//               width: `${((currentIndex + 1) / images.length) * 100}%`
//             }}
//           />
//         </div>
//       )}
//     </div>
//   )
// }