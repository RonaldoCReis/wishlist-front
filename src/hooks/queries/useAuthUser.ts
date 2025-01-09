import { useUser } from '@clerk/nextjs';
import { useQuery } from '@tanstack/react-query';

export const useAuthUser = () => {
  const { user } = useUser();

  return useQuery({
    queryKey: ['auth-user'],
    queryFn: () => user,
    enabled: !!user,
  });
};
