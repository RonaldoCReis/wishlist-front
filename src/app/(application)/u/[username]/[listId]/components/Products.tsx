import { Product as ProductType } from '@ronaldocreis/wishlist-schema';
import React from 'react';

import NewProductCard from './NewProductCard';
import Product from './Product';

type ProductsProps = {
  products: ProductType[];
};

const Products = ({ products }: ProductsProps) => {
  return (
    <div className="flex flex-col gap-4">
      <NewProductCard />
      {products?.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );
};

export default Products;
