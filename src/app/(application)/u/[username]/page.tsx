import { Avatar } from '@nextui-org/avatar';
import { Button } from '@nextui-org/button';
import { currentUser } from '@clerk/nextjs/server';

import Lists from './components/Lists';

import { userService } from '@/api/services/user';

type Props = {
  params: {
    username: string;
  };
};

const UserPage = async ({ params }: Props) => {
  const clerkUser = await currentUser();
  const { username } = await params;
  const user = await userService.findByUsername(username);
  const isTheOwner = clerkUser?.username === username;

  return (
    <>
      <div className="border-b pb-6 mb-6">
        <div className="flex items-center gap-4">
          <Avatar
            className="w-20 h-20"
            src={user.profileImageUrl || undefined}
          />
          <div>
            <h1 className="text-lg font-bold">@{user.username}</h1>
            <span className="text-gray-600">{user.firstName}</span>
          </div>
          {isTheOwner && <Button className="ml-auto">Editar Perfil</Button>}
        </div>
      </div>
      <Lists lists={user.lists} username={params.username} />
    </>
  );
};

export default UserPage;
