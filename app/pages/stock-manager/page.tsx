import React from "react";
import CateCard from "@/app/pages/stock-manager/component/CateCard";
import AddCategory from "./component/AddCategory";
import AddCategoryButton from "./component/AddCategoryButton";
import { createSupabaseServerClient } from "@/lib/supabase/supabase-server";

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
  const supabase = createSupabaseServerClient();

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
