"use client";

import React, { useState, useTransition } from "react";
import { AdminProps } from "../../page";
import TabPanel from "@mui/lab/TabPanel";
import { updateMemberAdvanceById } from "../../actions";

const AdvanceEditTab2 = ({ admin }: { admin: AdminProps }) => {
  const [status, setStatus] = useState<"Active" | "Resigned">(admin.status);
  const [role, setRole] = useState<"Admin" | "Super Admin">(admin.role);
  console.log(admin.status);
  console.log(admin.role);

  const [isPending, startTransition] = useTransition();

  const handleSubmit = async () => {
    startTransition(() => {
      handleSave();
    });
  };

  const handleSave = async () => {
    try {
      console.log("Updating admin information...");
      const { error } = JSON.parse(
        await updateMemberAdvanceById(admin.id, admin.admin_id, {
          role: role,
          status: status,
        })
      );

      if (error) {
        window.alert("Cannot update account info:"+ error);
      } else {
        console.log("Successfully Updates Advnace info!");
        // window.location.reload();
      }
    } catch (e: any) {
      console.error(e);
    }
  };

  const handleChangeStatus = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value as "Active" | "Resigned");
    console.log(status);
  };

  const handleChangeRole = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(event.target.value as "Admin" | "Super Admin");
    console.log(role);
  };

  return (
    <div>
      <div className="grid grid-col-1 gap-3">
        <div className="col-span-2">
          <h2 className="font-bold">Role</h2>
          <select
            className="select select-sm select-primary w-full"
            value={role}
            onChange={(event) => handleChangeRole(event)}
          >
            <option disabled value="">
              {role}
            </option>
            <option value={"Super Admin"}>Super Admin</option>
            <option value={"Admin"}>Admin</option>
          </select>
        </div>
        <div className="col-span-2">
          <h2 className="font-bold">Status</h2>
          <select
            className="select select-sm select-primary w-full"
            value={status}
            onChange={(event) => handleChangeStatus(event)}
          >
            {/* <option disabled value="">
              {status}
            </option> */}
            <option value={"Active"}>Active</option>
            <option value={"Resigned"}>Resigned</option>
          </select>
        </div>
      </div>
      {/* Action Button */}
      <div className="modal-action place-content-center">
        <button onClick={handleSubmit} className="btn btn-primary">
          Update
          {isPending && (
            <span className="loading loading-spinner text-white"></span>
          )}
        </button>
      </div>
      </div>
  );
};

export default AdvanceEditTab2;
