"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/supabase-browser";
import React, { useState } from "react";

const CreateAdminModal = () => {
  const supabase = createSupabaseBrowserClient();
  const [loading, setLoading] = useState<boolean>(true);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password1, setPassword1] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
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
    <div className="modal-box overflow-hidden">
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>
      <h1 className="font-bold text-2xl text-center mb-5">Add new admin</h1>
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
        <div className="col-span-2">
          <h2 className="font-bold">Password</h2>
          <input
            type="password"
            placeholder="password"
            onChange={(e) => {
              setPassword1(e.target.value);
            }}
            className="input input-bordered input-sm input-primary w-full"
          />
        </div>
        <div className="col-span-2">
          <h2 className="font-bold">Confirm Password</h2>
          <input
            type="password"
            placeholder="confirm password"
            onChange={(e) => {
              setPassword2(e.target.value);
            }}
            className="input input-bordered input-sm input-primary w-full"
          />
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

export default CreateAdminModal;
