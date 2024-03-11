import React, { useState } from "react";
import { AdminProps } from "../page";
import { createSupabaseBrowserClient } from "@/lib/supabase/supabase-browser";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import EditAdminModal from "./EditAdminModal";
import DeleteAdmin from "./DeleteAdmin";

const AdminTable = ({
  admins = [],
  isSuperAdmin,
}: {
  admins: AdminProps[] | null;
  isSuperAdmin: boolean;
}) => {
  console.log(isSuperAdmin);

  return (
    <div className="justify-center overflow-x-auto">
      <table className="table table-xl">
        <thead>
          <tr>
            <th></th>
            <th>Username</th>
            <th>Role</th>
            <th>Joined at</th>
            <th>status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {admins?.map((item: AdminProps, index: number) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{item.admin.username}</td>
              <td>{item.role}</td>
              <td>{new Date(item.created_at).toDateString()}</td>
              <td>{item.status}</td>
              <td>
                <button
                  onClick={() =>
                    document.getElementById("adminModal")?.showModal()
                  }
                  className="btn btn-primary"
                >
                  <AiFillEdit />
                </button>
                <span className="m-1" />
                {isSuperAdmin && <DeleteAdmin user_id={item.admin_id} />}
                <dialog
                  id="adminModal"
                  className="modal modal-bottom sm:modal-middle"
                >
                  <EditAdminModal admin={item} />
                </dialog>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th>Username</th>
            <th>Role</th>
            <th>Joined at</th>
            <th>status</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default AdminTable;
