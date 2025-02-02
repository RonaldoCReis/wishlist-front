import { List, NewList, UpdateList } from '@ronaldocreis/wishlist-schema';

import { api } from '../api';

const LIST_PATH = '/lists' as const;

const findById = async (id: List['id']) => {
  const response = await api.get<List>(`${LIST_PATH}/${id}`);

  return response;
};

const create = async (list: NewList) => {
  const response = await api.post<List>(LIST_PATH, list);

  return response;
};

const remove = async (id: List['id']) => {
  const response = await api.delete(`${LIST_PATH}/${id}`);

  return response;
};

const update = async ({ list, id }: { id: List['id']; list: UpdateList }) => {
  const response = await api.put<List>(`${LIST_PATH}/${id}`, list);

  return response;
};

export const listService = {
  LIST_PATH,
  findById,
  create,
  remove,
  update,
};
