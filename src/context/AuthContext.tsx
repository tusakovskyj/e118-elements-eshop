"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { SessionProvider, useSession } from "next-auth/react";

interface CustomUser {
  uid: string;
  email: string;
  displayName: string;
  credits: number;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: any; // The session user
  customUser: CustomUser | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  customUser: null,
  loading: true,
  refreshUser: async () => {},
});

function AuthProviderInner({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const [customUser, setCustomUser] = useState<CustomUser | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserData = async () => {
    if (session?.user) {
      try {
        const res = await fetch("/api/me");
        if (res.ok) {
          const data = await res.json();
          setCustomUser({
            uid: (session.user as any).id,
            email: session.user.email!,
            displayName: data.displayName || session.user.name || "",
            credits: data.credits,
            isAdmin: data.isAdmin,
          });
        }
      } catch (err) {
        console.error("Failed to fetch user data", err);
      }
    } else {
      setCustomUser(null);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (status === "loading") {
      setLoading(true);
      return;
    }
    fetchUserData();
  }, [session, status]);

  return (
    <AuthContext.Provider value={{ user: session?.user || null, customUser, loading, refreshUser: fetchUserData }}>
      {children}
    </AuthContext.Provider>
  );
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <AuthProviderInner>{children}</AuthProviderInner>
    </SessionProvider>
  );
}

export const useAuth = () => useContext(AuthContext);
