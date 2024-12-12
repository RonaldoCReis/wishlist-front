import React, { PropsWithChildren } from 'react';
import { currentUser } from '@clerk/nextjs/server';

import Navbar from './components/Navbar';
import SetToken from './components/SetToken';

const UserLayout = async ({ children }: PropsWithChildren) => {
  const user = await currentUser();

  const userId = user?.id;

  return (
    <>
      <SetToken />
      <div className="flex w-full h-screen">
        {userId && <Navbar />}
        <main className="flex-1 max-w-3xl mx-auto py-10">{children}</main>
      </div>
    </>
  );
};

export default UserLayout;
