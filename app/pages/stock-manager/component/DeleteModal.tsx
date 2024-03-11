"use client";

import React, { useTransition } from "react";
import { createSupabaseBrowserClient } from "@/lib/supabase/supabase-browser";

const DeleteModal = ({
  type,
  product_id,
  category_id,
}: {
  type: string;
  product_id: number | undefined;
  category_id: number | undefined;
}) => {
  const supabase = createSupabaseBrowserClient();
  const [isPending, startTransition] = useTransition();
  const onSubmit = () => {
    startTransition(async () => {
      try {
        if (type === "product") {
          const result = await supabase
            .from("product")
            .delete()
            .eq("product_id", product_id);
          if (result?.error?.message) {
            console.log("Error deleteing product: ", result.error.message);
          } else {
            console.log("Successfully deleted product: ");
          }
        } else if (type === "category") {
          const result = await supabase
            .from("category")
            .delete()
            .eq("category_id", category_id);
          if (result?.error?.message) {
            console.log("Error deleteing category: ", result.error.message);
          } else {
            console.log("Successfully deleted category");
          }
        }
      } catch (e: any) {
        window.alert(e);
      }
    });
  };
  return (
    <div className="modal-box">
      <h1 className="font-bold text-2xl mb-5">
        Are you sure you want to delete this{" "}
        {category_id !== undefined ? "" : "product"}
        {product_id !== undefined ? "" : " category"}?
      </h1>
      {isPending && (
        <span className="loading loading-spinner text-primary"></span>
      )}
      <div className="modal-action">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button onClick={onSubmit} className="btn btn-primary">
            {isPending && (
              <span className="loading loading-spinner text-primary"></span>
            )}
            Confirm
          </button>
          <span className="m-1"></span>
          <button className="btn">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default DeleteModal;
