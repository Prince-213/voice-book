"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useStore } from "@/lib/store";

import { SquareMenu, Heart, ShoppingBag, User } from "lucide-react";

const Header = () => {
  const { toggleCart } = useStore();

  return (
    <div className=" w-[90%] mx-auto mb-[70px] flex items-center justify-between">
      <div className=" flex space-x-[33px] items-center ">
        <SquareMenu size={32} />
        <Link href={"/"}>Home</Link>
        <Link href={"/"}>Collections</Link>
        <Link href={"/"}>New</Link>
      </div>
      <div className=" space-y-5">
        <Image src={"/asset/Group 53.png"} alt="" width={80} height={80} />
        <p>Listening....</p>
      </div>
      <div className=" flex space-x-[50px]">
        <div className=" w-[50px] h-[50px] bg-black flex items-center justify-center rounded-[50%] ">
          <div className=" -rotate-45">
            <Heart color="white" size={26} />
          </div>
        </div>

        <Link
          href={"/auth"}
          className=" w-[50px] h-[50px] bg-black flex items-center justify-center rounded-[50%] "
        >
          <div className=" ">
            <User color="white" size={26} />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;
