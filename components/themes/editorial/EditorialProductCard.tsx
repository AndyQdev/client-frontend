import { Product } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, Eye, TrendingUp } from 'lucide-react'

interface EditorialProductCardProps {
  product: Product
}

export default function EditorialProductCard({ product }: EditorialProductCardProps) {
  return (
    <article className="group bg-white border border-gray-200 hover:border-black transition-all duration-300 relative overflow-hidden">
      {/* Badge estilo periódico */}
      <div className="absolute top-4 left-4 z-10">
        <div className="bg-red-600 text-white px-3 py-1 text-xs font-bold uppercase tracking-wider">
          Featured
        </div>
      </div>

      {/* Imagen estilo editorial */}
      <div className="relative h-72 bg-gray-100 overflow-hidden">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Overlay con información */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
          <div className="absolute bottom-4 left-4 right-4 text-white">
            <div className="flex items-center space-x-4 text-xs font-mono mb-2">
              <div className="flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span>2.5K views</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-3 h-3" />
                <span>Trending</span>
              </div>
            </div>
            <Link
              href={`/${product.storeId}/productos/${product.slug}`}
              className="block bg-white text-black px-4 py-2 text-sm font-bold uppercase tracking-wider text-center hover:bg-red-600 hover:text-white transition-colors"
            >
              Read More
            </Link>
          </div>
        </div>
      </div>

      {/* Contenido estilo artículo */}
      <div className="p-6">
        {/* Metadata estilo editorial */}
        <div className="flex items-center justify-between text-xs text-gray-500 font-mono mb-3">
          <span className="bg-gray-100 px-2 py-1 uppercase tracking-wider">
            {product.category.name}
          </span>
          <div className="flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>5 min read</span>
          </div>
        </div>

        {/* Título estilo headline */}
        <Link href={`/${product.storeId}/productos/${product.slug}`}>
          <h2 className="text-xl font-black text-black mb-3 line-clamp-2 hover:text-red-600 transition-colors leading-tight">
            {product.name}
          </h2>
        </Link>

        {/* Descripción estilo lead */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
          Discover the story behind this exceptional piece. Crafted with precision and designed for the modern lifestyle, this item represents the perfect blend of form and function.
        </p>

        {/* Byline y precio */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div className="flex items-center space-x-3">
            {product.brand && (
              <span className="text-xs font-mono text-gray-500 uppercase tracking-wider">
                By {product.brand.name}
              </span>
            )}
          </div>
          <div className="text-right">
            <div className="text-lg font-black text-black">
              ${product.price.toLocaleString()}
            </div>
            {product.originalPrice && (
              <div className="text-sm text-gray-400 line-through">
                ${product.originalPrice.toLocaleString()}
              </div>
            )}
          </div>
        </div>

        {/* Footer editorial */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span className="font-mono">STOCK: {product.stock} units</span>
            <span className="font-mono">{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </article>
  )
}