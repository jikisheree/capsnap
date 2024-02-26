"use client";

import React, { useState } from "react";
import { ProductProps } from "./CateCard";
import { useAppContext } from "../../../context/supabase-context";
import { useRouter } from "next/navigation";
import { createSupabaseBrowserClient } from "@/lib/supabase/supabase-browser";

interface ModalContentProps {
  product: ProductProps;
}

// ModalContent component
const ModalContent: React.FC<ModalContentProps> = ({ product }) => {
  const supabase = createSupabaseBrowserClient();
  //const router = useRouter();
  const { user } = useAppContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [name, setName] = useState<string>(product.product_name);
  const [description, setDescription] = useState<string>(product.description);
  const [price, setPrice] = useState<number>(product.price);
  const [stock, setStock] = useState<number>(0);
  const [img, setImg] = useState<string>(product.image_path);

  const handleSave = async () => {
    try {
      console.log("Saving product information...");
      setLoading(true);

      const { data: authData } = await supabase.auth.getUser();
      console.log("UUU", authData.user);

      const { data, error } = await supabase.rpc("update_stock", {
        p_id: product.product_id,
        new_name: name,
        new_desc: description,
        updated_amount: stock,
        new_price: price,
        new_img: img,
        by: authData.user?.email,
      });

      if (error) console.log("cannot update product data.");
      else {
        console.log(data);
      }
    } catch (e: any) {
      throw new Error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-box">
      <h1 className="font-bold text-2xl mb-5">
        Edit {product.product_name} information.
      </h1>
      <div className="grid grid-cols-3 gap-5 ">
        <h2 className="font-bold">Name: </h2>
        <input
          type="text"
          placeholder={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="input input-bordered input-primary w-full max-w-xs col-span-2"
        />
        <h2 className="font-bold">Image url: </h2>
        <input
          type="text"
          placeholder={img}
          onChange={(e) => {
            setImg(e.target.value);
          }}
          className="input input-bordered input-primary w-full max-w-xs col-span-2"
        />
        <h2 className="font-bold">Description: </h2>
        <textarea
          className="textarea textarea-primary col-span-2"
          placeholder={product.description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
        <h2 className="font-bold">Price: </h2>
        <input
          type="text"
          placeholder={product.price.toString()}
          onChange={(e) => {
            setPrice(parseInt(e.target.value, 10));
          }}
          className="input input-bordered input-primary w-full max-w-xs col-span-2"
        />
        <h2 className="font-bold">Stock: </h2>
        <div className="col-span-2">
          <h3 className="font-bold text-sm text-primary">
            There are {product.stock} in stock.
          </h3>
          {/* <select className="select select-primary w-full max-w-xs text-white">
            <option disabled selected>
              Add or Remove from stock?
            </option>
            <option>Remove</option>
            <option>Add</option>
          </select> */}
          <input
            type="text"
            placeholder="update unit"
            onChange={(e) => {
              setStock(parseInt(e.target.value, 10));
            }}
            className="input input-bordered input-primary w-full max-w-xs"
          />
        </div>
      </div>
      <div className="modal-action">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button onClick={handleSave} className="btn btn-primary">
            Save
          </button>
          <button className="btn">Close</button>
        </form>
      </div>
    </div>
  );
};

export default ModalContent;
