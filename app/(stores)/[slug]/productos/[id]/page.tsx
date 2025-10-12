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
  const product = await getProductById(params.id)

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
