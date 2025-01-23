import { User, UsersQuery } from '@ronaldocreis/wishlist-schema';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { userService } from '@/api/services/user';

const { USER_PATH, findByUsername } = userService;

export const useUser = (username?: User['username'] | null) => {
  return useQuery({
    queryKey: [USER_PATH, username],
    queryFn: () => findByUsername(username!),
    enabled: !!username,
  });
};

export const useUsers = (query?: UsersQuery) => {
  return useQuery({
    queryKey: [USER_PATH, query],
    queryFn: () => userService.findAll(query),
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.update,
    onSuccess: ({ username }) => {
      queryClient.invalidateQueries({ queryKey: [USER_PATH, username] });
    },
  });
};

export const useUpdateUserImage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userService.updateUserImage,
    onSuccess: ({ username }) => {
      queryClient.invalidateQueries({ queryKey: [USER_PATH, username] });
    },
  });
};
