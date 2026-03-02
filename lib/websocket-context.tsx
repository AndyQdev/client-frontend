'use client'

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { io, Socket } from 'socket.io-client'

interface OrderStatusChangeEvent {
  orderId: string
  status: string
  timestamp: string
  order: any
}

interface WebSocketContextType {
  socket: Socket | null
  isConnected: boolean
  onOrderStatusChange: (callback: (data: OrderStatusChangeEvent) => void) => () => void
}

const WebSocketContext = createContext<WebSocketContextType>({
  socket: null,
  isConnected: false,
  onOrderStatusChange: () => () => {},
})

export const useWebSocket = () => useContext(WebSocketContext)

interface WebSocketProviderProps {
  children: React.ReactNode
}

export function WebSocketProvider({ children }: WebSocketProviderProps) {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // WebSocket necesita conectarse a la URL base del servidor, no a /api
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'
    const wsUrl = apiUrl.replace('/api', '') // Remover /api si existe
    
    console.log('🔌 [WebSocket] Connecting to:', wsUrl)
    
    // Crear conexión WebSocket (namespace por defecto)
    const socketInstance = io(wsUrl, {
      path: '/socket.io',
      transports: ['websocket', 'polling'],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    })

    socketInstance.on('connect', () => {
      console.log('✅ [WebSocket] Connected to server')
      setIsConnected(true)
    })

    socketInstance.on('disconnect', () => {
      console.log('❌ [WebSocket] Disconnected from server')
      setIsConnected(false)
    })

    socketInstance.on('connect_error', (error) => {
      console.error('❌ [WebSocket] Connection error:', error)
      setIsConnected(false)
    })

    setSocket(socketInstance)

    return () => {
      socketInstance.disconnect()
    }
  }, [])

  const onOrderStatusChange = useCallback(
    (callback: (data: OrderStatusChangeEvent) => void) => {
      if (!socket) return () => {}

      socket.on('orderStatusChanged', callback)

      // Retornar función de limpieza
      return () => {
        socket.off('orderStatusChanged', callback)
      }
    },
    [socket]
  )

  return (
    <WebSocketContext.Provider value={{ socket, isConnected, onOrderStatusChange }}>
      {children}
    </WebSocketContext.Provider>
  )
}
