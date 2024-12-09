import { User } from '@ronaldocreis/wishlist-schema';

import { api } from '../api';

const USER_PATH = '/users' as const;

const findByUsername = async (params: { username: User['username'] }) => {
  const user = await api.get(`${USER_PATH}/${params.username}`);

  return user;
};

export const userService = {
  findByUsername,
};
