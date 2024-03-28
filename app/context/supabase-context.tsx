"use client";

import { usePathname, useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import SideBar from "../components/SideBar";
import { createSupabaseBrowserClient } from "@/lib/supabase/supabase-browser";
import { SupabaseClient, User } from "@supabase/supabase-js";

interface IAppContext {
  setUser: (user: User | null) => void;
  user: User | undefined;
  handleSignOut: () => Promise<void>;
}

const AppContext = createContext<IAppContext | undefined>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const supabase = createSupabaseBrowserClient();
  const [user, setUser] = useState<any>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const pathname = usePathname(); // Get the router object from Next.js
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const { data }: any = await supabase.auth.getUser();
        if (data.user) {
          console.log("User: ");
          console.log(data.user);
        }
        setUser(data.user);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [pathname]);

  const handleSignOut = async () => {
    try {
      console.log("Trying to Logout");
      setLoading(true);

      const { error } = await supabase.auth.signOut();
      if (error) return setError("Sorry, impossible to logout.");
    } catch (e: any) {
      throw new Error(e);
    } finally {
      setLoading(false);
      router.push("/");
      setUser(undefined); // Clear the user from the context or set it to undefined
    }
  };

  if (loading) return <h1>Loading...</h1>;

  // Check if the current path is '/'
  const isHomePage = ["/", "/auth/signin", "/auth/signup"].includes(pathname);

  // Render based on the user state and current path
  return (
    <AppContext.Provider value={{ user, setUser, handleSignOut }}>
      <div data-theme="nord">
        {user && !isHomePage ? <SideBar>{children}</SideBar> : <>{children}</>}
      </div>
    </AppContext.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};
