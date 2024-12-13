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
import { NewList } from '@ronaldocreis/wishlist-schema';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'next/navigation';

import { listService } from '@/api/services/list';

type NewListModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

const NewListModal = ({ isOpen, onOpenChange }: NewListModalProps) => {
  const params = useParams();
  const { username } = params;
  const queryClient = useQueryClient();
  const createList = useMutation({
    mutationFn: listService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user', username] });
    },
  });

  const { register, handleSubmit } = useForm<NewList>({
    resolver: zodResolver(NewList),
  });

  const onSubmit = (data: NewList) => {
    createList.mutate(data);
  };

  return (
    <Modal
      closeButton={
        <motion.div layoutId="newListIcon" style={{ right: '0.25rem' }}>
          <X />
        </motion.div>
      }
      isOpen={isOpen}
      placement="auto"
      onOpenChange={onOpenChange}
    >
      <ModalContent
        className="bg-transparent shadow-none"
        style={{ overflow: 'visible' }}
      >
        {(onClose) => (
          <motion.div
            className="bg-white rounded-[14px]"
            layoutId="newListLayout"
          >
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader>
                <motion.span className="font-medium" layoutId="newListTitle">
                  Nova Lista
                </motion.span>
              </ModalHeader>
              <ModalBody>
                <Input
                  isRequired
                  required
                  label="Nome da lista"
                  variant="bordered"
                  {...register('name', { required: true, min: 1 })}
                />
                <Select
                  isRequired
                  defaultSelectedKeys={['public']}
                  label="Visibilidade"
                  variant="bordered"
                  {...register('visibility', { required: true })}
                >
                  <SelectItem key="public">Pública</SelectItem>
                  <SelectItem key="private">Privada</SelectItem>
                </Select>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Cancelar
                </Button>
                <Button color="primary" type="submit">
                  Criar Lista
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
