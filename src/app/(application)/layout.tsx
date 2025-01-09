import React, { PropsWithChildren } from 'react';
import { currentUser } from '@clerk/nextjs/server';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

import Navbar from './components/Navbar';
import SetToken from './components/SetToken';
import ConfirmModal from './components/ConfirmModal';

const UserLayout = async ({ children }: PropsWithChildren) => {
  const user = await currentUser();

  const userId = user?.id;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['auth-user'],
    queryFn: () => JSON.parse(JSON.stringify(user)),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <SetToken />
      <ConfirmModal />
      <div className="flex w-full min-h-screen">
        {userId && <Navbar />}
        <main className="flex-1 max-w-3xl mx-auto py-10">{children}</main>
      </div>
    </HydrationBoundary>
  );
};

export default UserLayout;
