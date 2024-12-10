import { User } from '@ronaldocreis/wishlist-schema';
import { useQuery } from '@tanstack/react-query';

import { userService } from '@/api/services/user';

const { USER_PATH, findByUsername } = userService;

export const useUser = (username: User['username']) => {
  return useQuery({
    queryKey: [USER_PATH, username],
    queryFn: () => findByUsername(username),
  });
};
