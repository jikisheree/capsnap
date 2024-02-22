import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const supabase = createClientComponentClient();
  const {data, error} = await supabase.from('store_data').select();;
  if(error) throw error;
  return NextResponse.json(data);
}