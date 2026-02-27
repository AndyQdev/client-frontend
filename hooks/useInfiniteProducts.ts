'use client'

import { useInfiniteQuery } from '@tanstack/react-query'
import { productService, ProductFilters } from '@/lib/api/services/product.service'
import { InventoryEntity } from '@/lib/api/types'

interface UseInfiniteProductsParams extends Omit<ProductFilters, 'offset' | 'limit'> {
  storeId: string
  pageSize?: number
}

interface InfiniteProductsResponse {
  data: InventoryEntity[]
  countData: number
}

export function useInfiniteProducts(params: UseInfiniteProductsParams) {
  const pageSize = params.pageSize || 9 // Por defecto 9 para grids de 3 columnas
  
  return useInfiniteQuery<InfiniteProductsResponse, Error, InfiniteProductsResponse, readonly unknown[], number>({
    queryKey: ['products-infinite', params],
    queryFn: async ({ pageParam }) => {
      const filters: ProductFilters = {
        ...params,
        limit: pageSize,
        offset: pageParam * pageSize,
      }
      
      // Remover storeId de filters ya que se pasa por separado
      const { storeId, pageSize: _, ...restFilters } = params as any
      
      console.log('🔍 useInfiniteProducts - Calling endpoint:', `/product/store/${params.storeId}`)
      console.log('🔍 useInfiniteProducts - Filters:', { ...restFilters, limit: pageSize, offset: pageParam * pageSize })
      
      const response = await productService.findByStore(params.storeId, {
        ...restFilters,
        limit: pageSize,
        offset: pageParam * pageSize,
      })
      
      console.log('✅ useInfiniteProducts - Response:', response)
      console.log('✅ useInfiniteProducts - First item:', response.data[0])
      
      return {
        data: response.data,
        countData: response.countData,
      }
    },
    getNextPageParam: (lastPage, allPages) => {
      const totalFetched = allPages.reduce((acc, page) => acc + page.data.length, 0)
      return totalFetched < lastPage.countData ? allPages.length : undefined
    },
    initialPageParam: 0,
  })
}
