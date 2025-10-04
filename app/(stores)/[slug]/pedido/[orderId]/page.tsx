import { notFound } from 'next/navigation'
import { getStoreBySlug, getStoreProfessionalThemeSerializable } from '@/lib/fake-data'
import ThemeProvider from '@/components/ThemeProvider'
import ThemeOrderTrackingSelector from '@/components/themes/ThemeOrderTrackingSelector'

interface OrderTrackingPageProps {
  params: {
    slug: string
    orderId: string
  }
}

export default async function OrderTrackingPage({ params }: OrderTrackingPageProps) {
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
      <ThemeOrderTrackingSelector
        themeId={serializableTheme.id}
        store={store}
        orderId={params.orderId}
        serializableTheme={serializableTheme}
      />
    </ThemeProvider>
  )
}
