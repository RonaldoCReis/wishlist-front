'use client';
import {
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from '@nextui-org/react';
import { X } from '@phosphor-icons/react/dist/ssr';
import React, { useEffect } from 'react';
import { Button } from '@nextui-org/button';
import { Controller, useForm } from 'react-hook-form';
import { UpdateUser, UpdateUserSchema } from '@ronaldocreis/wishlist-schema';
import { zodResolver } from '@hookform/resolvers/zod';

import { useEditUserModal } from '@/state/editUserModal';
import { formatErrors } from '@/utils/formatErrors';
import { useAuthUser } from '@/hooks/queries/useAuthUser';
import { useUpdateUser, useUser } from '@/hooks/queries/useUser';

const EditUserModal = () => {
  const { close, isOpen } = useEditUserModal();

  const { data: clerkUser } = useAuthUser();

  const { data: user } = useUser(clerkUser?.username);

  const updateUser = useUpdateUser();

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<UpdateUser>({
    resolver: zodResolver(UpdateUserSchema),
  });

  const handleClose = () => {
    reset();
    close();
  };

  const onSubmit = (data: UpdateUser) => {
    updateUser.mutate(data, { onSuccess: close });
  };

  useEffect(() => {
    if (isOpen) {
      reset({
        bio: user?.bio,
        name: user?.name,
      });
    }
  }, [isOpen, reset, user]);

  return (
    <Modal
      closeButton={
        <div style={{ right: '0.25rem' }}>
          <X />
        </div>
      }
      isOpen={isOpen}
      size="md"
      onClose={close}
    >
      <ModalContent>
        {() => (
          <Form
            className="block"
            validationErrors={formatErrors(errors)}
            onSubmit={handleSubmit(onSubmit)}
          >
            <ModalHeader>Editar usuário</ModalHeader>
            <ModalBody>
              <Controller
                control={control}
                name="name"
                render={({ field }) => (
                  <Input {...field} label="Nome" value={field.value || ''} />
                )}
              />
              <Controller
                control={control}
                name="bio"
                render={({ field }) => (
                  <Textarea {...field} label="Bio" value={field.value || ''} />
                )}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={handleClose}>
                Cancelar
              </Button>
              <Button color="primary" type="submit" variant="solid">
                Editar usuário
              </Button>
            </ModalFooter>
          </Form>
        )}
      </ModalContent>
    </Modal>
  );
};

export default EditUserModal;
