import { notFound } from 'next/navigation'
import { getStoreBySlug, getStoreProfessionalThemeSerializable } from '@/lib/fake-data'
import ThemeProvider from '@/components/ThemeProvider'
import ThemeCheckoutSelector from '@/components/themes/ThemeCheckoutSelector'

interface CheckoutPageProps {
  params: {
    slug: string
  }
}

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const store = getStoreBySlug(params.slug)

  if (!store || !store.isActive) {
    notFound()
  }

  const serializableTheme = getStoreProfessionalThemeSerializable(store)

  if (!serializableTheme) {
    notFound()
  }

  return (
    <ThemeProvider serializableTheme={serializableTheme}>
      <ThemeCheckoutSelector
        themeId={serializableTheme.id}
        store={store}
        serializableTheme={serializableTheme}
      />
    </ThemeProvider>
  )
}
