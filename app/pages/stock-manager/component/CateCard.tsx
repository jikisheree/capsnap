"use client";

import React, { useEffect, useState } from "react";
import { CateProps } from "../page";
import ProductCard from "./ProductCard";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export interface ProductProps {
  product_id: number;
  category_id: number;
  product_name: string;
  description: string;
  price: number;
  stock: number;
  created_at: string;
  image_path: string;
}

export default function CateCard({
  cate = [],
  product = [],
}: {
  cate: CateProps[];
  product: ProductProps[];
}) {
  cate.sort((a, b) => a.category_name.localeCompare(b.category_name));

  const [categories, setCategories] = useState(cate);
  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    setCategories(cate);
  }, [cate]);

  useEffect(() => {
    const channel = supabase
      .channel("Categories updates")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "category" },
        (payload) => {
          console.log(payload);
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, setCategories, categories]);

  const filterByCategory = (category_id: number) => {
    if (product && category_id)
      return product.filter((each) => {
        return each.category_id === category_id;
      });
    else return [];
  };

  return (
    <div className="my-10 mx-10 grid gap-y-10 grid-cols-1">
      {categories.map((item: CateProps, index: number) => (
        <div
          key={index}
          className="collapse collapse-arrow card lg:card-side bg-base-100 shadow-xl"
        >
          <input type="radio" name="my-accordion-1" className="peer" />
          <div className="flex collapse-title">
            <figure className="flex-initial">
              <img
                className="rounded-l-lg"
                style={{ width: "100px", height: "100px" }}
                src={item.image_path}
                alt="Album"
              />
            </figure>
            <div className="flex-initial card-body">
              <h2 className="card-title">{item.category_name}</h2>
              <p>{item.desc}</p>
            </div>
            <div className="flex-initial card-body ">
              <h2 className="card-title">Remains: {item.stock} </h2>
            </div>
          </div>
          <div className="collapse-content bg-primary text-primary-content peer-checked:bg-warning peer-checked:text-warning-content">
            {product && (
              <ProductCard product={filterByCategory(item.category_id)} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}