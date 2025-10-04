import { notFound } from 'next/navigation'
import { getStoreBySlug, getStoreProducts, getStoreCategories, getStoreProfessionalThemeSerializable } from '@/lib/fake-data'
import ThemeProvider from '@/components/ThemeProvider'
import ThemeComponentSelector from '@/components/themes/ThemeComponentSelector'

export default async function StorePage({ params }: { params: { slug: string } }) {
  const store = getStoreBySlug(params.slug)

  if (!store || !store.isActive) {
    notFound()
  }

  const products = getStoreProducts(store.id)
  const categories = getStoreCategories(store.id)

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
