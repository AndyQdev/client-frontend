// 'use client'

// import { useState } from 'react'
// import { Search, Filter, SortAsc, SortDesc } from 'lucide-react'

// interface ProductSearchProps {
//   storeSlug: string
//   onSearch?: (query: string) => void
//   onSort?: (sortBy: string, order: 'asc' | 'desc') => void
// }

// export default function ProductSearch({ storeSlug, onSearch, onSort }: ProductSearchProps) {
//   const [searchQuery, setSearchQuery] = useState('')
//   const [sortBy, setSortBy] = useState('name')
//   const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const query = e.target.value
//     setSearchQuery(query)
//     onSearch?.(query)
//   }

//   const handleSortChange = (newSortBy: string) => {
//     const newOrder = sortBy === newSortBy && sortOrder === 'asc' ? 'desc' : 'asc'
//     setSortBy(newSortBy)
//     setSortOrder(newOrder)
//     onSort?.(newSortBy, newOrder)
//   }

//   return (
//     <div className="flex flex-col sm:flex-row gap-4 mb-6">
//       {/* Search Input */}
//       <div className="flex-1 relative">
//         <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-text-secondary w-4 h-4" />
//         <input
//           type="text"
//           value={searchQuery}
//           onChange={handleSearchChange}
//           placeholder="Buscar productos..."
//           className="w-full pl-10 pr-4 py-3 border border-border-default rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-surface"
//         />
//       </div>

//       {/* Sort Options */}
//       <div className="flex items-center space-x-2">
//         <button
//           onClick={() => handleSortChange('name')}
//           className={`flex items-center space-x-2 px-4 py-3 rounded-lg border transition-colors ${
//             sortBy === 'name'
//               ? 'bg-primary text-white border-primary'
//               : 'bg-surface border-border-default text-text-secondary hover:bg-background'
//           }`}
//         >
//           <span>Nombre</span>
//           {sortBy === 'name' && (
//             sortOrder === 'asc' ?
//             <SortAsc className="w-4 h-4" /> :
//             <SortDesc className="w-4 h-4" />
//           )}
//         </button>

//         <button
//           onClick={() => handleSortChange('price')}
//           className={`flex items-center space-x-2 px-4 py-3 rounded-lg border transition-colors ${
//             sortBy === 'price'
//               ? 'bg-primary text-white border-primary'
//               : 'bg-surface border-border-default text-text-secondary hover:bg-background'
//           }`}
//         >
//           <span>Precio</span>
//           {sortBy === 'price' && (
//             sortOrder === 'asc' ?
//             <SortAsc className="w-4 h-4" /> :
//             <SortDesc className="w-4 h-4" />
//           )}
//         </button>

//         <button
//           onClick={() => handleSortChange('newest')}
//           className={`flex items-center space-x-2 px-4 py-3 rounded-lg border transition-colors ${
//             sortBy === 'newest'
//               ? 'bg-primary text-white border-primary'
//               : 'bg-surface border-border-default text-text-secondary hover:bg-background'
//           }`}
//         >
//           <span>Nuevos</span>
//           {sortBy === 'newest' && (
//             sortOrder === 'asc' ?
//             <SortAsc className="w-4 h-4" /> :
//             <SortDesc className="w-4 h-4" />
//           )}
//         </button>
//       </div>
//     </div>
//   )
// }