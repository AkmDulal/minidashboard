"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { doLogout } from "@/app/actions";
import { signOut as signOutClient } from "next-auth/react";

interface User {
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [localUser, setLocalUser] = useState<User | null>(null);

  const router = useRouter();
  const pathname = usePathname();

  const { data: session, status } = useSession();
  console.log(status, "status");
  console.log(session, "status");
  

  useEffect(() => {
    const storedUser =
      typeof window !== "undefined" ? localStorage.getItem("user") : null;
    if (storedUser) setLocalUser(JSON.parse(storedUser));
  }, []);

  const derivedUser: User | null =
    (session?.user as User | undefined) ?? localUser ?? null;

  const isLoading = status === "loading";
  const isAuthed = !!derivedUser;

  useEffect(() => {
    if (isLoading) return;

    if (!isAuthed && pathname !== "/auth/sign-in") {
      router.push("/auth/sign-in");
    } else if (isAuthed && pathname === "/auth/sign-in") {
      router.push("/");
    }
  }, [isAuthed, isLoading, pathname, router]);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log(email && password, "email && password");
    
    try {
      if (email && password) {
        const userData = { email, name: email.split("@")[0] };
        setLocalUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };


  

  const logout = async () => {
    setLocalUser(null);
    localStorage.removeItem("user");
    await signOutClient({ callbackUrl: "/auth/sign-in" });
  };

  return (
    <AuthContext.Provider
      value={{ user: derivedUser, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
