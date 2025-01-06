import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/react';
import { List, Product as ProductType } from '@ronaldocreis/wishlist-schema';
import Link from 'next/link';
import React from 'react';
import { Button } from '@nextui-org/button';
import { DotsThree } from '@phosphor-icons/react/dist/ssr';

import ProductActions from './ProductActions';

type ProductProps = {
  product: List['products'][number] | ProductType;
};

const Product = ({ product }: ProductProps) => {
  return (
    <Card
      key={product.id}
      isHoverable
      isPressable
      as={Link}
      className="border h-[138px] group/productCard"
      href={product.url}
      radius="sm"
      shadow="none"
      target="_blank"
    >
      <CardBody className="flex-row items-start gap-4">
        <Image
          className="size-28 object-cover min-w-28"
          src={product.imageUrl ?? undefined}
        />
        <div className="flex flex-col justify-between h-full">
          <div>
            <h3 className="line-clamp-1">{product.name}</h3>
            <h4 className="text-sm text-gray-800">{product.store}</h4>
            <p className="text-sm text-gray-600 line-clamp-2">
              {product.description}
            </p>
          </div>
          <span className="text-gray-700">R$ {product.price?.toFixed(2)}</span>
        </div>
        <div className="ml-auto self-end">
          <ProductActions product={product}>
            <Button
              isIconOnly
              className="opacity-0 group/productCard group-hover/productCard:opacity-100 transition-opacity !duration-150"
              variant="ghost"
              onClick={(e) => {
                e.preventDefault();
                e.nativeEvent.stopImmediatePropagation();
              }}
            >
              <DotsThree size={24} />
            </Button>
          </ProductActions>
        </div>
      </CardBody>
    </Card>
  );
};

export default Product;
