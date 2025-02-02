'use client';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import {
  Form,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Textarea,
} from '@nextui-org/react';
import { X } from '@phosphor-icons/react/dist/ssr';
import { motion } from 'framer-motion';
import { Controller, useForm } from 'react-hook-form';
import {
  NewProduct,
  NewProductSchema,
  UpdateProduct,
  UpdateProductSchema,
} from '@ronaldocreis/wishlist-schema';
import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';

import { getOpenGraphInfo } from '../utils/getOpenGraphInfo';

import { useNewProductModal } from '@/state/newProductModal';
import { useOpenGraph } from '@/hooks/queries/useOpenGraph';
import { useCreateProduct, useUpdateProduct } from '@/hooks/queries/useProduct';
import { formatErrors } from '@/utils/formatErrors';

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
  const listIdParam = params.listId as string;
  const editingProductListId =
    (editingProduct && 'listId' in editingProduct && editingProduct?.listId) ||
    null;

  const listId = editingProductListId || listIdParam;

  const {
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm<ProductForm>({
    resolver: zodResolver(
      editingProduct ? UpdateProductSchema : NewProductSchema
    ),
    defaultValues: {
      listId,
    },
    mode: 'all',
    shouldFocusError: true,
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

  const onSubmit = (data: NewProduct) => {
    if (editingProduct) {
      updateProduct.mutate(
        { id: editingProduct.id, product: data },
        { onSuccess: handleClose }
      );
    } else {
      createProduct.mutate(data, { onSuccess: handleClose });
    }
  };

  useEffect(() => {
    if (editingProduct) {
      reset({ ...editingProduct, listId }, { keepDefaultValues: true });
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
            <Form
              className="items-stretch"
              validationErrors={formatErrors(errors)}
              onSubmit={handleSubmit(onSubmit)}
            >
              <ModalHeader>
                <motion.span
                  className="font-medium"
                  layoutId={editingProduct ? 'editListTitle' : 'newListTitle'}
                >
                  {editingProduct ? 'Editar' : 'Novo'} Produto
                </motion.span>
              </ModalHeader>
              <ModalBody>
                <Controller
                  control={control}
                  name="url"
                  render={({ field }) => (
                    <Input
                      isRequired
                      label="Link do Produto"
                      {...field}
                      type="url"
                    />
                  )}
                />
                <div className="flex gap-4 mt-8">
                  <div className="flex-1">
                    <Controller
                      control={control}
                      name="imageUrl"
                      render={({ field }) => (
                        <Input
                          isDisabled={!productUrl}
                          label="URL da imagem"
                          {...field}
                          value={field.value || ''}
                        />
                      )}
                    />
                    <div className="bg-[url('https://placehold.co/300x300?text=Insira+a+imagem')] aspect-square mt-4 rounded-2xl bg-cover">
                      <Image
                        removeWrapper
                        alt={editingProduct?.name}
                        className="object-cover opacity-100"
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
                      render={({ field }) => {
                        return (
                          <Input
                            isRequired
                            isDisabled={!productUrl}
                            label="Nome"
                            {...field}
                          />
                        );
                      }}
                    />
                    <Controller
                      control={control}
                      name="price"
                      render={({ field }) => (
                        <Input
                          isDisabled={!productUrl}
                          label="Preço"
                          startContent={
                            <div className="flex items-center">
                              <label className="sr-only" htmlFor="currency">
                                Currency
                              </label>
                              <select
                                disabled
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
                          onChange={(event) => {
                            if (!isNaN(+event.target.value)) {
                              field.onChange(+event.target.value);
                            }
                          }}
                        />
                      )}
                    />

                    <Controller
                      control={control}
                      name="store"
                      render={({ field }) => (
                        <Input
                          isDisabled={!productUrl}
                          label="Nome da Loja"
                          {...field}
                          value={field.value || ''}
                        />
                      )}
                    />
                    <Controller
                      control={control}
                      name="priority"
                      render={({ field }) => (
                        <Select
                          isDisabled={!productUrl}
                          label="Prioridade"
                          {...field}
                          selectedKeys={field.value ? [field.value] : []}
                          value={field.value || ''}
                        >
                          {priorities.map((priority) => (
                            <SelectItem key={priority.key}>
                              {priority.label}
                            </SelectItem>
                          ))}
                        </Select>
                      )}
                    />
                    <Controller
                      control={control}
                      name="description"
                      render={({ field }) => (
                        <Textarea
                          className="h-full [&>div]:!h-full"
                          isDisabled={!productUrl}
                          label="Observações"
                          placeholder='Ex: "Tamanho M", "Cor Azul"'
                          {...field}
                          value={field.value || ''}
                        />
                      )}
                    />
                  </div>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={handleClose}>
                  Cancelar
                </Button>
                <Button color="primary" type="submit" variant="solid">
                  {editingProduct ? 'Editar' : 'Criar'} Produto
                </Button>
              </ModalFooter>
            </Form>
          </motion.div>
        )}
      </ModalContent>
    </Modal>
  );
};

export default NewProductModal;
