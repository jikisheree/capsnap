import { supabaseServer } from "@/utils/supabase";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const supabase = createClientComponentClient();
  const {data, error} = await supabase.from('category').select();
  if(error) throw error;
  return NextResponse.json(data);
}
// export async function POST(request: Request) {
//   const { title } = await request.json();
//   console.log(title);

//   const newData: {id: number, name: string} = {
//         id: Math.floor(Math.random() * (100 - 5 + 1)) + 5, // This will be automatically generated
//         name: title,
//       };
//   const supabase = supabaseServer;
//   const {data, error} = await supabase.from('test').insert([ newData ]);
//   if(error) console.log(error);
//   return NextResponse.json(data);
// }