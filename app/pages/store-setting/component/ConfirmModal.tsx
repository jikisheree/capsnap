"use client";

import { createSupabaseBrowserClient } from "@/lib/supabase/supabase-browser";
import React, { useState } from "react";

const ConfirmModal = () => {
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
    <div className="modal-box">
      <h1 className="font-bold text-2xl mb-5">
        Are you sure you want to delete?
      </h1>
      {loading && (
        <span className="loading loading-spinner text-primary"></span>
      )}
      <div className="modal-action">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button onClick={handleSave} className="btn btn-primary">
            Save
          </button>
          <button className="btn">Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default ConfirmModal;
