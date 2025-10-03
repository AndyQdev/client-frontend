// import Image from 'next/image'
// import { Store } from '@/lib/types'

// interface StoreBannerProps {
//   store: Store
// }

// export default function StoreBanner({ store }: StoreBannerProps) {
//   if (!store.banner && !store.description) {
//     return null
//   }

//   return (
//     <section className="relative h-48 md:h-64 bg-gradient-to-r from-primary to-secondary overflow-hidden">
//       {store.banner && (
//         <>
//           <Image
//             src={store.banner}
//             alt={store.name}
//             fill
//             className="object-cover"
//             priority
//           />
//           <div className="absolute inset-0 bg-black/40" />
//         </>
//       )}

//       <div className="absolute inset-0 flex items-center">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
//           <div className="max-w-3xl">
//             <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
//               {store.name}
//             </h1>

//             {store.description && (
//               <p className="text-lg text-white/90 mb-6">
//                 {store.description}
//               </p>
//             )}

//             <div className="flex items-center space-x-6 text-white/80">
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-white">
//                   {store.stats.totalProducts}
//                 </div>
//                 <div className="text-sm">Productos</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-white">
//                   {store.stats.totalOrders}
//                 </div>
//                 <div className="text-sm">Órdenes</div>
//               </div>
//               <div className="text-center">
//                 <div className="text-2xl font-bold text-white">
//                   {store.stats.totalViews}
//                 </div>
//                 <div className="text-sm">Visitas</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }