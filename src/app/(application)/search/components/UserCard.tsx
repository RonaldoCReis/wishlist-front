import { Card, CardBody } from '@nextui-org/card';
import { Avatar } from '@nextui-org/react';
import { Users } from '@ronaldocreis/wishlist-schema';
import Link from 'next/link';
import React from 'react';

type UserCardProps = {
  user: Users[number];
};

const UserCard = ({ user }: UserCardProps) => {
  return (
    <Card
      isHoverable
      isPressable
      as={Link}
      className="border"
      href={`/u/${user.username}`}
      shadow="none"
    >
      <CardBody>
        <div className="flex items-center gap-4">
          <div className="size-16">
            <Avatar
              className="w-full h-full"
              src={user?.profileImageUrl || undefined}
            />
          </div>
          <div>
            <h2 className="text-lg font-bold">@{user.username}</h2>
            <span className="text-gray-600">{user?.name}</span>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default UserCard;
