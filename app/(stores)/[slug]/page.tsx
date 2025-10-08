import { notFound } from 'next/navigation'
import { getStoreBySlug, getStoreProducts, getStoreCategories } from '@/lib/api'
import { getStoreProfessionalThemeSerializable } from '@/lib/fake-data'
import ThemeProvider from '@/components/ThemeProvider'
import ThemeComponentSelector from '@/components/themes/ThemeComponentSelector'

export default async function StorePage({ params }: { params: { slug: string } }) {
  // Filter out invalid slugs (like serviceWorker.js, manifest.json, etc.)
  if (params.slug.includes('.') || params.slug.startsWith('_')) {
    notFound()
  }

  const store = await getStoreBySlug(params.slug)

  if (!store || !store.isActive) {
    notFound()
  }

  const products = await getStoreProducts(store.id)
  const categories = await getStoreCategories(store.id)

  // Get serializable professional theme data (without functions)
  const serializableTheme = getStoreProfessionalThemeSerializable(store)

  if (!serializableTheme) {
    notFound()
  }

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
