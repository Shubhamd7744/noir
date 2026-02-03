import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchProductByHandle, ShopifyProduct } from '@/lib/shopify';

export function useShopifyProducts(limit: number = 50, searchQuery?: string) {
  return useQuery({
    queryKey: ['shopify-products', limit, searchQuery],
    queryFn: () => fetchProducts(limit, searchQuery),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}

export function useShopifyProduct(handle: string | undefined) {
  return useQuery({
    queryKey: ['shopify-product', handle],
    queryFn: () => (handle ? fetchProductByHandle(handle) : null),
    enabled: !!handle,
    staleTime: 1000 * 60 * 5,
  });
}
