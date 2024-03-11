"use client";

import React from "react";

const AddCategoryButton = () => {
  const dialog = document.getElementById("addcategory") as HTMLDialogElement;
  return (
    <button
      onClick={() => dialog?.showModal()}
      className="btn btn-outline btn-secondary absolute right-0 w-48"
    >
      + Add Category
    </button>
  );
};

export default AddCategoryButton;
