"use server";

import React from "react";
import CheckoutCard from "@/app/pages/purchase-history/component/CheckoutCard";
import { createSupabaseServerClient } from "@/lib/supabase/supabase-server";

export interface CheckoutProps {
  first_name: string;
  last_name: string;
  method: string;
  total_amount: number;
  checkout_at: string;
  product_name: string[];
  price: number[];
  unit: number[];
  total_product_amount: number[];
}

export default async function () {
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase.rpc("get_checkout_info");
  if (error) window.alert("Error fetching checkout data: " + error);

  return (
    <>
      <div className="overflow-auto no-scrollbar h-screen flex flex-col px-20 py-5 bg-gradient-to-t from-blue-200 from-30%">
        <h1 className="text-3xl font-bold">Purchase History</h1>
        {data && <CheckoutCard checkoutList={data} />}
        {/* {data && <Post serverPosts={data} />} */}
      </div>
    </>
  );
}
