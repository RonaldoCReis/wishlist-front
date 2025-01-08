import { User, UsersQuery } from '@ronaldocreis/wishlist-schema';
import { useQuery } from '@tanstack/react-query';

import { userService } from '@/api/services/user';

const { USER_PATH, findByUsername } = userService;

export const useUser = (username: User['username']) => {
  return useQuery({
    queryKey: [USER_PATH, username],
    queryFn: () => findByUsername(username),
  });
};

export const useUsers = (query?: UsersQuery) => {
  return useQuery({
    queryKey: [USER_PATH, query],
    queryFn: () => userService.findAll(query),
  });
};
