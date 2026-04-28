"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { onAuthStateChanged, User as FirebaseUser } from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp, onSnapshot } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export interface CustomUser {
  uid: string;
  email: string;
  displayName: string;
  credits: number;
  createdAt: any;
  isAdmin?: boolean;
}

interface AuthContextType {
  user: FirebaseUser | null;
  customUser: CustomUser | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType>({ user: null, customUser: null, loading: true });

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<FirebaseUser | null>(null);
  const [customUser, setCustomUser] = useState<CustomUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      
      if (firebaseUser) {
        const userDocRef = doc(db, "users", firebaseUser.uid);
        
        // Listen to custom user data realtime to always reflect correct credits balance
        const unsubscribeSnapshot = onSnapshot(userDocRef, async (docSnap) => {
          if (docSnap.exists()) {
            setCustomUser({ uid: firebaseUser.uid, ...docSnap.data() } as CustomUser);
            setLoading(false);
          } else {
            // Create user document if it does not exist
            const newUserData = {
              email: firebaseUser.email || "",
              displayName: firebaseUser.displayName || "",
              credits: 1000,
              createdAt: serverTimestamp(),
            };
            await setDoc(userDocRef, newUserData);
            setCustomUser({ uid: firebaseUser.uid, ...newUserData } as CustomUser);
            setLoading(false);
          }
        });

        return () => unsubscribeSnapshot();
      } else {
        setCustomUser(null);
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, customUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
