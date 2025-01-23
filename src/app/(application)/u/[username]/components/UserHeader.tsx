'use client';
import { Button } from '@nextui-org/button';
import { Avatar } from '@nextui-org/avatar';
import Link from 'next/link';
import React from 'react';
import { useParams, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { useQuery } from '@tanstack/react-query';
import { User } from '@clerk/nextjs/server';

import UpdateUserImageForm from './UpdateUserImageForm';

import { userService } from '@/api/services/user';
import { useEditUserModal } from '@/state/editUserModal';

type UserHeaderProps = {
  clerkUser: User | null;
};

const UserHeader = ({ clerkUser }: UserHeaderProps) => {
  const params = useParams();
  const pathname = usePathname();

  const { openEditUserModal } = useEditUserModal();

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
          <UpdateUserImageForm canEdit={isTheOwner}>
            <Avatar
              className={'w-full h-full'}
              src={user?.profileImageUrl || undefined}
            />
          </UpdateUserImageForm>
        </motion.div>
        <div>
          <h1 className="text-lg font-bold">
            <Link href={`/u/${username}`}>@{user?.username}</Link>
          </h1>
          <span className="text-gray-600">{user?.name}</span>
          <motion.p
            animate={{ maxHeight: isMainPage ? 100 : 0 }}
            className="text-gray-600 text-sm max-w-sm whitespace-pre-wrap line-clamp-3"
            initial={{ maxHeight: isMainPage ? 100 : 0 }}
          >
            {user?.bio}
          </motion.p>
        </div>
        {isTheOwner && (
          <Button className="ml-auto" onPress={openEditUserModal}>
            Editar Perfil
          </Button>
        )}
      </div>
    </div>
  );
};

export default UserHeader;
