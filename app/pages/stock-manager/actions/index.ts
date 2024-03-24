"use server";

import { createSupabaseServerClient } from "@/lib/supabase/supabase-server";
import { revalidatePath } from "next/cache";

export async function readCategory() {
  const supabase = createSupabaseServerClient()

  const { data, error } = await supabase.from("category").select("*");

  if (error)
    throw (error);

  return JSON.stringify({ data, error });
}

// export async function deleteProductById(product_id: number){
//     const supabase = createServerComponentClient<any>({
//     cookies,
//   });

//   const { data, error } = await supabase.from("product").delete().eq('product_id', product_id);

//   if(error)
//   throw(error);

//   return JSON.stringify({data, error});
// }


export async function addNewProduct(data: {
  product_id: number;
  product_name: string;
  category_id: number;
  description: string;
  stock: number;
  price: number;
  image_path: string;
}) {
  const supabase = createSupabaseServerClient();
  const { data: result, error } = await supabase.rpc("insert_product", data);

  if (error)
    throw (error);

  return JSON.stringify({ result, error });
}

export async function addNewCategory(data: {
  category_name: string;
  image_path: string;
}) {
  const supabase = createSupabaseServerClient();
  const { data: result, error } = await supabase.from("category").insert(data);

  if (error)
    throw (error);

  return JSON.stringify({ result, error });
}

export async function revalidate() {
  revalidatePath("/pages/stock-manager");
}

export async function getStockHistory(product_id: number) {
  const supabase = createSupabaseServerClient();
  const { data: result, error } = await supabase.rpc("get_stock_history_by_productid", { selected_product_id: product_id });

  if (error)
    throw (error);

  return JSON.stringify({ result, error });
}

