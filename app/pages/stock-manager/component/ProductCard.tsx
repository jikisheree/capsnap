"use client";

import React, { useEffect, useState } from "react";
import { ProductProps } from "@/app/pages/stock-manager/component/CateCard";
import ModalContent from "./ProductModal";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

const ProductCard = ({ product = [] }: { product: ProductProps[] }) => {
  product.sort((a, b) => a.product_name.localeCompare(b.product_name));

  const [products, setProducts] = useState(product);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    setProducts(product);
  }, [product]);

  useEffect(() => {
    const channel = supabase
      .channel("Products updates")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "product" },
        (payload) => {
          console.log(payload);
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, setProducts, products]);
  return (
    <div className="m-5 mt-10 grid grid-cols-2 gap-5">
      {product.map((item: ProductProps, index: number) => (
        <div
          key={index}
          className="collapse collapse-plus card lg:card-side bg-base-100 shadow-xl"
        >
          <input type="checkbox" className="peer" />
          <div className="flex collapse-title">
            <figure className="flex-initial">
              <img
                className="rounded-l-lg"
                style={{ width: "100px", height: "100px" }}
                src={item.image_path}
                alt="Album"
              />
            </figure>
            <div className="flex-initial card-body ">
              <h2 className="card-title">{item.product_name}</h2>
              <p>{item.description}</p>
              <p>Price: {item.price}</p>
            </div>
            <div className="flex-initial card-body ">
              <h2 className="card-title">Remains: {item.stock} </h2>
            </div>
            <dialog
              id={`${index}-${item.category_id}`}
              className="modal modal-bottom sm:modal-middle"
            >
              <ModalContent product={item} />
            </dialog>
          </div>
          <div className="p-2 collapse-content bg-primary text-primary-content peer-checked:bg-primary peer-checked:text-primary-content">
            <button
              onClick={() =>
                document
                  .getElementById(`${index}-${item.category_id}`)
                  ?.showModal()
              }
              className="btn btn-primary"
            >
              Edit
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
