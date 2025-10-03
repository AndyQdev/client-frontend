// 'use client'

// import { useState } from 'react'
// import { Category } from '@/lib/types'
// import { Tag } from 'lucide-react'

// interface CategoryFilterProps {
//   categories: Category[]
//   onFilter?: (categorySlug: string | null) => void
// }

// export default function CategoryFilter({ categories, onFilter }: CategoryFilterProps) {
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

//   const handleCategoryClick = (categorySlug: string | null) => {
//     setSelectedCategory(categorySlug)
//     onFilter?.(categorySlug)
//   }

//   if (categories.length === 0) {
//     return null
//   }

//   return (
//     <div className="flex flex-wrap gap-2 mb-6">
//       <button
//         onClick={() => handleCategoryClick(null)}
//         className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-colors text-sm font-medium ${
//           selectedCategory === null
//             ? 'bg-primary text-white border-primary'
//             : 'bg-surface border-border-default text-text-secondary hover:bg-background'
//         }`}
//       >
//         <Tag className="w-4 h-4" />
//         <span>Todas las categorías</span>
//       </button>

//       {categories.map((category) => (
//         <button
//           key={category.id}
//           onClick={() => handleCategoryClick(category.slug)}
//           className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-colors text-sm font-medium ${
//             selectedCategory === category.slug
//               ? 'bg-primary text-white border-primary'
//               : 'bg-surface border-border-default text-text-secondary hover:bg-background'
//           }`}
//         >
//           <span>{category.name}</span>
//           <span className="text-xs bg-accent text-white px-2 py-0.5 rounded-full">
//             {category.productCount}
//           </span>
//         </button>
//       ))}
//     </div>
//   )
// }