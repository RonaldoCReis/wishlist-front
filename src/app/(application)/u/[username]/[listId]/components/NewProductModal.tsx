'use client';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import {
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { X } from '@phosphor-icons/react/dist/ssr';
import { motion } from 'framer-motion';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NewProduct, UpdateProduct } from '@ronaldocreis/wishlist-schema';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';

import { getOpenGraphInfo } from '../utils/getOpenGraphInfo';

import { useNewProductModal } from '@/state/newProductModal';
import { useOpenGraph } from '@/hooks/queries/useOpenGraph';
import { useCreateProduct, useUpdateProduct } from '@/hooks/queries/useProduct';

type ProductForm = NewProduct | UpdateProduct;

const priorities = [
  {
    key: 'high',
    label: 'Alta',
  },
  {
    key: 'medium',
    label: 'Média',
  },
  {
    key: 'low',
    label: 'Baixa',
  },
] as const;

const NewProductModal = () => {
  const { isOpen, editingProduct, close } = useNewProductModal();

  const params = useParams();
  const listId = params.listId as string;
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: zodResolver(editingProduct ? UpdateProduct : NewProduct),
    defaultValues: {
      listId,
    },
  });

  const productUrl = watch('url');
  const imageUrl = watch('imageUrl');

  const { data: openGraph } = useOpenGraph(productUrl);

  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();

  const handleClose = () => {
    reset();
    close();
  };

  useEffect(() => {
    console.log(listId);
    console.log(errors);
  }, [errors]);

  const onSubmit = (data: ProductForm) => {
    console.log('teste');
    if (editingProduct) {
      updateProduct.mutate({ id: editingProduct.id, product: data });
    } else {
      createProduct.mutate(data);
    }
    handleClose();
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

  useEffect(() => {
    if (!openGraph) return;

    const { title, price, store, imageUrl } = getOpenGraphInfo(openGraph);

    setValue('imageUrl', imageUrl);
    setValue('name', title || '');
    setValue('price', price);
    setValue('store', store);
  }, [openGraph]);

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
      size="3xl"
      onClose={handleClose}
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
                  label="Link do Produto"
                  {...register('url', { required: true })}
                />
                <div className="flex gap-4 mt-8">
                  <div className="flex-1">
                    <Controller
                      control={control}
                      name="imageUrl"
                      render={({ field }) => (
                        <Input
                          label="URL da imagem"
                          {...field}
                          value={field.value ?? ''}
                        />
                      )}
                    />
                    <div className="bg-[url('https://placehold.co/300x300?text=Hello+World')] aspect-square mt-4 rounded-2xl bg-cover">
                      <Image
                        removeWrapper
                        alt={editingProduct?.name}
                        className="object-cover"
                        height={'100%'}
                        src={imageUrl || undefined}
                        width={'100%'}
                      />
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col gap-4">
                    <Controller
                      control={control}
                      name="name"
                      render={({ field }) => (
                        <Input isRequired label="Nome" {...field} />
                      )}
                      rules={{ required: true }}
                    />
                    <Controller
                      control={control}
                      name="price"
                      render={({ field }) => (
                        <Input
                          label="Preço"
                          startContent={
                            <div className="flex items-center">
                              <label className="sr-only" htmlFor="currency">
                                Currency
                              </label>
                              <select
                                className="outline-none border-0 bg-transparent text-default-400 text-small"
                                id="currency"
                                name="currency"
                              >
                                <option>R$</option>
                                <option>$</option>
                                <option>€</option>
                                <option>£</option>
                                <option>¥</option>
                                <option>₿</option>
                              </select>
                            </div>
                          }
                          {...field}
                          value={field.value?.toString() || ''}
                        />
                      )}
                    />

                    <Controller
                      control={control}
                      name="store"
                      render={({ field }) => (
                        <Input
                          label="Nome da Loja"
                          {...field}
                          value={field.value ?? ''}
                        />
                      )}
                    />
                    <Select label="Prioridade" {...register('priority')}>
                      {priorities.map((priority) => (
                        <SelectItem key={priority.key}>
                          {priority.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={handleClose}>
                  Cancelar
                </Button>
                <Button color="primary" type="submit" variant="light">
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
