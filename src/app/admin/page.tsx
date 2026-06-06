"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function AdminDashboard() {
  const { user, customUser, loading: authLoading } = useAuth();
  const router = useRouter();

  const [users, setUsers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Search & Edit States
  const [userSearch, setUserSearch] = useState("");
  const [newProduct, setNewProduct] = useState({ name: "", description: "", price: 0, imageUrl: "", stock: 0 });
  
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editProductData, setEditProductData] = useState<any>({});

  useEffect(() => {
    if (!authLoading && (!user || !customUser?.isAdmin)) {
      router.push("/");
    }
  }, [user, customUser, authLoading, router]);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/admin");
      if (res.ok) {
        const data = await res.json();
        setUsers(data.users);
        setProducts(data.products);
        setOrders(data.orders);
      }
    } catch (e) {
      console.error("Error fetching admin data", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (customUser?.isAdmin) {
      fetchData();
    }
  }, [customUser]);

  // --- Users Handlers ---
  const toggleAdmin = async (userId: string, currentStatus: boolean) => {
    try {
      const res = await fetch("/api/admin", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "updateUser", userId, payload: { isAdmin: !currentStatus } })
      });
      if (res.ok) {
        setUsers(users.map(u => u.id === userId ? { ...u, isAdmin: !currentStatus } : u));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const updateCredits = async (userId: string, newValue: number) => {
    try {
      const res = await fetch("/api/admin", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "updateUser", userId, payload: { credits: newValue } })
      });
      if (res.ok) {
        setUsers(users.map(u => u.id === userId ? { ...u, credits: newValue } : u));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const filteredUsers = users.filter(u => {
    const search = userSearch.toLowerCase();
    return (u.displayName?.toLowerCase() || "").includes(search) || 
           (u.email?.toLowerCase() || "").includes(search);
  });

  // --- Products Handlers ---
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "createProduct", payload: newProduct })
      });
      if (res.ok) {
        const created = await res.json();
        setProducts([...products, created]);
        setNewProduct({ name: "", description: "", price: 0, imageUrl: "", stock: 0 });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteProduct = async (prodId: string) => {
    try {
      const res = await fetch(`/api/admin?productId=${prodId}`, { method: "DELETE" });
      if (res.ok) {
        setProducts(products.filter(p => p.id !== prodId));
      }
    } catch (e) {
      console.error(e);
    }
  };

  const startEditProduct = (prod: any) => {
    setEditingProductId(prod.id);
    setEditProductData({ ...prod });
  };

  const cancelEditProduct = () => {
    setEditingProductId(null);
    setEditProductData({});
  };

  const saveEditProduct = async () => {
    try {
      const res = await fetch("/api/admin", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          action: "updateProduct", 
          payload: { 
            productId: editProductData.id, 
            name: editProductData.name,
            price: Number(editProductData.price),
            stock: Number(editProductData.stock),
            description: editProductData.description,
            imageUrl: editProductData.imageUrl
          } 
        })
      });
      if (res.ok) {
        const updated = await res.json();
        setProducts(products.map(p => p.id === updated.id ? updated : p));
        setEditingProductId(null);
      }
    } catch (e) {
      console.error(e);
    }
  };

  if (authLoading || loading) {
    return <div className="p-16 text-center font-mono">Loading data...</div>;
  }

  if (!customUser?.isAdmin) {
    return null; // Protected by useEffect redirect
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 w-full flex-grow flex flex-col gap-16">
      <h1 className="text-4xl font-bold uppercase tracking-tight border-b border-black pb-4">Terminal Dashboard</h1>

      {/* USERS */}
      <section>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-bold uppercase">Users Library</h2>
          <Input 
            placeholder="Search users..." 
            value={userSearch} 
            onChange={(e) => setUserSearch(e.target.value)}
            className="w-full sm:w-64"
          />
        </div>
        <div className="grid grid-cols-1 gap-4 max-h-[60vh] overflow-y-auto pr-2">
          {filteredUsers.length === 0 && (
             <div className="text-neutral-500 font-mono text-sm">No users found.</div>
          )}
          {filteredUsers.map(u => (
            <div key={u.id} className="border border-black p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="font-bold">{u.displayName || "Unknown User"}</div>
                <div className="text-sm font-mono text-neutral-500">{u.email}</div>
                <div className="text-xs font-mono text-neutral-400 mt-1">{u.id}</div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs uppercase font-bold tracking-widest">Credits</span>
                  <Input 
                    type="number" 
                    value={u.credits} 
                    onChange={(e) => updateCredits(u.id, Number(e.target.value))}
                    className="w-24 text-center border p-1"
                  />
                </div>
                
                <Button 
                  variant={u.isAdmin ? "primary" : "outline"}
                  onClick={() => toggleAdmin(u.id, !!u.isAdmin)}
                >
                  {u.isAdmin ? "Revoke Admin" : "Make Admin"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section>
        <h2 className="text-2xl font-bold uppercase mb-6">Products Manager</h2>
        
        {/* ADD PRODUCT FORM */}
        <div className="border border-black p-6 bg-neutral-50 mb-8">
          <h3 className="font-bold uppercase tracking-widest mb-4 text-sm">Deploy New Product</h3>
          <form onSubmit={handleAddProduct} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-end">
            <Input placeholder="Name" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} required />
            <Input placeholder="Price (c)" type="number" value={newProduct.price || ''} onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})} required />
            <Input placeholder="Stock" type="number" value={newProduct.stock || ''} onChange={e => setNewProduct({...newProduct, stock: Number(e.target.value)})} required />
            <Input placeholder="Image URL" value={newProduct.imageUrl} onChange={e => setNewProduct({...newProduct, imageUrl: e.target.value})} className="col-span-1 lg:col-span-2" required />
            <Input placeholder="Description" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} className="col-span-1 sm:col-span-2 lg:col-span-4" required />
            <Button type="submit" className="w-full">Create</Button>
          </form>
        </div>

        {/* PRODUCT LIST */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[80vh] overflow-y-auto pr-2">
          {products.map(p => {
            if (editingProductId === p.id) {
              return (
                <div key={p.id} className="border border-black p-4 flex flex-col gap-3 bg-neutral-100">
                  <Input value={editProductData.name} onChange={e => setEditProductData({...editProductData, name: e.target.value})} placeholder="Name" />
                  <div className="flex gap-2">
                    <Input type="number" value={editProductData.price} onChange={e => setEditProductData({...editProductData, price: e.target.value})} placeholder="Price" />
                    <Input type="number" value={editProductData.stock} onChange={e => setEditProductData({...editProductData, stock: e.target.value})} placeholder="Stock" />
                  </div>
                  <Input value={editProductData.imageUrl} onChange={e => setEditProductData({...editProductData, imageUrl: e.target.value})} placeholder="Image URL" />
                  <Input value={editProductData.description} onChange={e => setEditProductData({...editProductData, description: e.target.value})} placeholder="Description" />
                  
                  <div className="flex gap-2 mt-2">
                    <Button onClick={saveEditProduct} className="flex-grow">Save</Button>
                    <Button variant="outline" onClick={cancelEditProduct}>Cancel</Button>
                  </div>
                </div>
              );
            }

            return (
              <div key={p.id} className="border border-black p-4 flex flex-col justify-between">
                <div>
                  <div className="font-bold mb-1">{p.name}</div>
                  <div className="font-mono text-sm mb-4">{p.price} c | Stock: {p.stock}</div>
                  <p className="text-xs text-neutral-500 mb-4 line-clamp-2">{p.description}</p>
                  <div className="text-xs font-mono text-neutral-400 break-all mb-4">{p.imageUrl}</div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => startEditProduct(p)} className="flex-grow">Edit</Button>
                  <Button variant="outline" onClick={() => handleDeleteProduct(p.id)}>Delete</Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ORDERS */}
      <section>
        <h2 className="text-2xl font-bold uppercase mb-6">Order Log</h2>
        <div className="flex flex-col gap-4 max-h-[60vh] overflow-y-auto pr-2">
          {orders.map(o => (
            <div key={o.id} className="border border-black p-4 flex flex-col sm:flex-row justify-between gap-4">
              <div>
                <div className="font-mono text-xs text-neutral-500 mb-1">ID: {o.id}</div>
                <div className="font-mono text-sm font-bold">User: {o.userId}</div>
              </div>
              
              <div className="flex flex-col sm:items-end text-sm font-mono">
                <div>{JSON.parse(o.items || "[]").length} Items</div>
                <div className="font-bold">{o.totalAmount} c</div>
                <div className="text-neutral-500 text-xs">
                  {new Date(o.createdAt || Date.now()).toLocaleString()}
                </div>
              </div>
            </div>
          ))}
          {orders.length === 0 && <div className="text-neutral-500 font-mono text-sm">No orders recorded yet.</div>}
        </div>
      </section>

    </div>
  );
}
