import { Store, Product, Category } from '@/lib/types'
import type { SerializableProfessionalTheme, CustomColors } from '@/lib/themes/types'
import { CartProvider } from '@/lib/cart-context'

// Importar componentes de cada tema
import { ModernStorePage } from './tecnologia/modern'
import { EleganteStorePage } from './moda/elegante'
import { MinimalStorePage } from './hogar/minimal'
import { ClassicStorePage } from './belleza/classic'
import DarkModeStorePage from './deportes/darkmode/DarkModeStorePage'
import { CreativeStorePage } from './arte/creative'

interface ThemeComponentSelectorProps {
  themeId: string
  store: Store
  products: Product[]
  categories: Category[]
  serializableTheme: SerializableProfessionalTheme & { customColors: CustomColors }
}

export default function ThemeComponentSelector({
  themeId,
  store,
  products,
  categories,
  serializableTheme
}: ThemeComponentSelectorProps) {
  // Envolver todo con CartProvider para que todos los temas tengan acceso al carrito
  let ThemeComponent

  // Selector dinámico de componentes basado en el tema
  switch (themeId) {
    case 'modern':
      ThemeComponent = (
        <ModernStorePage
          store={store}
          products={products}
          categories={categories}
        />
      )
      break

    case 'elegante':
      ThemeComponent = (
        <EleganteStorePage
          store={store}
          products={products}
          categories={categories}
        />
      )
      break

    case 'minimal':
      ThemeComponent = (
        <MinimalStorePage
          store={store}
          products={products}
          categories={categories}
        />
      )
      break

    case 'classic':
      ThemeComponent = (
        <ClassicStorePage
          store={store}
          products={products}
          categories={categories}
        />
      )
      break

    case 'darkmode':
      ThemeComponent = (
        <DarkModeStorePage
          store={store}
          products={products}
          categories={categories}
        />
      )
      break

    case 'creative':
      ThemeComponent = (
        <CreativeStorePage
          store={store}
          products={products}
          categories={categories}
        />
      )
      break

    default:
      // Fallback para temas no implementados
      ThemeComponent = (
        <div className="p-8 text-center">
          <h2 className="text-2xl mb-4">Tema: {themeId}</h2>
          <p className="text-red-600 mb-4">Tema no encontrado. Usando vista por defecto.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="border rounded-lg p-4">
                <h3 className="font-semibold">{product.name}</h3>
                <p className="text-gray-600">${product.price}</p>
              </div>
            ))}
          </div>
        </div>
      )
  }

  return <CartProvider>{ThemeComponent}</CartProvider>
}