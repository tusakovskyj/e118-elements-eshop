"use client";

import Link from 'next/link';
import { ShoppingCart, User } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import { useAuth } from '@/context/AuthContext';

export const Navbar = () => {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const { customUser, loading } = useAuth();

  return (
    <nav className="border-b border-black">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* LEFT: Account */}
        <div className="w-1/3 flex justify-start">
          <Link href="/profile" className="flex items-center gap-2 text-sm font-medium hover:text-neutral-600 transition-colors">
            <User className="w-5 h-5" />
            {!loading && customUser && (
              <span className="hidden sm:inline-block border-l pl-2 border-neutral-300">
                {customUser.credits} c
              </span>
            )}
          </Link>
        </div>

        {/* CENTER: Logo */}
        <div className="w-1/3 flex justify-center">
          <Link href="/" className="text-2xl font-bold tracking-tighter uppercase">
            E118
          </Link>
        </div>

        {/* RIGHT: Cart */}
        <div className="w-1/3 flex justify-end">
          <Link href="/cart" className="flex items-center gap-2 text-sm font-medium hover:text-neutral-600 transition-colors">
            <span className="tabular-nums font-bold">
              {totalItems > 0 && `(${totalItems})`}
            </span>
            <ShoppingCart className="w-5 h-5 relative" />
          </Link>
        </div>

      </div>
    </nav>
  );
};
