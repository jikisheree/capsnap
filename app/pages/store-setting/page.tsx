"use client";

import AdminModal from "@/app/components/AdminModal";
import AdminTable from "@/app/components/AdminTable";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useEffect, useState } from "react";

export interface AdminProps {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  joined_at: string;
}

const page = () => {
  const supabase = createClientComponentClient();
  const [admins, setAdmins] = useState<AdminProps[] | null>(null);

  useEffect(() => {
    const fetchAdminData = async () => {
      const { data, error } = await supabase.from("category").select();
      // const response = await fetch("http://localhost:3000/api/category", {
      //   cache: "no-cache",
      // });
      // const data = await response.json();
      if (error) console.log("Error fetching admin data: ", error);
      setAdmins(data);
      console.log(" Admin ");
      console.log(data);
    };

    fetchAdminData();
  }, []);

  const handleAddAdmin = () => {};

  return (
    <>
      <div className="overflow-auto no-scrollbar h-screen flex flex-col bg-gradient-to-t from-indigo-500 from-30%">
        <h1 className="p-2 ml-10 mt-7 text-5xl bg-gradient-to-r from-white to-cyan-400 text-transparent bg-clip-text font-bold">
          Store Settings
        </h1>
        <div className=" grid place-items-center">
          <div className="avatar">
            <div className="w-48 mask mask-squircle">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>

          <h1 className="mt-2 text-2xl font-bold">SHOP NAME</h1>
          <div className="form-control w-52 mt-5">
            <label className="cursor-pointer label">
              <span className="label-text">OPEN</span>
              <input type="checkbox" className="toggle toggle-primary" />
            </label>
          </div>
          <div className="flex">
            <div>
              <input
                type="text"
                placeholder="Shop Name"
                className="mt-7 input input-bordered input-primary w-full max-w-xs"
              />
              <input
                // import location api
                type="text"
                placeholder="Location"
                className="mt-5 input input-bordered input-primary w-full max-w-xs"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="mt-5 input input-bordered input-primary w-full max-w-xs"
              />
            </div>
            <div>
              <div className="flex">
                <h1>Admin Setting</h1>
                <button
                  onClick={() =>
                    document.getElementById("adminModel")?.showModal()
                  }
                  className="btn btn-primary"
                >
                  + Admin
                </button>
              </div>
              <AdminTable admins={admins} />
              <dialog
                id="adminModel"
                className="modal modal-bottom sm:modal-middle"
              >
                <AdminModal />
              </dialog>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
