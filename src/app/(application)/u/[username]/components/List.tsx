import { Button } from '@nextui-org/button';
import { Card, CardBody } from '@nextui-org/card';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  Image,
} from '@nextui-org/react';
import { Copy, DotsThree, Pencil, Trash } from '@phosphor-icons/react/dist/ssr';
import { User } from '@ronaldocreis/wishlist-schema';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useConfirmModal } from '@/state/confirmModal';
import { listService } from '@/api/services/list';

const itemsLabel: Record<number, string> = {
  0: 'Nenhum item',
  1: '1 item',
};

type ListProps = {
  list: User['lists'][number];
};

const List = ({ list }: ListProps) => {
  const { openConfirmModal } = useConfirmModal();
  const params = useParams();
  const { username } = params;
  const notNullProductImages = list.productImages.filter(
    (image) => image !== null
  );

  const queryClient = useQueryClient();

  const removeList = useMutation({
    mutationFn: listService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', username] });
    },
  });

  return (
    <Card
      key={list.id}
      isHoverable
      isPressable
      as={Link}
      className="border group/listCard"
      href={`/u/${username}/${list.id}`}
      shadow="none"
    >
      <CardBody>
        <Image
          className="object-cover"
          height={219}
          src={notNullProductImages[0]}
          width={219}
        />
        <div className="flex justify-between items-center mt-4">
          <div>
            <h3 className="font-medium ">{list.name}</h3>
            <span className="text-sm text-gray-500">
              {itemsLabel[list.productCount] || `${list.productCount} itens`}
            </span>
          </div>
          <Dropdown>
            <DropdownTrigger>
              <Button
                isIconOnly
                className="opacity-0 group/listCard group-hover/listCard:opacity-100 transition-opacity !duration-150"
                variant="ghost"
                onClick={(e) => {
                  e.preventDefault();
                  e.nativeEvent.stopImmediatePropagation();
                }}
              >
                <DotsThree size={24} />
              </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Ações" variant="bordered">
              <DropdownSection showDivider title={'Ações'}>
                <DropdownItem
                  key="copy"
                  description="Mostre esta lista para o mundo"
                  shortcut="⌘C"
                  startContent={<Copy size={24} />}
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${process.env.NEXT_PUBLIC_BASE_URL}/u/${username}/${list.id}`
                    );
                  }}
                >
                  Copiar Link
                </DropdownItem>
                <DropdownItem
                  key="edit"
                  description="Faça alterações nesta lista"
                  shortcut="⌘E"
                  startContent={<Pencil size={24} />}
                >
                  Editar Lista
                </DropdownItem>
              </DropdownSection>
              <DropdownSection title={'Atenção'}>
                <DropdownItem
                  key="delete"
                  className="text-danger"
                  color="danger"
                  description="Exclui esta lista permanentemente"
                  shortcut="⌘⌫"
                  startContent={<Trash size={24} />}
                  onClick={() =>
                    openConfirmModal({
                      confirmText: 'Apagar Lista',
                      description:
                        'Ao clicar em "Apagar Lista", esta lista será excluída permanentemente e não poderá ser recuperada.',
                      onConfirm: () => removeList.mutate(list.id),
                      title: 'Tem certeza?',
                    })
                  }
                >
                  Apagar Lista
                </DropdownItem>
              </DropdownSection>
            </DropdownMenu>
          </Dropdown>
        </div>
      </CardBody>
    </Card>
  );
};

export default List;
