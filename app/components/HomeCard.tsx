"use client";

import React from "react";
import { MenuProps } from "./SideBar";
import Link from "next/link";

const HomeCard = ({
  className,
  menu = [],
}: {
  menu: MenuProps[];
  className?: string;
}) => {
  return (
    <div className="flex justify-center">
      <div className="my-10 gap-6 carousel carousel-center w-2/3 p-3 space-x-4 bg-neutral rounded-box">
        {menu.map((item: MenuProps, index: number) => (
          <Link
            key={index}
            href={item.path}
            className={`card w-48 bg-base-100 shadow-xl ${className}`}
          >
            <figure>
              <img
                style={{ width: "300px", height: "250px" }}
                src={item.image}
                alt="Shoes"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{item.title}</h2>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomeCard;
