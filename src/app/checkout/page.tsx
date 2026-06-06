"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function CheckoutPage() {
  const { user, customUser, loading } = useAuth();
  const { items, totalAmount, clearCart } = useCartStore();
  const router = useRouter();
  
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [error, setError] = useState("");
  
  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
  });

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center flex-grow py-32">
        <span className="font-mono text-sm tracking-widest uppercase">Checking Authorization...</span>
      </div>
    );
  }

  const total = totalAmount();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    if (!formData.fullName || !formData.address || !formData.city || !formData.zipCode || !formData.country) {
      setError("Please fill out all delivery details.");
      return false;
    }
    return true;
  };

  const handleCheckout = async () => {
    if (items.length === 0) return;
    if (!validateForm()) return;
    
    setCheckoutLoading(true);
    setError("");
    
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map(i => ({
            productId: i.productId,
            name: i.name,
            quantity: i.quantity,
            price: i.price
          })),
          deliveryDetails: formData,
          totalAmount: total,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Transaction failed");
      }

      clearCart();
      router.push("/success");
      
    } catch (err: any) {
      console.error("Checkout transaction failed:", err);
      setError(err.message || "An unexpected anomaly occurred during processing.");
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16 w-full flex-grow">
      <h1 className="text-3xl font-bold mb-12 uppercase tracking-tight font-mono border-b border-neutral-200 pb-4">Secure Checkout</h1>
      
      {error && (
        <div className="mb-8 font-mono border border-red-500/50 p-4 bg-red-500/10 text-red-500 text-sm">
          [SYSTEM ERROR]: {error}
        </div>
      )}

      {items.length === 0 ? (
        <div className="text-center font-mono border border-neutral-200 p-8 bg-neutral-50 text-neutral-500">
          Your secure container is empty.
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Column 1: Delivery Details */}
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-bold font-mono tracking-widest uppercase mb-6">1. Delivery Coordinates</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono text-neutral-500 mb-2 uppercase">Authorized Recipient</label>
                  <Input name="fullName" placeholder="Full Legal Name" value={formData.fullName} onChange={handleInputChange} />
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-500 mb-2 uppercase">Street Address</label>
                  <Input name="address" placeholder="Sector / Building / Unit" value={formData.address} onChange={handleInputChange} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-neutral-500 mb-2 uppercase">City</label>
                    <Input name="city" placeholder="Metropolis" value={formData.city} onChange={handleInputChange} />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-neutral-500 mb-2 uppercase">Postal Code</label>
                    <Input name="zipCode" placeholder="00000" value={formData.zipCode} onChange={handleInputChange} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-mono text-neutral-500 mb-2 uppercase">Sovereign State</label>
                  <Input name="country" placeholder="Country" value={formData.country} onChange={handleInputChange} />
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold font-mono tracking-widest uppercase mb-6">2. Payment Protocol</h2>
              <div className="border border-neutral-200 p-6 bg-neutral-50 dark:bg-neutral-900/50 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-sm">Payment Method</span>
                  <span className="font-mono text-sm bg-black text-white px-2 py-1 uppercase text-xs">E118 Credits</span>
                </div>
                <p className="text-xs font-mono text-neutral-500">
                  Stripe integration bypassed. Transaction will be deducted securely from your verified E118 Vault Balance.
                </p>
              </div>
            </div>
          </div>

          {/* Column 2: Order Summary */}
          <div className="lg:pl-16 lg:border-l border-neutral-200">
            <h2 className="text-xl font-bold font-mono tracking-widest uppercase mb-6">Order Manifest</h2>
            
            <div className="space-y-4 mb-8 max-h-[40vh] overflow-y-auto pr-4">
              {items.map((item) => (
                <div key={item.productId} className="flex justify-between items-center py-2 border-b border-neutral-100 last:border-0">
                  <div className="flex flex-col">
                    <span className="font-mono text-sm">{item.name}</span>
                    <span className="font-mono text-xs text-neutral-500">Qty: {item.quantity}</span>
                  </div>
                  <span className="font-mono text-sm">{item.price * item.quantity} c</span>
                </div>
              ))}
            </div>

            <div className="border border-black p-6 space-y-4 mb-8 bg-neutral-50 dark:bg-neutral-900/50">
              <div className="flex justify-between border-b border-neutral-200 pb-4">
                <span className="uppercase font-bold text-sm tracking-widest font-mono">Manifest Total</span>
                <span className="font-mono">{total} c</span>
              </div>
              
              <div className="flex justify-between border-b border-neutral-200 pb-4">
                <span className="uppercase font-bold text-sm tracking-widest font-mono">Vault Balance</span>
                <span className="font-mono">{customUser?.credits || 0} c</span>
              </div>
              
              <div className="flex justify-between pt-2">
                <span className="uppercase font-bold tracking-widest text-lg font-mono">Remaining</span>
                <span className={`font-mono text-lg ${(customUser?.credits || 0) < total ? 'text-red-500' : ''}`}>
                  {(customUser?.credits || 0) - total} c
                </span>
              </div>
            </div>

            {(customUser?.credits || 0) < total ? (
              <div className="text-center font-mono text-red-500 border border-red-500 p-4 w-full">
                [DENIED] Insufficient Vault Balance.
              </div>
            ) : (
              <Button 
                onClick={handleCheckout} 
                fullWidth 
                disabled={checkoutLoading}
                className="py-6 text-lg font-mono uppercase tracking-widest"
              >
                {checkoutLoading ? "Authorizing..." : "Authorize & Transact"}
              </Button>
            )}
          </div>

        </div>
      )}
    </div>
  );
}
