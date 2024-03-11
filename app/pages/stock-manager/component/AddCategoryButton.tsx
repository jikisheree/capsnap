"use client";

import React from "react";

const AddCategoryButton = () => {
  return (
    <button
      onClick={() => document.getElementById("addcategory")?.showModal()}
      className="btn btn-outline btn-secondary absolute right-0 w-48"
    >
      + Add Category
    </button>
  );
};

export default AddCategoryButton;
