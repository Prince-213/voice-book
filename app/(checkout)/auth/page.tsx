"use client";

import { Divider } from "@/components/ui/divider";
import { Text, TextLink } from "@/components/text";

import "regenerator-runtime/runtime";
import Image from "next/image";

import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition";

import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

export default function Home() {
  const [regNumber, setRegNumber] = useState("");
  const [passcode, setPasscode] = useState("");

  const route = useRouter();

  const [isPaused, setIsPaused] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [utterance, setUtterance] = useState<any>("");
  const [target, setTarget] = useState("none");

  const commands = [
    {
      command: "reset",
      callback: () => resetTranscript()
    },
    {
      command: "are you listening",
      callback: () => say({ text: "Yes i am listening" })
    },
    {
      command: "shut up",
      callback: () => say({ text: "I was mot talking" })
    },
    {
      command: "hello",
      callback: () => {
        say({
          text: "Hi there! I am your assistant. Kindly say set name and call your username, and say set password and say your password. When you are done say submit."
        });
      }
    },

    {
      command: "get started",
      callback: () => getStarted()
    },
    {
      command: "my username",
      callback: () => {
        say({ text: "call" });
        resetTranscript();
        setPasscode("");
        handlePlay("");
        setTarget("reg");
      }
    },
    {
      command: "my password",
      callback: () => {
        say({ text: "call " });
        resetTranscript();
        setPasscode("");
        handlePlay("");
        setTarget("pass");
      }
    },
    {
      command: "submit",
      callback: async () => {
        await setText("Form submitted");
        await handlePlay("");
        route.push(`/`);
      }
    }
  ];

  const say = ({ text }: { text: string }) => {
    const synth = window.speechSynthesis;

    const utterance = new SpeechSynthesisUtterance(text);

    // Speak the greeting when the page is opened
    synth.speak(utterance);
  };

  useEffect(() => {
    listenContinuously();
  }, []);

  const {
    transcript,
    interimTranscript,
    finalTranscript,
    resetTranscript,
    listening
  } = useSpeechRecognition({ commands });

  const [message, setMessage] = useState("");

  const [text, setText] = useState("");

  const handlePlay = async (speech: string) => {
    console.log(speech);
    const synth = window.speechSynthesis;

    if (isPaused) {
      synth.resume();
    }

    synth.speak(utterance);

    setIsPaused(true);
  };

  const getStarted = async () => {
    await handlePlay("");
  };

  useEffect(() => {
    if (target == "reg") {
      setRegNumber(finalTranscript.toLowerCase());
      console.log(interimTranscript);
    } else if (target == "pass") {
      setPasscode(finalTranscript.toLowerCase());
      console.log(interimTranscript);
    }
  }, [finalTranscript, interimTranscript, target]);

  useEffect(() => {
    const synth = window.speechSynthesis;
    const u = new SpeechSynthesisUtterance(text);

    setUtterance(u);

    return () => {
      synth.cancel();
    };
  }, [text]);

  useEffect(() => {
    if (finalTranscript !== "") {
      console.log("Got final result:", finalTranscript);
      console.log("Got interim result:", interimTranscript);
    }
  }, [interimTranscript, finalTranscript]);
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    return null;
  }

  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    console.log(
      "Your browser does not support speech recognition software! Try Chrome desktop, maybe?"
    );
  }
  const listenContinuously = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: "en-GB"
    });
  };
  return (
    <main className="min-h-screen">
      <div className="h-screen">
        <div className="w-[60%] mx-auto h-screen flex flex-col items-center">
          {/* Header */}
          <div className="flex w-full p-8 justify-end items-center">
            <div className=" space-y-5">
              <Image
                src={"/asset/Group 53.png"}
                alt=""
                width={80}
                height={80}
              />
              <p>Listening....</p>
            </div>
          </div>

          {/* Body */}
          <div className="mt-8">
            <h1 className={"text-3xl text-center font-light"}>
              Welcome to Ebook Service
            </h1>
            <Text className="text-center mt-1" textSize="text-sm">
              Say your username and password to continue...
            </Text>
          </div>

          <div className="w-1/2 flex flex-col justify-center mt-6">
            <form action="" className=" space-y-6">
              <input
                type="text"
                className=" w-full h-[50px] border-2 bg-transparent outline-none border-gray-300 px-4 py-2 "
                placeholder="First Name"
                defaultValue={"Say your username"}
                value={regNumber.replace("call", "")}
              />
              <input
                type="password"
                className=" w-full h-[50px] border-2 bg-transparent outline-none border-gray-300 px-4 py-2 "
                placeholder="First Name"
                defaultValue={"say your password"}
                value={passcode.replace("call", "")}
              />
              <button
                onClick={() => route.push("/")}
                className=" bg-black text-white w-full py-5"
              >
                Say Submit
              </button>
            </form>
            <TextLink href={"/"} className="text-sm text-center my-4">
              How to use
            </TextLink>
            <Divider className="my-2" />

            <div className=" text-black">
              <div>
                <span>listening: {listening ? "on" : "off"}</span>
                <div>
                  <button type="button" onClick={resetTranscript}>
                    Reset
                  </button>
                  <button type="button" onClick={listenContinuously}>
                    Listen
                  </button>
                  <button
                    type="button"
                    onClick={SpeechRecognition.stopListening}
                  >
                    Stop
                  </button>
                </div>
              </div>
              <div>{message}</div>
              <div>{target}</div>
              <div>
                <span>{transcript}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
