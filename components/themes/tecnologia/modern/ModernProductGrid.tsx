import { Product } from '@/lib/types'
import ModernProductCard from './ModernProductCard'

interface ModernProductGridProps {
  products: Product[]
  storeSlug: string
}

export default function ModernProductGrid({ products, storeSlug }: ModernProductGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {products.map((product) => (
        <ModernProductCard key={product.id} product={product} storeSlug={storeSlug} />
      ))}
    </div>
  )
}