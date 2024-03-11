import React, { useState, useTransition } from "react";
import { AdminProps } from "../../page";
import TabPanel from "@mui/lab/TabPanel";
import { updateMemberAccountById } from "../../actions";

const AccountEditTab = ({ admin }: { admin: AdminProps }) => {
  const [username, setUsername] = useState(admin.admin.username);
  const [email, setEmail] = useState(admin.admin.email);
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [password, setPassword] = useState("");

  const [isPending, startTransition] = useTransition();

  const handleSubmit = async () => {
    startTransition(() => {
      if (password1 === password2) {
        setPassword(password1);
        handleSave();
      } else {
        console.error("Passwords do not match.");
        window.alert("Passwords do not match.");
        return;
      }
    });
  };

  const handleSave = async () => {
    try {
      console.log("Updating admin account information...");

      const { error } = JSON.parse(
        await updateMemberAccountById(admin.admin_id, {
          username: username,
          email: email,
          password: password,
        })
      );

      if (error) {
        console.error("Cannot update account info.", error);
      } else {
        console.log("Successfully Updates Account info!");
        // window.location.reload();
      }
    } catch (e: any) {
      console.error(e);
    }
  };

  const handleChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
    console.log(username);
  };

  const handleChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
    console.log(email);
  };

  const handleChangePassword1 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword1(event.target.value);
    console.log(password1);
  };

  const handleBlurPassword1 = () => {
    // Check if password1 has at least 6 characters
    if (password1.length < 6) {
      console.error("Password must be at least 6 characters.");
      window.alert("Password must be at least 6 characters.");
    }
  };

  const handleChangePassword2 = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword2(event.target.value);
    console.log(password2);
  };

  return (
    <TabPanel value="2">
      <div className="grid grid-col-1 gap-3">
        <div className="col-span-2">
          <h2 className="font-bold">Username</h2>
          <input
            type="text"
            name="username"
            placeholder="username"
            value={username}
            onChange={(event) => handleChangeUsername(event)}
            className="input input-bordered input-sm input-primary w-full"
          />
        </div>
        <div className="col-span-2">
          <h2 className="font-bold">Email</h2>
          <input
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={(event) => handleChangeEmail(event)}
            className="input input-bordered input-sm input-primary w-full"
          />
        </div>
        <div className="col-span-2">
          <h2 className="font-bold">New Password</h2>
          <input
            type="password"
            name="password1"
            placeholder="new password"
            value={password1}
            onBlur={() => handleBlurPassword1()}
            onChange={(event) => handleChangePassword1(event)}
            className="input input-bordered input-sm input-primary w-full"
          />
        </div>
        <div className="col-span-2">
          <h2 className="font-bold">Confirm Password</h2>
          <input
            type="password"
            name="password2"
            placeholder="confirm password"
            value={password2}
            onChange={(event) => handleChangePassword2(event)}
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

export default AccountEditTab;
