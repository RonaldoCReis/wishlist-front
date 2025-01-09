import { useParams } from 'next/navigation';

import { useAuthUser } from './queries/useAuthUser';

export const useIsTheOwner = () => {
  const { username } = useParams();
  const { data: authUser } = useAuthUser();

  const isTheOwner = authUser?.username === username;

  return isTheOwner;
};
