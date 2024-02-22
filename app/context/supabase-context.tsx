"use client";

import { usePathname } from "next/navigation";
import {
  SupabaseClient,
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import React, { useContext, useEffect, useState } from "react";
import { createContext } from "react";
import SideBar from "../components/SideBar";
import { useRouter } from "next/navigation";

interface IAppContext {
  supabase: SupabaseClient;
  user: User | undefined;
  loading: boolean;
}

const AppContext = createContext<any>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<User | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const pathname = usePathname(); // Get the router object from Next.js
  const [error, setError] = useState<string | undefined>(undefined);
  const router = useRouter();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const { data }: any = await supabase.auth.getSession();
        if (data) {
          console.log(data);
          console.log(data.session.user);
        }
        setUser(data.session.user);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  const handleSignOut = async () => {
    try {
      console.log("Trying to Logout");
      setLoading(true);

      const { error } = await supabase.auth.signOut();
      if (error) return setError("Sorry, impossible to logout.");
      else {
        setUser(undefined); // Clear the user from the context or set it to undefined
        router.push("/unauthenticated");
      }
    } catch (e: any) {
      throw new Error(e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;

  // Check if the current path is '/'
  const isHomePage = ["/", "/auth/signin", "/auth/signup"].includes(pathname);

  // Render based on the user state and current path
  return (
    <AppContext.Provider value={{ user, setUser, supabase, handleSignOut }}>
      {user && !isHomePage ? <SideBar>{children}</SideBar> : <>{children}</>}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
