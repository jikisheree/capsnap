"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/supabase-browser";
import React, { useState, useTransition } from "react";
import { createMember } from "../actions";

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
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    console.log("Saving information...");
    setLoading(true);
    startTransition(async () => {
      const result = await createMember({
        password: password1,
        username: username,
        first_name: firstName,
        last_name: lastName,
        email: email,
        role: role,
      });
      console.log(JSON.parse(result));
      const { error } = JSON.parse(result);
      if (error?.message) window.alert(error.message);
      else console.log("Successfully add admin.");
    });
  };
  return (
    <div className="modal-box overflow-auto">
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
  <select
    className="select select-sm select-primary w-full"
    value={role}
    onChange={(e) => setRole(e.target.value)}
  >
    <option disabled value={""}>
      Choose role...
    </option>
    <option value={"Super Admin"}>Super Admin</option>
    <option value={"Admin"}>Admin</option>
  </select>
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
            {isPending && (
              <span className="loading loading-spinner text-white"></span>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAdminModal;
