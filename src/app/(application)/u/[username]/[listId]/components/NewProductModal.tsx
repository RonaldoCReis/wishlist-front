'use client';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import { X } from '@phosphor-icons/react/dist/ssr';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NewProduct, UpdateProduct } from '@ronaldocreis/wishlist-schema';
import { useEffect } from 'react';

import { useNewProductModal } from '@/state/newProductModal';

type ProductForm = NewProduct | UpdateProduct;

const NewProductModal = () => {
  const { isOpen, editingProduct, close } = useNewProductModal();

  const { register, handleSubmit, reset } = useForm<ProductForm>({
    resolver: zodResolver(editingProduct ? UpdateProduct : NewProduct),
  });

  const onSubmit = (data: ProductForm) => {
    // if (editingList) {
    //   updateList.mutate({ id: editingList.id, list: data });
    // } else {
    //   createList.mutate(data);
    // }
    reset();
    close();
  };

  useEffect(() => {
    if (editingProduct) {
      reset({
        imageUrl: editingProduct.imageUrl,
        name: editingProduct.name,
        price: editingProduct.price,
        store: editingProduct.store,
        url: editingProduct.url,
      });
    } else reset();
  }, [editingProduct, reset]);

  return (
    <Modal
      closeButton={
        <motion.div
          layoutId={editingProduct ? 'editListIcon' : 'newListIcon'}
          style={{ right: '0.25rem' }}
        >
          <X />
        </motion.div>
      }
      isOpen={isOpen}
      onClose={close}
    >
      <ModalContent
        className="bg-transparent shadow-none"
        style={{ overflow: 'visible' }}
      >
        {() => (
          <motion.div
            className="bg-white rounded-[14px]"
            layoutId={editingProduct ? 'editListLayout' : 'newListLayout'}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader>
                <motion.span
                  className="font-medium"
                  layoutId={editingProduct ? 'editListTitle' : 'newListTitle'}
                >
                  {editingProduct ? 'Editar' : 'Novo'} Produto
                </motion.span>
              </ModalHeader>
              <ModalBody>
                <Input
                  isRequired
                  required
                  label="Link do produto"
                  variant="bordered"
                  {...register('url', { required: true, min: 1 })}
                />
                <Input
                  isRequired
                  required
                  label="Nome do produto"
                  variant="bordered"
                  {...register('name', { required: true, min: 1 })}
                />
                <Input
                  isRequired
                  required
                  label="Nome da loja"
                  variant="bordered"
                  {...register('store', { required: true, min: 1 })}
                />
                <Input
                  isRequired
                  required
                  label="Preço"
                  variant="bordered"
                  {...register('price', { required: true, min: 1 })}
                />
                <Input
                  isRequired
                  required
                  label="URL da Imagem"
                  variant="bordered"
                  {...register('imageUrl', { required: true, min: 1 })}
                />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={close}>
                  Cancelar
                </Button>
                <Button color="primary" type="submit">
                  {editingProduct ? 'Editar' : 'Criar'} Produto
                </Button>
              </ModalFooter>
            </form>
          </motion.div>
        )}
      </ModalContent>
    </Modal>
  );
};

export default NewProductModal;
