'use client';
import { Button } from '@nextui-org/button';
import { Avatar } from '@nextui-org/avatar';
import { User } from '@ronaldocreis/wishlist-schema';
import Link from 'next/link';
import React from 'react';
import { useUser } from '@clerk/nextjs';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

type UserHeaderProps = {
  user: User;
};

const UserHeader = ({ user }: UserHeaderProps) => {
  const { user: clerkUser } = useUser();
  const isTheOwner = clerkUser?.username === user.username;

  const pathname = usePathname();

  const isMainPage = pathname === `/u/${user.username}`;

  return (
    <div className="border-b pb-6 mb-6">
      <div className="flex items-center gap-4">
        <motion.div
          animate={{
            width: isMainPage ? 80 : 56,
            height: isMainPage ? 80 : 56,
          }}
          initial={{
            width: isMainPage ? 80 : 56,
            height: isMainPage ? 80 : 56,
          }}
        >
          <Avatar
            className={'w-full h-full'}
            src={user.profileImageUrl || undefined}
          />
        </motion.div>
        <div>
          <h1 className="text-lg font-bold">
            <Link href={`/u/${user.username}`}>@{user.username}</Link>
          </h1>
          <span className="text-gray-600">{user.firstName}</span>
        </div>
        {isTheOwner && <Button className="ml-auto">Editar Perfil</Button>}
      </div>
    </div>
  );
};

export default UserHeader;
