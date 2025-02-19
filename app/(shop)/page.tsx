"use client";

import Image from "next/image";
import { riceBold, riceMedium } from "./layout";

import { Search } from "lucide-react";
import Link from "next/link";
import "regenerator-runtime/runtime";
import { useEffect, useState } from "react";
import "regenerator-runtime/runtime";

import SpeechRecognition, {
  useSpeechRecognition
} from "react-speech-recognition";
import { useRouter } from "next/navigation";
import { books } from "@/lib/utils";

export default function Home() {
  const cats = ["All", "Health", "Motivation", "Lifestyle"];

  const [selected, setSelected] = useState("all");

  const [regNumber, setRegNumber] = useState("");
  const [passcode, setPasscode] = useState("");

  const route = useRouter();

  const [isPaused, setIsPaused] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [utterance, setUtterance] = useState<any>("");
  const [target, setTarget] = useState("none");

  const readListByCategory = (filter: string) => {
    const healthBooks = books.filter(
      (book) => book.category.toLowerCase() == filter.toLowerCase()
    );

    if (healthBooks.length === 0) {
      console.log("There are no books in the '' category.");
      return "There are no books in the this category.";
    }

    let result = `There ${healthBooks.length === 1 ? "is" : "are"} ${
      healthBooks.length
    } book${healthBooks.length === 1 ? "" : "s"} in the ${filter} category: `;

    result += healthBooks
      .map((book, index) => `${index + 1}. ${book.title}`)
      .join(", ");

    return result;
  };

  const readAllBooks = () => {
    if (books.length === 0) {
      console.log("There are no books in the '' category.");
      return "There are no books in the this category.";
    }

    let result = `There ${books.length === 1 ? "is" : "are"} ${
      books.length
    } book${books.length === 1 ? "" : "s"} available: They are.  `;

    result += books
      .map((book, index) => `${index + 1}. ${book.title}`)
      .join(", ");

    return result;
  };

  const dynamicCommands = books.map((book) => ({
    command: `read ${book.title}`.toLowerCase(),
    callback: () => {
      resetTranscript();
      say({ text: "Ok" });
      route.push(`/product/${book.id}`);
    }
  }));

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
      command: "types of books",
      callback: () =>
        say({
          text: "There are 3 categories of books for you to enjoy. Health, Motivation and Lifestyle"
        })
    },
    {
      command: "category of books",
      callback: () =>
        say({
          text: "There are 3 categories of books for you to enjoy. Health, Motivation and Lifestyle"
        })
    },
    {
      command: "categories of books",
      callback: () =>
        say({
          text: "There are 3 categories of books for you to enjoy. Health, Motivation and Lifestyle"
        })
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
      command: "health books",
      callback: () => {
        resetTranscript();

        setRegNumber("");

        setSelected("health");
        say({ text: readListByCategory("Health") });
      }
    },
    {
      command: "motivation books",
      callback: () => {
        resetTranscript();

        setRegNumber("");

        setSelected("motivation");
        say({ text: readListByCategory("Motivation") });
      }
    },
    {
      command: "motivational books",
      callback: () => {
        resetTranscript();

        setRegNumber("");

        setSelected("motivation");
        say({ text: readListByCategory("Motivation") });
      }
    },
    {
      command: "life books",
      callback: () => {
        resetTranscript();

        setRegNumber("");

        setSelected("lifestyle");
        say({ text: readListByCategory("lifestyle") });
      }
    },
    {
      command: "show life style",
      callback: () => {
        resetTranscript();

        setRegNumber("");

        setSelected("lifestyle");
        say({ text: readListByCategory("lifestyle") });
      }
    },
    {
      command: "show lifestyle",
      callback: () => {
        resetTranscript();

        setRegNumber("");

        setSelected("lifestyle");
        say({ text: readListByCategory("lifestyle") });
      }
    },
    {
      command: "all books",
      callback: () => {
        resetTranscript();

        setRegNumber("");

        setSelected("all");
        say({ text: readAllBooks() });
      }
    },

    {
      command: "submit",
      callback: async () => {
        await setText("Form submitted");
        await handlePlay("");
        route.push(`/`);
      }
    },
    ...dynamicCommands
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
      text: "Welcome to Homepage. There are 3 categories of books for you to enjoy. Health, Motivation and Lifestyle"
    });
  }, []);

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
    <div className=" w-[90%] mx-auto min-h-screen space-x-10 ">
      <div className=" w-full">
        <div className=" space-y-4">
          <p className=" tracking-widest">
            {" "}
            <span className=" text-gray-400 text-sm">Home</span> / Products
          </p>
          <h1
            className={`${riceBold.className} antialiased capitalize text-3xl`}
          >
            PRODUCTS
          </h1>
          <div className=" w-full flex justify-between">
            <div className=" px-6 flex items-center w-[40%] h-[50px] bg-[#D9D9D9]">
              <div className=" w-full flex items-center justify-between">
                <div className=" flex items-center w-[90%] space-x-4">
                  <Search />
                  <input
                    type="text"
                    className=" w-[80%] bg-transparent border-none outline-none"
                  />
                </div>
                <p className=" text-gray-500 text-sm tracking-widest">Search</p>
              </div>
            </div>

            <div className=" w-[55%]">
              <div className=" w-full flex flex-wrap basis-2 gap-x-5 space-y-[1px]">
                {cats.map((item, index) => {
                  return (
                    <button
                      onClick={() => setSelected(item.toLowerCase())}
                      key={index}
                      className={` w-fit px-10 h-[50px] uppercase flex items-center justify-center text-base  ${
                        item.toLowerCase() != selected
                          ? "text-gray-400 border-2 border-gray-400"
                          : "text-white border-2 border-black bg-black"
                      } `}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div className=" pt-10 grid grid-cols-4 gap-x-10 gap-y-10">
            {selected == "all"
              ? books.map((item, index) => {
                  return (
                    <ProductCard
                      key={index}
                      image={item.image}
                      cat={item.author}
                      price={item.datePublished}
                      title={item.title}
                    />
                  );
                })
              : books
                  .filter((book) => book.category.toLowerCase() == selected)
                  .map((item, index) => {
                    return (
                      <ProductCard
                        key={index}
                        image={item.image}
                        cat={item.author}
                        price={item.datePublished}
                        title={item.title}
                      />
                    );
                  })}
          </div>
          <div className=" text-black">
            <div>{interimTranscript}</div>
            <div>{finalTranscript}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

const ProductCard = ({
  image,
  cat,
  title,
  price
}: {
  image: string;
  cat: string;
  title: string;
  price: string;
}) => {
  return (
    <Link href={"/product/1"} className=" w-full">
      <div
        className=" w-full
    
               h-96 bg-pill/10 border-2 border-gray-300 relative overflow-hidden  cursor-pointer group"
      >
        <Image
          src={`/store/${image}`}
          alt=""
          fill
          className=" group-hover:scale-105 object-cover object-center transition-all duration-200 ease-out  "
        />
      </div>
      <div className=" mt-4 space-y-1">
        <h3 className=" text-sm tracking-wider text-gray-500">{cat}</h3>
        <div className=" w-full flex items-center justify-between">
          <h1 className={`${riceMedium.className} antialiased tracking-widest`}>
            {title}
          </h1>
          <p className={`${riceMedium.className} antialiased tracking-widest`}>
            {price}
          </p>
        </div>
      </div>
    </Link>
  );
};
