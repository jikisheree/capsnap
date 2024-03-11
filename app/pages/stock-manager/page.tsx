import React from "react";
import CateCard from "@/app/pages/stock-manager/component/CateCard";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { useUserStore } from "@/lib/store/user";
import AddCategory from "./component/AddCategory";
import AddCategoryButton from "./component/AddCategoryButton";

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

  const user = useUserStore.getState().user;
  console.log(user);

  const { data: cateData } = await supabase.from("category").select();
  const { data: prodDdata } = await supabase.from("product").select();

  console.log(cateData);

  return (
    <>
      <div className="overflow-auto no-scrollbar h-screen flex flex-col px-20 py-5 bg-gradient-to-t from-blue-200 from-30%">
        <div className="grid grid-cols-2 relative">
          <h1 className="text-3xl font-bold">Stock Manager</h1>
          <AddCategoryButton />
          <dialog
            id="addcategory"
            className="modal modal-bottom sm:modal-middle"
          >
            <AddCategory />
          </dialog>
        </div>
        {cateData && prodDdata && (
          <CateCard cate={cateData} product={prodDdata} />
        )}
      </div>
    </>
  );
}
