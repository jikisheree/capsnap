"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import FormCard from "../../components/FormCard";
import Link from "next/link";
import { useAppContext } from "../../context/supabase-context";

export default function Login() {
  const [data, setData] = useState<{
    firstName: string;
    lastName: string;
    role: string;
    email: string;
    password: string;
  }>({ firstName: "", lastName: "", role: "", email: "", password: "" });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSignUp = async () => {
    const { setUser } = useAppContext();
    const { firstName, lastName, role, email, password } = data;
    if (email.length < 4 || password.length < 4) {
      alert("Invalid email or password!");
    }
    try {
      setLoading(true);
      const { data: dataSupabase, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${location.origin}/auth/callback`,
          data: { firstName: firstName, lastName: lastName, role: role },
        },
      });
      if (error) return setError("Sorry, impossible to Signup.");
      if (dataSupabase) {
        const { user } = dataSupabase;
        setUser(user);
        router.refresh();
      }
    } catch (e: any) {
      throw new Error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <FormCard signType="Sign In">
      <div className=" w-1/2 mr-auto bg-white p-5 rounded-l-lg">
        <h1 className=" text-black text-center pb-3 text-xl font-bold">
          Sign Up
        </h1>
        <input
          type="text"
          name="firstName"
          value={data?.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="mb-4 w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          name="lastName"
          value={data?.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          className="mb-4 w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          name="role"
          value={data?.role}
          onChange={handleChange}
          placeholder="Role"
          className="mb-4 w-full p-3 rounded-md border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
        />
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
          onClick={handleSignUp}
          className="w-full p-3 rounded-md bg-gray-700 text-white hover:bg-gray-600 focus:outline-none"
        >
          Sign Up
        </button>
      </div>
      <div className="py-32 w-1/2 ml-auto p-5 rounded-r-lg opacity-60 bg-gradient-to-l from-cyan to-blue-500 hover:from-blue-500 hover:to-cyan">
        <h1 className="pl-11 font-mono text-7xl bg-gradient-to-r from-white to-cyan-400 text-transparent bg-clip-text font-bold">
          <Link href="/">CapSnap</Link>
        </h1>
        <div className="text-center mr-5 mt-5">
          <p>Already have an account?</p>
          <button
            type="button"
            className="mt-5 text-black hover:text-white bg-white hover:bg-blue-300 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <Link href="/auth/signin">Sign In</Link>
          </button>
        </div>
      </div>
    </FormCard>
  );
}
