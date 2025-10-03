import { Store } from '@/lib/types'
import { ShoppingBag, TrendingUp, Users, Star } from 'lucide-react'

interface MarketplaceStatsProps {
  stores: Store[]
}

export default function MarketplaceStats({ stores }: MarketplaceStatsProps) {
  const totalProducts = stores.reduce((sum, store) => sum + store.stats.totalProducts, 0)
  const totalOrders = stores.reduce((sum, store) => sum + store.stats.totalOrders, 0)
  const totalViews = stores.reduce((sum, store) => sum + store.stats.totalViews, 0)

  const stats = [
    {
      label: 'Tiendas Activas',
      value: stores.length,
      icon: Users,
      color: 'text-primary',
    },
    {
      label: 'Productos Disponibles',
      value: totalProducts,
      icon: ShoppingBag,
      color: 'text-secondary',
    },
    {
      label: 'Órdenes Realizadas',
      value: totalOrders,
      icon: TrendingUp,
      color: 'text-accent',
    },
    {
      label: 'Visitas Totales',
      value: totalViews,
      icon: Star,
      color: 'text-info',
    },
  ]

  return (
    <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-surface border border-border-default rounded-lg p-6 text-center hover:shadow-md transition-shadow"
        >
          <div className="flex items-center justify-center mb-3">
            <stat.icon className={`w-8 h-8 ${stat.color}`} />
          </div>
          <div className="text-2xl font-bold text-text-primary mb-1">
            {stat.value.toLocaleString()}
          </div>
          <div className="text-sm text-text-secondary">
            {stat.label}
          </div>
        </div>
      ))}
    </section>
  )
}