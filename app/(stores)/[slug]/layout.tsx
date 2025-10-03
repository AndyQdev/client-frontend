import type { Metadata } from 'next'
import { seoForStore } from '@/lib/seo'

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  return await seoForStore(params.slug)
}

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
