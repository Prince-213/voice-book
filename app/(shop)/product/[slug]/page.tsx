"use client";

import { riceMedium } from "@/app/(shop)/layout";
import Image from "next/image";
import React from "react";

import { Heart } from "lucide-react";
import "regenerator-runtime/runtime";
import { useEffect, useState } from "react";
import "regenerator-runtime/runtime";

import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition";
import { books } from "@/lib/utils";

const Page = ({ params }: { params: { slug: string } }) => {
  const bookToRead = books.find((item) => item.id == params.slug);

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
          text: "Hi there! I am your assistant."
        });
      }
    },

    {
      command: "get started",
      callback: () => getStarted()
    }
  ];

  const say = ({ text }: { text: string }) => {
    const synth = window.speechSynthesis;

    const utterance = new SpeechSynthesisUtterance(text);

    // Speak the greeting when the page is opened
    synth.speak(utterance);
  };
  const [isPaused, setIsPaused] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [utterance, setUtterance] = useState<any>("");
  useEffect(() => {
    listenContinuously();
  }, []);

  const { interimTranscript, finalTranscript, resetTranscript } =
    useSpeechRecognition({ commands });

  const [text, setText] = useState(
    "hello there i'll be your visual assistant. Provide the necessary information to get started"
  );

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
    say({
      text: `Welcome to this book titled ${bookToRead?.title} by ${bookToRead?.author}.   Introduction. ${bookToRead?.introduction}. First Chapter ${bookToRead?.firstChapter}. ${bookToRead?.firstChapterBrief}`
    });
  }, []);

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
    <div className=" pt-[5vh]">
      <div className=" w-[65%] flex items-center justify-between mx-auto">
        <div
          className=" w-[50%]
    
               h-[60vh]  cursor-pointer "
        >
          <div className=" w-[80%] relative h-full bg-pill/10 border-2 border-gray-300 group overflow-hidden">
            <Image
              src={`/store/${bookToRead?.image}`}
              alt=""
              fill
              className=" group-hover:scale-105 object-center object-cover transition-all duration-200 ease-out  "
            />
          </div>
        </div>

        <div className=" w-[35%] border-2 border-gray-300/60 px-12 py-14 relative ">
          <div className=" w-[34px] h-[34px] flex items-center justify-center bg-white absolute top-0 right-0">
            <Heart size={18} />
          </div>
          <h1
            className={`${riceMedium.className} antialiased text-xl uppercase tracking-widest`}
          >
            {bookToRead?.title}
          </h1>
          <p className={`${riceMedium.className} tracking-widest mt-3 mb-6`}>
            {bookToRead?.author}
          </p>
          <div>
            <p
              className={` text-gray-500 ${riceMedium.className} tracking-widest text-sm`}
            >
              Introduction
            </p>

            <p
              className={`${riceMedium.className} tracking-widest text-sm mt-[20px] mb-[30px]`}
            >
              {bookToRead?.introduction}
            </p>
          </div>

          <div>
            <p
              className={` text-gray-500 ${riceMedium.className} tracking-widest text-sm`}
            >
              Chapter 1 : {bookToRead?.firstChapter}
            </p>

            <p
              className={`${riceMedium.className} tracking-widest text-sm mt-[20px] mb-[30px]`}
            >
              {bookToRead?.firstChapterBrief}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
