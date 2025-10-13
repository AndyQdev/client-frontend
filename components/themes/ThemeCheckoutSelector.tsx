import { Store } from '@/lib/types'
import type { SerializableProfessionalTheme, CustomColors } from '@/lib/themes/types'

// Import checkout components from each theme
import { ModernCheckout } from './tecnologia/modern'
import { EleganteCheckout } from './moda/elegante'
import { MinimalCheckout } from './hogar/minimal'
import { ClassicCheckout } from './belleza/classic'
import DarkModeCheckout from './deportes/darkmode/DarkModeCheckout'
import { CreativeCheckout } from './arte/creative'
import { InteriorCheckout } from './hogar/interior'

interface ThemeCheckoutSelectorProps {
  themeId: string
  store: Store
  serializableTheme: SerializableProfessionalTheme & { customColors: CustomColors }
}

export default function ThemeCheckoutSelector({
  themeId,
  store,
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
    case 'interior':
      CheckoutComponent = <InteriorCheckout store={store} />
      break

    default:
      CheckoutComponent = (
        <div className="p-8 text-center">
          <h2 className="text-2xl mb-4">Checkout</h2>
          <p className="text-red-600 mb-4">Theme not found.</p>
        </div>
      )
  }

  // Ya no envolvemos con CartProvider aquí porque está en el layout
  return <>{CheckoutComponent}</>
}
