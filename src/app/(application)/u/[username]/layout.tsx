import React, { PropsWithChildren } from 'react';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { currentUser } from '@clerk/nextjs/server';

import UserHeader from './components/UserHeader';
import NewListModal from './components/NewListModal';

import { userService } from '@/api/services/user';

type Props = {
  params: {
    username: string;
  };
};

const UserLayout = async ({ params, children }: Props & PropsWithChildren) => {
  const { username } = await params;
  const clerkUser = await currentUser();

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['user', username],
    queryFn: () => userService.findByUsername(username),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserHeader clerkUser={JSON.parse(JSON.stringify(clerkUser))} />
      <NewListModal />
      {children}
    </HydrationBoundary>
  );
};

export default UserLayout;
