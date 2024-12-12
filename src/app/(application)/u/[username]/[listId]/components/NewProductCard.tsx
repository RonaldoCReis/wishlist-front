import { Card, CardBody } from '@nextui-org/card';
import { Plus } from '@phosphor-icons/react/dist/ssr';
import React from 'react';

const NewProductCard = () => {
  return (
    <Card isHoverable isPressable className="border" radius="sm" shadow="none">
      <CardBody>
        <div className="flex justify-center items-center gap-1 text-gray-600 w-full">
          <Plus size={24} />
          <span className="font-medium text-sm">Novo Produto</span>
        </div>
      </CardBody>
    </Card>
  );
};

export default NewProductCard;
