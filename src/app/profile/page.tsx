"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";

export default function ProfilePage() {
  const { user, customUser, loading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (user) {
        try {
          const res = await fetch("/api/orders");
          if (res.ok) {
            const data = await res.json();
            setOrders(data);
          }
        } catch (error) {
          console.error("Error fetching orders:", error);
        } finally {
          setOrdersLoading(false);
        }
      }
    };
    fetchOrders();
  }, [user]);

  if (loading || !user) {
    return (
      <div className="flex justify-center items-center flex-grow py-32">
        <span className="font-mono text-sm tracking-widest uppercase">Loading Profile...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16 w-full flex-grow">
      <div className="flex justify-between items-end mb-12 border-b border-black pb-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight uppercase mb-1">Your Profile</h1>
          <p className="text-neutral-500">{user.email}</p>
        </div>
        <div className="flex gap-4">
          {customUser?.isAdmin && (
            <Link href="/admin">
              <Button variant="outline">Admin Dashboard</Button>
            </Link>
          )}
          <Button variant="ghost" onClick={() => signOut({ callbackUrl: "/login" })}>Sign Out</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="md:col-span-1 border border-black p-6 bg-neutral-50">
          <h2 className="text-sm font-bold uppercase tracking-widest mb-4">Account Balance</h2>
          <div className="text-4xl font-mono">{customUser?.credits || 0} c</div>
          <p className="text-sm text-neutral-500 mt-2">Available Credits</p>
        </div>
        
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold uppercase tracking-tight mb-6">Order History</h2>
          {ordersLoading ? (
             <span className="font-mono text-sm uppercase">Loading orders...</span>
          ) : orders.length === 0 ? (
            <div className="py-8 border-y border-neutral-200 text-neutral-500 text-center">
              You haven't made any orders yet.
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {orders.map(order => (
                <div key={order.id} className="border border-black p-4 flex flex-col gap-2">
                  <div className="flex justify-between font-mono text-sm">
                    <span className="opacity-50">Order #{order.id.slice(0, 8)}</span>
                    <span>{new Date(order.createdAt || Date.now()).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-center mt-2">
                    <span className="uppercase text-sm font-bold">{JSON.parse(order.items || "[]").length} items</span>
                    <span className="font-mono font-bold">- {order.totalAmount} c</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
