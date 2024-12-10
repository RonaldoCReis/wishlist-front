import { auth } from '@clerk/nextjs/server';
import React, { PropsWithChildren } from 'react';

import Navbar from './components/Navbar';

const UserLayout = async ({ children }: PropsWithChildren) => {
  const { userId } = await auth();

  return (
    <div className="flex w-full h-screen">
      {userId && <Navbar />}
      <main className="flex-1 max-w-3xl mx-auto py-10">{children}</main>
    </div>
  );
};

export default UserLayout;
