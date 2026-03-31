import '../styles/globals.css'
import type { Metadata } from 'next'
import CartDrawer from '@/components/CartDrawer'
import { Toaster } from '@/components/ui/sonner'
import ClientProviders from '@/components/ClientProviders'

export const metadata: Metadata = {
  title: 'Vendfy - Tiendas Online para tu Negocio',
  description: 'Descubre productos únicos de emprendedores locales. Digitaliza tu negocio con Vendfy.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-white text-gray-900">
        <ClientProviders>
          {children}
          <CartDrawer />
          <Toaster />
        </ClientProviders>
      </body>
    </html>
  )
}
