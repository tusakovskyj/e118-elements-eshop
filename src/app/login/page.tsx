"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/profile");
    } catch (err: any) {
      setError(err.message || "Failed to login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center flex-grow py-16 px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-bold mb-8 uppercase tracking-tight text-center">Login</h1>
        
        {error && <div className="mb-4 text-sm font-mono border border-black p-3 bg-neutral-50 text-red-600">{error}</div>}
        
        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <Input 
            type="email" 
            placeholder="Email Address" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
          />
          <Input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={e => setPassword(e.target.value)} 
            required 
          />
          
          <Button type="submit" fullWidth disabled={loading}>
            {loading ? "Logging in..." : "Sign In"}
          </Button>
        </form>
        
        <p className="mt-8 text-center text-sm text-neutral-500">
          Don't have an account? <Link href="/register" className="text-black hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}
