import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Flame, Leaf } from 'lucide-react';

interface MenuItemProps {
  name: string;
  price: number;
  image: string;
  isSpicy?: boolean;
  isVegetarian?: boolean;
  onClick: () => void;
}

export function MenuItem({
  name,
  price,
  image,
  isSpicy,
  isVegetarian,
  onClick,
}: MenuItemProps) {
  return (
    <button
      onClick={onClick}
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
    >
      <div className="relative h-32 w-full">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-gray-800">{name}</h3>
          <div className="flex gap-1">
            {isSpicy && <Flame className="h-4 w-4 text-red-500" />}
            {isVegetarian && <Leaf className="h-4 w-4 text-green-500" />}
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">CATEGORY:</span>
          <span className="font-bold text-gray-900">${price}</span>
        </div>
      </div>
    </button>
  );
}