import { User } from '@ronaldocreis/wishlist-schema';

import { api } from '../api';

const USER_PATH = '/users' as const;

const findByUsername = async (username: User['username']) => {
  const response = await api.get<User>(`${USER_PATH}/${username}`);

  return response.data;
};

export const userService = {
  USER_PATH,
  findByUsername,
};
