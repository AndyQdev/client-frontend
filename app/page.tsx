import { Suspense } from 'react'
import MarketplaceHeader from '@/components/MarketplaceHeader'
import StoreGrid from '@/components/StoreGrid'
import MarketplaceSearch from '@/components/MarketplaceSearch'
import { getAllStores } from '@/lib/api'
import { VendfyIcon, VendfyLogo } from '@/components/shared/VendfyLogo'

interface PageProps {
  searchParams: Promise<{ q?: string }>
}

export default async function MarketplacePage({ searchParams }: PageProps) {
  const params = await searchParams
  const search = params?.q || ''
  const stores = await getAllStores(search || undefined)

  return (
    <main className="min-h-screen bg-gray-50/50">
      <MarketplaceHeader />

      {/* Hero */}
      <section className="bg-gradient-to-b from-slate-900 to-slate-800 pt-16 pb-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
            <VendfyIcon size={18} dark />
            Marketplace de tiendas online
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4 leading-tight">
            Encuentra tu tienda <span className="text-emerald-400">favorita</span>
          </h1>
          <p className="text-lg text-slate-400 mb-10 max-w-xl mx-auto">
            Descubre productos únicos de emprendedores que digitalizaron su negocio con Vendfy
          </p>

          <Suspense fallback={null}>
            <MarketplaceSearch />
          </Suspense>
        </div>
      </section>

      {/* Stores */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="mb-6 flex items-center justify-between">
          <div>
            {search ? (
              <p className="text-sm text-gray-500">
                {stores.length} resultado{stores.length !== 1 ? 's' : ''} para "<span className="font-medium text-gray-700">{search}</span>"
              </p>
            ) : (
              <p className="text-sm text-gray-500">{stores.length} tienda{stores.length !== 1 ? 's' : ''} disponibles</p>
            )}
          </div>
        </div>

        <StoreGrid stores={stores} />

        {/* Footer */}
        <footer className="mt-20 pb-10 flex flex-col items-center gap-2">
          <VendfyLogo variant="full" size={28} />
          <span className="text-xs text-gray-400">Digitaliza tu negocio</span>
        </footer>
      </section>
    </main>
  )
}
