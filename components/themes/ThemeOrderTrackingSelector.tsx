import { Store } from '@/lib/types'
import type { SerializableProfessionalTheme, CustomColors } from '@/lib/themes/types'
import { CartProvider } from '@/lib/cart-context'

// Import order tracking components from each theme
import { ModernOrderTracking } from './tecnologia/modern'
import { EleganteOrderTracking } from './moda/elegante'
import { MinimalOrderTracking } from './hogar/minimal'
import { ClassicOrderTracking } from './belleza/classic'
import DarkModeOrderTracking from './deportes/darkmode/DarkModeOrderTracking'
import { CreativeOrderTracking } from './arte/creative'
import { InteriorOrderTracking } from './hogar/interior'

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

    case 'interior':
      TrackingComponent = <InteriorOrderTracking store={store} orderId={orderId} />
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
