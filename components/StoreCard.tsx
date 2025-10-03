import { Store } from '@/lib/types'
import { getStoreProfessionalThemeColors } from '@/lib/fake-data'
import Link from 'next/link'
import Image from 'next/image'
import { Eye, ShoppingBag, TrendingUp, ExternalLink } from 'lucide-react'

interface StoreCardProps {
  store: Store
}

export default function StoreCard({ store }: StoreCardProps) {
  // Get professional theme colors (pre-generated on server)
  const professionalThemeColors = getStoreProfessionalThemeColors(store)

  // Determine theme colors and name
  let themeColors = { primary: '#3B82F6', secondary: '#8B5CF6', accent: '#10B981' }
  let themeName = 'Tema Básico'

  if (professionalThemeColors) {
    themeColors = {
      primary: professionalThemeColors.colors.primary,
      secondary: professionalThemeColors.colors.secondary,
      accent: professionalThemeColors.colors.accent
    }
    themeName = professionalThemeColors.themeName
  } else if (store.theme?.colors) {
    // Legacy theme fallback
    themeColors = {
      primary: store.theme.colors.primary,
      secondary: store.theme.colors.secondary,
      accent: store.theme.colors.accent
    }
    themeName = store.theme.name || 'Tema Legacy'
  }

  return (
    <Link href={`/${store.slug}`} className="group">
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
        {/* Store Banner */}
        <div className="relative h-32" style={{ background: `linear-gradient(135deg, ${themeColors.primary}, ${themeColors.accent})` }}>
          {store.banner && (
            <Image
              src={store.banner}
              alt={store.name}
              fill
              className="object-cover"
            />
          )}
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Store Logo & Info */}
        <div className="p-4 relative">
          {/* Logo */}
          <div className="absolute -top-8 left-4">
            <div className="w-16 h-16 bg-white border-2 border-white rounded-lg overflow-hidden shadow-md">
              {store.logo ? (
                <Image
                  src={store.logo}
                  alt={store.name}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div
                  className="w-full h-full flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: themeColors.primary }}
                >
                  {store.name.charAt(0)}
                </div>
              )}
            </div>
          </div>

          {/* Store Info */}
          <div className="mt-10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                {store.name}
              </h3>
              <ExternalLink className="w-4 h-4 text-gray-500 group-hover:text-blue-600 transition-colors" />
            </div>

            {store.description && (
              <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                {store.description}
              </p>
            )}

            {/* Stats */}
            <div className="flex items-center justify-between text-xs text-gray-500">
              <div className="flex items-center space-x-1">
                <ShoppingBag className="w-3 h-3" />
                <span>{store.stats.totalProducts} productos</span>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className="w-3 h-3" />
                <span>{store.stats.totalOrders} órdenes</span>
              </div>
              <div className="flex items-center space-x-1">
                <Eye className="w-3 h-3" />
                <span>{store.stats.totalViews}</span>
              </div>
            </div>

            {/* Theme Preview */}
            <div className="flex items-center space-x-1 mt-3">
              <div
                className="w-3 h-3 rounded-full border border-gray-200"
                style={{ backgroundColor: themeColors.primary }}
              />
              <div
                className="w-3 h-3 rounded-full border border-gray-200"
                style={{ backgroundColor: themeColors.secondary }}
              />
              <div
                className="w-3 h-3 rounded-full border border-gray-200"
                style={{ backgroundColor: themeColors.accent }}
              />
              <span className="text-xs text-gray-500 ml-2">
                {themeName}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}