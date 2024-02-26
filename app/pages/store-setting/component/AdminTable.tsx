import React, { useState } from "react";
import { AdminProps } from "../page";
import { createSupabaseBrowserClient } from "@/lib/supabase/supabase-browser";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import ConfirmModal from "./ConfirmModal";
import AdminModal from "./AdminModal";

const AdminTable = ({ admins = [] }: { admins: AdminProps[] | null }) => {
  const supabase = createSupabaseBrowserClient();
  const [loading, setLoading] = useState<boolean>(true);
  const [role, setRole] = useState<string>("");

  const handleRemoveAdmin = async () => {
    try {
      console.log("Removing admin...");
      setLoading(true);

      // delete admin from table
      //const { data, error } = await supabase.from()

      //   if (error) console.log("cannot add new admin.");
      //   else {
      //     console.log(data);
      //  }
    } catch (e: any) {
      throw new Error(e);
    } finally {
      window.location.reload();
      setLoading(false);
    }
  };

  const handleEditAdmin = async () => {
    try {
      console.log("Removing admin...");
      setLoading(true);

      // delete admin from table
      //const { data, error } = await supabase.from()

      //   if (error) console.log("cannot add new admin.");
      //   else {
      //     console.log(data);
      //  }
    } catch (e: any) {
      throw new Error(e);
    } finally {
      window.location.reload();
      setLoading(false);
    }
  };

  return (
    <div className="justify-center overflow-x-auto">
      <table className="table table-xl">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
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
              <td>{item.name}</td>
              <td>{item.role}</td>
              <td>{item.joined_at}</td>
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
                <button
                  onClick={() =>
                    document.getElementById("confirmModal")?.showModal()
                  }
                  className="btn btn-secondary"
                >
                  <AiFillDelete />
                </button>
                <dialog
                  id="confirmModal"
                  className="modal modal-bottom sm:modal-middle"
                >
                  <ConfirmModal />
                </dialog>
                <dialog
                  id="adminModal"
                  className="modal modal-bottom sm:modal-middle"
                >
                  <AdminModal />
                </dialog>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Birth date</th>
            <th>Joined at</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default AdminTable;
