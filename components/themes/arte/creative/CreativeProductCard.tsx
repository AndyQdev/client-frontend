'use client'

import { Product } from '@/lib/types'
import Image from 'next/image'
import Link from 'next/link'
import { Sparkles, Zap, Heart, Eye, ShoppingCart, Star } from 'lucide-react'
import { useCart } from '@/lib/cart-context'
import { useState } from 'react'

interface CreativeProductCardProps {
  product: Product
  storeSlug: string
}

export default function CreativeProductCard({ product, storeSlug }: CreativeProductCardProps) {
  const { addToCart } = useCart()
  const [isAdding, setIsAdding] = useState(false)
  const randomRotation = Math.random() * 4 - 2 // -2 to 2 degrees
  const colorPalettes = [
    { gradient: 'from-amber-500 via-orange-500 to-red-500', accent: 'amber-500', shadow: 'amber' }, // Fire
    { gradient: 'from-violet-500 via-purple-500 to-fuchsia-500', accent: 'violet-500', shadow: 'violet' }, // Purple Dream
    { gradient: 'from-cyan-500 via-blue-500 to-indigo-500', accent: 'cyan-500', shadow: 'cyan' }, // Ocean
    { gradient: 'from-lime-500 via-emerald-500 to-teal-500', accent: 'emerald-500', shadow: 'emerald' }, // Nature
    { gradient: 'from-pink-500 via-rose-500 to-red-500', accent: 'pink-500', shadow: 'pink' }, // Rose
    { gradient: 'from-yellow-500 via-amber-500 to-orange-500', accent: 'yellow-500', shadow: 'yellow' }, // Sunset
  ]
  const palette = colorPalettes[Math.floor(Math.random() * colorPalettes.length)]

  const handleAddToCart = () => {
    setIsAdding(true)
    addToCart(product, 1)
    setTimeout(() => setIsAdding(false), 1000)
  }

  return (
    <div
      className="group relative bg-white rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-6 hover:scale-[1.02]"
      style={{
        transform: `rotate(${randomRotation}deg)`,
        transition: 'all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)'
      }}
    >
      {/* Borde degradado animado */}
      <div className={`absolute inset-0 bg-gradient-to-br ${palette.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10`}></div>

      {/* Marco creativo con animación de brillo */}
      <div className={`absolute inset-0 bg-gradient-to-br ${palette.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>

      {/* Elementos decorativos flotantes */}
      <div className="absolute top-4 right-4 z-10 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
        <Sparkles className={`w-6 h-6 text-${palette.accent} group-hover:animate-spin`} />
      </div>
      <div className={`absolute top-2 left-2 w-3 h-3 bg-${palette.accent} rounded-full animate-pulse opacity-50 group-hover:opacity-100`}></div>
      <div className={`absolute bottom-16 right-8 w-2 h-2 bg-${palette.accent} rounded-full group-hover:animate-bounce opacity-40 group-hover:opacity-80`}></div>
      <div className={`absolute top-1/3 left-4 w-1.5 h-1.5 bg-${palette.accent} rounded-full animate-ping opacity-30`}></div>

      {/* Imagen con efectos creativos */}
      <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-110 group-hover:rotate-3 transition-transform duration-700"
        />

        {/* Filtros de color creativos con nuevo gradiente */}
        <div className={`absolute inset-0 bg-gradient-to-t ${palette.gradient} opacity-0 group-hover:opacity-25 transition-all duration-500 mix-blend-overlay`}></div>

        {/* Badge creativo mejorado */}
        {product.isFeatured && (
          <div className={`absolute top-4 left-4 bg-gradient-to-r ${palette.gradient} text-white px-4 py-1.5 rounded-2xl text-xs font-black uppercase tracking-wider transform -rotate-6 shadow-lg animate-pulse`}>
            <span className="flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Obra Destacada
            </span>
          </div>
        )}

        {/* Badge de descuento si aplica */}
        {product.originalPrice && (
          <div className="absolute top-4 right-4 bg-gradient-to-br from-red-500 to-pink-500 text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg transform rotate-6">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </div>
        )}

        {/* Overlay de acciones mejorado */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500">
          <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-700 transform translate-y-8 group-hover:translate-y-0">
            <div className="flex space-x-2">
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0 || isAdding}
                className={`flex-1 bg-gradient-to-r ${palette.gradient} text-white py-3 px-6 rounded-2xl text-sm font-black uppercase tracking-wide hover:scale-110 transition-all duration-300 shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden ${
                  isAdding ? 'animate-pulse' : ''
                }`}
              >
                {/* Efecto de brillo en el botón */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                <span className="flex items-center justify-center space-x-2 relative z-10">
                  {isAdding ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" />
                      <span>¡Agregando!</span>
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5" />
                      <span>{product.stock === 0 ? 'Agotado' : 'Agregar'}</span>
                    </>
                  )}
                </span>
              </button>
              <button className="bg-white/95 backdrop-blur-sm text-gray-800 p-3 rounded-2xl hover:bg-white hover:scale-110 transition-all duration-300 shadow-xl">
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Información del producto con estilo artístico */}
      <div className="p-6 relative bg-gradient-to-b from-white to-gray-50/50">
        {/* Línea decorativa superior */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${palette.gradient}`}></div>

        {/* Categoría creativa con nuevo estilo */}
        <div className="mb-3 flex items-center gap-2">
          <span className={`inline-block bg-gradient-to-r ${palette.gradient} text-white px-4 py-1.5 rounded-2xl text-xs font-black uppercase tracking-widest shadow-md transform -rotate-2 group-hover:rotate-0 transition-transform duration-300`}>
            {product.category.name}
          </span>
          {product.stock < 10 && product.stock > 0 && (
            <span className="text-xs text-amber-600 font-bold animate-pulse flex items-center gap-1">
              <Zap className="w-3 h-3" />
              ¡Últimos!
            </span>
          )}
        </div>

        {/* Nombre del producto con efecto artístico */}
        <Link href={`/${storeSlug}/productos/${product.slug}`}>
          <h3 className={`text-xl font-black text-transparent bg-clip-text bg-gradient-to-r ${palette.gradient} mb-2 line-clamp-2 hover:scale-105 transition-transform duration-300 origin-left leading-tight`}>
            {product.name}
          </h3>
        </Link>

        {/* Marca con diseño mejorado */}
        {product.brand && (
          <p className="text-sm text-gray-600 mb-4 font-semibold flex items-center space-x-2">
            <span className="text-gray-400">por</span>
            <span className={`text-${palette.accent} font-black uppercase tracking-wide`}>{product.brand.name}</span>
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
          </p>
        )}

        {/* Rating con estrellas */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < 4
                  ? 'fill-amber-400 text-amber-400'
                  : 'fill-gray-200 text-gray-200'
              }`}
            />
          ))}
          <span className="text-xs text-gray-500 ml-1 font-medium">
            (4.5)
          </span>
        </div>

        {/* Métricas artísticas mejoradas */}
        <div className="flex items-center justify-between mb-4 pb-4 border-b-2 border-dashed border-gray-200">
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-1 text-${palette.accent}`}>
              <Eye className="w-4 h-4" />
              <span className="text-xs font-bold">{Math.floor(Math.random() * 1000) + 100}</span>
            </div>
            <div className="flex items-center space-x-1 text-pink-500">
              <Heart className="w-4 h-4 fill-pink-500" />
              <span className="text-xs font-bold">{Math.floor(Math.random() * 50) + 10}</span>
            </div>
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-black ${product.stock > 0 ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
            {product.stock > 0 ? '✓ Disponible' : '✗ Agotado'}
          </div>
        </div>

        {/* Precio artístico con efectos */}
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <div className={`text-3xl font-black bg-gradient-to-r ${palette.gradient} bg-clip-text text-transparent transform -rotate-1`}>
              ${product.price.toLocaleString()}
            </div>
            {product.originalPrice && (
              <div className="text-base text-gray-400 line-through font-medium">
                ${product.originalPrice.toLocaleString()}
              </div>
            )}
          </div>
          <div className={`bg-gradient-to-r ${palette.gradient} p-2 rounded-xl shadow-lg transform rotate-12 group-hover:rotate-0 transition-transform duration-300`}>
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
        </div>

        {/* Línea decorativa inferior */}
        <div className="mt-5 flex justify-center gap-2">
          <div className={`w-2 h-2 bg-${palette.accent} rounded-full animate-pulse`}></div>
          <div className={`w-3 h-2 bg-${palette.accent} rounded-full animate-pulse`} style={{ animationDelay: '0.2s' }}></div>
          <div className={`w-2 h-2 bg-${palette.accent} rounded-full animate-pulse`} style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  )
}