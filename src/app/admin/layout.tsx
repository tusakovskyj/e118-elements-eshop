"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, customUser, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (!user || customUser?.isAdmin !== true) {
        router.push("/");
      }
    }
  }, [user, customUser, loading, router]);

  if (loading || !customUser?.isAdmin) {
    return (
      <div className="flex justify-center flex-grow items-center h-screen py-32">
        <span className="font-mono text-sm tracking-widest uppercase">Verifying Clearance...</span>
      </div>
    );
  }

  return (
    <div className="w-full flex-grow">
      {children}
    </div>
  );
}
