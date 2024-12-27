import { Product } from '@ronaldocreis/wishlist-schema';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { productService } from '@/api/services/product';
import { listService } from '@/api/services/list';

const { PRODUCT_PATH, findById, create, remove, update } = productService;
const { LIST_PATH } = listService;

export const useProduct = (id: Product['id']) => {
  return useQuery({
    queryKey: [PRODUCT_PATH, id],
    queryFn: () => findById(id),
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: create,
    onSuccess: ({ listId }) => {
      queryClient.invalidateQueries({ queryKey: [LIST_PATH, listId] });
    },
  });
};

export const useRemoveProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: remove,
    onSuccess: ({ listId }) => {
      queryClient.invalidateQueries({ queryKey: [LIST_PATH, listId] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: update,
    onSuccess: ({ id, listId }) => {
      queryClient.invalidateQueries({ queryKey: [LIST_PATH, listId] });
      queryClient.invalidateQueries({ queryKey: [PRODUCT_PATH, id] });
    },
  });
};
