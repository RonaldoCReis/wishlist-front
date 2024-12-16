'use client';
import { Card } from '@nextui-org/card';
import { Plus } from '@phosphor-icons/react/dist/ssr';
import { motion } from 'framer-motion';

import { useNewListModal } from '@/state/newListModal';

const NewListCard = () => {
  const { openNewListModal } = useNewListModal();

  return (
    <>
      <motion.div layoutId="newListLayout">
        <Card
          isHoverable
          isPressable
          className="border flex items-center justify-center w-full h-[305px]"
          shadow="none"
          onPress={() => openNewListModal(null)}
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
    </>
  );
};

export default NewListCard;
