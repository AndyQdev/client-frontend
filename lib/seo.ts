import { getStoreBySlug } from './api'

export async function seoForStore(slug: string) {
  const store = await getStoreBySlug(slug)

  if (!store) {
    return {
      title: 'Tienda no encontrada',
      description: 'La tienda que buscas no está disponible',
      openGraph: { images: [] },
      alternates: { canonical: `https://example.com/${slug}` },
    }
  }

  return {
    title: store.name,
    description: store.description ?? '',
    openGraph: { images: [store.logo ?? ''] },
    alternates: { canonical: `https://example.com/${slug}` },
  }
}
