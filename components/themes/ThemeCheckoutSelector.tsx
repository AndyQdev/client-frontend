import { Store } from '@/lib/types'
import type { SerializableProfessionalTheme, CustomColors } from '@/lib/themes/types'
import { CartProvider } from '@/lib/cart-context'

// Import checkout components from each theme
import { ModernCheckout } from './modern'
import { EleganteCheckout } from './elegante'
import { MinimalCheckout } from './minimal'
import { ClassicCheckout } from './classic'
import DarkModeCheckout from './darkmode/DarkModeCheckout'
import { CreativeCheckout } from './creative'

interface ThemeCheckoutSelectorProps {
  themeId: string
  store: Store
  serializableTheme: SerializableProfessionalTheme & { customColors: CustomColors }
}

export default function ThemeCheckoutSelector({
  themeId,
  store,
  serializableTheme
}: ThemeCheckoutSelectorProps) {
  let CheckoutComponent

  switch (themeId) {
    case 'modern':
      CheckoutComponent = <ModernCheckout store={store} />
      break

    case 'elegante':
      CheckoutComponent = <EleganteCheckout store={store} />
      break

    case 'minimal':
      CheckoutComponent = <MinimalCheckout store={store} />
      break

    case 'classic':
      CheckoutComponent = <ClassicCheckout store={store} />
      break

    case 'darkmode':
      CheckoutComponent = <DarkModeCheckout store={store} />
      break

    case 'creative':
      CheckoutComponent = <CreativeCheckout store={store} />
      break

    default:
      CheckoutComponent = (
        <div className="p-8 text-center">
          <h2 className="text-2xl mb-4">Checkout</h2>
          <p className="text-red-600 mb-4">Theme not found.</p>
        </div>
      )
  }

  return <CartProvider>{CheckoutComponent}</CartProvider>
}
