import React, { useState } from "react";
import { firstLetterUpper } from "../../../service/userService";
import { IoCloseCircleOutline } from "react-icons/io5";

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
    platform,
    meetup,
    modelNumber,
    serialNumber,
    onDeletePicture,
    cashTradeInVisible,
    itemTradeInVisible,
  } = props;

  const imageDefault =
    "https://lh3.googleusercontent.com/PxtxcMEM7csm-ismj3MWtG-g8xsFDt9cyNHTbVEyxllXJQEKCLdqxT9MjgH3epPgpXhaOSGwKd_Ba7CJ4vWzW7TnkuPnMbLuILP2OmO-ZV2pt9A-6KBkmRXir0cJkhAdT02OUnokiw=w2400";

  const [displayImage, setDisplayImage] = useState(null);
  const currentDate = new Date();

  const currentDateString = currentDate.toLocaleString("default", {
    month: "short",
    day: "2-digit",
  });

  const titlePreview = (text) => {
    return <span className="font-semibold">{text}</span>;
  };

  return (
    <>
      <span className="lg:ml-16 text-gray-500">Product Preview:</span>
      <div className="lg:ml-16 grid grid-cols-2 place-items-center h-4/6 rounded">
        <div className=" h-full bg-blue-900 flex align-center rounded lg:rounded-r-none">
          <img
            src={
              displayImage !== null
                ? typeof displayImage === "object"
                  ? window.URL.createObjectURL(displayImage)
                  : displayImage
                : imageDefault
            }
            alt={title}
            className="object-contain place-content-center h-full"
          />
        </div>
        <div className="h-full w-full  bg-white rounded-b lg:rounded-b-none rounded p-4 flex flex-col justify-between leading-normal">
          <div className="mb-8 ">
            <div className="text-gray-900 font-bold text-xl mb-2 text-ellipsis overflow-hidden whitespace-nowrap w-52">
              {title === "" ? "TITLE" : title}
            </div>

            <p className="text-gray-700 text-base text-ellipsis overflow-hidden whitespace-nowrap w-72">
              {titlePreview("Description: ")}
              {description}
            </p>

            <p className="text-gray-700 text-base mt-2">
              {titlePreview("Category: ")} {category}
            </p>
            <p className="text-gray-700 text-base mt-2">
              {titlePreview("Platform Supported: ")} {platform}
            </p>
            <p className="text-gray-700 text-base mt-2">
              {titlePreview("Model Number: ")} {modelNumber}
            </p>
            <p className="text-gray-700 text-base mt-2">
              {titlePreview("Serial Number: ")} {serialNumber}
            </p>
            <p className="text-gray-700 text-base mt-2 ">
              {titlePreview("Condition: ")} {condition}
            </p>
            <p className="text-gray-700 text-base mt-2 text-ellipsis overflow-hidden whitespace-nowrap w-72">
              {titlePreview("Location: ")} {location}
            </p>
            <p className="text-gray-700 text-base mt-2">
              {titlePreview("Prefer Trade: ")}{" "}
              {preferTrade === "Trade-in" ? "Cash and Item" : preferTrade}
            </p>
            {(cashTradeInVisible || preferTrade === "Selling") && (
              <p className="text-gray-700 text-base mt-2 text-ellipsis overflow-hidden whitespace-nowrap w-72">
                {titlePreview("Cash: ")} {`₱${cash}`}
              </p>
            )}

            {(itemTradeInVisible || preferTrade === "Swapping") && (
              <p className="text-gray-700 text-base mt-2 text-ellipsis overflow-hidden whitespace-nowrap w-72">
                {titlePreview("Item: ")} {item}
              </p>
            )}
            <p className="text-gray-700 text-base mt-2">
              {titlePreview("Meetup Preference: ")} {meetup}
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
          </div>
        </div>
      </div>
      {image && image.length !== 0 && (
        <div className="lg:ml-16 flex mt-5">
          {image.map((img, index) => (
            <div
              key={index}
              className="relative mr-3 flex place-items-center h-28 w-20 bg-gray-100 cursor-pointer"
              onClick={() => setDisplayImage(img)}
            >
              <img
                src={
                  typeof img === "object"
                    ? window.URL.createObjectURL(img)
                    : img
                }
                alt={img.name}
                className="h-full w-full object-contain "
              />
              <div className="absolute top-0 right-0">
                <IoCloseCircleOutline
                  size={25}
                  className="text-[#b8b8b8] cursor-pointer"
                  onClick={() => onDeletePicture(img)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ProductCardDetails;
