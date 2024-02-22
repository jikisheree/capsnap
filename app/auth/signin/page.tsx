"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import FormCard from "../../components/FormCard";
import Link from "next/link";
import { useAppContext } from "../../context/supabase-context";
import readUserSession from "@/lib/actions";

export default function Login() {
  const { user, setUser } = useAppContext();
  const [data, setData] = useState<{
    email: string;
    password: string;
  }>({ email: "", password: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const router = useRouter();
  const supabase = createClientComponentClient();

  console.log(user);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignIn = async () => {
    const { email, password } = data;
    // need to add password and email handler
    if (email.length < 4 || password.length < 4) {
      alert("Invalid email or password!");
    }
    try {
      setLoading(true);
      const { data: dataSupabase, error } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });
      if (error) {
        console.log("Error:", error);
        return setError("Sorry, impossible to login.");
      }
      if (dataSupabase) {
        const { user, session } = dataSupabase;
        const { access_token, refresh_token } = session;

        await supabase.auth.setSession({ access_token, refresh_token });
        setUser(user);
        router.push("/home");
      }
    } catch (e: any) {
      throw new Error(e);
    } finally {
      setLoading(false);
    }
  };

  if (user) router.push("/home");

  //   const { data: sessionData } = await readUserSession();

  //   if (sessionData.session) {
  //     return redirect("/home");
  //   }

  return (
    <FormCard signType="Sign In">
      <div className="py-32 w-1/2 mr-auto p-5 rounded-l-lg opacity-60 bg-gradient-to-r from-cyan to-blue-500 hover:from-blue-500 hover:to-cyan">
        <h1 className="pl-11 font-mono text-7xl bg-gradient-to-r from-white to-cyan-400 text-transparent bg-clip-text font-bold">
          <Link href="/">CapSnap</Link>
        </h1>
        <div className="text-center mr-5 mt-5">
          <p>Do not have an account?</p>
          <button
            type="button"
            className="mt-5 text-black hover:text-white bg-white hover:bg-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <Link href="/auth/signup">Sign Up</Link>
          </button>
        </div>
      </div>
      <div className=" w-1/2 ml-auto bg-white p-5 rounded-r-lg py-32">
        <h1 className=" text-black text-center pb-3 text-xl font-bold">
          <br></br>
          Sign In
        </h1>
        <input
          type="email"
          name="email"
          value={data?.email}
          onChange={handleChange}
          placeholder="Email"
          className="mb-4 w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        <input
          type="password"
          name="password"
          value={data?.password}
          onChange={handleChange}
          placeholder="Password"
          className="mb-4 w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        {error && (
          <div role="alert" className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="stroke-current shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}
        {loading && (
          <span className="loading loading-spinner text-primary"></span>
        )}
        <button
          onClick={handleSignIn}
          className="w-full p-3 rounded-md bg-gray-700 text-white hover:bg-gray-600 focus:outline-none"
        >
          Sign In
        </button>
      </div>
    </FormCard>
  );
}
