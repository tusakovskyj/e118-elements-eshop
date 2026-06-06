"use client";

import Link from "next/link";
import { useCartStore } from "@/store/useCartStore";
import { CartItemRow } from "@/components/CartItemRow";
import { Button } from "@/components/ui/Button";

export default function CartPage() {
  const { items, totalAmount } = useCartStore();

  if (items.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center flex-grow py-32 text-center">
        <h1 className="text-3xl font-bold mb-4 uppercase tracking-tight">Your Cart is Empty</h1>
        <p className="text-neutral-500 mb-8">It seems you haven't added anything yet.</p>
        <Link href="/">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 w-full flex-grow">
      <h1 className="text-3xl font-bold mb-12 border-b border-black pb-4 uppercase tracking-tight">Shopping Cart</h1>
      
      <div className="flex flex-col">
        {items.map((item) => (
          <CartItemRow key={item.productId} item={item} />
        ))}
      </div>
      
      <div className="mt-12 pt-8 border-t border-black flex flex-col items-end">
        <div className="flex justify-between w-full sm:w-1/2 mb-8">
          <span className="text-lg font-medium uppercase">Total</span>
          <span className="text-xl font-mono font-bold">{totalAmount()} c</span>
        </div>
        
        <Link href="/checkout" className="w-full sm:w-1/2">
          <Button fullWidth className="py-4 text-lg">Proceed to Checkout</Button>
        </Link>
      </div>
    </div>
  );
}
