import React from "react";
import { riceBold } from "../../layout";
import Link from "next/link";
import Image from "next/image";

const Page = () => {
  return (
    <div className=" w-full h-screen flex flex-col space-y-4 items-center justify-center">
      <Image
        src={"/asset/icons8-check-96.png"}
        alt=""
        width={100}
        height={100}
      />
      <h1
        className={`${riceBold.className} antialiased text-5xl tracking-wider`}
      >
        Payment Successful
      </h1>
      <p className=" text-lg text-gray-400">
        Your payment has been made successfully. Please continue.
      </p>
      <Link
        href={"/"}
        className=" border-2 w-fit text-xl border-gray-300 px-8 py-4"
      >
        {" "}
        Go to HomePage{" "}
      </Link>
    </div>
  );
};

export default Page;
