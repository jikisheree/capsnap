"use client";

import AdminModal from "@/app/pages/store-setting/component/AdminModal";
import AdminTable from "@/app/pages/store-setting/component/AdminTable";
import { createSupabaseBrowserClient } from "@/lib/supabase/supabase-browser";
import React, { ChangeEvent, useEffect, useState } from "react";
import { AiFillSave } from "react-icons/ai";
import CreateAdminModal from "./component/CreateAdminModal";

export interface AdminProps {
  name: string;
  role: string;
  joined_at: string;
  status: string;
}

const page = () => {
  const supabase = createSupabaseBrowserClient();
  const [admins, setAdmins] = useState<AdminProps[] | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState(
    "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
  );

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
  const handleSave = () => {};

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      setSelectedFile(file);

      const reader = new FileReader();
      reader.onload = (event) => {
        setImageSrc(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <div className="overflow-auto no-scrollbar h-screen flex flex-col bg-gradient-to-t from-blue-400 from-30%">
        <h1 className="p-2 ml-10 mt-7 text-5xl bg-clip-text font-bold">
          Store Settings
        </h1>
        <div className="flex w-full my-5">
          <div className="grid flex-auto card rounded-box place-items-center">
            <div className="avatar">
              <div className="w-48 mask mask-squircle">
                <img src={imageSrc} alt="Selected File" />
              </div>
            </div>
            <input
              type="file"
              className="file-input file-input-bordered file-input-secondary w-full max-w-xs m-3"
              onChange={handleFileChange}
            />
            <h1 className="mt-2 text-2xl font-bold">SHOP NAME</h1>
            <div className="form-control w-52 mt-5">
              <label className="cursor-pointer label">
                <span className="label-text">OPEN</span>
                <input type="checkbox" className="toggle toggle-primary" />
              </label>
            </div>
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
              placeholder="Category"
              className="mt-5 input input-bordered input-primary w-full max-w-xs"
            />
            <button onClick={handleSave} className="btn mr-5 flex m-5">
              <AiFillSave />
              save
            </button>
          </div>
          <div className="divider divider-horizontal"></div>
          <div className="grid flex-auto card rounded-box place-items-center">
            <div>
              <div
                className="flex"
                style={{
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h1 className="ml-52 font-bold text-xl">Admin Setting</h1>
                <button
                  onClick={() =>
                    document.getElementById("addAdminModal")?.showModal()
                  }
                  className="btn btn-primary mr-5"
                >
                  + Admin
                </button>
              </div>
              <AdminTable admins={admins} />
              <dialog
                id="addAdminModal"
                className="modal modal-bottom sm:modal-middle"
              >
                <CreateAdminModal />
              </dialog>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
