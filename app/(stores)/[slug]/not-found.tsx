import Link from 'next/link'
import { Home, Search, ArrowLeft } from 'lucide-react'

export default function StoreNotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md mx-auto text-center">
        <div className="mb-8">
          <div className="text-8xl font-bold text-text-muted mb-4">404</div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">
            Tienda no encontrada
          </h1>
          <p className="text-text-secondary">
            La tienda que buscas no existe o no está disponible en este momento.
          </p>
        </div>

        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors font-medium"
          >
            <Home className="w-5 h-5" />
            <span>Volver al marketplace</span>
          </Link>

          <div className="text-sm text-text-secondary">
            o explora otras tiendas disponibles
          </div>
        </div>
      </div>
    </div>
  )
}
