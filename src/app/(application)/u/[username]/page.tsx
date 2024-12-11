import Lists from './components/Lists';

import { userService } from '@/api/services/user';

type Props = {
  params: {
    username: string;
  };
};

const UserPage = async ({ params }: Props) => {
  const { username } = await params;
  const user = await userService.findByUsername(username);

  return (
    <>
      <Lists lists={user.lists} username={params.username} />
    </>
  );
};

export default UserPage;
