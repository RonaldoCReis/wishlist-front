import React from 'react';
import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import { Lists as ListsType } from '@ronaldocreis/wishlist-schema';
import Link from 'next/link';
import { currentUser } from '@clerk/nextjs/server';

import NewListCard from './NewListCard';

type ListsProps = {
  lists: ListsType;
  username: string;
};

const itemsLabel: Record<number, string> = {
  0: 'Nenhum item',
  1: '1 item',
};
const Lists = async ({ lists, username }: ListsProps) => {
  const user = await currentUser();
  const isTheOwner = user?.username === username;

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {isTheOwner && <NewListCard />}
        {lists.map((list) => {
          const notNullProductImages = list.productImages.filter(
            (image) => image !== null && image !== undefined
          );

          return (
            <Card
              key={list.id}
              isHoverable
              isPressable
              as={Link}
              className="border"
              href={`/u/${username}/${list.id}`}
              shadow="none"
            >
              <CardBody>
                <Image
                  className="object-cover"
                  fallbackSrc="https://via.placeholder.com/219x219"
                  height={219}
                  src={notNullProductImages[0]}
                  width={219}
                />
                <h3 className="font-medium mt-4">{list.name}</h3>
                <span className="text-sm text-gray-500">
                  {itemsLabel[list.productImages.length] ||
                    `${list.productImages.length} itens`}
                </span>
              </CardBody>
            </Card>
          );
        })}
      </div>
    </>
  );
};

export default Lists;
