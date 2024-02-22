"use client";

import React, { useEffect, useState } from "react";
import Table from "@/app/components/CustomerTable";
import { useAppContext } from "@/app/context/supabase-context";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export interface CustomerProps {
  customer_id: string;
  first_name: string;
  last_name: string;
  email: string;
  birth_date: string;
  join_at: string;
}

const page = () => {
  const supabase = createClientComponentClient();
  const [customers, setCustomers] = useState<CustomerProps[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("customer").select();
      // const response = await fetch("http://localhost:3000/api/category", {
      //   cache: "no-cache",
      // });
      // const data = await response.json();
      if (error) console.log(error);
      else {
        setCustomers(data);
        console.log(" Customers ");
        console.log(data);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div className="overflow-auto no-scrollbar h-screen flex flex-col bg-gradient-to-t from-orange-300 from-30%">
        <div className="my-10 mx-10">
          <h1 className="text-5xl p-2 font-bold">Customers</h1>
          <div className="flex justify-center gap-20 my-5">
            <div className="justify-normal pt-16">
              <div className="m-5 card w-64 bg-primary text-primary-content">
                <div className="card-body">
                  <h2 className="card-title text-3xl">14</h2>
                  <h3>overall customers</h3>
                </div>
              </div>
              <div className="m-5 card w-64 bg-primary text-primary-content">
                <div className="card-body">
                  <h2 className="card-title text-3xl">0</h2>
                  <h3>new customers this week</h3>
                </div>
              </div>
              <div className="m-5 card w-64 bg-primary text-primary-content">
                <div className="card-body">
                  <h2 className="card-title text-3xl">0</h2>
                  <h3>is active</h3>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto h-1/3">
              {customers && <Table customers={customers} />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
