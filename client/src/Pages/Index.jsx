import React from "react";

import { Accordion } from "flowbite-react/lib/cjs/components/Accordion";
import header from "../Assets/Images/LandingPage/CONSTRADE.png";
import aboutus from "../Assets/Images/LandingPage/who_we_are.jpg";
import { BsFacebook } from "react-icons/bs";

const Index = () => {
  // useEffect(() => {
  //   if (isUserLoggedIn()) window.location.href = "/home";
  // }, []);
  return (
    <div className="container px-4">
      <section className="h-[93vh] bg-white grid md:grid-cols-2">
        <div className="flex place-items-center lg:block lg:mt-40">
          <div>
            <h1 className="font-poppins font-semibold text-[2.5rem] lg:text-[3.2rem] lg:pr-3 ">
              Buy, Sell, & Trade-in{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#3D4BA9] via-purple-500 to-[#EE661C]">
                Console Games.
              </span>
            </h1>

            <h3 className="text-gray-400 text-base mt-12 lg:text-xl border-l-2 border-l-[#3D4BA9] pl-2 pr-5">
              We strongly believe that every game is important and should be
              cherish.
            </h3>

            <button className="mt-5 py-3 px-6 rounded-lg border-2 border-[#1D257C] hover:bg-[#1D257C] text-[#1D257C] font-semibold font-poppins hover:text-white ">
              How it Works
            </button>
          </div>
        </div>
        <div className="flex place-items-center">
          <img src={header} alt="header" />
        </div>
      </section>

      <section className="h-screen bg-white">
        <h1 className="text-4xl text-gray-500 font-poppins text-center mt-24 lg:mt-0 lg:mb-24">
          About Us
        </h1>

        <div className="grid lg:grid-cols-2 ">
          <div className="flex place-items-center">
            <img src={aboutus} alt="aboutus" />
          </div>
          <div className="flex place-items-center">
            <div className="md:p-20 md:pt-0 pt-10">
              <h3 className="text-4xl font-poppins font-semibold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-[#3D4BA9] via-purple-500 to-[#EE661C]">
                Who We Are?
              </h3>
              <p className="text-gray-400">
                Constrade is a Lorem Ipsum is simply dummy text of the printing
                and typesetting industry. Lorem Ipsum has been the industry's
                standard dummy text ever since the 1500s, when an unknown
                printer took a galley of type and scrambled it to make a type
                specimen book.
              </p>
              <button className="mt-10 border-2 py-2 px-5 rounded-lg border-[#EE661C] hover:bg-[#EE661C] text-[#EE661C] hover:text-white">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="h-screen lg:h-[70vh] grid lg:grid-cols-2 place-content-center lg:place-content-start">
        <div>
          <h2 className="text-4xl font-poppins font-semibold mb-5 bg-clip-text text-transparent bg-gradient-to-r from-[#3D4BA9] via-purple-500 to-[#EE661C]">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-400 pr-16">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
          <button className="mt-10 py-3 px-5 border-2 rounded-lg border-[#1D257C] hover:bg-[#1D257C] text-[#1D257C] font-semibold font-poppins hover:text-white">
            Got more Questions?
          </button>
        </div>
        <div className="shadow-lg h-fit mt-16 lg:mt-0">
          <Accordion>
            <Accordion.Panel>
              <Accordion.Title>What is Console Games?</Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>What is Trade-in?</Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
            <Accordion.Panel>
              <Accordion.Title>What is the goal of ConsTrade?</Accordion.Title>
              <Accordion.Content>
                <p className="mb-2 text-gray-500 dark:text-gray-400">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
                <p className="text-gray-500 dark:text-gray-400">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </p>
              </Accordion.Content>
            </Accordion.Panel>
          </Accordion>
        </div>
      </section>

      <footer className="h-32 bg-[#3D4BA9] backdrop-blur-2xl shadow-lg grid lg:grid-cols-2">
        <div className="bg-[rgba(100%,100%,100%,90%)] py-5 lg:py-0 backdrop-blur-md w-full h-full flex items-center justify-center lg:border-r-2 lg:border-r-gray-300">
          <p
            className="text-lg lg:text-2xl font-poppins font-semibold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-[#af3e02] hover:cursor-pointer
           hover:to-purple-500 hover:from-[#af3e02]"
            onClick={() =>
              window.open(
                "mailto:constradeapplication22@gmail.com?subject=HELLO&body=Hi%20Constrades"
              )
            }
          >
            constradeapplication22@gmail.com
          </p>
        </div>
        <div className="bg-[rgba(100%,100%,100%,90%)] backdrop-blur-md w-full h-full flex items-center justify-center">
          <div>
            <div className="text-2xl font-poppins font-semibold flex place-items-center mb-5">
              Follow Us{" "}
              <span className="p-1 border ml-10 rounded-full border-black hover:border-orange-500">
                <BsFacebook
                  className=" cursor-pointer hover:text-orange-500 "
                  onClick={() =>
                    window.open(
                      "https://www.facebook.com/profile.php?id=100086988933778",
                      "_blank"
                    )
                  }
                />
              </span>
            </div>
            <p className="text-gray-400">
              Copyright Constrades. All rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
