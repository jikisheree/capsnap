"use server";

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createSupabaseServerClient } from '@/lib/supabase/supabase-server';
import { useAppContext } from "../../context/supabase-context";

export async function login(formData: FormData) {
  const supabase = createSupabaseServerClient();
  //const { setUser } = useAppContext();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { data: supabaseData, error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    console.log("Login Error:", error);
    redirect('/error');
  }


  revalidatePath('/home', 'layout');
  redirect('/home');
}

export async function signup(formData: FormData) {
  const supabase = createSupabaseServerClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.log("Sign Up Error:", error);
    redirect('/error');
  }

  revalidatePath('/home', 'layout')
  redirect('/home')
}