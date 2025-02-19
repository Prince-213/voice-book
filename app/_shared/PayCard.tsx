"use client";

import { motion } from "framer-motion";
import React, { Dispatch, SetStateAction } from "react";
import { BiLoader } from "react-icons/bi";
import Image from "next/image";
import { PasbyButton } from "@/components/branding/button";

const PayCard = ({ setPay }: { setPay: Dispatch<SetStateAction<boolean>> }) => {
  return (
    <div className=" w-[30%] bg-white min-h-[50vh] border-2 border-gray-300 relative">
      <motion.div
        animate={{ display: "none" }}
        transition={{ delay: 2 }}
        className=" w-full h-full flex flex-col items-center justify-center space-y-5"
      >
        <Image
          src={"/asset/pngwing.com(10).png"}
          alt=""
          width={100}
          height={100}
        />
        <div className=" w-fit h-fit animate-spin">
          <BiLoader size={32} />
        </div>
      </motion.div>
      <motion.div
        initial={{ display: "none" }}
        animate={{ display: "block" }}
        transition={{ delay: 2 }}
        className=" px-10 py-12"
      >
        <h1 className=" text-2xl ">Confirm your payment</h1>
        <p className=" text-gray-400">Quick and secure transactions</p>

        <div className=" px-5 py-7 bg-gray-100 mt-10 ">
          <h1 className=" text-lg">Details</h1>

          <div className=" mt-10 text-gray-500 space-y-3 border-b-2 border-b-gray-300 border-dotted pb-5 mb-5">
            <div className=" flex items-center justify-between w-full">
              <p>Date</p>
              <p>03-11-2024</p>
            </div>
            <div className=" flex items-center justify-between w-full">
              <p>Payment Method</p>
              <p>Visa</p>
            </div>
            <div className=" flex items-center justify-between w-full">
              <p>Card Number</p>
              <p>*** *** *** 244</p>
            </div>
            <div className=" flex items-center justify-between w-full">
              <p>Cardholder Name</p>
              <p>Odumodu Jack</p>
            </div>
            <div className=" flex items-center justify-between w-full">
              <p>Email</p>
              <p>odu@gmail.com</p>
            </div>
          </div>

          <div className=" w-full flex items-center justify-between">
            <p>Total</p>
            <p>33,000</p>
          </div>
        </div>

        <div className=" w-full justify-between flex items-center  mt-10">
          <button
            onClick={() => setPay(false)}
            className=" border-2 w-[45%] border-gray-300 px-4 py-3"
          >
            {" "}
            Cancel Payment{" "}
          </button>
          <PasbyButton type="confirm" style="dark" />
        </div>
      </motion.div>
    </div>
  );
};

export default PayCard;
