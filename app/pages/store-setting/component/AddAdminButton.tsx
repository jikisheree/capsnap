"use client";

import React from "react";

const AddAdminButton = () => {
  return (
    <button
      onClick={() => {
        const dialog = document.getElementById(
          "addAdminModal"
        ) as HTMLDialogElement;
        dialog?.showModal();
      }}
      className="btn btn-primary mr-5"
    >
      + Admin
    </button>
  );
};

export default AddAdminButton;
