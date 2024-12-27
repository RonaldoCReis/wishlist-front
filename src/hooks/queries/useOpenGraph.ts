import { useQuery } from '@tanstack/react-query';

import { openGraphService } from '@/api/services/openGraph';

const { findByUrl } = openGraphService;

export const useOpenGraph = (url: string) => {
  return useQuery({
    queryKey: ['open-graph', url],
    queryFn: () => findByUrl(url),
    enabled: !!url,
  });
};
