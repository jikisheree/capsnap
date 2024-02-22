import React, { useState } from "react";
import { AdminProps } from "../pages/store-setting/page";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

const AdminTable = ({ admins = [] }: { admins: AdminProps[] | null }) => {
  const supabase = createClientComponentClient();
  //const router = useRouter();
  //const { user } = useAppContext();
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
  return (
    <div className="justify-center overflow-x-auto">
      <table className="table table-xl">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Surname</th>
            <th>Email</th>
            <th>Role</th>
            <th>Joined at</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {admins?.map((item: AdminProps, index: number) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{item.first_name}</td>
              <td>{item.last_name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
              <td>{item.joined_at}</td>
              <td>
                <button onClick={handleRemoveAdmin} className="btn btn-primary">
                  Remove
                </button>
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
