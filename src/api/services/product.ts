import {
  Product,
  NewProduct,
  UpdateProduct,
} from '@ronaldocreis/wishlist-schema';

import { api } from '../api';

const PRODUCT_PATH = '/products' as const;

const findById = async (id: Product['id']) => {
  const response = await api.get<Product>(`${PRODUCT_PATH}/${id}`);

  return response;
};

const create = async (product: NewProduct) => {
  const response = await api.post<Product>(PRODUCT_PATH, product);

  return response;
};

const remove = async (id: Product['id']) => {
  const response = await api.delete<Product>(`${PRODUCT_PATH}/${id}`);

  return response;
};

const update = async ({
  product,
  id,
}: {
  id: Product['id'];
  product: UpdateProduct;
}) => {
  const response = await api.put<Product>(`${PRODUCT_PATH}/${id}`, product);

  return response;
};

export const productService = {
  PRODUCT_PATH,
  findById,
  create,
  remove,
  update,
};
