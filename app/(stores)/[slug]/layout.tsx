import type { Metadata } from 'next'
import { seoForStore } from '@/lib/seo'
import StoreLayoutClient from './StoreLayoutClient'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  return await seoForStore(params.slug)
}

export default function StoreLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { slug: string }
}) {
  return (
    <StoreLayoutClient storeSlug={params.slug}>
      {children}
    </StoreLayoutClient>
  )
}
