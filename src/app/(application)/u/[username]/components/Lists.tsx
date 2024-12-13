'use client';
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { User } from '@clerk/nextjs/dist/types/server';

import NewListCard from './NewListCard';
import List from './List';

import { userService } from '@/api/services/user';

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
      <div className="grid grid-cols-3 gap-4 my-6">
        {isTheOwner && <NewListCard />}
        {user?.lists?.map((list) => <List key={list.id} list={list} />)}
      </div>
    </>
  );
};

export default Lists;
