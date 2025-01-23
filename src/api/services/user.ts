import {
  UpdateUser,
  User,
  Users,
  UsersQuery,
} from '@ronaldocreis/wishlist-schema';

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

const update = async (user: UpdateUser) => {
  const response = await api.put<User>(USER_PATH, user);

  return response;
};

const updateUserImage = async (image: File) => {
  const formData = new FormData();

  formData.append('image', image);

  const response = await api.patch<User>(`${USER_PATH}/image`, formData, {
    isFormData: true,
  });

  return response;
};

export const userService = {
  USER_PATH,
  findByUsername,
  findAll,
  update,
  updateUserImage,
};
