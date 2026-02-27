import '../styles/globals.css'
import type { Metadata } from 'next'
import CartDrawer from '@/components/CartDrawer'
import QueryProvider from '@/lib/query-provider'
import { Toaster } from '@/components/ui/sonner'

export const metadata: Metadata = {
  title: 'SnapStore - Marketplace de Tiendas Online',
  description: 'Descubre productos únicos de emprendedores locales en nuestro marketplace multi-tienda',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className="bg-background text-text-primary">
        <QueryProvider>
          {children}
          <CartDrawer />
          <Toaster />
        </QueryProvider>
      </body>
    </html>
  )
}
