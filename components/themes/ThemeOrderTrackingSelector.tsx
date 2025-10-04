import { Store } from '@/lib/types'
import type { SerializableProfessionalTheme, CustomColors } from '@/lib/themes/types'
import { CartProvider } from '@/lib/cart-context'

// Import order tracking components from each theme
import { ModernOrderTracking } from './modern'
import { EleganteOrderTracking } from './elegante'
import { MinimalOrderTracking } from './minimal'
import { ClassicOrderTracking } from './classic'
import DarkModeOrderTracking from './darkmode/DarkModeOrderTracking'
import { CreativeOrderTracking } from './creative'

interface ThemeOrderTrackingSelectorProps {
  themeId: string
  store: Store
  orderId: string
  serializableTheme: SerializableProfessionalTheme & { customColors: CustomColors }
}

export default function ThemeOrderTrackingSelector({
  themeId,
  store,
  orderId,
  serializableTheme
}: ThemeOrderTrackingSelectorProps) {
  let TrackingComponent

  switch (themeId) {
    case 'modern':
      TrackingComponent = <ModernOrderTracking store={store} orderId={orderId} onCartClick={() => {}} />
      break

    case 'elegante':
      TrackingComponent = <EleganteOrderTracking store={store} orderId={orderId} onCartClick={() => {}} />
      break

    case 'minimal':
      TrackingComponent = <MinimalOrderTracking store={store} orderId={orderId} />
      break

    case 'classic':
      TrackingComponent = <ClassicOrderTracking store={store} orderId={orderId} />
      break

    case 'darkmode':
      TrackingComponent = <DarkModeOrderTracking store={store} orderId={orderId} onCartClick={() => {}} />
      break

    case 'creative':
      TrackingComponent = <CreativeOrderTracking store={store} orderId={orderId} />
      break

    default:
      TrackingComponent = (
        <div className="p-8 text-center">
          <h2 className="text-2xl mb-4">Order Tracking</h2>
          <p className="text-red-600 mb-4">Theme not found.</p>
        </div>
      )
  }

  return <CartProvider>{TrackingComponent}</CartProvider>
}
