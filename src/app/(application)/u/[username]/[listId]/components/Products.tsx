import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { Products as ProductsType } from '@ronaldocreis/wishlist-schema';
import Link from 'next/link';
import React from 'react';

import NewProductCard from './NewProductCard';

type ProductsProps = {
  products: ProductsType;
};

const Products = ({ products }: ProductsProps) => {
  return (
    <div className="flex flex-col gap-4">
      <NewProductCard />
      {products?.map((product) => {
        return (
          <Card
            key={product.id}
            isHoverable
            isPressable
            as={Link}
            className="border h-[136px]"
            href={product.url}
            radius="sm"
            shadow="none"
            target="_blank"
          >
            <CardBody className="flex-row items-start gap-4">
              <Image className="size-28" src={product.imageUrl ?? undefined} />
              <div className="flex flex-col justify-between h-full">
                <div>
                  <h3>{product.name}</h3>
                  <h4 className="text-sm text-gray-800">{product.store}</h4>
                </div>
                <span className="text-gray-700">
                  R$ {product.price?.toFixed(2)}
                </span>
              </div>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
};

export default Products;
