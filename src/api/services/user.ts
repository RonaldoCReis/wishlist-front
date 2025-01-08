import { User, Users, UsersQuery } from '@ronaldocreis/wishlist-schema';

import { api } from '../api';

const USER_PATH = '/users' as const;

const findByUsername = async (username: User['username']) => {
  const response = await api.get<User>(`${USER_PATH}/${username}`);

  return response;
};

const findAll = async (query?: UsersQuery) => {
  const response = await api.get<Users>(USER_PATH, query);

  return response;
};

export const userService = {
  USER_PATH,
  findByUsername,
  findAll,
};
