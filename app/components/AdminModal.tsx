"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React, { useState } from "react";

const AdminModal = () => {
  const supabase = createClientComponentClient();
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
    <div className="modal-box">
      <h1 className="font-bold text-2xl mb-5">Add new admin.</h1>
      <div className="grid grid-cols-3 gap-5 ">
        <h2 className="font-bold">Fist Name: </h2>
        <input
          type="text"
          placeholder="first name"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
          className="input input-bordered input-primary w-full max-w-xs col-span-2"
        />
        <h2 className="font-bold">Last Name: </h2>
        <input
          type="text"
          placeholder="last name"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
          className="input input-bordered input-primary w-full max-w-xs col-span-2"
        />
        <h2 className="font-bold">Email: </h2>
        <input
          type="text"
          placeholder="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="input input-bordered input-primary w-full max-w-xs col-span-2"
        />
        <h2 className="font-bold">Role: </h2>
        <input
          type="text"
          placeholder="role"
          onChange={(e) => {
            setRole(e.target.value);
          }}
          className="input input-bordered input-primary w-full max-w-xs col-span-2"
        />
      </div>
      {loading && (
        <span className="loading loading-spinner text-primary"></span>
      )}
      <div className="modal-action">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button onClick={handleSave} className="btn btn-primary">
            Save
          </button>
          <button className="btn">Close</button>
        </form>
      </div>
    </div>
  );
};

export default AdminModal;
