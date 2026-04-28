"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, updateDoc, doc, deleteDoc, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [newProduct, setNewProduct] = useState({ name: "", description: "", price: 0, imageUrl: "", stock: 0 });

  const fetchData = async () => {
    try {
      const [uSnap, pSnap, oSnap] = await Promise.all([
        getDocs(collection(db, "users")),
        getDocs(collection(db, "products")),
        getDocs(collection(db, "orders")),
      ]);

      setUsers(uSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      setProducts(pSnap.docs.map(d => ({ id: d.id, ...d.data() })));
      
      const fetchedOrders = oSnap.docs.map(d => ({ id: d.id, ...d.data() }));
      fetchedOrders.sort((a: any, b: any) => {
        const dateA = a.createdAt?.toMillis?.() || 0;
        const dateB = b.createdAt?.toMillis?.() || 0;
        return dateB - dateA; // desc
      });
      setOrders(fetchedOrders);
    } catch (e) {
      console.error("Error fetching admin data", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // --- Users Handlers ---
  const toggleAdmin = async (userId: string, currentStatus: boolean) => {
    await updateDoc(doc(db, "users", userId), { isAdmin: !currentStatus });
    setUsers(users.map(u => u.id === userId ? { ...u, isAdmin: !currentStatus } : u));
  };

  const updateCredits = async (userId: string, newValue: number) => {
    await updateDoc(doc(db, "users", userId), { credits: newValue });
    setUsers(users.map(u => u.id === userId ? { ...u, credits: newValue } : u));
  };

  // --- Products Handlers ---
  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const docRef = await addDoc(collection(db, "products"), newProduct);
    setProducts([...products, { id: docRef.id, ...newProduct }]);
    setNewProduct({ name: "", description: "", price: 0, imageUrl: "", stock: 0 });
  };

  const handleDeleteProduct = async (prodId: string) => {
    await deleteDoc(doc(db, "products", prodId));
    setProducts(products.filter(p => p.id !== prodId));
  };

  if (loading) {
    return <div className="p-16 text-center font-mono">Loading data...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-16 w-full flex-grow flex flex-col gap-16">
      <h1 className="text-4xl font-bold uppercase tracking-tight border-b border-black pb-4">Terminal Dashboard</h1>

      {/* USERS */}
      <section>
        <h2 className="text-2xl font-bold uppercase mb-6">Users Library</h2>
        <div className="grid grid-cols-1 gap-4">
          {users.map(u => (
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(p => (
            <div key={p.id} className="border border-black p-4 flex flex-col justify-between">
              <div>
                <div className="font-bold mb-1">{p.name}</div>
                <div className="font-mono text-sm mb-4">{p.price} c | Stock: {p.stock}</div>
                <p className="text-xs text-neutral-500 mb-4 line-clamp-2">{p.description}</p>
                <div className="text-xs font-mono text-neutral-400 break-all mb-4">{p.imageUrl}</div>
              </div>
              <Button variant="outline" onClick={() => handleDeleteProduct(p.id)}>Delete</Button>
            </div>
          ))}
        </div>
      </section>

      {/* ORDERS */}
      <section>
        <h2 className="text-2xl font-bold uppercase mb-6">Order Log</h2>
        <div className="flex flex-col gap-4">
          {orders.map(o => (
            <div key={o.id} className="border border-black p-4 flex flex-col sm:flex-row justify-between gap-4">
              <div>
                <div className="font-mono text-xs text-neutral-500 mb-1">ID: {o.id}</div>
                <div className="font-mono text-sm font-bold">User: {o.userId}</div>
              </div>
              
              <div className="flex flex-col sm:items-end text-sm font-mono">
                <div>{o.items?.length || 0} Items</div>
                <div className="font-bold">{o.totalAmount} c</div>
                <div className="text-neutral-500 text-xs">
                  {new Date(o.createdAt?.toDate?.() || Date.now()).toLocaleString()}
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
