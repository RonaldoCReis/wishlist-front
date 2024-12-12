'use client';
import { Card } from '@nextui-org/card';
import { Plus } from '@phosphor-icons/react/dist/ssr';
import { useDisclosure } from '@nextui-org/react';
import { motion } from 'framer-motion';

import NewListModal from './NewListModal';

const NewListCard = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <motion.div layoutId="newListLayout">
        <Card
          isHoverable
          isPressable
          className="border flex items-center justify-center w-full h-[305px]"
          shadow="none"
          onPress={onOpen}
        >
          <div className="flex justify-center items-center flex-col gap-1 text-gray-600">
            <motion.div layoutId="newListIcon">
              <Plus size={36} />
            </motion.div>
            <motion.span className="font-medium" layoutId="newListTitle">
              Nova Lista
            </motion.span>
          </div>
        </Card>
      </motion.div>
      <NewListModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default NewListCard;
