// 'use client'

// import { useState } from 'react'
// import { ShoppingCart, Plus, Minus, Check } from 'lucide-react'
// import { Product } from '@/lib/types'
// import { useCart } from '@/lib/store'

// interface AddToCartButtonProps {
//   product: Product
//   disabled?: boolean
//   variant?: 'full' | 'icon' | 'compact'
//   showQuantity?: boolean
// }

// export default function AddToCartButton({
//   product,
//   disabled = false,
//   variant = 'full',
//   showQuantity = false
// }: AddToCartButtonProps) {
//   const { addItem, cart } = useCart()
//   const [quantity, setQuantity] = useState(1)
//   const [isAdding, setIsAdding] = useState(false)

//   const cartItem = cart.items.find(item => item.product.id === product.id)
//   const isInCart = !!cartItem

//   const handleAddToCart = async () => {
//     if (disabled) return

//     setIsAdding(true)
//     addItem(product, quantity)

//     // Show feedback animation
//     setTimeout(() => {
//       setIsAdding(false)
//     }, 1000)
//   }

//   const increaseQuantity = () => {
//     if (quantity < product.stock) {
//       setQuantity(quantity + 1)
//     }
//   }

//   const decreaseQuantity = () => {
//     if (quantity > 1) {
//       setQuantity(quantity - 1)
//     }
//   }

//   if (variant === 'icon') {
//     return (
//       <button
//         onClick={handleAddToCart}
//         disabled={disabled || isAdding}
//         className={`p-2 rounded-lg transition-all duration-200 ${
//           disabled
//             ? 'bg-text-muted text-white cursor-not-allowed'
//             : isAdding
//             ? 'bg-success text-white'
//             : 'bg-primary hover:bg-primary-hover text-white hover:scale-105'
//         }`}
//       >
//         {isAdding ? (
//           <Check className="w-4 h-4" />
//         ) : (
//           <ShoppingCart className="w-4 h-4" />
//         )}
//       </button>
//     )
//   }

//   if (variant === 'compact') {
//     return (
//       <div className="flex items-center space-x-2">
//         {showQuantity && (
//           <div className="flex items-center space-x-1 bg-surface border border-border-default rounded-lg">
//             <button
//               onClick={decreaseQuantity}
//               disabled={quantity <= 1}
//               className="p-1 hover:bg-background transition-colors disabled:opacity-50"
//             >
//               <Minus className="w-3 h-3" />
//             </button>
//             <span className="px-2 text-sm font-medium">{quantity}</span>
//             <button
//               onClick={increaseQuantity}
//               disabled={quantity >= product.stock}
//               className="p-1 hover:bg-background transition-colors disabled:opacity-50"
//             >
//               <Plus className="w-3 h-3" />
//             </button>
//           </div>
//         )}

//         <button
//           onClick={handleAddToCart}
//           disabled={disabled || isAdding}
//           className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
//             disabled
//               ? 'bg-text-muted text-white cursor-not-allowed'
//               : isAdding
//               ? 'bg-success text-white'
//               : 'bg-primary hover:bg-primary-hover text-white'
//           }`}
//         >
//           {isAdding ? (
//             <>
//               <Check className="w-4 h-4" />
//               <span>Agregado</span>
//             </>
//           ) : (
//             <>
//               <ShoppingCart className="w-4 h-4" />
//               <span>{isInCart ? 'Agregar más' : 'Agregar'}</span>
//             </>
//           )}
//         </button>
//       </div>
//     )
//   }

//   // Full variant
//   return (
//     <div className="space-y-3">
//       {showQuantity && (
//         <div className="flex items-center justify-between">
//           <span className="text-sm font-medium text-text-primary">Cantidad:</span>
//           <div className="flex items-center space-x-1 bg-surface border border-border-default rounded-lg">
//             <button
//               onClick={decreaseQuantity}
//               disabled={quantity <= 1}
//               className="p-2 hover:bg-background transition-colors disabled:opacity-50"
//             >
//               <Minus className="w-4 h-4" />
//             </button>
//             <span className="px-4 text-sm font-medium">{quantity}</span>
//             <button
//               onClick={increaseQuantity}
//               disabled={quantity >= product.stock}
//               className="p-2 hover:bg-background transition-colors disabled:opacity-50"
//             >
//               <Plus className="w-4 h-4" />
//             </button>
//           </div>
//         </div>
//       )}

//       <button
//         onClick={handleAddToCart}
//         disabled={disabled || isAdding}
//         className={`w-full flex items-center justify-center space-x-2 py-3 px-4 rounded-lg font-medium transition-all duration-200 ${
//           disabled
//             ? 'bg-text-muted text-white cursor-not-allowed'
//             : isAdding
//             ? 'bg-success text-white'
//             : 'bg-primary hover:bg-primary-hover text-white hover:shadow-md'
//         }`}
//       >
//         {isAdding ? (
//           <>
//             <Check className="w-5 h-5" />
//             <span>¡Agregado al carrito!</span>
//           </>
//         ) : (
//           <>
//             <ShoppingCart className="w-5 h-5" />
//             <span>
//               {isInCart
//                 ? `Agregar más (${cartItem.quantity} en carrito)`
//                 : 'Agregar al carrito'
//               }
//             </span>
//           </>
//         )}
//       </button>

//       {isInCart && (
//         <div className="text-center text-sm text-success">
//           ✓ Ya tienes {cartItem.quantity} de este producto en tu carrito
//         </div>
//       )}
//     </div>
//   )
// }