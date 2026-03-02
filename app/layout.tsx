import '../styles/globals.css'
import type { Metadata } from 'next'
import CartDrawer from '@/components/CartDrawer'
import { Toaster } from '@/components/ui/sonner'
import ClientProviders from '@/components/ClientProviders'

export const metadata: Metadata = {
  title: 'SnapStore - Marketplace de Tiendas Online',
  description: 'Descubre productos únicos de emprendedores locales en nuestro marketplace multi-tienda',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-background text-text-primary">
        <ClientProviders>
          {children}
          <CartDrawer />
          <Toaster />
        </ClientProviders>
      </body>
    </html>
  )
}
