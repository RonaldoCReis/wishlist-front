import { Input } from '@nextui-org/input';
import { MagnifyingGlass, ShareNetwork } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@nextui-org/button';
import { Tooltip } from '@nextui-org/tooltip';

import OrderBySelect from './components/OrderBySelect';
import Products from './components/Products';

import { listService } from '@/api/services/list';

type ListPageProps = {
  params: {
    username: string;
    listId: string;
  };
};

const ListPage = async ({ params }: ListPageProps) => {
  const { listId } = await params;
  const list = await listService.findById(listId);

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
          <Tooltip
            showArrow
            closeDelay={0}
            content="Compartilhar Lista"
            placement="right"
            radius="sm"
            shadow="sm"
          >
            <Button isIconOnly variant="flat">
              <ShareNetwork size={20} />
            </Button>
          </Tooltip>
        </div>
      </div>
      <Products products={list.products} />
    </>
  );
};

export default ListPage;
