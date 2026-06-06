"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { useCartStore } from '@/store/useCartStore';
import { motion } from 'framer-motion';

interface ProductProps {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

export const ProductCard = ({ id, name, price, imageUrl }: ProductProps) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({ productId: id, name, price, imageUrl });
  };

  return (
    <motion.div 
      whileHover={{ y: -8 }}
      className="group relative flex flex-col gap-4 rounded-3xl p-4 bg-white/5 border border-neutral-200/20 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10"
    >
      <Link href={`/product/${id}`} className="block relative aspect-square overflow-hidden rounded-2xl bg-neutral-900/50">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:opacity-90"
        />
        {/* Sleek overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Link>
      
      <div className="flex flex-col gap-2 px-2">
        <div className="flex justify-between items-start gap-4">
          <Link href={`/product/${id}`} className="font-mono font-bold tracking-tight text-lg hover:text-purple-400 transition-colors">
            {name}
          </Link>
          <span className="font-mono text-sm whitespace-nowrap bg-neutral-100 text-black px-3 py-1 rounded-full font-bold">
            {price} c
          </span>
        </div>
        <Button 
          onClick={handleAddToCart} 
          variant="outline" 
          className="mt-2 w-full font-mono uppercase tracking-widest text-xs h-12 rounded-xl border-neutral-300 hover:bg-black hover:text-white transition-all duration-300 group-hover:border-black"
        >
          Add to Cart
        </Button>
      </div>
    </motion.div>
  );
};
