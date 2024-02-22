import React from "react";

const page = () => {
  return (
    <>
      <div className="overflow-auto no-scrollbar h-screen flex flex-col bg-gradient-to-t from-indigo-500 from-30%">
        <h1 className="p-2 ml-10 mt-7 text-5xl bg-gradient-to-r from-white to-cyan-400 text-transparent bg-clip-text font-bold">
          Account Settings
        </h1>
        <div className=" grid place-items-center">
          <div className="avatar">
            <div className="w-48 mask mask-squircle">
              <img src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
            </div>
          </div>

          <h1 className="mt-2 text-2xl font-bold">USERNAME</h1>
          <div className="form-control w-52 mt-5">
            <label className="cursor-pointer label">
              <span className="label-text">OPEN</span>
              <input
                type="checkbox"
                className="toggle toggle-primary"
                checked
              />
            </label>
          </div>
          <input
            type="text"
            placeholder="Shop Name"
            className="mt-7 input input-bordered input-primary w-full max-w-xs"
          />
          <input
            type="text"
            placeholder="Location"
            className="mt-5 input input-bordered input-primary w-full max-w-xs"
          />
          <input
            type="email"
            placeholder="Email Address"
            className="mt-5 input input-bordered input-primary w-full max-w-xs"
          />
        </div>
      </div>
    </>
  );
};

export default page;
