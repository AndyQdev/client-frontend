import MarketplaceHeader from '@/components/MarketplaceHeader'
import StoreGrid from '@/components/StoreGrid'
import MarketplaceStats from '@/components/MarketplaceStats'
import { getAllStores } from '@/lib/fake-data'

export default function MarketplacePage() {
  const stores = getAllStores()

  return (
    <main className="min-h-screen bg-background">
      <MarketplaceHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <MarketplaceStats stores={stores} />

        <section className="mt-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-text-primary">
                Todas las Tiendas
              </h2>
              <p className="text-text-secondary mt-2">
                Descubre productos únicos de emprendedores locales
              </p>
            </div>
          </div>

          <StoreGrid stores={stores} />
        </section>
      </div>
    </main>
  )
}
