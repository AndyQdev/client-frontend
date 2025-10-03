// import { ShoppingBag, Package, Search } from 'lucide-react'

// interface EmptyStateProps {
//   title?: string
//   message?: string
//   type?: 'products' | 'search' | 'cart'
//   action?: React.ReactNode
// }

// export default function EmptyState({
//   title,
//   message,
//   type = 'products',
//   action
// }: EmptyStateProps) {
//   const getContent = () => {
//     switch (type) {
//       case 'search':
//         return {
//           icon: Search,
//           defaultTitle: 'No se encontraron productos',
//           defaultMessage: 'Intenta con otros términos de búsqueda o filtra por categoría'
//         }
//       case 'cart':
//         return {
//           icon: ShoppingBag,
//           defaultTitle: 'Tu carrito está vacío',
//           defaultMessage: 'Agrega algunos productos para empezar a comprar'
//         }
//       default:
//         return {
//           icon: Package,
//           defaultTitle: 'Sin productos',
//           defaultMessage: 'Esta tienda aún no ha publicado productos.'
//         }
//     }
//   }

//   const { icon: Icon, defaultTitle, defaultMessage } = getContent()

//   return (
//     <div className="text-center py-16 px-4">
//       <div className="max-w-sm mx-auto">
//         <div className="w-20 h-20 mx-auto mb-6 bg-surface rounded-full flex items-center justify-center">
//           <Icon className="w-10 h-10 text-text-muted" />
//         </div>

//         <h3 className="text-xl font-semibold text-text-primary mb-3">
//           {title || defaultTitle}
//         </h3>

//         <p className="text-text-secondary mb-6 leading-relaxed">
//           {message || defaultMessage}
//         </p>

//         {action && (
//           <div className="space-y-3">
//             {action}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
