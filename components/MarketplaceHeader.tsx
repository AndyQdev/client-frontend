import Link from 'next/link'
import { VendfyLogo } from '@/components/shared/VendfyLogo'

export default function MarketplaceHeader() {
  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center">
            <VendfyLogo variant="full" size={36} />
          </Link>

          <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
            <span>Digitaliza tu negocio</span>
          </div>
        </div>
      </div>
    </header>
  )
}
