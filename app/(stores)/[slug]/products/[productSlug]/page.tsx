import Image from 'next/image'
import Link from 'next/link'

// Placeholder: deberías reemplazar con fetch por productSlug y store
export default async function ProductDetail() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Link href="../.." className="text-sm underline">Volver a la tienda</Link>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="aspect-square relative rounded-2xl overflow-hidden bg-bg-muted" />
        <div>
          <h1 className="text-2xl font-semibold">Nombre de producto</h1>
          <p className="mt-2 text-text-secondary">Descripción breve del producto.</p>
          <div className="mt-4 text-2xl text-secondary font-bold">$99.90</div>
          <button className="mt-6 rounded-xl bg-secondary px-5 py-3 text-white hover:bg-secondary-dark">
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  )
}
