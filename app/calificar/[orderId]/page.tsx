import { Metadata } from 'next'
import { RatingPage } from '@/components/shared/RatingPage'

interface Props {
  params: { orderId: string }
}

export const metadata: Metadata = {
  title: 'Califica tu experiencia - Vendfy',
  description: 'Tu opinión nos ayuda a mejorar',
}

export default function CalificarPage({ params }: Props) {
  return <RatingPage orderId={params.orderId} />
}
