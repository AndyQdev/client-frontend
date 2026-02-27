import { getStoreBySlug } from './api'

// Lista de archivos estáticos que no son slugs de tienda
const STATIC_FILES = [
  'favicon.ico',
  'serviceWorker.js',
  'robots.txt',
  'sitemap.xml',
  'manifest.json',
]

function isStaticFile(slug: string): boolean {
  return (
    STATIC_FILES.includes(slug) ||
    slug.endsWith('.ico') ||
    slug.endsWith('.js') ||
    slug.endsWith('.css') ||
    slug.endsWith('.png') ||
    slug.endsWith('.jpg') ||
    slug.endsWith('.svg') ||
    slug.endsWith('.webp') ||
    slug.endsWith('.xml') ||
    slug.endsWith('.json')
  )
}

export async function seoForStore(slug: string) {
  // Ignorar archivos estáticos
  if (isStaticFile(slug)) {
    return {
      title: 'Tienda',
      description: 'Marketplace de tiendas',
      openGraph: { images: [] },
    }
  }

  let store
  try {
    store = await getStoreBySlug(slug)
  } catch (error) {
    // Ignorar errores para archivos estáticos o tiendas no encontradas
    return {
      title: 'Tienda no encontrada',
      description: 'La tienda que buscas no está disponible',
      openGraph: { images: [] },
    }
  }

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
