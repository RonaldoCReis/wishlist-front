import React from 'react';
import { currentUser } from '@clerk/nextjs/server';

import Lists from './components/Lists';

const UserPage = async () => {
  const clerkUser = await currentUser();

  return <Lists clerkUser={JSON.parse(JSON.stringify(clerkUser))} />;
};

export default UserPage;
