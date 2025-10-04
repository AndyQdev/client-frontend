import { notFound } from 'next/navigation'
import { getStoreBySlug, getProductBySlug, getStoreProfessionalThemeSerializable } from '@/lib/fake-data'
import ThemeProvider from '@/components/ThemeProvider'
import ThemeProductDetailSelector from '@/components/themes/ThemeProductDetailSelector'

interface ProductDetailPageProps {
  params: {
    slug: string
    productSlug: string
  }
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const store = getStoreBySlug(params.slug)
  const product = getProductBySlug(params.productSlug)

  if (!store || !store.isActive || !product || product.storeId !== store.id) {
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
