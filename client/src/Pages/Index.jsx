import React from "react";
import { useEffect } from "react";
import { isUserLoggedIn } from "../service/userService";

import pic1 from "../Assets/LandingPage/pic1.png";
import pic2 from "../Assets/LandingPage/pic2.png";
import pic3 from "../Assets/LandingPage/pic3.png";
import pic4 from "../Assets/LandingPage/pic4.png";
import flash from "../Assets/LandingPage/flash.png";
import ellipse3 from "../Assets/LandingPage/ellipse3.png";
import ellipse6 from "../Assets/LandingPage/ellipse6.png";
import ellipse2 from "../Assets/LandingPage/Ellipse2.gif";

const Index = () => {
  useEffect(() => {
    if (isUserLoggedIn()) window.location.href = "/home";
  }, []);
  return (
    <div className="container -px-4 bg-white">
      <section className="item-cards ">
        <img
          src={ellipse2}
          alt="ellipse2"
          className="z-20 w-52 absolute  -right-32 sm:-right-20 lg:-left-20 top-1/3 sm:top-1/2 rounded-full"
        />
        <img
          src={ellipse6}
          alt="ellipse"
          className=" z-20 w-12 absolute animate-ping right-24 top-30"
        />
        <img
          src={ellipse3}
          alt="ellipse"
          className=" z-20 w-12 absolute animate-ping right-1/2 top-3/4"
        />
        <img
          src={ellipse6}
          alt="ellipse"
          className=" z-20 w-12 absolute animate-ping left-48 top-40"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="mt-10 p-8 lg:mt-0 lg:p-18 xl:p-32">
            <p className="text-4xl  text-[#202937] font-bold">
              ENJOY EVERY
              <span className="text-4xl ml-4 font-bold text-orange-400">
                GAME.
              </span>{" "}
            </p>
            <div className="flex">
              <p className="text-4xl text-[#202937] font-bold">EVERY </p>
              <p className="text-4xl ml-4 font-bold text-blue-400">MOMENT.</p>
            </div>
            <div>
              <p className="text-lg mt-4 mb-8 text-gray-400">
                We strongly believe that every game is important and should be
                cherish.
              </p>
            </div>
            <div>
              <p className="text-2xl mt-10 font-semibold text-orange-500 tracking-widest flex">
                HOT{" "}
                <img src={flash} className="w-6 animate-pulse" alt="flash" />
                ITEM{" "}
              </p>
              <img
                className="rounded-t-lg  w-1/2 lg:w-full"
                src={pic1}
                alt="pic1"
              />
            </div>
          </div>
          <div className="md:grid md:grid-rows-2 md:grid-flow-col">
            <div className="">
              <p className="mt-4 ml-7 text-2xl font-semibold  tracking-widest text-orange-500">
                TOP TRADED GAMES
              </p>

              <img className="rounded-t-lg w-full" src={pic1} alt="pic2" />

              <div className="w-72 ml-11 text-justify">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 hover:underline hover:decoration-pink-500/70 transition delay-200 cursor-pointer">
                  HALO
                </h5>

                <div className="flex">
                  <p className="mb-3 font-normal text-lg text-gray-700 dark:text-gray-400">
                    Here are the biggest enterprise technology acquisitions of
                    2021 so far, in reverse chronological order.
                  </p>
                </div>
              </div>
            </div>
            <div className="">
              <img className="rounded-t-lg  w-full" src={pic2} alt="pic3" />

              <div className="w-72 ml-11 text-justify">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 hover:underline hover:decoration-pink-500/70 transition delay-200 cursor-pointer">
                  NBA2K20
                </h5>

                <div className="flex">
                  <p className="mb-3 font-normal text-lg text-gray-700 dark:text-gray-400">
                    Here are the biggest enterprise technology acquisitions of
                    2021 so far, in reverse chronological order.
                  </p>
                </div>
              </div>
            </div>
            <div className="max-w-sm  dark:border-gray-700">
              <img className="rounded-t-lg  w-full" src={pic3} alt="pic3" />

              <div className="w-72 ml-11 text-justify">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 hover:underline hover:decoration-pink-500/70 transition delay-200 cursor-pointer">
                  GTA 5
                </h5>

                <div className="flex">
                  <p className="mb-3 font-normal text-lg text-gray-700 dark:text-gray-400">
                    Here are the biggest enterprise technology acquisitions of
                    2021 so far, in reverse chronological order.
                  </p>
                </div>
              </div>
            </div>
            <div className="">
              <img className="rounded-t-lg  w-full" src={pic4} alt="pic4" />

              <div className="w-72 ml-11 text-justify">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 hover:underline hover:decoration-pink-500/70 transition delay-200 cursor-pointer">
                  FIFA20
                </h5>

                <div className="flex md:shrink-0">
                  <p className="mb-3 font-normal text-lg text-gray-700 dark:text-gray-400">
                    Here are the biggest enterprise technology acquisitions of
                    2021 so far, in reverse chronological order.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
