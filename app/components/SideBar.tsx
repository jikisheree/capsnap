import React from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import Menu from "./Menu";
import {
  AiFillControl,
  AiFillEdit,
  AiFillProfile,
  AiFillDashboard,
  AiOutlineTeam,
} from "react-icons/ai";
import { useAppContext } from "../context/supabase-context";
import Link from "next/link";

export interface MenuProps {
  icon: any;
  image: string;
  title: string;
  path: string;
}

export const menu: MenuProps[] = [
  {
    icon: <AiFillControl size={60} />,
    image:
      "https://images.unsplash.com/photo-1496147011889-39d4a64b76e3?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Store Setting",
    path: "/pages/store-setting",
  },
  {
    icon: <AiFillEdit size={60} />,
    image:
      "https://plus.unsplash.com/premium_photo-1661776608612-523ebf5a19d2?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Stock Manager",
    path: "/pages/stock-manager",
  },
  {
    icon: <AiFillProfile size={60} />,
    image:
      "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?q=80&w=1776&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Selling Report",
    path: "/pages/selling-report",
  },
  {
    icon: <AiFillDashboard size={60} />,
    image:
      "https://images.unsplash.com/photo-1553456558-aff63285bdd1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Purchase History",
    path: "/pages/purchase-history",
  },
  {
    icon: <AiOutlineTeam size={60} />,
    image:
      "https://images.unsplash.com/photo-1553456558-aff63285bdd1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    title: "Customers",
    path: "/pages/customers",
  },
];

export default function SideBar({ children }: { children: React.ReactNode }) {
  const { user } = useAppContext();

  return (
    <>
      <div className="drawer no-scrollbar">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <Navbar />
          {children}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="z-50 menu p-4 w-80 min-h-full bg-base-200 text-base-content">
            {/* Sidebar content here */}
            <li>
              <Link className="text-2xl font-bold" href="/home">
                SHOP NAME
              </Link>
            </li>
            <li className="flex">
              <div className="flex">
                <div className="flex-auto avatar placeholder">
                  <div className="bg-neutral text-neutral-content rounded-full w-12">
                    <span className="text-3xl">
                      {user?.user_metadata.first_name
                        ? user.user_metadata.first_name[0]
                        : undefined}
                    </span>
                  </div>
                </div>
                <h1 className="flex-auto text-center text-xl">
                  {user?.user_metadata.first_name}{" "}
                  {user?.user_metadata.last_name}
                </h1>
              </div>
            </li>
            <div className="mt-5">
              <Menu menu={menu} />
            </div>
          </ul>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}
