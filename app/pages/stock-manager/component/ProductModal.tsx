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
  const [type, setType] = useState<"Increase"|"Decrease">("Increase");
  const [name, setName] = useState<string>(product.product_name);
  const [description, setDescription] = useState<string>(product.description);
  const [price, setPrice] = useState<number>(product.price);
  const [stock, setStock] = useState<number>(0);
  const [img, setImg] = useState<string>(product.image_path);

  const handleSave = async () => {
    try {
      console.log("Saving product information...");

      const { data: authData } = await supabase.auth.getUser();
      console.log("UUU", authData.user);

      const { data, error } = await supabase.rpc("update_stock_by_admin", {
        p_id: product.product_id,
        type: type,
        new_name: name,
        new_desc: description,
        updated_amount: stock,
        new_price: price,
        new_img: img,
      });

      if (error) console.log("cannot update product data.");
      else {
        console.log(data);
      }
    } catch (e: any) {
      throw new Error(e);
    }
  };

  const handleChangeType = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setType(event.target.value as "Increase"|"Decrease");
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
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
          className="input input-bordered input-primary w-full max-w-xs col-span-2"
        />
        <h2 className="font-bold">Image url: </h2>
        <input
          type="text"
          value={img}
          onChange={(e) => {
            setImg(e.target.value);
          }}
          className="input input-bordered input-primary w-full max-w-xs col-span-2"
        />
        <h2 className="font-bold">Description: </h2>
        <textarea
          className="textarea textarea-primary col-span-2"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        ></textarea>
        <h2 className="font-bold">Price: </h2>
        <input
          type="number"
          value={price}
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
          <select
            className="select select-sm select-primary w-full my-3"
            value={type}
            onChange={(event) => handleChangeType(event)}
          >
            <option disabled value="">
              Do you want increase or decrease the stock?
            </option>
            <option value={"Increase"}>Increase</option>
            <option value={"Decrease"}>Decrease</option>
          </select>
          <input
            type="number"
            placeholder={"update unit"}
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
          <button onClick={handleSave} className="btn m-2 btn-primary">
            Save
          </button>
          <button className="btn">Close</button>
        </form>
      </div>
    </div>
  );
};

export default ModalContent;

