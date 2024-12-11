'use client';
import { Select, SelectItem } from '@nextui-org/select';

const orderByOptions = [
  { key: 'priority', label: 'Prioridade' },
  { key: 'priceLow', label: 'Menor Preço' },
  { key: 'priceHigh', label: 'Maior Preço' },
] as const;

const OrderBySelect = () => {
  return (
    <Select className="max-w-36" placeholder="Ordernar por">
      {orderByOptions.map((option) => (
        <SelectItem key={option.key} value={option.key}>
          {option.label}
        </SelectItem>
      ))}
    </Select>
  );
};

export default OrderBySelect;
