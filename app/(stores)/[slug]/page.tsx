import { notFound } from 'next/navigation'
import { getStoreBySlug, getStoreProducts, getStoreCategories, getStoreProfessionalThemeSerializable } from '@/lib/fake-data'
import { themeStyleVars } from '@/lib/theming'
import { getThemeById } from '@/lib/themes'
import ThemeProvider from '@/components/ThemeProvider'
import ThemeComponentSelector from '@/components/themes/ThemeComponentSelector'
import StoreHeader from '@/components/StoreHeader'
import ProductGrid from '@/components/ProductGrid'
import EmptyState from '@/components/EmptyState'
import CategoryFilter from '@/components/CategoryFilter'
import ProductSearch from '@/components/ProductSearch'
import StoreBanner from '@/components/StoreBanner'

export default async function StorePage({ params }: { params: { slug: string } }) {
  const store = getStoreBySlug(params.slug)

  if (!store || !store.isActive) {
    notFound()
  }

  const products = getStoreProducts(store.id)
  const categories = getStoreCategories(store.id)

  // Get serializable professional theme data (without functions)
  const serializableTheme = getStoreProfessionalThemeSerializable(store)

  // Use professional theme if available, otherwise fallback to legacy theme
  if (serializableTheme) {
    return (
      <ThemeProvider serializableTheme={serializableTheme}>
        <ThemeComponentSelector
          themeId={serializableTheme.id}
          store={store}
          products={products}
          categories={categories}
          serializableTheme={serializableTheme}
        />
      </ThemeProvider>
    )
  }

  // Fallback to legacy theme system
  return (
    <ThemeProvider theme={store.theme}>
      <div style={themeStyleVars(store.theme)} className="min-h-screen bg-background">
        <StoreHeader store={store} />
        <StoreBanner store={store} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search and Filters */}
          <div className="mb-8">
            <ProductSearch storeSlug={store.slug} />
            <CategoryFilter categories={categories} />
          </div>

          {/* Products Section */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-text-primary">
                  Productos
                </h2>
                <p className="text-text-secondary">
                  {products.length} productos disponibles
                </p>
              </div>
            </div>

            {products.length > 0 ? (
              <ProductGrid products={products} />
            ) : (
              <EmptyState />
            )}
          </section>
        </main>
      </div>
    </ThemeProvider>
  )
}
