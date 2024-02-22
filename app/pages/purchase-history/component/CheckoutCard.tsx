"use client";

import React, { useEffect, useState } from "react";
import { CheckoutProps } from "../page";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

const CheckoutCard = ({ checkoutList = [] }: { checkoutList: any[] }) => {
  checkoutList.sort((a, b) => {
    const dateA = new Date(a.checkout_at).getTime();
    const dateB = new Date(b.checkout_at).getTime();

    // Compare dates for sorting
    return dateA - dateB;
  });
  const [posts, setPosts] = useState(checkoutList);
  const supabase = createClientComponentClient<any>();
  const router = useRouter();

  const dateFormat = (date: string) => {
    const dateObject = new Date(date);

    // Format the date using toLocaleString
    const formattedDateTime = dateObject.toLocaleString();

    // Display the result
    console.log("Formatted DateTime:", formattedDateTime);

    return formattedDateTime;
  };

  useEffect(() => {
    setPosts(checkoutList);
  }, [checkoutList]);

  useEffect(() => {
    const channel = supabase
      .channel("*")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "checkout_detail" },
        (payload) => {
          console.log(payload);
          //setPosts((posts) => [...posts, payload.new]);
          router.refresh();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, setPosts, posts]);

  console.log(checkoutList);
  return (
    <div className="my-10 mx-10 grid gap-y-10 grid-cols-1">
      {posts.map((item: CheckoutProps, index: number) => (
        <div
          key={index}
          className="collapse collapse-arrow card lg:card-side bg-base-100 shadow-xl"
        >
          <input type="radio" name="my-accordion-1" className="peer" />
          <div className="flex collapse-title">
            <div className="flex-initial card-body">
              <h2 className="card-title">
                {item.first_name} {item.last_name}
              </h2>
            </div>
            <div className="flex-initial card-body ">
              <h2 className="card-title">Total: {item.total_amount} </h2>
              <h2 className="card-title">
                Checkout at: {dateFormat(item.checkout_at)}{" "}
              </h2>
            </div>
          </div>
          <div className="collapse-content bg-primary text-primary-content peer-checked:text-warning-content">
            <div className="mt-3 collapse collapse-plus card lg:card-side bg-white">
              <div className="flex flex-row justify-center font-bold">
                <h3 className="pl-7 w-3/4">Product</h3>
                <h3 className="w-1/4">Price</h3>
                <h3 className="w-1/4">Unit(s)</h3>
                <h3 className="w-20">Total</h3>
              </div>
              {item.product_name.map((name: string, index: number) => (
                <div key={index} className="flex flex-row justify-center">
                  <div className="pl-7 w-3/4">{name}</div>
                  <div className="w-1/4">{item.price[index]}</div>
                  <div className="w-1/4">{item.unit[index]}</div>
                  <div className="w-20">{item.total_product_amount[index]}</div>
                </div>
              ))}
              <div className="flex flex-row justify-center font-bold">
                <h3 className="pl-7 w-3/4">Total</h3>
                <h3 className="w-1/4"></h3>
                <h3 className="w-1/4">
                  {item.unit.reduce(
                    (accumulator, currentValue) => accumulator + currentValue,
                    0
                  )}
                </h3>
                <h3 className="w-20">{item.total_amount}</h3>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CheckoutCard;
