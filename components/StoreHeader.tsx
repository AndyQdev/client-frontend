import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ShoppingCart, MessageCircle, Phone, Mail } from 'lucide-react'
import { Store } from '@/lib/types'
import CartButton from './CartButton'

interface StoreHeaderProps {
  store: Store
}

export default function StoreHeader({ store }: StoreHeaderProps) {
  return (
    <header className="bg-surface border-b border-border-default shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Back to marketplace + Store info */}
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className="p-2 text-text-secondary hover:text-text-primary transition-colors rounded-lg hover:bg-background"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>

            <div className="flex items-center space-x-3">
              {store.logo ? (
                <Image
                  src={store.logo}
                  alt={store.name}
                  width={40}
                  height={40}
                  className="rounded-lg"
                />
              ) : (
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-semibold"
                  style={{ backgroundColor: store.theme.colors.primary }}
                >
                  {store.name.charAt(0)}
                </div>
              )}

              <div>
                <h1 className="text-lg font-semibold text-text-primary">
                  {store.name}
                </h1>
                <div className="flex items-center space-x-4 text-xs text-text-secondary">
                  {store.contact.phone && (
                    <div className="flex items-center space-x-1">
                      <Phone className="w-3 h-3" />
                      <span>{store.contact.phone}</span>
                    </div>
                  )}
                  {store.contact.email && (
                    <div className="flex items-center space-x-1">
                      <Mail className="w-3 h-3" />
                      <span>{store.contact.email}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {store.contact.whatsapp && (
              <Link
                href={`https://wa.me/${store.contact.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                className="flex items-center space-x-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </Link>
            )}

            <CartButton />
          </div>
        </div>
      </div>
    </header>
  )
}
