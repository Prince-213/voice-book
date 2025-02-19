"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle
} from "@headlessui/react";



import { useStore } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";

import { X } from 'lucide-react'

const products = [
  {
    id: 1,
    name: "Throwback Hip Bag",
    href: "#",
    color: "Salmon",
    price: "$90.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-01.jpg",
    imageAlt:
      "Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
  },
  {
    id: 2,
    name: "Medium Stuff Satchel",
    href: "#",
    color: "Blue",
    price: "$32.00",
    quantity: 1,
    imageSrc:
      "https://tailwindui.com/plus/img/ecommerce-images/shopping-cart-page-04-product-02.jpg",
    imageAlt:
      "Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch."
  }
  // More products...
];

export default function Cart() {
  const { open, toggleCart } = useStore();

  return (
    <Dialog open={open} onClose={toggleCart} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
      />

      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <DialogTitle className="text-lg font-medium text-gray-900 tracking-widest">
                      Shopping cart
                    </DialogTitle>
                    <div className="ml-3 flex h-7 items-center">
                      <button
                        type="button"
                        onClick={toggleCart}
                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Close panel</span>
                        <X fontSize={24} />
                      </button>
                    </div>
                  </div>

                  <div className="mt-8">
                    <div className="flow-root">
                      <ul
                        role="list"
                        className="-my-6 divide-y divide-gray-200 grid grid-cols-1 gap-5"
                      >
                        {products.map((product, index) => (
                          <div
                            key={index}
                            className=" w-full h-fit flex space-x-4 pt-5"
                          >
                            <div className=" w-[30%] h-[8rem] bg-pill/10 border-2 border-gray-300 relative">
                              <Image
                                src={`/store/pngwing.com (39).png`}
                                alt=""
                                fill
                                className=" group-hover:scale-105 object-center object-cover transition-all duration-200 ease-out  "
                              />
                            </div>
                            <div className=" py-4 w-[70%] h-[8rem] flex flex-col text-sm justify-between  ">
                              <div className=" w-full flex items-start  justify-between">
                                <div className=" space-y-2 ">
                                  <h1 className=" tracking-wider">
                                    Basic Heavy Tshirt
                                  </h1>
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
                                <p className=" tracking-wider text-sm">
                                  {" ( 1 ) "}
                                </p>
                                <p className=" tracking-wider text-sm">
                                  33,000
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>$262.00</p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <Link
                      href="/checkout"
                      className="flex items-center justify-center rounded-md border border-transparent bg-black px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-700"
                    >
                      Checkout
                    </Link>
                  </div>
                  <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                    <p>
                      or{" "}
                      <button
                        type="button"
                        onClick={toggleCart}
                        className="font-medium text-gray-800 hover:text-black"
                      >
                        Continue Shopping
                        <span aria-hidden="true"> &rarr;</span>
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
