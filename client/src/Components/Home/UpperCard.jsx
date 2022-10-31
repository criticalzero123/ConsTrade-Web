import React from "react";

import { BsPencilSquare, BsPlayCircle } from "react-icons/bs";

import upper from "../../Assets/Images/LandingPage/upper.png";
import { Link } from "react-router-dom";

const UpperCard = () => {
  return (
    <div>
      <section className="grid lg:grid-cols-4  h-[40vh] sm:h-[27vh] rounded-2xl md:overflow-hidden">
        <div className="lg:col-span-2 bg-gradient-to-r from-[#B1DBE0]  to-[#F9D5F2] rounded-2xl lg:rounded-none">
          <div className="w-full  px-5 lg:px-14 py-5 ">
            <h1 className="font-poppins text-3xl font-semibold">
              One Stop{" "}
              <span
                className="bg-clip-text font-semibold  text-transparent bg-gradient-to-r from-[#3D4BA9] via-purple-500 to-[#EE661C]
                    "
              >
                Trade
              </span>{" "}
              Platform
            </h1>
            <div className="mt-5 font-poppins text-gray-600">
              <h3>Discover Various of Console Games</h3>
              <h3>Post, Trade and collect yours now!</h3>
            </div>
            <div className="flex flex-wrap  sm:mt-10 place-items-end">
              <Link
                to="/product/add"
                className="py-3 px-6 mt-5 sm:mt-0 bg-gray-100 mr-6 h-fit rounded-lg flex place-items-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white  font-poppins
                      hover:text-orange-300"
              >
                <BsPencilSquare className="mr-2" />
                Start Posting
              </Link>
              <button className="py-3 mt-5 sm:mt-0 px-6   h-fit rounded-lg flex place-items-center bg-[#051632] text-white  font-poppins hover:text-orange-400">
                <BsPlayCircle className="mr-2" />
                Learn How
              </button>
            </div>
          </div>
        </div>
        <div className="hidden lg:col-span-2 lg:block h-full ">
          <img src={upper} alt="uppercover" className="h-full object-fit" />
        </div>
      </section>
    </div>
  );
};

export default UpperCard;
