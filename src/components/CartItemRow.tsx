"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useCartStore, CartItem } from '@/store/useCartStore';

export const CartItemRow = ({ item }: { item: CartItem }) => {
  const removeItem = useCartStore((state) => state.removeItem);

  return (
    <div className="flex items-center gap-6 py-6 border-b border-black last:border-b-0">
      {item.imageUrl ? (
        <div className="flex-shrink-0 w-24 h-24 relative bg-neutral-100">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
          />
        </div>
      ) : (
        <div className="flex-shrink-0 w-24 h-24 bg-neutral-100" />
      )}
      
      <div className="flex-grow flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <Link href={`/product/${item.productId}`} className="font-medium hover:underline text-lg">
            {item.name}
          </Link>
          <span className="font-mono font-bold whitespace-nowrap">
            {item.price * item.quantity} c
          </span>
        </div>
        
        <div className="flex justify-between items-end mt-auto">
          <span className="text-sm font-mono text-neutral-500">
            {item.price} c × {item.quantity}
          </span>
          <Button 
            onClick={() => removeItem(item.productId)} 
            variant="ghost" 
            className="text-sm text-neutral-500 hover:text-black py-1 px-0 h-auto"
          >
            Remove
          </Button>
        </div>
      </div>
    </div>
  );
};
