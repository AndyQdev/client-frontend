import { Store } from '@/lib/types'
import Link from 'next/link'
import Image from 'next/image'
import { Store as StoreIcon, MapPin, ArrowRight } from 'lucide-react'

interface StoreCardProps {
  store: Store
}

export default function StoreCard({ store }: StoreCardProps) {
  const hasBanner = store.banner && !store.banner.includes('placeholder')
  const hasLogo = store.logo && !store.logo.includes('placeholder')
  const city = store.city

  return (
    <Link href={`/${store.slug}`} className="group">
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:shadow-xl hover:border-gray-300 transition-all duration-300 hover:-translate-y-1">
        {/* Banner */}
        <div className="relative h-36 bg-gradient-to-br from-slate-800 to-slate-900">
          {hasBanner && (
            <Image
              src={store.banner!}
              alt={store.name}
              fill
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

          {/* Logo */}
          <div className="absolute -bottom-7 left-5">
            <div className="w-14 h-14 bg-white border-[3px] border-white rounded-xl overflow-hidden shadow-lg">
              {hasLogo ? (
                <Image
                  src={store.logo!}
                  alt={store.name}
                  width={56}
                  height={56}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-emerald-50">
                  <StoreIcon className="w-6 h-6 text-emerald-600" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-5 pt-10 pb-5">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-1 text-base">
              {store.name}
            </h3>
            <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-emerald-600 group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-0.5" />
          </div>

          {store.description && (
            <p className="text-sm text-gray-500 line-clamp-2 mb-3 leading-relaxed">
              {store.description}
            </p>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            {city && (
              <div className="flex items-center gap-1 text-xs text-gray-400">
                <MapPin className="w-3 h-3" />
                <span>{city}</span>
              </div>
            )}
            <span className="text-xs font-medium text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              Visitar tienda
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}
