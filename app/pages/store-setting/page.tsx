// "use server";

import AdminTable from "@/app/pages/store-setting/component/AdminTable";
import React from "react";
import CreateAdminModal from "./component/CreateAdminModal";
import { readMember, readStoreData } from "./actions";
import { useUserStore } from "@/lib/store/user";
import { useAppContext } from "@/app/context/supabase-context";
import AddAdminButton from "./component/AddAdminButton";
import StoreSetting from "./component/StoreSetting";

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

const Page = async () => {
  const user = useUserStore.getState().user;
  const isSuperAdmin = user?.user_metadata.role === "Super Admin";
  console.log(isSuperAdmin);
  console.log(user);
  // const isSuperAdmin = true;

  const { data: admins, error } = await readMember();
  if (error) window.alert("Error fetching admin data: " + error);
  const { data: store, error: storeError } = await readStoreData();
  if (storeError) window.alert("Error fetching admin data: " + error);

  return (
    <>
      <div className="overflow-auto no-scrollbar h-screen flex flex-col px-20 py-5 bg-gradient-to-t from-blue-200 from-30%">
        <h1 className="text-3xl font-bold">Store Settings</h1>
        <div className="flex w-full my-5">
          <StoreSetting data={store} />
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
                {isSuperAdmin && <AddAdminButton />}
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
