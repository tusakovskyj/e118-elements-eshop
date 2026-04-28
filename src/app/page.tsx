"use client";

import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ProductCard } from "@/components/ProductCard";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

interface Product {
  id: string;
  name: string;
  price: number;
  imageUrl: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const data = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full">
      <section className="max-w-7xl mx-auto px-6 pt-8 pb-12 lg:pt-12 w-full">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-neutral-900 rounded-[2.5rem] w-full p-8 md:p-16 lg:p-24 relative overflow-hidden shadow-2xl flex flex-col justify-end min-h-[50vh]"
        >
          {/* Subtle colorful gradients in the background */}
          <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[80%] bg-blue-600/30 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[60%] h-[80%] bg-fuchsia-600/30 blur-[120px] rounded-full pointer-events-none mix-blend-screen" />
          
          <div className="relative z-10 flex flex-col gap-6">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-mono text-5xl md:text-7xl lg:text-8xl xl:text-[8rem] text-white leading-[1.1] tracking-tighter"
            >
              CRAFT<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">THE UNIVERSE</span>
            </motion.h1>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative max-w-2xl mt-8 md:mt-12"
            >
              <input
                type="text"
                className="w-full bg-white/10 backdrop-blur-xl border border-white/20 text-white placeholder-white/50 px-8 py-5 rounded-full font-mono text-lg outline-none focus:ring-2 focus:ring-purple-500/50 transition-all"
                placeholder="Search catalog..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-white/50 w-6 h-6" />
            </motion.div>
          </div>
        </motion.div>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-24">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <span className="font-mono text-sm tracking-widest uppercase animate-pulse text-neutral-500">Initializing Database...</span>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
          >
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </section>
    </div>
  );
}
