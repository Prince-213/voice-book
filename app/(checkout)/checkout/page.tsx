import Image from "next/image";
import React from "react";
import Link from "next/link";

import { getEID } from "@/session/getEID";
import { CheckoutElement } from "./checkElement";

const Page = async () => {
  const eid = await getEID();

  /* if (!eid) redirect("/");
 */
  return (
    <div className=" w-full min-h-screen pb-20  relative">
      {/* {pay && (
        <div className=" w-full h-full absolute bg-gray-200/40 backdrop-blur-sm top-0 left-0 z-50 flex items-center justify-center">
          <PayCard setPay={setPay} />
        </div>
      )} */}

      <div className=" w-[90%] pt-[60px] mx-auto ">
        <Link href={"/"}>
          <Image
            src={"/asset/longarrow.png"}
            width={70}
            height={70}
            alt=""
            className=" "
          />
        </Link>

        <CheckoutElement eid={eid} />
      </div>
    </div>
  );
};

export default Page;
