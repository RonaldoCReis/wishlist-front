import { OpenGraph } from '@ronaldocreis/wishlist-schema';

import { api } from '../api';

const findByUrl = async (url: string) => {
  const response = await api.get<OpenGraph>(`/open-graph/`, { url });

  return response;
};

export const openGraphService = {
  findByUrl,
};
