'use client';
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
} from '@nextui-org/react';
import { Copy, Pencil, Trash } from '@phosphor-icons/react/dist/ssr';
import React, { ReactNode } from 'react';
import { useParams } from 'next/navigation';
import { List, User } from '@ronaldocreis/wishlist-schema';

import { useNewListModal } from '@/state/newListModal';
import { useConfirmModal } from '@/state/confirmModal';
import { useRemoveList } from '@/hooks/queries/useList';

type ListActionsProps = {
  list: User['lists'][number] | List;
  children: ReactNode;
};

const ListActions = ({ list, children }: ListActionsProps) => {
  const { openConfirmModal } = useConfirmModal();
  const { openNewListModal } = useNewListModal();
  const removeList = useRemoveList();

  const params = useParams();
  const { username } = params;

  return (
    <Dropdown>
      <DropdownTrigger>{children}</DropdownTrigger>
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
            onClick={() => openNewListModal(list)}
          >
            Editar Lista
          </DropdownItem>
        </DropdownSection>
        <DropdownSection>
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
  );
};

export default ListActions;
