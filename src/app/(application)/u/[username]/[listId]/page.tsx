'use client';
import { Input } from '@nextui-org/input';
import { DotsThree, MagnifyingGlass } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@nextui-org/button';
import { useParams } from 'next/navigation';

import ListActions from '../components/ListActions';

import OrderBySelect from './components/OrderBySelect';
import Products from './components/Products';

import { useList } from '@/hooks/queries/useList';

const ListPage = () => {
  const { listId } = useParams();
  const { data: list } = useList(listId as string);

  if (!list) {
    return null;
  }

  return (
    <>
      <div className="flex items-center gap-4 justify-between mb-6">
        <h2 className="font-bold text-lg whitespace-nowrap">{list.name}</h2>
        <div className="flex items-center gap-4">
          <Input
            className="w-72"
            placeholder="Buscar Produtos"
            startContent={<MagnifyingGlass size={24} />}
          />
          <OrderBySelect />

          <ListActions list={list}>
            <Button isIconOnly variant="flat">
              <DotsThree size={24} />
            </Button>
          </ListActions>
        </div>
      </div>
      <Products products={list.products} />
    </>
  );
};

export default ListPage;
