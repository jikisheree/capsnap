import React from "react";
import CateCard from "@/app/pages/stock-manager/component/CateCard";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export interface CateProps {
  category_id: number;
  category_name: string;
  desc: string;
  stock: number;
  created_at: string;
  updated_at: string;
  image_path: string;
}

export default async function () {
  const supabase = createServerComponentClient<any>({
    cookies,
  });

  const { data: cateData } = await supabase.from("category").select();
  const { data: prodDdata } = await supabase.from("product").select();

  console.log(cateData);

  return (
    <>
      <div className="overflow-auto no-scrollbar h-screen flex flex-col bg-gradient-to-t from-blue-200 from-30%">
        <div className="my-10 mx-10">
          <h1 className="p-2 text-5xl font-bold">Stock Manager</h1>
          {cateData && prodDdata && (
            <CateCard cate={cateData} product={prodDdata} />
          )}
        </div>
      </div>
    </>
  );
}
