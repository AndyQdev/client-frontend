import { Store, Product } from '@/lib/types'
import type { SerializableProfessionalTheme, CustomColors } from '@/lib/themes/types'
import { CartProvider } from '@/lib/cart-context'

// Importar componentes de detalle de cada tema
import { ModernProductDetail } from './tecnologia/modern'
import { EleganteProductDetail } from './moda/elegante'
import { MinimalProductDetail } from './hogar/minimal'
import { ClassicProductDetail } from './belleza/classic'
import DarkModeProductDetail from './deportes/darkmode/DarkModeProductDetail'
import { CreativeProductDetail } from './arte/creative'

interface ThemeProductDetailSelectorProps {
  themeId: string
  store: Store
  product: Product
  serializableTheme: SerializableProfessionalTheme & { customColors: CustomColors }
}

export default function ThemeProductDetailSelector({
  themeId,
  store,
  product,
  serializableTheme
}: ThemeProductDetailSelectorProps) {
  let DetailComponent

  switch (themeId) {
    case 'modern':
      DetailComponent = (
        <ModernProductDetail
          store={store}
          product={product}
        />
      )
      break

    case 'elegante':
      DetailComponent = (
        <EleganteProductDetail
          store={store}
          product={product}
        />
      )
      break

    case 'minimal':
      DetailComponent = (
        <MinimalProductDetail
          store={store}
          product={product}
        />
      )
      break

    case 'classic':
      DetailComponent = (
        <ClassicProductDetail
          store={store}
          product={product}
        />
      )
      break

    case 'darkmode':
      DetailComponent = (
        <DarkModeProductDetail
          store={store}
          product={product}
        />
      )
      break

    case 'creative':
      DetailComponent = (
        <CreativeProductDetail
          store={store}
          product={product}
        />
      )
      break

    default:
      DetailComponent = (
        <div className="p-8 text-center">
          <h2 className="text-2xl mb-4">Product Detail</h2>
          <p className="text-red-600 mb-4">Theme not found. Using default view.</p>
        </div>
      )
  }

  return <CartProvider>{DetailComponent}</CartProvider>
}
