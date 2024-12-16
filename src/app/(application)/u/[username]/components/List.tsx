import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/react';
import { User } from '@ronaldocreis/wishlist-schema';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';
import { Button } from '@nextui-org/button';
import { DotsThree } from '@phosphor-icons/react/dist/ssr';

import ListActions from './ListActions';

const itemsLabel: Record<number, string> = {
  0: 'Nenhum item',
  1: '1 item',
};

type ListProps = {
  list: User['lists'][number];
};

const List = ({ list }: ListProps) => {
  const params = useParams();
  const { username } = params;
  const notNullProductImages = list.productImages.filter(
    (image) => image !== null
  );

  return (
    <Card
      key={list.id}
      isHoverable
      isPressable
      as={Link}
      className="border group/listCard"
      href={`/u/${username}/${list.id}`}
      shadow="none"
    >
      <CardBody>
        <Image
          className="object-cover"
          height={219}
          src={notNullProductImages[0]}
          width={219}
        />
        <div className="flex justify-between items-center mt-4">
          <div>
            <h3 className="font-medium ">{list.name}</h3>
            <span className="text-sm text-gray-500">
              {itemsLabel[list.productCount] || `${list.productCount} itens`}
            </span>
          </div>
          <ListActions list={list}>
            <Button
              isIconOnly
              className="opacity-0 group/listCard group-hover/listCard:opacity-100 transition-opacity !duration-150"
              variant="ghost"
              onClick={(e) => {
                e.preventDefault();
                e.nativeEvent.stopImmediatePropagation();
              }}
            >
              <DotsThree size={24} />
            </Button>
          </ListActions>
        </div>
      </CardBody>
    </Card>
  );
};

export default List;
