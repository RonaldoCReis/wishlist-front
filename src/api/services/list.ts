import { List } from '@ronaldocreis/wishlist-schema';

import { api } from '../api';

const LIST_PATH = '/lists' as const;

const findById = async (id: List['id']) => {
  const response = await api.get<List>(`${LIST_PATH}/${id}`);

  return response.data;
};

export const listService = {
  LIST_PATH,
  findById,
};
