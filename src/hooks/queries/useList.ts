import { List } from '@ronaldocreis/wishlist-schema';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { listService } from '@/api/services/list';
import { userService } from '@/api/services/user';

const { LIST_PATH, findById, create, remove, update } = listService;
const { USER_PATH } = userService;

export const useList = (id: List['id']) => {
  return useQuery({
    queryKey: [LIST_PATH, id],
    queryFn: () => findById(id),
  });
};

export const useCreateList = () => {
  const queryClient = useQueryClient();
  const params = useParams();
  const { username } = params;

  return useMutation({
    mutationFn: create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_PATH, username] });
    },
  });
};

export const useRemoveList = () => {
  const queryClient = useQueryClient();
  const params = useParams();
  const { username } = params;

  return useMutation({
    mutationFn: remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [USER_PATH, username] });
    },
  });
};

export const useUpdateList = () => {
  const queryClient = useQueryClient();
  const params = useParams();
  const { username } = params;

  return useMutation({
    mutationFn: update,
    onSuccess: ({ id }) => {
      queryClient.invalidateQueries({ queryKey: [USER_PATH, username] });
      queryClient.invalidateQueries({ queryKey: [LIST_PATH, id] });
    },
  });
};
