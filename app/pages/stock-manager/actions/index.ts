import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export async function readCategory(){
    const supabase = createServerComponentClient<any>({
    cookies,
  });

  const { data, error } = await supabase.from("category").select("*");

  if(error)
  throw(error);

  return JSON.stringify({data, error});
}