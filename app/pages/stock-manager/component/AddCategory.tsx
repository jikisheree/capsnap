"use client";

import React, { useTransition } from "react";
import { addNewCategory } from "../actions";

const AddCategory = () => {
  const [isPending, startTransition] = useTransition();
  // const dialog = document.getElementById("addcategory");
  const dialog = document.getElementById("addcategory") as HTMLDialogElement;
  const handleSave = (formData: FormData) => {
    // event.preventDefault();
    startTransition(async () => {
      try {
        console.log("Adding new category...");
        // const formData = new FormData(event.currentTarget);

        const { data, error } = JSON.parse(
          await addNewCategory({
            category_name: formData.get("product_name") as string,
            image_path: formData.get("img_path") as string,
          })
        );

        if (error) console.log("Cannot add new category.");
        else {
          console.log(data);
          //   if (dialog) {
          dialog.close();
          //   }
        }
      } catch (e: any) {
        window.alert(e);
      }
    });
  };

  return (
    <div className="modal-box">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <h1 className="font-bold text-2xl mb-5">Add New Category</h1>
      <form method="dialog">
        <div className="grid grid-cols-3 gap-5">
          <h2 className="font-bold">Name: </h2>
          <input
            type="text"
            placeholder="name"
            name="product_name"
            className="input input-bordered input-primary w-full max-w-xs col-span-2"
          />
          <h2 className="font-bold">Image url: </h2>
          <input
            type="text"
            placeholder="image url"
            name="image_path"
            className="input input-bordered input-primary w-full max-w-xs col-span-2"
          />
        </div>
        <div className="modal-action">
          <button formAction={handleSave} className="btn btn-primary">
            {isPending && (
              <span className="loading loading-spinner text-primary"></span>
            )}
            Save
          </button>
          <button className="btn">Close</button>
        </div>
      </form>
    </div>
  );
};

export default AddCategory;
