import { useAppContext } from "@/app/context/supabase-context";
import React, { useTransition } from "react";
import { addNewProduct, revalidate } from "../actions";
import { revalidatePath } from "next/cache";

const AddProduct = ({ category_id }: { category_id: number }) => {
  const { user } = useAppContext();
  const [isPending, startTransition] = useTransition();
  const dialog = document.getElementById(
    `addproduct-${category_id}`
  ) as HTMLDialogElement;

  const handleSave = (formData: FormData) => {
    // event.preventDefault();
    startTransition(async () => {
      try {
        console.log("Adding new product...");
        // const formData = new FormData(event.currentTarget);

        const { data, error } = JSON.parse(
          await addNewProduct({
            product_id: parseInt(formData.get("product_id") as string),
            product_name: formData.get("product_name") as string,
            category_id: category_id,
            description: formData.get("description") as string,
            stock: parseInt(formData.get("stock") as string),
            price: parseInt(formData.get("price") as string),
            image_path: formData.get("img_path") as string,
          })
        );

        if (error) console.log("Cannot add new product.");
        else {
          console.log(data);
          dialog?.close();
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
      <h1 className="font-bold text-2xl mb-5">Add New Product.</h1>
      <form method="dialog">
        <div className="grid grid-cols-3 gap-5">
          <h2 className="font-bold">ID: </h2>
          <input
            type="text"
            placeholder="id"
            name="product_id"
            className="input input-bordered input-primary w-full max-w-xs col-span-2"
          />
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
          <h2 className="font-bold">Description: </h2>
          <textarea
            name="description"
            className="textarea textarea-primary col-span-2"
            placeholder="description"
          ></textarea>
          <h2 className="font-bold">Price: </h2>
          <input
            type="text"
            placeholder="price"
            name="price"
            className="input input-bordered input-primary w-full max-w-xs col-span-2"
          />
          <h2 className="font-bold">Stock: </h2>
          <div className="col-span-2">
            <input
              type="text"
              placeholder="stock"
              name="stock"
              className="input input-bordered input-primary w-full max-w-xs"
            />
          </div>
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

export default AddProduct;
