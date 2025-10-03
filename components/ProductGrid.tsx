// import { Product } from '@/lib/types'
// import { ProfessionalTheme } from '@/lib/themes'
// import ProductCard from './ProductCard'

// interface ProductGridProps {
//   products: Product[]
//   theme?: ProfessionalTheme
//   className?: string
// }

// export default function ProductGrid({ products, theme, className = '' }: ProductGridProps) {
//   if (products.length === 0) {
//     return (
//       <div className="text-center py-12">
//         <div className="text-text-secondary text-lg">
//           No se encontraron productos
//         </div>
//       </div>
//     )
//   }

//   // Get grid configuration from theme or use defaults
//   const gridConfig = theme?.layout.grid || {
//     columns: { mobile: 1, tablet: 2, desktop: 3 },
//     gap: 'lg'
//   }

//   const gapClass = {
//     sm: 'gap-4',
//     md: 'gap-6',
//     lg: 'gap-6',
//     xl: 'gap-8'
//   }[gridConfig.gap] || 'gap-6'

//   const gridCols = `grid-cols-${gridConfig.columns.mobile} sm:grid-cols-${gridConfig.columns.tablet} lg:grid-cols-${gridConfig.columns.desktop}`

//   return (
//     <div className={`product-grid grid ${gridCols} ${gapClass} ${className}`}>
//       {products.map((product) => (
//         <ProductCard
//           key={product.id}
//           product={product}
//           themeId={theme?.id}
//           showBrand={theme?.layout.productCard.showBrand}
//           showCategory={theme?.layout.productCard.showCategory}
//           priceStyle={theme?.layout.productCard.priceStyle}
//           imageRatio={theme?.layout.productCard.imageRatio}
//         />
//       ))}
//     </div>
//   )
// }
