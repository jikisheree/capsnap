"use server";

import React from "react";
import CheckoutCard from "@/app/pages/purchase-history/component/CheckoutCard";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import Post from "./component/Post";

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
  const supabase = createServerComponentClient<any>({
    cookies,
  });

  const { data, error } = await supabase.rpc("get_checkout_info");
  // const { data, error } = await supabase.from("checkout_detail").select("*");
  console.log("data");
  console.log(data);

  return (
    <>
      <div className="overflow-auto no-scrollbar h-screen flex flex-col bg-gradient-to-t from-orange-300 from-30%">
        <div className="my-10 mx-10">
          <h1 className="p-2 text-5xl bg-clip-text font-bold">
            Purchase History
          </h1>
          {data && <CheckoutCard checkoutList={data} />}
          {/* {data && <Post serverPosts={data} />} */}
        </div>
      </div>
    </>
  );
}
