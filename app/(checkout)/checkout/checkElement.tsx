"use client";

import { User } from "@finsel-dgi/pasby-react";
import { getValueByQuery } from "@rebatlabs/ui-funs";
import { PSDDialog } from "@/app/_shared/psd2";
import { useState } from "react";
import { riceBold } from "../layout";
import Image from "next/image";
import { AuthenticationButton } from "@/components/branding/button";
import Link from "next/link";

export function CheckoutElement({ eid }: { eid?: User }) {
  const claims = eid?.claims;
  const [paid, setPaid] = useState(false);

  const onPaid = (val: boolean) => {
    if (!val) return;
    setPaid(true);
  };

  return (
    <div>
      {!paid && (
        <div className=" mt-[70px] w-full flex items-center justify-between">
          <div className=" w-[40%]">
            <h1
              className={`${riceBold.className} antialiased uppercase text-4xl mb-10 tracking-widest`}
            >
              checkout
            </h1>

            <AuthenticationButton
              style="dark"
              type="identify"
              className="lg:w-[60%] w-[90%]"
              returnPage="/checkout"
            />

            <form className=" space-y-10 mt-[30px]">
              <div>
                <h1 className=" mb-5 tracking-wider uppercase ">
                  contact information
                </h1>
                <div className=" space-y-4">
                  <input
                    type="email"
                    className=" w-full h-[50px] border-2 bg-transparent outline-none border-gray-300 px-4 py-2 "
                    placeholder="Email"
                    defaultValue={getValueByQuery(claims, "contact.email")}
                  />
                  <input
                    type="text"
                    className=" w-full h-[50px] border-2 bg-transparent outline-none border-gray-300 px-4 py-2 "
                    placeholder="Phone"
                    defaultValue={getValueByQuery(claims, "contact.phone")}
                  />
                </div>
              </div>
              <div>
                <h1 className=" mb-5 tracking-wider uppercase ">
                  shipping address
                </h1>
                <div className=" grid grid-cols-2 gap-5">
                  <input
                    type="text"
                    className=" w-full h-[50px] border-2 bg-transparent outline-none border-gray-300 px-4 py-2 "
                    placeholder="First Name"
                    defaultValue={getValueByQuery(claims, "naming.given")}
                  />
                  <input
                    type="text"
                    className=" w-full h-[50px] border-2 bg-transparent outline-none border-gray-300 px-4 py-2 "
                    placeholder="Last Name"
                    defaultValue={getValueByQuery(claims, "naming.family")}
                  />
                  <input
                    type="text"
                    className=" w-full h-[50px] border-2 col-span-2 bg-transparent outline-none border-gray-300 px-4 py-2 "
                    placeholder="Country"
                    defaultValue={getValueByQuery(claims, "address.country")}
                  />

                  <input
                    type="text"
                    className=" w-full h-[50px] border-2 col-span-2 bg-transparent outline-none border-gray-300 px-4 py-2 "
                    placeholder="Address"
                    defaultValue={getValueByQuery(claims, "address.place")}
                  />
                  <input
                    type="text"
                    className=" w-full h-[50px] border-2 bg-transparent outline-none border-gray-300 px-4 py-2 "
                    placeholder="City"
                    defaultValue={getValueByQuery(claims, "address.city")}
                  />
                  <input
                    type="text"
                    className=" w-full h-[50px] border-2 bg-transparent outline-none border-gray-300 px-4 py-2 "
                    placeholder="Postal Code"
                    defaultValue={getValueByQuery(claims, "address.postCode")}
                  />
                </div>
              </div>
            </form>
          </div>

          <div className=" w-[40%]">
            <div className=" w-full border-2 border-gray-300/60 px-10 py-14 relative ">
              <div className=" w-fit h-fit p-4 flex items-center justify-center bg-white absolute top-0 right-0">
                {"( 2 )"}
              </div>

              <h1 className=" tracking-widest uppercase">your order</h1>

              <div className=" mt-10">
                <div className=" w-full h-fit flex space-x-4">
                  <div className=" w-[25%] h-[10rem] bg-pill/10 border-2 border-gray-300 relative">
                    <Image
                      src={`/store/pngwing.com (39).png`}
                      alt=""
                      fill
                      className=" group-hover:scale-105 object-center object-cover transition-all duration-200 ease-out  "
                    />
                  </div>
                  <div className=" py-4 w-[75%] h-[10rem] flex flex-col justify-between  ">
                    <div className=" w-full flex items-start  justify-between">
                      <div className=" space-y-2">
                        <h1 className=" tracking-wider">Basic Heavy Tshirt</h1>
                        <h2 className=" text-gray-400 tracking-wide">
                          Black/L
                        </h2>
                      </div>
                      <button className=" underline tracking-wider">
                        Remove
                      </button>
                    </div>
                    <div
                      className=" flex items-center justify-between w-full
                  "
                    >
                      <p className=" tracking-wider text-sm">{" ( 1 ) "}</p>
                      <p className=" tracking-wider text-sm">33,000</p>
                    </div>
                  </div>
                </div>

                <div className=" py-5 space-y-2 my-10 border-t-2 border-b-2 border-dotted border-gray-400">
                  <div className=" w-full flex items-center justify-between">
                    <p>Subtotal</p>
                    <p className="tracking-wider">33,000</p>
                  </div>
                  <div className=" w-full flex items-center justify-between">
                    <p>Shipping</p>
                    <p className=" text-gray-500 tracking-wider">Free</p>
                  </div>
                </div>

                <div className=" w-full flex items-center justify-between">
                  <p>Total</p>
                  <p className=" tracking-wider">33,000</p>
                </div>
              </div>
            </div>

            <div className=" w-full flex justify-end">
              <PSDDialog onPaymentCompleted={onPaid} />
            </div>
          </div>
        </div>
      )}
      {paid && (
        <div className="flex flex-col justify-center items-center gap-2">
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
      )}
    </div>
  );
}
