import { Store, Product, Category } from '@/lib/types'
import { SerializableProfessionalTheme, CustomColors } from '@/lib/themes'

// Importar componentes de cada tema
import { ModernStorePage } from './modern'
import { EleganteStorePage } from './elegante'
import { MinimalStorePage } from './minimal'
import { ClassicStorePage } from './classic'
import { EditorialStorePage } from './editorial'
import { CreativeStorePage } from './creative'

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
  // Selector dinámico de componentes basado en el tema
  switch (themeId) {
    case 'modern':
      return (
        <ModernStorePage
          store={store}
          products={products}
          categories={categories}
        />
      )

    case 'elegante':
      return (
        <EleganteStorePage
          store={store}
          products={products}
          categories={categories}
        />
      )

    case 'minimal':
      return (
        <MinimalStorePage
          store={store}
          products={products}
          categories={categories}
        />
      )

    case 'classic':
      return (
        <ClassicStorePage
          store={store}
          products={products}
          categories={categories}
        />
      )

    case 'editorial':
      return (
        <EditorialStorePage
          store={store}
          products={products}
          categories={categories}
        />
      )

    case 'creative':
      return (
        <CreativeStorePage
          store={store}
          products={products}
          categories={categories}
        />
      )

    default:
      // Fallback para temas no implementados
      return (
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
}