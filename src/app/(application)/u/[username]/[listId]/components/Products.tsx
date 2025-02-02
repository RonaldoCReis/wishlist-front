'use client';
import { List, Product as ProductType } from '@ronaldocreis/wishlist-schema';
import React from 'react';
import { useQueryState } from 'nuqs';

import NewProductCard from './NewProductCard';
import Product from './Product';

import { useIsTheOwner } from '@/hooks/useIsTheOwner';

type ProductsProps = {
  products: List['products'] | ProductType[];
};

const Products = ({ products }: ProductsProps) => {
  const [search] = useQueryState('search');

  const isTheOwner = useIsTheOwner();

  const filteredProducts = products?.filter((product) =>
    search
      ? product.name.toLowerCase().includes(search) ||
        (product.store ?? '').toLowerCase().includes(search) ||
        (product.description ?? '').toLowerCase().includes(search) ||
        (product.price?.toString() ?? '').toLowerCase().includes(search)
      : true
  );

  return (
    <div className="flex flex-col gap-4">
      {isTheOwner && <NewProductCard />}
      {filteredProducts?.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;
