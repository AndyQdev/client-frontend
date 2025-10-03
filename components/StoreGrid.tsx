import { Store } from '@/lib/types'
import StoreCard from './StoreCard'

interface StoreGridProps {
  stores: Store[]
}

export default function StoreGrid({ stores }: StoreGridProps) {
  if (stores.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-text-secondary text-lg">
          No hay tiendas disponibles en este momento
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {stores.map((store) => (
        <StoreCard key={store.id} store={store} />
      ))}
    </div>
  )
}