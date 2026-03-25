import { Metadata } from 'next'
import { OrderDetailPage } from '@/components/shared/OrderDetailPage'

interface Props {
  params: { orderId: string }
}

export const metadata: Metadata = {
  title: 'Mi Pedido - Vendfy',
  description: 'Detalle y seguimiento de tu pedido',
}

export default function OrderPage({ params }: Props) {
  return <OrderDetailPage orderId={params.orderId} />
}
