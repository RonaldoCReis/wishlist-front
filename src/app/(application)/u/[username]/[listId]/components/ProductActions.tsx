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
import { List, Product } from '@ronaldocreis/wishlist-schema';
import clsx from 'clsx';

import { useConfirmModal } from '@/state/confirmModal';
import { useNewProductModal } from '@/state/newProductModal';
import { useRemoveProduct } from '@/hooks/queries/useProduct';
import { useIsTheOwner } from '@/hooks/useIsTheOwner';

type ProductActionsProps = {
  product: List['products'][number] | Product;
  children: ReactNode;
};

const ProductActions = ({ product, children }: ProductActionsProps) => {
  const { openConfirmModal } = useConfirmModal();
  const { openNewProductModal } = useNewProductModal();
  const removeProduct = useRemoveProduct();

  const isTheOwner = useIsTheOwner();

  return (
    <Dropdown>
      <DropdownTrigger>{children}</DropdownTrigger>
      <DropdownMenu aria-label="Ações" variant="bordered">
        <DropdownSection showDivider={isTheOwner} title={'Ações'}>
          <DropdownItem
            key="copy"
            description="Mostre este produto para o mundo"
            shortcut="⌘C"
            startContent={<Copy size={24} />}
            onClick={() => {
              navigator.clipboard.writeText(product.url);
            }}
          >
            Copiar Link
          </DropdownItem>
          <DropdownItem
            key="edit"
            className={clsx({ hidden: !isTheOwner })}
            description="Faça alterações neste produto"
            shortcut="⌘E"
            startContent={<Pencil size={24} />}
            onClick={() => openNewProductModal(product)}
          >
            Editar Produto
          </DropdownItem>
        </DropdownSection>
        <DropdownSection className={clsx({ hidden: !isTheOwner })}>
          <DropdownItem
            key="delete"
            className="text-danger"
            color="danger"
            description="Exclui este produto permanentemente"
            shortcut="⌘⌫"
            startContent={<Trash size={24} />}
            onClick={() =>
              openConfirmModal({
                confirmText: 'Apagar Produto',
                description:
                  'Ao clicar em "Apagar Produto", este produto será excluído permanentemente e não poderá ser recuperado.',
                onConfirm: () => removeProduct.mutate(product.id),
                title: 'Tem certeza?',
              })
            }
          >
            Apagar Produto
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};

export default ProductActions;
