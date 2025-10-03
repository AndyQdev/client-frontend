import { Product } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'

interface MinimalProductCardProps {
  product: Product
}

export default function MinimalProductCard({ product }: MinimalProductCardProps) {
  return (
    <div className="group">
      {/* Imagen ultra minimal */}
      <div className="relative aspect-square bg-gray-50 mb-6 overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-[1.02] transition-transform duration-500"
        />

        {/* Hover overlay muy sutil */}
        <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-all duration-300"></div>
      </div>

      {/* Información ultra limpia */}
      <div className="space-y-3">
        <Link href={`/${product.storeId}/productos/${product.slug}`}>
          <h3 className="text-gray-900 hover:text-gray-600 transition-colors text-sm font-medium line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Precio simple */}
        <div className="flex items-center space-x-3">
          <span className="text-gray-900 text-sm font-medium">
            ${product.price.toLocaleString()}
          </span>
          {product.originalPrice && (
            <span className="text-gray-400 text-sm line-through">
              ${product.originalPrice.toLocaleString()}
            </span>
          )}
        </div>

        {/* Stock minimal */}
        <div className="text-xs text-gray-500">
          {product.stock > 0 ? `${product.stock} available` : 'Sold out'}
        </div>
      </div>
    </div>
  )
}