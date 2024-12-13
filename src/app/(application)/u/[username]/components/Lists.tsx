'use client';
import React from 'react';
import { Card, CardBody } from '@nextui-org/card';
import { Image } from '@nextui-org/image';
import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { User } from '@clerk/nextjs/dist/types/server';

import NewListCard from './NewListCard';

import { userService } from '@/api/services/user';

const itemsLabel: Record<number, string> = {
  0: 'Nenhum item',
  1: '1 item',
};

type ListsProps = {
  clerkUser: User | null;
};

const Lists = ({ clerkUser }: ListsProps) => {
  const params = useParams();

  const { username } = params;

  const isTheOwner = clerkUser?.username === username;

  const { data: user } = useQuery({
    queryKey: ['user', username],
    queryFn: () => userService.findByUsername(username as string),
  });

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {isTheOwner && <NewListCard />}
        {user?.lists?.map((list) => {
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
