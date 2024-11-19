import Image from 'next/image';
import { Minus, Plus } from 'lucide-react';

interface OrderItemProps {
  name: string;
  price: number;
  image: string;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export function OrderItem({
  name,
  price,
  image,
  quantity,
  onIncrement,
  onDecrement,
}: OrderItemProps) {
  return (
    <div className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg">
      <div className="relative h-16 w-16 flex-shrink-0">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover rounded-md"
        />
      </div>
      <div className="flex-1">
        <h4 className="font-semibold text-gray-800">{name}</h4>
        <div className="flex items-center justify-between mt-2">
          <span className="font-bold">${price}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={onDecrement}
              className="p-1 rounded-md hover:bg-gray-200"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center">{quantity}</span>
            <button
              onClick={onIncrement}
              className="p-1 rounded-md hover:bg-gray-200"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}