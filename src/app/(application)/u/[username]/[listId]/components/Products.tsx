import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { Products as ProductsType } from '@ronaldocreis/wishlist-schema';
import Link from 'next/link';
import React from 'react';

type ProductsProps = {
  products: ProductsType;
};

const Products = ({ products }: ProductsProps) => {
  return (
    <div className="flex flex-col gap-4">
      {products.map((product) => {
        return (
          <Card key={product.id} isHoverable radius="sm" shadow="none">
            <CardBody className="flex-row items-start gap-4">
              <Image src={product.imageUrl ?? undefined} />
              <div>
                <h3>
                  <Link href={product.url} target="_blank">
                    {product.name}
                  </Link>
                </h3>
              </div>
            </CardBody>
          </Card>
        );
      })}
    </div>
  );
};

export default Products;
