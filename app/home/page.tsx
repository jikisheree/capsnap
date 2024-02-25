import React, { useContext } from "react";
import HomeCard from "../components/HomeCard";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { menu } from "../components/SideBar";
import { useRouter } from "next/navigation";

export const revalidate = 0;

export default async function Index() {
  return (
    <>
      <div className="overflow-auto no-scrollbar h-screen flex flex-col">
        <div className="my-10 mx-10">
          <div className="flex">
            <img
              className="mask mask-squircle flex-initial"
              style={{ width: "200px", height: "150px" }}
              src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            />
            <h1 className="flex-initial ml-10 mt-7 text-5xl bg-clip-text font-bold">
              Welcome,
              <br></br>
              to SHOP NAME
            </h1>
          </div>
          <HomeCard menu={menu} className="carousel-item" />
        </div>
      </div>
    </>
  );
}
