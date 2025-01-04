'use client';
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import {
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
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { NewList, NewListSchema } from '@ronaldocreis/wishlist-schema';
import { useEffect } from 'react';

import { useNewListModal } from '@/state/newListModal';
import { useCreateList, useUpdateList } from '@/hooks/queries/useList';

const NewListModal = () => {
  const { isOpen, editingList, close } = useNewListModal();

  const createList = useCreateList();
  const updateList = useUpdateList();

  const { register, handleSubmit, reset } = useForm<NewList>({
    resolver: zodResolver(NewListSchema),
  });

  const onSubmit = (data: NewList) => {
    if (editingList) {
      updateList.mutate({ id: editingList.id, list: data });
    } else {
      createList.mutate(data);
    }
    reset();
    close();
  };

  useEffect(() => {
    if (editingList) {
      reset({
        name: editingList.name,
        visibility: editingList.visibility,
      });
    } else reset();
  }, [editingList, reset]);

  return (
    <Modal
      closeButton={
        <motion.div
          layoutId={editingList ? 'editListIcon' : 'newListIcon'}
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
            layoutId={editingList ? 'editListLayout' : 'newListLayout'}
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader>
                <motion.span
                  className="font-medium"
                  layoutId={editingList ? 'editListTitle' : 'newListTitle'}
                >
                  {editingList ? 'Editar' : 'Nova'} Lista
                </motion.span>
              </ModalHeader>
              <ModalBody>
                <Input
                  isRequired
                  label="Nome da lista"
                  variant="bordered"
                  {...register('name')}
                />
                <Select
                  isRequired
                  defaultSelectedKeys={['public']}
                  label="Visibilidade"
                  variant="bordered"
                  {...register('visibility')}
                >
                  <SelectItem key="public">Pública</SelectItem>
                  <SelectItem key="private">Privada</SelectItem>
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={close}>
                  Cancelar
                </Button>
                <Button color="primary" type="submit">
                  {editingList ? 'Editar' : 'Nova'} Lista
                </Button>
              </ModalFooter>
            </form>
          </motion.div>
        )}
      </ModalContent>
    </Modal>
  );
};

export default NewListModal;
