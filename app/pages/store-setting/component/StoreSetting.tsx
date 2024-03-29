"use client";

import React, { ChangeEvent, useEffect, useState, useTransition } from "react";
import { StoreProps } from "../page";
import { AiFillSave } from "react-icons/ai";
import { updateStoreData } from "../actions";
import { createSupabaseBrowserClient } from "@/lib/supabase/supabase-browser";
import { useRouter } from "next/navigation";

const StoreSetting = ({ data }: { data: StoreProps }) => {
  const [name, setName] = useState<string>(data.store_name);
  const [location, setLocation] = useState<string>(data.location);
  const [category, setCategory] = useState<string>(data.category);
  const [isPending, startTransition] = useTransition();

  const handleSaveStoreData = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    startTransition(async () => {
      const result = await updateStoreData({
        store_name: formData.get("name") as string,
        location: formData.get("location") as string,
        category: formData.get("category") as string,
      });
      console.log(JSON.parse(result));
      const { error } = JSON.parse(result);
      if (error?.message) window.alert(error.message);
      else console.log("Successfully add admin.");
    });
  };

  const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
    console.log();
  };
  const handleChangeLocation = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(event.target.value);
    console.log();
  };
  const handleChangeCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCategory(event.target.value);
    console.log();
  };
  return (
    <div className="grid flex-auto card rounded-box place-items-center">
      <form
        className="grid flex-auto card rounded-box place-items-center"
        onSubmit={handleSaveStoreData}
      >
        <h1 className="mt-2 text-2xl font-bold">{name}</h1>
        <div className="form-control w-52 mt-5">
          <label className="cursor-pointer label">
            <span className="label-text">OPEN</span>
            <input type="checkbox" className="toggle toggle-primary" />
          </label>
        </div>
        <h2 className="mt-7  font-bold">Store Name</h2>
        <input
          name="name"
          type="text"
          value={name}
          onChange={(event) => handleChangeName(event)}
          className="input input-bordered input-primary w-full max-w-xs"
        />
        <h2 className="mt-5 font-bold">Location</h2>
        <input
          // import location api
          name="location"
          type="text"
          value={location}
          onChange={(event) => handleChangeLocation(event)}
          className="input input-bordered input-primary w-full max-w-xs"
        />
        <h2 className="mt-5 font-bold">Category</h2>
        <input
          type="text"
          name="category"
          value={category}
          onChange={(event) => handleChangeCategory(event)}
          className="input input-bordered input-primary w-full max-w-xs"
        />
        <button type="submit" className="btn mr-5 flex m-5">
          {isPending && (
            <span className="loading loading-spinner text-white"></span>
          )}
          <AiFillSave />
          save
        </button>
      </form>
    </div>
  );
};

export default StoreSetting;
