import React, { useEffect, useState } from "react";
import images from "../../utils/images";
import { Outlet } from "react-router-dom";
import Button from "../core/Button";
import { Icon } from "@iconify/react/dist/iconify.js";

const quotes = [
  {
    body: "The best way to predict the future is to create it.",
    author: "Peter Drucker",
    date: "2003",
  },
  {
    body: "The only limit to our realization of tomorrow is our doubts of today.",
    author: "Franklin D. Roosevelt",
    date: "1945",
  },
  {
    body: "Do not wait to strike till the iron is hot, but make it hot by striking.",
    author: "William Butler Yeats",
    date: "1893",
  },
];

const AuthLayout = () => {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleNext = () => {
    setCurrentQuoteIndex((prevIndex) => (prevIndex + 1) % quotes.length);
  };

  const handleBack = () => {
    setCurrentQuoteIndex(
      (prevIndex) => (prevIndex - 1 + quotes.length) % quotes.length
    );
  };

  const { body, author, date } = quotes[currentQuoteIndex];
  return (
    <div className="h-screen w-screen !overflow-hidden">
      <div className="absolute">
        <img src={images.ilead} className="h-16" alt="" />
      </div>
      <div className="absolute top-0 h-0">
        <div className="grid grid-cols-2 items-center  h-screen ">
          <div className="">
            <Outlet />
          </div>
          <div className=" text-left px-20 rounded-lg ">
            <div className="mb-2 text-5xl italic relative">
              <div className="absolute bottom-[110%] ">
                <img src={images.Quote} alt="" />
              </div>
              {body}
            </div>
            <div className="flex items-center justify-between">
              <div className="text-sm">
                - {author}, {date}
              </div>
              <div className="flex justify-end gap-5">
                <button
                  onClick={handleBack}
                  className="p-2 rounded-full bg-white"
                >
                  <Icon icon={"ph:arrow-left-bold"} />
                </button>
                <button
                  className="p-2 rounded-full bg-white"
                  onClick={handleNext}
                >
                  <Icon icon={"ph:arrow-right-bold"} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img src={images.authBg} className="object-cover w-screen" alt="" />
    </div>
  );
};

export default AuthLayout;
