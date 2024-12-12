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

import { listService } from '@/api/services/list';

type NewListModalProps = {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
};

const NewListModal = ({ isOpen, onOpenChange }: NewListModalProps) => {
  const handleCreate = () => {
    listService.create({
      name: 'Nova Lista',
      visibility: 'public',
    });
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
            <ModalHeader>
              <motion.span className="font-medium" layoutId="newListTitle">
                Nova Lista
              </motion.span>
            </ModalHeader>
            <ModalBody>
              <Input isRequired label="Nome da lista" variant="bordered" />
              <Select
                isRequired
                defaultSelectedKeys={['public']}
                label="Visibilidade"
                variant="bordered"
              >
                <SelectItem key="public">Pública</SelectItem>
                <SelectItem key="private">Privada</SelectItem>
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Cancelar
              </Button>
              <Button color="primary" onPress={handleCreate}>
                Criar Lista
              </Button>
            </ModalFooter>
          </motion.div>
        )}
      </ModalContent>
    </Modal>
  );
};

export default NewListModal;
