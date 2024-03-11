"use client";

import React, { useTransition } from "react";
import { AiFillDelete } from "react-icons/ai";
import { deleteMemberById } from "../actions";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const DeleteAdmin = ({ user_id }: { user_id: string }) => {
  const [isPending, startTransition] = useTransition();
  const onSubmit = () => {
    startTransition(async () => {
      const result = JSON.parse(await deleteMemberById(user_id));
      if (result?.error?.message) {
        console.log("Error deleteing admin: ", result.error.message);
      } else {
        console.log("Successfully deleteing admin: ");
      }
      redirect("/pages/store-setting");
    });
  };
  return (
    <>
      <button
        onClick={() => document.getElementById("confirmModal")?.showModal()}
        className="btn btn-secondary"
      >
        <AiFillDelete />
      </button>
      <dialog id="confirmModal" className="modal modal-bottom sm:modal-middle">
        <div className="modal-box">
          <h1 className="font-bold text-2xl mb-5">
            Are you sure you want to delete?
          </h1>
          {isPending && (
            <span className="loading loading-spinner text-primary"></span>
          )}
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button onClick={onSubmit} className="btn btn-primary">
                Confirm
              </button>
              <span className="m-1"></span>
              <button className="btn">Cancel</button>
            </form>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default DeleteAdmin;
