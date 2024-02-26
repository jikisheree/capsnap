"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/supabase-browser";
import React, { useState } from "react";

const AdminModal = () => {
  const supabase = createSupabaseBrowserClient();
  //const router = useRouter();
  //const { user } = useAppContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const handleSave = async () => {
    try {
      console.log("Saving product information...");
      setLoading(true);

      const { data, error } = await supabase.rpc("add_admin", {
        firstName: firstName,
        lastName: lastName,
        email: email,
        role: role,
      });

      if (error) console.log("cannot add new admin.");
      else {
        console.log(data);
      }
    } catch (e: any) {
      throw new Error(e);
    } finally {
      window.location.reload();
      setLoading(false);
    }
  };
  return (
    <div className="modal-box h-5/6">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <h1 className="font-bold text-2xl text-center mb-5">
        Edit Admin Information
      </h1>
      <div role="tablist" className="tabs tabs-bordered">
        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="General"
        />
        <div role="tabpanel" className="tab-content p-10 ">
          <div className="grid grid-col-1 gap-3">
            <div className="col-span-2">
              <h2 className="font-bold">First Name</h2>
              <input
                type="text"
                placeholder="first name"
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                className="input input-bordered input-sm input-primary w-full"
              />
            </div>
            <div className="col-span-2">
              <h2 className="font-bold">Last Name</h2>
              <input
                type="text"
                placeholder="last name"
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                className="input input-bordered input-sm input-primary w-full"
              />
            </div>
            <div className="col-span-2">
              <h2 className="font-bold">Username</h2>
              <input
                type="text"
                placeholder="last name"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                className="input input-bordered input-sm input-primary w-full"
              />
            </div>
            <div className="col-span-2">
              <h2 className="font-bold">Email</h2>
              <input
                type="email"
                placeholder="email"
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className="input input-bordered input-sm input-primary w-full"
              />
            </div>
            <div className="col-span-2">
              <h2 className="font-bold">Role</h2>
              <input
                type="text"
                placeholder="role"
                onChange={(e) => {
                  setRole(e.target.value);
                }}
                className="input input-bordered input-sm input-primary w-full"
              />
            </div>
          </div>
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Advance"
        />
        <div role="tabpanel" className="tab-content p-10">
          Tab content 2
        </div>

        <input
          type="radio"
          name="my_tabs_1"
          role="tab"
          className="tab"
          aria-label="Others"
        />
        <div role="tabpanel" className="tab-content p-10">
          Tab content 3
        </div>
      </div>
      <div className="modal-action place-content-center">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button onClick={handleSave} className="btn btn-primary">
            Submit
            {loading && (
              <span className="loading loading-spinner text-white"></span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminModal;
