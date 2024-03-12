import React, { useState, useTransition } from "react";
import { AdminProps } from "../../page";
import TabPanel from "@mui/lab/TabPanel";
import { updateMemberAdvanceById, updateMemberBasicById } from "../../actions";

const BasicEditTab = ({ admin }: { admin: AdminProps }) => {
  const [first_name, setFirst_name] = useState(admin.admin.first_name);
  const [last_name, setLast_name] = useState(admin.admin.last_name);

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
        await updateMemberBasicById(admin.admin_id, {
          first_name: first_name,
          last_name: last_name,
        })
      );

      if (error) {
        console.error("Cannot update advance info.", error);
      } else {
        console.log("Successfully Updates Advnace info!");
      }
    } catch (e: any) {
      console.error(e);
    }
  };

  const handleChangeFirstName = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFirst_name(event.target.value);
    console.log(first_name);
  };

  const handleChangeLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLast_name(event.target.value);
    console.log(last_name);
  };

  return (
    <TabPanel value="1">
      <div className="grid grid-col-1 gap-3">
        <div className="col-span-2">
          <h2 className="font-bold">First Name</h2>
          <input
            type="text"
            name="first_name"
            value={first_name}
            onChange={(event) => handleChangeFirstName(event)}
            className="input input-bordered input-sm input-primary w-full"
          />
        </div>
        <div className="col-span-2">
          <h2 className="font-bold">Last Name</h2>
          <input
            type="text"
            name="last_name"
            placeholder="last name"
            value={last_name}
            onChange={(event) => handleChangeLastName(event)}
            className="input input-bordered input-sm input-primary w-full"
          />
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
    </TabPanel>
  );
};

export default BasicEditTab;
