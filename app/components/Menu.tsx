import React from "react";
import { MenuProps } from "@/app/components/SideBar";
import Link from "next/link";

const Menu = ({ menu = [] }: { menu: MenuProps[] }) => {
  return (
    <div className="grid grid-cols-2 gap-2">
      {menu.map((item: MenuProps, index: number) => (
        <Link key={index} href={item.path}>
          <div
            key={index}
            className="card w-32 bg-gradient-to-b from-orange-300 to-yellow-200 from-30% hover:to-amber-500"
          >
            <div className="card-body">
              {item.icon}
              {item.title}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Menu;
