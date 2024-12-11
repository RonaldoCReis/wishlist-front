import React, { PropsWithChildren } from 'react';

import UserHeader from './components/UserHeader';

import { userService } from '@/api/services/user';

type Props = {
  params: {
    username: string;
  };
};

const UserLayout = async ({ params, children }: Props & PropsWithChildren) => {
  const { username } = await params;
  const user = await userService.findByUsername(username);

  return (
    <>
      <UserHeader user={user} />
      {children}
    </>
  );
};

export default UserLayout;
