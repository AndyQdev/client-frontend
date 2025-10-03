import { notFound } from 'next/navigation'
import { getStoreBySlug, getProductById } from '@/lib/fake-data'
import { themeStyleVars } from '@/lib/theming'
import StoreHeader from '@/components/StoreHeader'
import ProductDetail from '@/components/ProductDetail'
import ThemeProvider from '@/components/ThemeProvider'

interface ProductPageProps {
  params: {
    slug: string
    id: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const store = getStoreBySlug(params.slug)
  const product = getProductById(params.id)

  if (!store || !store.isActive || !product || product.storeId !== store.id) {
    notFound()
  }

  return (
    <ThemeProvider theme={store.theme}>
      <div style={themeStyleVars(store.theme)} className="min-h-screen bg-background">
        <StoreHeader store={store} />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <ProductDetail product={product} store={store} />
        </main>
      </div>
    </ThemeProvider>
  )
}