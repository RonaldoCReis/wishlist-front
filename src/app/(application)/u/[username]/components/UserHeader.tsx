'use client';
import { Button } from '@nextui-org/button';
import { Avatar } from '@nextui-org/avatar';
import Link from 'next/link';
import React from 'react';
import { useParams, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { User } from '@clerk/nextjs/server';

import { userService } from '@/api/services/user';

type UserHeaderProps = {
  clerkUser: User | null;
};

const UserHeader = ({ clerkUser }: UserHeaderProps) => {
  const params = useParams();
  const pathname = usePathname();

  const { username } = params;

  const isMainPage = pathname === `/u/${username}`;

  const isTheOwner = clerkUser?.username === username;

  const { USER_PATH, findByUsername } = userService;

  const { data: user } = useQuery({
    queryKey: [USER_PATH, username],
    queryFn: () => findByUsername(username as string),
  });

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
            src={user?.profileImageUrl || undefined}
          />
        </motion.div>
        <div>
          <h1 className="text-lg font-bold">
            <Link href={`/u/${username}`}>@{user?.username}</Link>
          </h1>
          <span className="text-gray-600">{user?.name}</span>
        </div>
        {isTheOwner && <Button className="ml-auto">Editar Perfil</Button>}
      </div>
    </div>
  );
};

export default UserHeader;
