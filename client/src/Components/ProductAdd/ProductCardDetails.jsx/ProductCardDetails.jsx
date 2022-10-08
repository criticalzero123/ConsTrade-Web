import React from "react";
import { firstLetterUpper } from "../../../service/userService";

const ProductCardDetails = (props) => {
  const {
    image,
    title,
    userPhoto,
    userName,
    description,
    condition,
    category,
    location,
    preferTrade,
    cash,
    item,
    meetup,
  } = props;

  const imageDefault =
    "https://lh3.googleusercontent.com/PxtxcMEM7csm-ismj3MWtG-g8xsFDt9cyNHTbVEyxllXJQEKCLdqxT9MjgH3epPgpXhaOSGwKd_Ba7CJ4vWzW7TnkuPnMbLuILP2OmO-ZV2pt9A-6KBkmRXir0cJkhAdT02OUnokiw=w2400";

  const currentDate = new Date();

  const currentDateString = currentDate.toLocaleString("default", {
    month: "short",
    day: "2-digit",
  });

  return (
    <>
      <span className="lg:ml-16 text-gray-500">Product Review:</span>
      <div className="lg:ml-16 grid grid-cols-2 place-items-center h-4/6 rounded">
        <div className=" h-full bg-blue-900 flex align-center rounded lg:rounded-r-none">
          <img
            src={image ? image : imageDefault}
            alt=""
            className="object-contain place-content-center "
          />
        </div>
        <div className="h-full w-full  bg-white rounded-b lg:rounded-b-none rounded p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8 ">
            <div className="flex justify-between items-center">
              <div className="text-gray-900 font-bold text-xl mb-2 text-ellipsis overflow-hidden whitespace-nowrap w-52">
                {title === "" ? "TITLE" : title}
              </div>
              <div className=" block">chat</div>
            </div>
            <p className="text-gray-700 text-base text-ellipsis overflow-hidden whitespace-nowrap w-72">
              Description: {description}
            </p>
            <p className="text-gray-700 text-base mt-2 ">
              Condition: {condition}
            </p>
            <p className="text-gray-700 text-base mt-2">Category: {category}</p>
            <p className="text-gray-700 text-base mt-2 text-ellipsis overflow-hidden whitespace-nowrap w-72">
              Location: {location}
            </p>
            <p className="text-gray-700 text-base mt-2">
              Prefer Trade:{" "}
              {preferTrade === "Both" ? "Cash and Item" : preferTrade}
            </p>
            {(preferTrade === "Both" || preferTrade === "Cash") && (
              <p className="text-gray-700 text-base mt-2 text-ellipsis overflow-hidden whitespace-nowrap w-72">
                Cash: {`₱${cash}`}
              </p>
            )}

            {(preferTrade === "Both" || preferTrade === "Item/s") && (
              <p className="text-gray-700 text-base mt-2 text-ellipsis overflow-hidden whitespace-nowrap w-72">
                Item: {item}
              </p>
            )}
            <p className="text-gray-700 text-base mt-2">
              Meetup Preference: {meetup}
            </p>
          </div>

          <div className="flex items-center justify-between  pt-4">
            <div className="flex">
              <img
                className="w-10 h-10 rounded-full mr-4"
                src={userPhoto}
                alt="name"
              />
              <div className="text-sm">
                <p className="text-gray-900 leading-none">
                  {firstLetterUpper(userName)}
                </p>
                <p className="text-gray-600">{currentDateString}</p>
              </div>
            </div>

            <div className="place-items-center">share</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCardDetails;
