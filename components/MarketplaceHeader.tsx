import Link from 'next/link'
import { Store } from 'lucide-react'

export default function MarketplaceHeader() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-sm">
              <Store className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              Vend<span className="text-emerald-600">fy</span>
            </span>
          </Link>

          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
            <span>Digitaliza tu negocio</span>
          </div>
        </div>
      </div>
    </header>
  )
}
