"use client";

import { useEffect, useState, use } from "react";
import Image from "next/image";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/Button";

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${unwrappedParams.id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        }
      } catch (error) {
        console.error("Error fetching product", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [unwrappedParams.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 flex-grow">
        <span className="font-mono text-sm tracking-widest uppercase">Loading...</span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-64 flex-grow">
        <span className="font-mono text-sm uppercase">Product not found.</span>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 w-full flex-grow">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        <div className="relative aspect-square bg-neutral-100">
          {product.imageUrl && (
            <Image
              src={product.imageUrl}
              alt={product.name}
              fill
              className="object-cover"
            />
          )}
        </div>
        
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold tracking-tight mb-2">{product.name}</h1>
          <span className="font-mono text-2xl mb-8">{product.price} credits</span>
          
          <p className="text-neutral-600 leading-relaxed mb-12">
            {product.description}
          </p>
          
          <div className="mt-auto">
            <Button onClick={handleAddToCart} className="w-full py-4 text-lg">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
