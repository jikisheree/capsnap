"use client";

import React, { useEffect, useState } from "react";
import Table from "@/app/pages/customers/component/CustomerTable";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export interface CustomerProps {
  customer_id: string;
  first_name: string;
  last_name: string;
  email: string;
  birth_date: string;
  join_at: string;
}

const Page = () => {
  const supabase = createClientComponentClient();
  const [customers, setCustomers] = useState<CustomerProps[] | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("customer").select();
      if (error) console.log(error);
      else {
        setCustomers(data);
        console.log(" Customers ");
        console.log(data);
      }
    };

    fetchData();
  }, []);

  function countCustomersJoinedLast7Days(
    customers: CustomerProps[] | null
  ): number {
    const currentDate = new Date();
    const sevenDaysAgo = new Date(
      currentDate.getTime() - 7 * 24 * 60 * 60 * 1000
    );

    if (customers) {
      return customers?.filter((customer) => {
        const joinDate = new Date(customer.join_at);
        return joinDate >= sevenDaysAgo && joinDate <= currentDate;
      }).length;
    } else return 0;
  }

  const count = countCustomersJoinedLast7Days(customers);

  return (
    <>
      <div className="overflow-auto no-scrollbar h-screen flex flex-col px-20 py-5 bg-gradient-to-t from-blue-200 from-30%">
        <h1 className="text-3xl font-bold">Customers</h1>
        <div className="flex justify-center gap-20 my-5">
          <div className="justify-normal pt-10">
            <div className="m-5 card w-72 bg-primary text-primary-content">
              <div className="card-body">
                <h2 className="card-title text-3xl">{customers?.length}</h2>
                <h3>Overall customers</h3>
              </div>
            </div>
            <div className="m-5 card w-72 bg-primary text-primary-content">
              <div className="card-body">
                <h2 className="card-title text-3xl">{count}</h2>
                <h3>New customers in last 7 days</h3>
              </div>
            </div>
          </div>
          <div className="overflow-x-auto h-1/2">
            {customers && <Table customers={customers} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
