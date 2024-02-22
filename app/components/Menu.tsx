import React from "react";
import { MenuProps } from "@/app/components/SideBar";
import Link from "next/link";

const Menu = ({ menu = [] }: { menu: MenuProps[] }) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {menu.map((item: MenuProps, index: number) => (
        <div key={index} className="card w-28">
          <div className="card-body">
            <Link key={index} href={item.path}>
              {item.icon}
            </Link>
            {item.title}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Menu;
