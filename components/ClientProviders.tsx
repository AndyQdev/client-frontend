'use client'

import { ReactNode } from 'react'
import QueryProvider from '@/lib/query-provider'
import { WebSocketProvider } from '@/lib/websocket-context'

interface ClientProvidersProps {
  children: ReactNode
}

export default function ClientProviders({ children }: ClientProvidersProps) {
  return (
    <QueryProvider>
      <WebSocketProvider>
        {children}
      </WebSocketProvider>
    </QueryProvider>
  )
}
