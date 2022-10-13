import React from "react";
import { useEffect } from "react";
import { isUserLoggedIn } from "../service/userService";

import pic1 from "../Assets/LandingPage/pic1.png";
import pic2 from "../Assets/LandingPage/pic2.png";
import pic3 from "../Assets/LandingPage/pic3.png";
import pic4 from "../Assets/LandingPage/pic4.png";
import flash from "../Assets/LandingPage/flash.png";
import ellipse from "../Assets/LandingPage/ellipse.png";

const Index = () => {
  useEffect(() => {
    if (isUserLoggedIn()) window.location.href = "/home";
  }, []);
  return (
    <div className="container -px-4 bg-white">
      <section className="item-cards ">
        <div className="grid grid-cols-2">
          <img
            src={ellipse}
            alt="ellipse"
            className=" z-20 w-12 absolute animate-ping left-5 top-64"
          />
          <img
            src={ellipse}
            alt="ellipse"
            className=" z-20 w-10 absolute animate-ping right-24 top-30"
          />
          <img
            src={ellipse}
            alt="ellipse"
            className=" z-20 w-12 absolute animate-ping right-1/2 top-3/4"
          />
          {/* <!-- <img src="xbox.png" className=" z-20 w-12 absolute right-1/2 top-3/4"> --> */}
          <img
            src={ellipse}
            alt="ellipse"
            className=" z-20 w-6 absolute animate-ping left-48 top-30"
          />
          {/* <!-- <img src="ps4.png" className=" z-20 w-12 absolute left-5 top-64"> --> */}
          {/* <!-- <img src="play-station.png" className=" z-20 w-10 absolute right-24 top-30"> --> */}
          <div className="text-header p-32">
            <p className="text-4xl flex text-[#202937] font-bold">
              ENJOY EVERY{" "}
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
              <p className="text-2xl font-semibold text-orange-500 tracking-widest flex">
                HOT{" "}
                <img src={flash} className="w-6 animate-pulse" alt="flash" />
                ITEM{" "}
              </p>
              <img
                className="rounded-t-lg  w-16 md:w-32 lg:w-full"
                src={pic1}
                alt="pic1"
              />
            </div>
          </div>
          <div className="grid grid-rows-2 grid-flow-col">
            <div className="max-w-sm  dark:border-gray-700">
              <p className="mt-4 ml-7 text-2xl font-semibold  tracking-widest text-orange-500">
                TOP TRADED GAMES
              </p>

              <img
                className="rounded-t-lg w-16 md:w-32 lg:w-full"
                src={pic1}
                alt="pic2"
              />

              <div className="w-72 ml-11 text-justify">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
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
            <div className="max-w-sm dark:border-gray-700">
              <img
                className="rounded-t-lg  w-16 md:w-32 lg:w-full"
                src={pic2}
                alt="pic3"
              />

              <div className="w-72 ml-11 text-justify">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
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
              <img
                className="rounded-t-lg  w-16 md:w-32 lg:w-full"
                src={pic3}
                alt="pic3"
              />

              <div className="w-72 ml-11 text-justify">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
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
            <div className="max-w-sm dark:border-gray-700">
              <img
                className="rounded-t-lg  w-16 md:w-32 lg:w-full"
                src={pic4}
                alt="pic4"
              />

              <div className="w-72 ml-11 text-justify">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
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
