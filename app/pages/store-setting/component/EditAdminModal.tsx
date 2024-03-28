import React from "react";
import { AdminProps } from "../page";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import AdvanceEditTab from "./Tabs/AdvanceEditTab";
import AccountEditTab from "./Tabs/AccountEditTab";
import BasicEditTab from "./Tabs/BasicEditTab";
import { useAppContext } from "@/app/context/supabase-context";
import AdvanceEditTab2 from "./Tabs/AdvanceEditTab2";

interface EditAdminModalProps {
  admin: AdminProps;
}

const EditAdminModal: React.FC<EditAdminModalProps> = ({ admin }) => {
  const {user} = useAppContext();
  const userId =  user?.id;
  console.log(userId);
  const [value, setValue] = React.useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div className="modal-box overflow-hidden">
      {/* Close button */}
      <form method="dialog">
        {/* if there is a button in form, it will close the modal */}
        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
          ✕
        </button>
      </form>

      <h1 className="font-bold text-2xl text-center mb-5">
        Edit Admin Information
      </h1>

      {/* Tabs */}
       {admin.admin_id === userId ? (
      <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList
          onChange={handleChange}
          aria-label="Admin Update Tabs"
          centered
        >
          <Tab label="Basic" value="1" />
          <Tab label="Account" value="2" />
          <Tab label="Advance" value="3" />
        </TabList>
      </Box>

      {/* Tab Panels */}
      <BasicEditTab admin={admin} key={`ba-${admin.admin_id}`} />
      <AccountEditTab admin={admin} key={`ac-${admin.admin_id}`} />
      <AdvanceEditTab admin={admin} key={`ad-${admin.admin_id}`} />
    </TabContext>) : (
      <AdvanceEditTab2 admin={admin} key={`ad-${admin.admin_id}`} />
    )}
    </div>
  );
};

export default EditAdminModal;
