import { notFound } from 'next/navigation'
import { getStoreBySlug, getProductById } from '@/lib/api'
import { getStoreProfessionalThemeSerializable } from '@/lib/fake-data'
import ThemeProvider from '@/components/ThemeProvider'
import ThemeProductDetailSelector from '@/components/themes/ThemeProductDetailSelector'

interface ProductDetailPageProps {
  params: {
    slug: string
    id: string
  }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const store = await getStoreBySlug(params.slug)
  // Pasar el storeId para usar el endpoint público
  const product = await getProductById(params.id, store?.id)

  if (!store || !store.isActive || !product) {
    notFound()
  }

  // Get serializable professional theme data
  const serializableTheme = getStoreProfessionalThemeSerializable(store)

  if (!serializableTheme) {
    notFound()
  }

  return (
    <ThemeProvider serializableTheme={serializableTheme}>
      <ThemeProductDetailSelector
        themeId={serializableTheme.id}
        store={store}
        product={product}
        serializableTheme={serializableTheme}
      />
    </ThemeProvider>
  )
}
