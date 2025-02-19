import { Alert, AlertActions } from "@/components/alert";
import { delay, parseInterface } from "@rebatlabs/ui-funs";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/button";
import dayjs from "dayjs";
import { PasbyButton } from "@/components/branding/button";
import { requestToNextSever } from "@/actions/client";
import { PollEIDComponent } from "@finsel-dgi/pasby-react";

import { CreditCard, Loader2 } from 'lucide-react'

export function PSDDialog({
  onPaymentCompleted
}: {
  onPaymentCompleted: (paid: boolean) => void;
}) {
  const [initialise, setInitialise] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState<undefined | string>();
  const [identifier, setIdentifier] = useState<undefined | string>();
  const [lock, setLock] = useState<boolean>(false);

  const onOpen = async () => {
    setInitialise(true);
    setIsOpen(true);
    await delay(1200);
    setInitialise(false);
  };

  return (
    <>
      <button
        onClick={onOpen}
        className=" mt-10 bg-gray-300 px-6 py-5 flex items-center justify-between text-black w-[50%]"
      >
        <p>Pay Now</p>
        <CreditCard fontSize={32} />
      </button>
      <Alert open={isOpen} onClose={setIsOpen} size="sm" className=" w-fit">
        <AlertActions>
          <Button plain onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </AlertActions>
        {!identifier && (
          <>
            {initialise && (
              <div className=" w-fit h-full px-10 py-5 flex flex-col items-center justify-center space-y-5">
                <Image
                  src={"/asset/pngwing.com(10).png"}
                  alt=""
                  width={100}
                  height={100}
                />
                <div className=" w-fit h-fit animate-spin">
                  <Loader2 fontSize={32} />
                </div>
                <div className=" h-10"></div>
              </div>
            )}
            {!initialise && (
              <>
                {/* <Header /> */}
                <Body
                  onConfirmAction={(value) => {
                    setIdentifier(value);
                  }}
                  onError={(e) => {
                    setError(e);
                  }}
                />
                {error && <p className="text-sm text-red-800">{error}</p>}
              </>
            )}
          </>
        )}
        {identifier && (
          <>
            <PollEIDComponent
              lock={lock}
              identifier={identifier}
              pathToPollSever="/api/ping-eid"
              onSuccessful={async () => {
                setLock(true);
                setIsOpen(false);
                onPaymentCompleted(true);
              }}
              onCancelled={() => {
                setLock(true);
                setIdentifier(undefined);
                setIsOpen(false);
              }}
            />
          </>
        )}
      </Alert>
    </>
  );
}

function Body({
  onConfirmAction,
  onError
}: {
  onConfirmAction: (identifier: string) => void;
  onError: (error: string) => void;
}) {
  const date = dayjs(Date.now()).format("D.M.YYYY, H:M");
  const onConfirm = async () => {
    try {
      const res = await requestToNextSever("/confirm-with-pasby", {
        amount: "NGN 18,200",
        card: "424242******4242",
        date: date
      });
      const data = parseInterface(res) as { identifier: string };
      onConfirmAction(data.identifier);
    } catch (error) {
      onError((error as Error).message);
    }
  };

  return (
    <div className=" w-[30rem] bg-white min-h-[50vh] border-2 border-gray-300 relative">
      <div className=" px-10 py-12">
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
          <PasbyButton type="confirm" style="dark" onClick={onConfirm} />
        </div>
      </div>
    </div>
  );
}
