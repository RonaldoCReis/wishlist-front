import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import React, { PropsWithChildren } from 'react';

import NewProductModal from './components/NewProductModal';

import { listService } from '@/api/services/list';

type ListLayoutProps = {
  params: {
    listId: string;
  };
};

const ListLayout = async ({
  children,
  params: { listId },
}: ListLayoutProps & PropsWithChildren) => {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: [listService.LIST_PATH, listId],
    queryFn: () => listService.findById(listId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NewProductModal />
      {children}
    </HydrationBoundary>
  );
};

export default ListLayout;
