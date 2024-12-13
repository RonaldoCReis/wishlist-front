'use client';

import { Button } from '@nextui-org/button';
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@nextui-org/react';
import React from 'react';
import { X } from '@phosphor-icons/react/dist/ssr';

import { useConfirmModal } from '@/state/confirmModal';

const ConfirmModal = () => {
  const { isOpen, title, onConfirm, description, confirmText, close } =
    useConfirmModal();

  const handleConfirm = () => {
    onConfirm?.();
    close();
  };

  return (
    <Modal
      closeButton={
        <div style={{ right: '0.25rem' }}>
          <X />
        </div>
      }
      isOpen={isOpen}
      onClose={close}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader>{title}</ModalHeader>
            <ModalBody className="pt-0">
              <p className="text-gray-700">{description}</p>
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onPress={close}>
                Cancelar
              </Button>
              <Button color="danger" variant="solid" onPress={handleConfirm}>
                {confirmText}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ConfirmModal;
