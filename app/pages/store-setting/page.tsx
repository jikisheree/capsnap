"use client";

import AdminTable from "@/app/pages/store-setting/component/AdminTable";
import { createSupabaseBrowserClient } from "@/lib/supabase/supabase-browser";
import React, { ChangeEvent, useEffect, useState, useTransition } from "react";
import { AiFillSave } from "react-icons/ai";
import CreateAdminModal from "./component/CreateAdminModal";
import { readMember, readStoreData, updateStoreData } from "./actions";
import { useUserStore } from "@/lib/store/user";
import { useAppContext } from "@/app/context/supabase-context";

export interface AdminProps {
  id: string;
  created_at: string;
  role: "Admin" | "Super Admin";
  status: "Active" | "Resigned";
  admin_id: string;
  admin: {
    id: string;
    username: string;
    last_name: string;
    created_at: string;
    first_name: string;
    email: string;
  };
}

export interface StoreProps {
  store_name: string;
  location: string;
  category: string;
}

const Page = () => {
  const supabase = createSupabaseBrowserClient();
  const [admins, setAdmins] = useState<AdminProps[] | null>(null);
  const [store, setStore] = useState<StoreProps | null>(null);
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isPending, startTransition] = useTransition();
  const [imageSrc, setImageSrc] = useState(
    "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
  );

  // const user = useUserStore.getState().user;
  const { user } = useAppContext();
  console.log(user);
  // const isSuperAdmin = user?.user_metadata.role === "Super Admin";
  const isSuperAdmin = true;
  console.log(isSuperAdmin);

  useEffect(() => {
    const fetchAdminData = async () => {
      const { data: admins, error } = await readMember();

      if (error) console.log("Error fetching admin data: ", error);
      setAdmins(admins);
      console.log(" Admin ");
      console.log(admins);
    };

    fetchAdminData();

    const fetchStoreData = async () => {
      const { data, error } = await readStoreData();

      if (error) console.log("Error fetching store data: ", error);
      setStore(data);
      setName(data.store_name);
      setLocation(data.location);
      setCategory(data.category);
      console.log(" Store ");
      console.log(data);
    };

    fetchStoreData();
  }, []);

  const handleSaveStoreData = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await updateStoreData({
        store_name: formData.get("name") as string,
        location: formData.get("location") as string,
        category: formData.get("category") as string,
      });
      console.log(JSON.parse(result));
      const { error } = JSON.parse(result);
      if (error?.message) window.alert(error.message);
      else console.log("Successfully add admin.");
    });
  };

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

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    console.log();
  };
  const handleChangeLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
    console.log();
  };
  const handleChangeCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
    console.log();
  };

  return (
    <>
      <div className="overflow-auto no-scrollbar h-screen flex flex-col px-20 py-5 bg-gradient-to-t from-blue-200 from-30%">
        <h1 className="text-3xl font-bold">Store Settings</h1>
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
            <form
              className="grid flex-auto card rounded-box place-items-center"
              onSubmit={handleSaveStoreData}
            >
              <h1 className="mt-2 text-2xl font-bold">SHOP NAME</h1>
              <div className="form-control w-52 mt-5">
                <label className="cursor-pointer label">
                  <span className="label-text">OPEN</span>
                  <input type="checkbox" className="toggle toggle-primary" />
                </label>
              </div>
              <input
                name="name"
                type="text"
                value={name}
                onChange={(event) => handleChangeName(event)}
                className="mt-7 input input-bordered input-primary w-full max-w-xs"
              />
              <input
                // import location api
                name="location"
                type="text"
                value={location}
                onChange={(event) => handleChangeLocation(event)}
                className="mt-5 input input-bordered input-primary w-full max-w-xs"
              />
              <input
                type="text"
                name="category"
                value={category}
                onChange={(event) => handleChangeCategory(event)}
                className="mt-5 input input-bordered input-primary w-full max-w-xs"
              />
              <button type="submit" className="btn mr-5 flex m-5">
                {isPending && (
                  <span className="loading loading-spinner text-white"></span>
                )}
                <AiFillSave />
                save
              </button>
            </form>
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
                {isSuperAdmin && (
                  <button
                    onClick={() => {
                      const dialog = document.getElementById(
                        "addAdminModal"
                      ) as HTMLDialogElement;
                      dialog?.showModal();
                    }}
                    className="btn btn-primary mr-5"
                  >
                    + Admin
                  </button>
                )}
              </div>
              <AdminTable admins={admins} isSuperAdmin={isSuperAdmin} />
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

export default Page;
